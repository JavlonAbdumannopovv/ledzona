// ============================================================================
// Doimiy saqlash qatlami (Persistent storage)
// ----------------------------------------------------------------------------
// - Vercel'da (BLOB_READ_WRITE_TOKEN mavjud bo'lsa): Vercel Blob ishlatiladi.
//   Barcha serverless konteynerlar bitta umumiy omborni ko'radi, shuning uchun
//   formadan qo'shilgan ekranlar admin panelda darhol paydo bo'ladi va
//   o'chirilganlar qayta tiklanmaydi.
// - Lokal muhitda: oddiy fayl tizimi (data/*.json, uploads/).
// ============================================================================
const fs = require('fs');
const path = require('path');

const useBlob = !!process.env.BLOB_READ_WRITE_TOKEN;
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
  blob = require('@vercel/blob');
}

if (isVercel && !useBlob) {
  console.warn('[storage] DIQQAT: BLOB_READ_WRITE_TOKEN topilmadi. Vercel /tmp vaqtinchalik — ma\'lumotlar saqlanib qolmaydi!');
}

function readSeed(key) {
  try {
    return JSON.parse(fs.readFileSync(path.join(baseDataDir, key + '.json'), 'utf-8'));
  } catch (e) {
    return undefined;
  }
}

// ---------------------------------------------------------------------------
// Blob: har bir yozuv yangi (tasodifiy nomli) fayl sifatida saqlanadi.
// O'qishda list() orqali eng oxirgisi olinadi. Shu tufayli CDN keshi
// eski ma'lumotni qaytarib qo'yish muammosi bo'lmaydi.
// ---------------------------------------------------------------------------
async function listVersions(key) {
  const prefix = `db/${key}-`;
  let cursor;
  const all = [];
  do {
    const res = await blob.list({ prefix, cursor, limit: 1000 });
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
  if (useBlob) {
    const versions = await listVersions(key);
    if (versions.length === 0) {
      const seed = readSeed(key);
      return seed !== undefined ? seed : fallback;
    }
    const res = await fetch(versions[0].url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Blob o'qishda xatolik: ${res.status}`);
    return await res.json();
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
  if (useBlob) {
    const stamp = String(Date.now()).padStart(15, '0');
    const created = await blob.put(`db/${key}-${stamp}.json`, body, {
      access: 'public',
      addRandomSuffix: true,
      contentType: 'application/json',
      cacheControlMaxAge: 60
    });
    // Eski versiyalarni tozalash (xatolik bo'lsa ham asosiy ishga ta'sir qilmaydi)
    try {
      const versions = await listVersions(key);
      const old = versions.filter(v => v.url !== created.url).map(v => v.url);
      if (old.length) await blob.del(old);
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

  if (useBlob) {
    const created = await blob.put(`uploads/${safeName}`, file.buffer, {
      access: 'public',
      addRandomSuffix: true,
      contentType: file.mimetype || 'application/octet-stream'
    });
    return created.url;
  }

  fs.writeFileSync(path.join(uploadsDir, safeName), file.buffer);
  return '/uploads/' + safeName;
}

// Blob'dagi rasmni o'chirish (lokal fayllarga tegmaydi)
async function deleteImage(url) {
  if (useBlob && url && /^https?:\/\/.*blob\.vercel-storage\.com\//.test(url)) {
    try { await blob.del(url); } catch (e) { /* ahamiyatsiz */ }
  }
}

module.exports = {
  useBlob,
  uploadsDir,
  readJSON,
  writeJSON,
  saveImage,
  deleteImage
};
