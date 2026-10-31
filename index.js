const express = require('express');
const path = require('path');
const multer = require('multer');
const crypto = require('crypto');
const storage = require('./storage');

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================================================
// 1. Parol va Autentifikatsiya (auth.json — doimiy omborda)
// ============================================================================
const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'ledzona-jwt-secret-token-key-2026';

function hashPassword(pwd) {
  return crypto.createHash('sha256').update(pwd).digest('hex');
}

async function getStoredPasswordHash() {
  try {
    const data = await storage.readJSON('auth', null);
    if (data && data.passwordHash) return data.passwordHash;
  } catch (err) {
    console.error('Parolni o\'qishda xatolik:', err);
  }
  return hashPassword('admin123');
}

async function setStoredPasswordHash(newHash) {
  await storage.writeJSON('auth', {
    passwordHash: newHash,
    updatedAt: new Date().toISOString()
  });
}

// Stateless HMAC Signed Token (Vercel Serverless va istalgan domenlarda 100% xatosiz ishlaydi)
async function createAdminToken() {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    role: 'admin',
    pwdHash: (await getStoredPasswordHash()).substring(0, 16),
    exp: Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 kun amal qiladi
  })).toString('base64url');

  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${header}.${payload}`)
    .digest('base64url');

  return `${header}.${payload}.${signature}`;
}

async function verifyAdminToken(token) {
  try {
    if (!token || typeof token !== 'string') return false;
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    const [header, payload, signature] = parts;

    const expectedSignature = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(`${header}.${payload}`)
      .digest('base64url');

    if (signature !== expectedSignature) return false;

    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8'));
    if (decoded.exp && decoded.exp < Date.now()) {
      return false; // Token muddati tugagan
    }

    const currentHashPrefix = (await getStoredPasswordHash()).substring(0, 16);
    if (decoded.pwdHash && decoded.pwdHash !== currentHashPrefix) {
      return false; // Parol o'zgarganda eski tokenlar bekor bo'ladi
    }

    return true;
  } catch (e) {
    return false;
  }
}

async function requireAdminAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  let token = null;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (req.query && req.query.token) {
    token = req.query.token;
  }

  if (await verifyAdminToken(token)) {
    return next();
  }
  return res.status(401).json({ success: false, message: 'Ruxsat berilmagan! Iltimos, qayta kiring.' });
}

// ============================================================================
// 2. Ma'lumotlar bazasi (screens.json — doimiy omborda)
// ============================================================================
const DEFAULT_SCREENS = [
  {
    id: "screen-1",
    name: "Kichik Halqa Yo‘li megamonitori",
    region: "Toshkent shahri",
    address: "Chilonzor tumani, Bunyodkor ko‘prigi oldi",
    description: "Uzun masofadan aniq ko‘rinadigan yuqori kontrastli tashqi panel",
    imageUrl: "/ledzona_files/AB6AXuApGaUgZtrFcE--.png.webp",
    createdAt: new Date().toISOString(),
    status: "approved"
  }
];

async function readScreens() {
  const data = await storage.readJSON('screens', DEFAULT_SCREENS);
  return Array.isArray(data) ? data : [];
}

async function writeScreens(data) {
  await storage.writeJSON('screens', data);
}

// Bir vaqtning o'zida kelgan yozuvlar bir-birini bosib ketmasligi uchun navbat
let writeQueue = Promise.resolve();
function updateScreens(mutator) {
  const job = writeQueue.then(async () => {
    const screens = await readScreens();
    const result = await mutator(screens);
    await writeScreens(screens);
    return result;
  });
  writeQueue = job.catch(() => {});
  return job;
}

// ============================================================================
// 3. Multer (rasm xotirada qabul qilinadi, keyin doimiy omborga yoziladi)
// ============================================================================
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 4 * 1024 * 1024 } // Vercel so'rov limiti (~4.5MB) sababli 4MB gacha
});

// ============================================================================
// 4. Middlewares
// ============================================================================
// Universal CORS (qaysi domen yoki portdan murojaat qilinishidan qat'iy nazar to'liq ruxsat)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function noCache(res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
}

// Statik fayllar
app.use('/uploads', express.static(storage.uploadsDir));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/ledzona_files', express.static(path.join(__dirname, 'ledzona_files')));
// Ichki fayllarni (baza, parol, server kodi) tashqaridan o'qib bo'lmasligi uchun
app.use((req, res, next) => {
  if (/^\/(data|node_modules|\.git)(\/|$)/i.test(req.path) || /^\/(storage|index)\.js$/i.test(req.path) || /^\/(package(-lock)?|vercel)\.json$/i.test(req.path)) {
    return res.status(404).end();
  }
  next();
});
app.use(express.static(__dirname));

// ============================================================================
// 5. FOYDALANUVCHILAR UCHUN PUBLIC API
// ============================================================================

// Faqat tasdiqlangan (approved) ekranlarni saytga chiqarish
app.get('/api/screens', async (req, res) => {
  noCache(res);
  try {
    const screens = await readScreens();
    res.json(screens.filter(s => s.status === 'approved'));
  } catch (err) {
    console.error('Ekranlarni o\'qishda xatolik:', err);
    res.status(500).json({ success: false, message: 'Server xatoligi yuz berdi' });
  }
});

// Yangi ekran taklifi (status boshlang'ich: 'pending')
app.post('/api/screens', (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      const msg = err.code === 'LIMIT_FILE_SIZE'
        ? 'Rasm hajmi 4MB dan oshmasligi kerak!'
        : 'Rasmni yuklashda xatolik yuz berdi';
      return res.status(400).json({ success: false, message: msg });
    }
    next();
  });
}, async (req, res) => {
  try {
    const { name, region, address, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Ekran nomi kiritilishi shart!' });
    }

    let imageUrl = '/ledzona_files/AB6AXuApGaUgZtrFcE--.png.webp';
    if (req.file) {
      imageUrl = await storage.saveImage(req.file);
    }

    const newScreen = {
      id: 'screen-' + Date.now() + '-' + Math.round(Math.random() * 1e4),
      name: name.trim(),
      region: (region || '').trim(),
      address: (address || '').trim(),
      description: (description || '').trim(),
      imageUrl: imageUrl,
      createdAt: new Date().toISOString(),
      status: 'pending' // Moderatsiyada kutilmoqda!
    };

    await updateScreens(screens => { screens.unshift(newScreen); });

    console.log('Yangi ariza kelib tushdi (moderatsiyada):', newScreen.name);
    return res.json({
      success: true,
      message: 'Arizangiz muvaffaqiyatli qabul qilindi! Ma\'lumotlar platforma moderatsiyasidan so\'ng efirga chiqariladi.',
      screen: newScreen
    });
  } catch (error) {
    console.error('Ekran qo\'shishda xatolik:', error);
    return res.status(500).json({ success: false, message: 'Server xatoligi yuz berdi' });
  }
});

// ============================================================================
// 6. ADMIN VA MODERATSIYA API
// ============================================================================

// Admin kirish (Login)
app.post('/api/admin/login', async (req, res) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ success: false, message: 'Parol kiritilmadi!' });
  }

  const currentHash = await getStoredPasswordHash();
  const inputHash = hashPassword(password.trim());

  if (inputHash === currentHash) {
    const token = await createAdminToken();
    return res.json({
      success: true,
      token: token,
      message: 'Tizimga muvaffaqiyatli kirildi!'
    });
  } else {
    return res.status(401).json({ success: false, message: 'Kiritilgan parol noto‘g‘ri!' });
  }
});

// Admin sessiyani tekshirish (Check token)
app.get('/api/admin/check-session', requireAdminAuth, (req, res) => {
  res.json({ success: true, message: 'Sessiya faol' });
});

// Admin chiqish (Logout)
app.post('/api/admin/logout', requireAdminAuth, (req, res) => {
  res.json({ success: true, message: 'Chiqildi' });
});

// Parolni o'zgartirish (Eski parol + yangi parol 2 marta)
app.post('/api/admin/change-password', requireAdminAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'Barcha maydonlarni to‘ldiring!' });
    }

    const currentHash = await getStoredPasswordHash();
    if (hashPassword(oldPassword.trim()) !== currentHash) {
      return res.status(400).json({ success: false, message: 'Amaldagi eski parol noto‘g‘ri!' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Yangi parollar bir-biriga mos kelmadi!' });
    }

    if (newPassword.trim().length < 4) {
      return res.status(400).json({ success: false, message: 'Yangi parol kamida 4 ta belgidan iborat bo‘lishi kerak!' });
    }

    await setStoredPasswordHash(hashPassword(newPassword.trim()));
    console.log('Admin paroli muvaffaqiyatli o\'zgartirildi');

    return res.json({
      success: true,
      message: 'Parol muvaffaqiyatli o‘zgartirildi! Yangi parol bilan tizimdan foydalanishingiz mumkin.'
    });
  } catch (err) {
    console.error('Parol o\'zgartirishda xatolik:', err);
    return res.status(500).json({ success: false, message: 'Server xatoligi yuz berdi' });
  }
});

// Barcha arizalarni olish (Statistika bilan)
app.get('/api/admin/screens', requireAdminAuth, async (req, res) => {
  noCache(res);
  try {
    const screens = await readScreens();
    const stats = {
      total: screens.length,
      pending: screens.filter(s => s.status === 'pending').length,
      approved: screens.filter(s => s.status === 'approved').length,
      rejected: screens.filter(s => s.status === 'rejected').length
    };
    res.json({ screens, stats, persistent: storage.useBlob || !process.env.VERCEL });
  } catch (err) {
    console.error('Arizalarni o\'qishda xatolik:', err);
    res.status(500).json({ success: false, message: 'Server xatoligi yuz berdi' });
  }
});

// Arizaning statusini o'zgartirish (Tasdiqlash / Rad etish / Kutilmoqda)
app.patch('/api/admin/screens/:id/status', requireAdminAuth, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['approved', 'rejected', 'pending'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Noto‘g‘ri status!' });
  }

  try {
    const screen = await updateScreens(screens => {
      const s = screens.find(x => x.id === id);
      if (!s) return null;
      s.status = status;
      s.updatedAt = new Date().toISOString();
      return s;
    });

    if (!screen) {
      return res.status(404).json({ success: false, message: 'Bunday ekran topilmadi!' });
    }

    const statusName = status === 'approved' ? 'tasdiqlandi va efirga chiqdi' : (status === 'rejected' ? 'rad etildi' : 'kutilmoqdaga qaytarildi');
    console.log(`Ekran [${screen.name}] ${statusName}`);

    return res.json({
      success: true,
      message: `Ekran muvaffaqiyatli ${statusName}!`,
      screen
    });
  } catch (err) {
    console.error('Statusni o\'zgartirishda xatolik:', err);
    return res.status(500).json({ success: false, message: 'Server xatoligi yuz berdi' });
  }
});

// Arizani butunlay o'chirish
app.delete('/api/admin/screens/:id', requireAdminAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const removed = await updateScreens(screens => {
      const idx = screens.findIndex(s => s.id === id);
      if (idx === -1) return null;
      return screens.splice(idx, 1)[0];
    });

    if (!removed) {
      return res.status(404).json({ success: false, message: 'Bunday ekran topilmadi!' });
    }

    await storage.deleteImage(removed.imageUrl);
    console.log(`Ekran o'chirildi: ${id}`);
    return res.json({ success: true, message: 'Ekran muvaffaqiyatli o‘chirildi!' });
  } catch (err) {
    console.error('O\'chirishda xatolik:', err);
    return res.status(500).json({ success: false, message: 'Server xatoligi yuz berdi' });
  }
});

// ============================================================================
// 7. SAHIFALAR
// ============================================================================

// Admin panel sahifasi (faqat /admin yo'li orqali)
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Asosiy sahifa
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'ledzona.html'));
});

// Serverni ishga tushirish (lokal muhitda)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(` Server muvaffaqiyatli ishga tushdi:`);
    console.log(` http://localhost:${PORT}`);
    console.log(` Admin panel: http://localhost:${PORT}/admin`);
    console.log(` Saqlash: ${storage.useBlob ? 'Vercel Blob' : 'Lokal fayllar'}`);
    console.log(`=========================================`);
  });
}

// Vercel Serverless Function uchun eksport
module.exports = app;
