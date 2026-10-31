const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Papkalarni sozlash
const isVercel = !!process.env.VERCEL;
const baseDataDir = path.join(__dirname, 'data');
const baseUploadsDir = path.join(__dirname, 'uploads');

const dataDir = isVercel ? path.join('/tmp', 'data') : baseDataDir;
const uploadsDir = isVercel ? path.join('/tmp', 'uploads') : baseUploadsDir;

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Vercel serverless muhitida boshlang'ich ma'lumotlarni /tmp ga nusxalash
if (isVercel) {
  try {
    const initScreens = path.join(baseDataDir, 'screens.json');
    const targetScreens = path.join(dataDir, 'screens.json');
    if (fs.existsSync(initScreens) && !fs.existsSync(targetScreens)) {
      fs.copyFileSync(initScreens, targetScreens);
    }
    const initAuth = path.join(baseDataDir, 'auth.json');
    const targetAuth = path.join(dataDir, 'auth.json');
    if (fs.existsSync(initAuth) && !fs.existsSync(targetAuth)) {
      fs.copyFileSync(initAuth, targetAuth);
    }
  } catch (err) {
    console.error('Vercel init data error:', err);
  }
}

// 2. Parol va Autentifikatsiya (auth.json)
const DB_AUTH_FILE = path.join(dataDir, 'auth.json');

function hashPassword(pwd) {
  return crypto.createHash('sha256').update(pwd).digest('hex');
}

function initAuth() {
  if (!fs.existsSync(DB_AUTH_FILE)) {
    const defaultAuth = {
      passwordHash: hashPassword('admin123'),
      updatedAt: new Date().toISOString()
    };
    fs.writeFileSync(DB_AUTH_FILE, JSON.stringify(defaultAuth, null, 2), 'utf-8');
  }
}
initAuth();

function getStoredPasswordHash() {
  try {
    const data = JSON.parse(fs.readFileSync(DB_AUTH_FILE, 'utf-8'));
    return data.passwordHash;
  } catch (err) {
    return hashPassword('admin123');
  }
}

function setStoredPasswordHash(newHash) {
  const data = {
    passwordHash: newHash,
    updatedAt: new Date().toISOString()
  };
  fs.writeFileSync(DB_AUTH_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Faol admin tokenlari (In-memory session)
const activeTokens = new Set();

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

function requireAdminAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  let token = null;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (req.query && req.query.token) {
    token = req.query.token;
  }

  if (token && activeTokens.has(token)) {
    return next();
  }
  return res.status(401).json({ success: false, message: 'Ruxsat berilmagan! Iltimos, qayta kiring.' });
}

// 3. Yengil ma'lumotlar bazasi (screens.json)
const DB_FILE = path.join(dataDir, 'screens.json');
if (!fs.existsSync(DB_FILE)) {
  const initialData = [
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
  fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
}

function readScreens() {
  try {
    const content = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error('Bazani o\'qishda xatolik:', err);
    return [];
  }
}

function writeScreens(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// 4. Multer fayl yuklash konfiguratsiyasi
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const safeName = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
    cb(null, safeName);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 } // 15MB gacha
});

// 5. Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Statik fayllar
app.use('/uploads', express.static(uploadsDir));
app.use('/ledzona_files', express.static(path.join(__dirname, 'ledzona_files')));
app.use(express.static(__dirname));

// ============================================================================
// 6. FOYDALANUVCHILAR UCHUN PUBLIC API
// ============================================================================

// Faqat tasdiqlangan (approved) ekranlarni saytga chiqarish
app.get('/api/screens', (req, res) => {
  const screens = readScreens();
  const approvedScreens = screens.filter(s => s.status === 'approved');
  res.json(approvedScreens);
});

// Yangi ekran taklifi (status boshlang'ich: 'pending')
app.post('/api/screens', upload.single('image'), (req, res) => {
  try {
    const { name, region, address, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Ekran nomi kiritilishi shart!' });
    }

    let imageUrl = '/ledzona_files/AB6AXuApGaUgZtrFcE--.png.webp';
    if (req.file) {
      imageUrl = '/uploads/' + req.file.filename;
    }

    const screens = readScreens();
    const newScreen = {
      id: 'screen-' + Date.now(),
      name: name.trim(),
      region: (region || '').trim(),
      address: (address || '').trim(),
      description: (description || '').trim(),
      imageUrl: imageUrl,
      createdAt: new Date().toISOString(),
      status: 'pending' // Moderatsiyada kutilmoqda!
    };

    screens.unshift(newScreen);
    writeScreens(screens);

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
// 7. ADMIN VA MODERATSIYA API
// ============================================================================

// Admin kirish (Login)
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ success: false, message: 'Parol kiritilmadi!' });
  }

  const currentHash = getStoredPasswordHash();
  const inputHash = hashPassword(password.trim());

  if (inputHash === currentHash) {
    const token = generateToken();
    activeTokens.add(token);
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
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    activeTokens.delete(token);
  }
  res.json({ success: true, message: 'Chiqildi' });
});

// Parolni o'zgartirish (Eski parol + yangi parol 2 marta)
app.post('/api/admin/change-password', requireAdminAuth, (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'Barcha maydonlarni to‘ldiring!' });
    }

    const currentHash = getStoredPasswordHash();
    if (hashPassword(oldPassword.trim()) !== currentHash) {
      return res.status(400).json({ success: false, message: 'Amaldagi eski parol noto‘g‘ri!' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Yangi parollar bir-biriga mos kelmadi!' });
    }

    if (newPassword.trim().length < 4) {
      return res.status(400).json({ success: false, message: 'Yangi parol kamida 4 ta belgidan iborat bo‘lishi kerak!' });
    }

    setStoredPasswordHash(hashPassword(newPassword.trim()));
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
app.get('/api/admin/screens', requireAdminAuth, (req, res) => {
  const screens = readScreens();
  const stats = {
    total: screens.length,
    pending: screens.filter(s => s.status === 'pending').length,
    approved: screens.filter(s => s.status === 'approved').length,
    rejected: screens.filter(s => s.status === 'rejected').length
  };
  res.json({ screens, stats });
});

// Arizaning statusini o'zgartirish (Tasdiqlash / Rad etish / Kutilmoqda)
app.patch('/api/admin/screens/:id/status', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['approved', 'rejected', 'pending'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Noto‘g‘ri status!' });
  }

  const screens = readScreens();
  const screenIndex = screens.findIndex(s => s.id === id);

  if (screenIndex === -1) {
    return res.status(404).json({ success: false, message: 'Bunday ekran topilmadi!' });
  }

  screens[screenIndex].status = status;
  screens[screenIndex].updatedAt = new Date().toISOString();
  writeScreens(screens);

  const statusName = status === 'approved' ? 'tasdiqlandi va efirga chiqdi' : (status === 'rejected' ? 'rad etildi' : 'kutilmoqdaga qaytarildi');
  console.log(`Ekran [${screens[screenIndex].name}] ${statusName}`);

  return res.json({
    success: true,
    message: `Ekran muvaffaqiyatli ${statusName}!`,
    screen: screens[screenIndex]
  });
});

// Arizani butunlay o'chirish
app.delete('/api/admin/screens/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const screens = readScreens();
  const filtered = screens.filter(s => s.id !== id);

  if (filtered.length === screens.length) {
    return res.status(404).json({ success: false, message: 'Bunday ekran topilmadi!' });
  }

  writeScreens(filtered);
  console.log(`Ekran o'chirildi: ${id}`);
  return res.json({ success: true, message: 'Ekran muvaffaqiyatli o‘chirildi!' });
});

// ============================================================================
// 8. SAHIFALAR
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
    console.log(`=========================================`);
  });
}

// Vercel Serverless Function uchun eksport
module.exports = app;
