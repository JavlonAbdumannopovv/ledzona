# LEDZONE — O‘zbekistondagi eng yirik LED ekranlar platformasi

O‘zbekiston bo‘ylab tashqi reklama LED ekranlarini topish, bron qilish va yangi LED ekran qo‘shish imkoniyatini beruvchi zamonaviy veb-platforma.

## 🌟 Asosiy Imkoniyatlar

- **Zamonaviy UI/UX Dizayn:** Zumrad-yashil (Emerald) neon minimalist uslub, interaktiv animatsiyalar va to'liq moslashuvchan (Responsive).
- **Fixed Header:** Sahifa bo'ylab scroll qilinganda ham doimiy ko'rinib turuvchi frosted-glass navigatsiya paneli.
- **Interaktiv Dropdown FAQ:** Savol-javoblar bo'limi zamonaviy akkordeon ko'rinishida.
- **Ekran qo'shish formasi:** Drag-and-drop fayl yuklash, jonli rasm prevyusi, 14 ta viloyat tanlovi va validatsiya.
- **Platforma Moderatsiyasi:** Yangi arizalar avtomatik ravishda moderatsiya bosqichiga tushadi va faqat administrator tasdiqlaganidan keyin saytda efirga chiqadi.
- **Maxfiy Admin Panel (`/admin`):**
  - Kirish uchun xavfsiz parol tizimi.
  - Arizalarni real vaqt rejimida ko'rish, rasmlarni to'liq o'lchamda ochish (Lightbox).
  - Statuslarni boshqarish: **Tasdiqlash (Approved)**, **Rad etish (Rejected)**, **O'chirish**.
  - Parolni o'zgartirish (Eski parol + yangi parolni 2 marta tasdiqlash orqali).

---

## 🚀 Loyihani Ishga Tushirish

1. **Repozitoriyani klonlash:**
   ```bash
   git clone https://github.com/JavlonAbdumannopovv/ledzona.git
   cd ledzona
   ```

2. **Kutubxonalarni o'rnatish:**
   ```bash
   npm install
   ```

3. **Serverni ishga tushirish:**
   ```bash
   node index.js
   ```

4. **Brauzerda ochish:**
   - **Asosiy sayt:** `http://localhost:3000`
   - **Admin panel:** `http://localhost:3000/admin` *(Standart parol: `admin123`)*

---

## 🛠️ Texnologiyalar

- **Frontend:** HTML5, CSS3 (Design System), JavaScript (Vanilla ES6+)
- **Backend:** Node.js, Express.js
- **Fayllar va Media:** Multer
- **Ma'lumotlar bazasi:** JSON file-based database (`data/screens.json`, `data/auth.json`)
