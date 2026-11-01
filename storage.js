// ============================================================================
// Doimiy saqlash qatlami (Persistent storage)
// ----------------------------------------------------------------------------
// - Vercel'da: Vercel Blob (BLOB_READ_WRITE_TOKEN yoki *_READ_WRITE_TOKEN).
//   Public va Private omborlarning har ikkisi bilan 100% mos ishlaydi.
// - Lokal muhitda: oddiy fayl tizimi (data/*.json, uploads/).
// ============================================================================
const fs = require('fs');
const path = require('path');

function findBlobToken() {
  if (process.env.BLOB_READ_WRITE_TOKEN) return process.env.BLOB_READ_WRITE_TOKEN;
  for (const [key, val] of Object.entries(process.env)) {
    if (typeof val === 'string' && (key.endsWith('_READ_WRITE_TOKEN') || val.startsWith('vercel_blob_rw_'))) {
      return val;
    }
  }
  return null;
}

const blobToken = findBlobToken();
if (blobToken && !process.env.BLOB_READ_WRITE_TOKEN) {
  process.env.BLOB_READ_WRITE_TOKEN = blobToken;
}

const useBlob = !!blobToken;
const isVercel = !!process.env.VERCEL;

const baseDataDir = path.join(__dirname, 'data');
const baseUploadsDir = path.join(__dirname, 'uploads');
const dataDir = isVercel ? path.join('/tmp', 'data') : baseDataDir;
const uploadsDir = isVercel ? path.join('/tmp', 'uploads') : baseUploadsDir;

for (const dir of [dataDir, uploadsDir]) {
  try {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  } catch (e) { /* read-only FS */ }
}

let blob = null;
if (useBlob) {
  try {
    blob = require('@vercel/blob');
  } catch (e) {
    console.error('[storage] @vercel/blob yuklanmadi:', e);
  }
}

let detectedAccess = null; // 'public' | 'private'

function readSeed(key) {
  try {
    return JSON.parse(fs.readFileSync(path.join(baseDataDir, key + '.json'), 'utf-8'));
  } catch (e) {
    return undefined;
  }
}

// Public yoki Private rejimini avtomatik aniqlab yozish
async function putWithAutoAccess(pathname, body, options = {}) {
  const token = blobToken;
  const opts = { token, ...options };

  if (detectedAccess) {
    return await blob.put(pathname, body, { ...opts, access: detectedAccess });
  }

  try {
    const res = await blob.put(pathname, body, { ...opts, access: 'public' });
    detectedAccess = 'public';
    return res;
  } catch (err) {
    const isAccessErr = err && (
      err.name === 'BlobAccessError' ||
      /private|access|permission|not allowed/i.test(err.message || '')
    );
    if (isAccessErr) {
      console.warn('[storage] Public access rad etildi, Private rejimga o\'tildi');
      const res = await blob.put(pathname, body, { ...opts, access: 'private' });
      detectedAccess = 'private';
      return res;
    }
    throw err;
  }
}

async function listVersions(key) {
  const prefix = `db/${key}-`;
  let cursor;
  const all = [];
  do {
    const res = await blob.list({ prefix, cursor, limit: 1000, token: blobToken });
    all.push(...res.blobs);
    cursor = res.hasMore ? res.cursor : undefined;
  } while (cursor);
  all.sort((a, b) => {
    const t = new Date(b.uploadedAt) - new Date(a.uploadedAt);
    return t !== 0 ? t : b.pathname.localeCompare(a.pathname);
  });
  return all;
}

async function readJSON(key, fallback) {
  if (useBlob && blob) {
    try {
      const versions = await listVersions(key);
      if (versions.length === 0) {
        const seed = readSeed(key);
        return seed !== undefined ? seed : fallback;
      }
      const fetchHeaders = {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      };
      if (blobToken) {
        fetchHeaders['Authorization'] = `Bearer ${blobToken}`;
      }
      const res = await fetch(versions[0].url, {
        headers: fetchHeaders,
        cache: 'no-store'
      });
      if (!res.ok) throw new Error(`Blob o'qishda xatolik: ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error(`[storage] Blob ${key} o'qishda xatolik:`, err);
      const seed = readSeed(key);
      return seed !== undefined ? seed : fallback;
    }
  }

  const file = path.join(dataDir, key + '.json');
  try {
    if (!fs.existsSync(file)) {
      const seed = readSeed(key);
      return seed !== undefined ? seed : fallback;
    }
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch (e) {
    console.error(`[storage] ${key} o'qishda xatolik:`, e);
    return fallback;
  }
}

async function writeJSON(key, data) {
  const body = JSON.stringify(data, null, 2);
  if (useBlob && blob) {
    const stamp = String(Date.now()).padStart(15, '0');
    const created = await putWithAutoAccess(`db/${key}-${stamp}.json`, body, {
      addRandomSuffix: true,
      contentType: 'application/json',
      cacheControlMaxAge: 60
    });
    // Eski versiyalarni tozalash
    try {
      const versions = await listVersions(key);
      const old = versions.filter(v => v.url !== created.url).map(v => v.url);
      if (old.length) await blob.del(old, { token: blobToken });
    } catch (e) {
      console.error('[storage] eski versiyalarni o\'chirishda xatolik:', e);
    }
    return;
  }

  fs.writeFileSync(path.join(dataDir, key + '.json'), body, 'utf-8');
}

// Rasmni saqlash va ommaviy URL qaytarish
async function saveImage(file) {
  const ext = path.extname(file.originalname || '').toLowerCase() || '.png';
  const safeName = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;

  if (useBlob && blob) {
    const created = await putWithAutoAccess(`uploads/${safeName}`, file.buffer, {
      addRandomSuffix: true,
      contentType: file.mimetype || 'application/octet-stream'
    });
    // Agar ombor private bo'lsa, rasmni yuklab ko'rsatish uchun proksi orqali uzatamiz
    if (detectedAccess === 'private') {
      return '/api/blob-proxy?url=' + encodeURIComponent(created.url);
    }
    return created.url;
  }

  fs.writeFileSync(path.join(uploadsDir, safeName), file.buffer);
  return '/uploads/' + safeName;
}

// Blob'dagi rasmni o'chirish
async function deleteImage(url) {
  if (useBlob && blob && url) {
    let rawUrl = url;
    if (url.includes('/api/blob-proxy?url=')) {
      try {
        rawUrl = decodeURIComponent(url.split('url=')[1]);
      } catch (e) { }
    }
    if (/^https?:\/\/.*blob\.vercel-storage\.com\//.test(rawUrl)) {
      try { await blob.del(rawUrl, { token: blobToken }); } catch (e) { /* ahamiyatsiz */ }
    }
  }
}

module.exports = {
  findBlobToken,
  useBlob,
  uploadsDir,
  readJSON,
  writeJSON,
  saveImage,
  deleteImage
};
