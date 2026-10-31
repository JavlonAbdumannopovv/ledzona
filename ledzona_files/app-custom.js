/**
 * LEDZONA - Master UI/UX & Responsive Optimization
 * Fully responsive: Mobile (320px+), Tablet (768px+), Laptop (1024px+), Desktop (1440px+)
 */

(function () {
  'use strict';

  // 1. Mukammal UI va Barcha qurilmalarga moslashuvchan (Responsive) CSS uslublari
  function injectStyles() {
    if (document.getElementById('ledzona-custom-styles')) {
      document.getElementById('ledzona-custom-styles').remove();
    }

    const style = document.createElement('style');
    style.id = 'ledzona-custom-styles';
    style.textContent = `
      /* --- GLOBAL VA RESPONSIVE TOZALASH --- */
      html, body {
        overflow-x: hidden !important;
        width: 100% !important;
        max-width: 100vw !important;
        scroll-behavior: smooth !important;
        background-color: #0a0f14 !important;
      }
      ::selection {
        background: rgba(16, 185, 129, 0.35) !important;
        color: #ffffff !important;
      }
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      ::-webkit-scrollbar-track {
        background: #070a10;
      }
      ::-webkit-scrollbar-thumb {
        background: #1e293b;
        border-radius: 4px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #10b981;
      }

      /* Tildaning ortiqcha va xato bloklarini yashirish */
      .t-form__errorbox-bottom,
      .t-form__errorbox-middle,
      .t-input-error,
      .js-errorbox-all,
      .js-errorbox-wrapper,
      .t-form__errorbox-wrapper,
      .t-tildalabel-free {
        display: none !important;
      }

      /* Menyudagi tugmalarga zamonaviy interaktivlik */
      .tn-elem[data-elem-id="1791906269394000003"] .tn-atom,
      .tn-elem[data-elem-id="1791906314408000005"] .tn-atom,
      .tn-elem[data-elem-id="1791905809815000002"] .tn-atom,
      .tn-elem[data-elem-id="1791906387461000006"] .tn-atom,
      .tn-elem[data-elem-id="1791905745932000001"] .tn-atom {
        cursor: pointer !important;
        transition: color 0.2s ease, text-shadow 0.2s ease !important;
      }
      .tn-elem[data-elem-id="1791906269394000003"] .tn-atom:hover,
      .tn-elem[data-elem-id="1791906314408000005"] .tn-atom:hover,
      .tn-elem[data-elem-id="1791905809815000002"] .tn-atom:hover,
      .tn-elem[data-elem-id="1791906387461000006"] .tn-atom:hover,
      .tn-elem[data-elem-id="1791905745932000001"] .tn-atom:hover {
        color: #10b981 !important;
        text-shadow: 0 0 10px rgba(16, 185, 129, 0.4);
      }

      /* --- MAVJUD EKRANLAR SEKSIYASI --- */
      #rec5153177603 .t396__artboard {
        height: auto !important;
        min-height: 550px !important;
        padding-top: 40px !important;
        padding-bottom: 70px !important;
      }
      #rec5153177603 .t396__carrier,
      #rec5153177603 .t396__filter {
        height: 100% !important;
      }

      /* Eski statik Tilda elementlarini yashirish (dinamik blok o'rnini oladi) */
      #rec5153177603 .tn-elem[data-elem-id="1793002492825000002"],
      #rec5153177603 .tn-elem[data-elem-id="1793002799538000005"],
      #rec5153177603 .tn-elem[data-elem-id="1793002361559000001"],
      #rec5153177603 .tn-elem[data-elem-id="1793002867203000006"],
      #rec5153177603 .tn-elem[data-elem-id="1793002665003000004"],
      #rec5153177603 .tn-elem[data-elem-id="1793002560527"],
      #rec5153177603 .tn-elem[data-elem-id="1793002642608000003"] {
        display: none !important;
      }

      /* Zamonaviy Seksiyaning Sarlavhasi */
      .ledzona-section-header {
        text-align: center;
        margin-bottom: 32px;
        padding: 0 16px;
      }
      .ledzona-section-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 11.5px;
        font-weight: 700;
        letter-spacing: 1.5px;
        color: #10b981;
        background: rgba(16, 185, 129, 0.08);
        border: 1px solid rgba(16, 185, 129, 0.25);
        padding: 6px 14px;
        border-radius: 30px;
        margin-bottom: 12px;
        text-transform: uppercase;
      }
      .ledzona-section-title {
        font-size: 36px;
        font-weight: 800;
        color: #ffffff;
        margin: 0 0 10px 0;
        letter-spacing: -0.5px;
      }
      .ledzona-section-subtitle {
        font-size: 15.5px;
        color: #94a3b8;
        max-width: 620px;
        margin: 0 auto;
        line-height: 1.5;
      }
      @media screen and (max-width: 640px) {
        .ledzona-section-title {
          font-size: 26px;
        }
        .ledzona-section-subtitle {
          font-size: 13.5px;
        }
      }

      /* Asosiy konteyner */
      .ledzona-screens-wrapper {
        width: 100%;
        max-width: 1240px;
        margin: 0 auto;
        padding: 0 20px;
        position: relative;
        z-index: 10;
        box-sizing: border-box;
      }
      @media screen and (max-width: 480px) {
        .ledzona-screens-wrapper {
          padding: 0 14px;
        }
      }

      /* Qidiruv, Filter va Toolbar */
      .ledzona-toolbar {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 28px;
        background: rgba(19, 23, 32, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        padding: 14px 20px;
        backdrop-filter: blur(12px);
      }
      @media screen and (max-width: 768px) {
        .ledzona-toolbar {
          flex-direction: column;
          align-items: stretch;
          padding: 14px;
          gap: 12px;
        }
      }

      .ledzona-search-box {
        position: relative;
        flex: 1;
        min-width: 240px;
      }
      .ledzona-search-box input {
        width: 100%;
        height: 44px;
        background: #0a0e16;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        padding: 0 16px 0 40px;
        color: #ffffff;
        font-size: 14px;
        outline: none;
        transition: border-color 0.2s, box-shadow 0.2s;
        box-sizing: border-box;
      }
      .ledzona-search-box input:focus {
        border-color: #10b981;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
      }
      .ledzona-search-box svg {
        position: absolute;
        left: 13px;
        top: 50%;
        transform: translateY(-50%);
        width: 18px;
        height: 18px;
        fill: none;
        stroke: #64748b;
        pointer-events: none;
      }

      .ledzona-filter-pills {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      @media screen and (max-width: 768px) {
        .ledzona-filter-pills {
          overflow-x: auto;
          flex-wrap: nowrap;
          padding-bottom: 6px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .ledzona-filter-pills::-webkit-scrollbar {
          display: none;
        }
      }

      .ledzona-pill-btn {
        background: #0a0e16;
        border: 1px solid rgba(255, 255, 255, 0.08);
        color: #94a3b8;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        white-space: nowrap;
        flex-shrink: 0;
      }
      .ledzona-pill-btn:hover {
        color: #ffffff;
        border-color: rgba(16, 185, 129, 0.4);
      }
      .ledzona-pill-btn.active {
        background: #10b981;
        color: #ffffff;
        border-color: #10b981;
        box-shadow: 0 2px 10px rgba(16, 185, 129, 0.35);
      }

      .ledzona-count-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        color: #34d399;
        background: rgba(16, 185, 129, 0.1);
        border: 1px solid rgba(16, 185, 129, 0.25);
        padding: 6px 12px;
        border-radius: 20px;
        font-weight: 600;
      }
      .ledzona-count-badge span.pulse-dot,
      .ledzona-section-badge span.pulse-dot {
        width: 8px;
        height: 8px;
        background: #10b981;
        border-radius: 50%;
        box-shadow: 0 0 8px #10b981;
      }

      /* Kartochkalar Grid tizimi (Har qanday ekranga avtomatik moslashuvchi) */
      .ledzona-cards-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(285px, 1fr));
        gap: 24px;
        width: 100%;
        box-sizing: border-box;
      }
      @media screen and (max-width: 640px) {
        .ledzona-cards-container {
          grid-template-columns: 1fr;
          gap: 18px;
        }
      }

      /* Har bir ekran kartochkasi */
      .led-screen-card {
        background: #12161f;
        border-radius: 20px;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: 0 10px 28px rgba(0, 0, 0, 0.4);
        display: flex;
        flex-direction: column;
        transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s ease, border-color 0.28s ease;
        position: relative;
        animation: fadeInUp 0.4s ease forwards;
        box-sizing: border-box;
      }
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(15px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .led-screen-card:hover {
        transform: translateY(-6px);
        border-color: rgba(16, 185, 129, 0.4);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(16, 185, 129, 0.12);
      }
      @media (hover: none) {
        .led-screen-card:hover {
          transform: none;
        }
      }

      /* Rasm bloki va nishonlar */
      .led-screen-card__img-box {
        width: 100%;
        height: 180px;
        background-color: #070a10;
        overflow: hidden;
        position: relative;
      }
      .led-screen-card__img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.4s ease;
      }
      .led-screen-card:hover .led-screen-card__img {
        transform: scale(1.06);
      }
      .led-screen-card__badge-region {
        position: absolute;
        top: 12px;
        left: 12px;
        background: rgba(7, 10, 16, 0.85);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: #ffffff;
        font-size: 11.5px;
        font-weight: 600;
        padding: 4px 10px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 4px;
        z-index: 2;
      }
      .led-screen-card__badge-live {
        position: absolute;
        top: 12px;
        right: 12px;
        background: rgba(16, 185, 129, 0.9);
        color: #ffffff;
        font-size: 11px;
        font-weight: 700;
        padding: 3px 8px;
        border-radius: 8px;
        z-index: 2;
        box-shadow: 0 2px 8px rgba(16, 185, 129, 0.4);
      }

      /* Kartochka kontenti */
      .led-screen-card__content {
        padding: 18px 20px 20px 20px;
        display: flex;
        flex-direction: column;
        flex: 1;
      }
      .led-screen-card__title {
        font-size: 18px;
        font-weight: 700;
        line-height: 24px;
        color: #ffffff;
        margin: 0 0 8px 0;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .led-screen-card__location {
        font-size: 13.5px;
        line-height: 19px;
        color: #94a3b8;
        margin: 0 0 14px 0;
        display: flex;
        align-items: flex-start;
        gap: 6px;
      }
      .led-screen-card__location svg {
        width: 15px;
        height: 15px;
        flex-shrink: 0;
        margin-top: 2px;
        fill: #34d399;
      }
      .led-screen-card__desc-box {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 10px;
        padding: 10px 12px;
        margin-bottom: 16px;
      }
      .led-screen-card__desc-text {
        font-size: 12.5px;
        line-height: 17px;
        color: #cbd5e1;
        margin: 0;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .led-screen-card__action-btn {
        margin-top: auto;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 100%;
        height: 42px;
        background: #1b2230;
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #ffffff;
        border-radius: 10px;
        font-size: 13.5px;
        font-weight: 600;
        text-decoration: none;
        cursor: pointer;
        transition: all 0.25s ease;
      }
      .led-screen-card__action-btn:hover {
        background: #10b981;
        border-color: #10b981;
        box-shadow: 0 4px 15px rgba(16, 185, 129, 0.35);
      }

      /* Bo'sh holat */
      .ledzona-empty-state {
        grid-column: 1 / -1;
        text-align: center;
        padding: 50px 20px;
        background: rgba(19, 23, 32, 0.5);
        border: 1px dashed rgba(255, 255, 255, 0.12);
        border-radius: 16px;
        color: #94a3b8;
      }
      .ledzona-empty-state svg {
        width: 48px;
        height: 48px;
        stroke: #64748b;
        margin-bottom: 12px;
      }

      /* --- FORMA SEKSIYASI VA RESPONSIVE MOSLASHUV --- */
      #rec5136870403 .t396__artboard {
        height: auto !important;
        min-height: 850px !important;
        padding-bottom: 70px !important;
      }
      @media screen and (max-width: 640px) {
        #rec5136870403 .tn-elem[data-elem-id="1792926405257"] {
          width: 92% !important;
          left: 4% !important;
          max-width: 440px !important;
        }
        #rec5136870403 .tn-elem[data-elem-id="1792924985228000003"] {
          width: 96% !important;
          left: 2% !important;
        }
      }

      .t-input-group label.t-input-title {
        color: #e2e8f0 !important;
        font-size: 15px !important;
        font-weight: 600 !important;
        margin-bottom: 8px !important;
      }
      /* Mobil qurilmalarda avtomatik zum bo'lib ketmasligi uchun 16px font-size */
      .t-input-group input.t-input,
      .t-input-group select.t-input,
      .t-input-group textarea.t-input {
        background: #090d14 !important;
        border: 1px solid #1e293b !important;
        color: #ffffff !important;
        border-radius: 12px !important;
        padding: 0 16px !important;
        font-size: 16px !important;
        transition: border-color 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }
      .t-input-group input.t-input:focus,
      .t-input-group select.t-input:focus,
      .t-input-group textarea.t-input:focus {
        border-color: #10b981 !important;
        background-color: #0b111c !important;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2) !important;
      }

      /* Zamonaviy Dropzone */
      .ledzona-dropzone {
        border: 2px dashed rgba(255, 255, 255, 0.18);
        background: #090d14;
        border-radius: 14px;
        padding: 24px 16px;
        text-align: center;
        cursor: pointer;
        transition: all 0.25s ease;
        position: relative;
        box-sizing: border-box;
      }
      .ledzona-dropzone:hover,
      .ledzona-dropzone.dragover {
        border-color: #10b981;
        background: rgba(16, 185, 129, 0.04);
      }
      .ledzona-dropzone__icon {
        width: 44px;
        height: 44px;
        margin: 0 auto 10px auto;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(16, 185, 129, 0.1);
        border-radius: 50%;
        color: #10b981;
      }
      .ledzona-dropzone__text {
        font-size: 14px;
        color: #cbd5e1;
        font-weight: 500;
        margin-bottom: 4px;
      }
      .ledzona-dropzone__text span {
        color: #10b981;
        font-weight: 600;
      }
      .ledzona-dropzone__sub {
        font-size: 12px;
        color: #64748b;
      }

      /* Yuklangan rasm ko'rinishi */
      .ledzona-dropzone {
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
        overflow: hidden !important;
      }
      .ledzona-dropzone__preview {
        display: none;
        align-items: center;
        gap: 12px;
        background: #111722;
        border: 1px solid rgba(16, 185, 129, 0.35);
        border-radius: 12px;
        padding: 10px 14px;
        text-align: left;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
        overflow: hidden !important;
      }
      .ledzona-dropzone__preview.active {
        display: flex;
      }
      .ledzona-dropzone__thumb {
        width: 48px;
        height: 48px;
        min-width: 48px;
        min-height: 48px;
        object-fit: cover;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        flex-shrink: 0;
      }
      .ledzona-dropzone__info {
        flex: 1 1 auto;
        min-width: 0;
        max-width: calc(100% - 95px);
        overflow: hidden;
      }
      .ledzona-dropzone__name {
        font-size: 13.5px;
        color: #ffffff;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: block;
        max-width: 100%;
        word-break: break-all;
      }
      .ledzona-dropzone__size {
        font-size: 12px;
        color: #34d399;
        margin-top: 2px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .ledzona-dropzone__remove {
        background: rgba(239, 68, 68, 0.15);
        color: #ef4444;
        border: 1px solid rgba(239, 68, 68, 0.3);
        border-radius: 8px;
        width: 32px;
        height: 32px;
        min-width: 32px;
        min-height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;
        flex-shrink: 0;
      }
      .ledzona-dropzone__remove:hover {
        background: #ef4444;
        color: #fff;
      }

      /* Submit tugmasi */
      button.t-submit,
      .tn-form__submit button {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
        border-radius: 12px !important;
        font-size: 16px !important;
        font-weight: 700 !important;
        color: #ffffff !important;
        box-shadow: 0 4px 18px rgba(16, 185, 129, 0.35) !important;
        transition: transform 0.2s ease, box-shadow 0.2s ease !important;
        height: 48px !important;
      }
      button.t-submit:hover,
      .tn-form__submit button:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 8px 25px rgba(16, 185, 129, 0.5) !important;
      }

      /* Floating Scroll to top tugmasi */
      .ledzona-scroll-top {
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 44px;
        height: 44px;
        background: #10b981;
        color: #ffffff;
        border: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
        opacity: 0;
        visibility: hidden;
        transform: translateY(15px);
        transition: all 0.3s ease;
        z-index: 99999;
      }
      .ledzona-scroll-top.visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
      .ledzona-scroll-top:hover {
        background: #059669;
        transform: translateY(-3px);
      }

      /* Toast bildirishnoma */
      .ledzona-toast {
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translate(-50%, 40px);
        background: rgba(16, 24, 32, 0.95);
        border: 1px solid #10b981;
        color: #ffffff;
        padding: 12px 24px;
        border-radius: 50px;
        font-size: 14px;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
        z-index: 999999;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        display: flex;
        align-items: center;
        gap: 10px;
        backdrop-filter: blur(12px);
        max-width: 90vw;
        box-sizing: border-box;
        text-align: center;
      }
      .ledzona-toast.show {
        opacity: 1;
        transform: translate(-50%, 0);
        pointer-events: auto;
      }

      /* Zamonaviy Footer */
      .custom-ledzona-footer {
        background-color: #070a10;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        padding: 40px 20px;
        text-align: center;
        color: #64748b;
        font-size: 14px;
        position: relative;
        z-index: 10;
      }
      .custom-ledzona-footer a {
        color: #34d399;
        text-decoration: none;
        transition: color 0.2s;
      }
      .custom-ledzona-footer a:hover {
        color: #ffffff;
        text-decoration: underline;
      }
      .footer-brand {
        font-size: 20px;
        font-weight: 800;
        color: #ffffff;
        margin-bottom: 8px;
        letter-spacing: 1px;
      }
      .footer-brand span {
        color: #10b981;
      }
    `;
    document.head.appendChild(style);
  }

  // Toast bildirishnoma ko'rsatish
  function showToast(message, isError) {
    let toast = document.getElementById('ledzona-toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'ledzona-toast-notification';
      toast.className = 'ledzona-toast';
      document.body.appendChild(toast);
    }
    toast.style.borderColor = isError ? '#ef4444' : '#10b981';
    toast.innerHTML = (isError ? '⚠️ ' : '✅ ') + message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // 2. Dinamik ekranlar holati va render qilish
  let allScreens = [];
  let currentFilter = 'all';
  let searchQuery = '';

  async function fetchScreensData() {
    try {
      const res = await fetch('/api/screens');
      if (!res.ok) throw new Error('Ekranlarni yuklab bo‘lmadi');
      allScreens = await res.json();
      renderScreens();
    } catch (err) {
      console.error('Ekranlar yuklashda xatolik:', err);
    }
  }

  function renderScreens() {
    const parentBlock = document.getElementById('rec5153177603');
    if (!parentBlock) return;

    const artboard = parentBlock.querySelector('.t396__artboard');
    if (!artboard) return;

    let wrapper = document.getElementById('ledzona-screens-wrapper');
    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.id = 'ledzona-screens-wrapper';
      wrapper.className = 'ledzona-screens-wrapper';
      artboard.appendChild(wrapper);
    }

    // Filtrlash
    const filtered = allScreens.filter(screen => {
      const matchesFilter = currentFilter === 'all' || (screen.region && screen.region.toLowerCase().includes(currentFilter.toLowerCase()));
      const matchesSearch = !searchQuery || 
        screen.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (screen.address && screen.address.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (screen.region && screen.region.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesFilter && matchesSearch;
    });

    // Viloyatlar ro'yxatini to'plash
    const regions = ['all', ...new Set(allScreens.map(s => s.region).filter(Boolean))];

    wrapper.innerHTML = `
      <!-- Seksiyaning zamonaviy responsiv sarlavhasi -->
      <div class="ledzona-section-header">
        <div class="ledzona-section-badge">
          <span class="pulse-dot"></span>
          <span>O‘ZBEKISTON HUDUDLARI</span>
        </div>
        <h2 class="ledzona-section-title">Mavjud LED Ekranlar</h2>
        <p class="ledzona-section-subtitle">Ayni paytda faol va reklama joylashtirish uchun ochiq bo‘lgan yirik tashqi ekranlar katalogi</p>
      </div>

      <!-- Toolbar: Qidiruv, Filter va Hisoblagich -->
      <div class="ledzona-toolbar">
        <div class="ledzona-search-box">
          <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" id="ledzona-search-input" placeholder="Ekran nomi yoki manzil bo‘yicha qidiruv..." value="${escapeHtml(searchQuery)}">
        </div>

        <div class="ledzona-count-badge">
          <span class="pulse-dot"></span>
          <span>Jami: ${filtered.length} ta faol ekran</span>
        </div>

        <div class="ledzona-filter-pills" id="ledzona-pills-box">
          ${regions.slice(0, 8).map(reg => `
            <button type="button" class="ledzona-pill-btn ${currentFilter === reg ? 'active' : ''}" data-region="${reg}">
              ${reg === 'all' ? 'Barchasi' : reg.replace(' viloyati', '').replace(' Respublikasi', '')}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Kartochkalar paneli -->
      <div class="ledzona-cards-container">
        ${filtered.length === 0 ? `
          <div class="ledzona-empty-state">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h4 style="color:#fff; font-size:17px; margin:0 0 6px 0;">Hech qanday ekran topilmadi</h4>
            <p style="margin:0; font-size:14px;">Boshqa so‘z bilan qidiring yoki filtrlarni tozalang</p>
          </div>
        ` : filtered.map(screen => {
          const locationText = [screen.region, screen.address].filter(Boolean).join(', ');
          const telegramMessage = encodeURIComponent(`Assalomu alaykum! Men "${screen.name}" ekrani bo'yicha reklama joylashtirmoqchiman.`);
          return `
            <div class="led-screen-card" data-id="${screen.id}">
              <div class="led-screen-card__img-box">
                <span class="led-screen-card__badge-region">📍 ${escapeHtml(screen.region || 'O‘zbekiston')}</span>
                <span class="led-screen-card__badge-live">Efirda</span>
                <img class="led-screen-card__img" src="${screen.imageUrl}" alt="${escapeHtml(screen.name)}" onerror="this.src='./ledzona_files/AB6AXuApGaUgZtrFcE--.png.webp'">
              </div>
              <div class="led-screen-card__content">
                <h3 class="led-screen-card__title">${escapeHtml(screen.name)}</h3>
                <p class="led-screen-card__location">
                  <svg viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" /></svg>
                  <span>${escapeHtml(locationText)}</span>
                </p>
                ${screen.description ? `
                  <div class="led-screen-card__desc-box">
                    <p class="led-screen-card__desc-text">${escapeHtml(screen.description)}</p>
                  </div>
                ` : ''}
                <a href="https://t.me/Ulug_2400?text=${telegramMessage}" target="_blank" class="led-screen-card__action-btn">
                  <span>Reklama joylashtirish</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Qidiruv inputiga hodisa ulash
    const searchInput = document.getElementById('ledzona-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderScreens();
        const el = document.getElementById('ledzona-search-input');
        if (el) {
          el.focus();
          el.setSelectionRange(el.value.length, el.value.length);
        }
      });
    }

    // Filter tugmalariga hodisa ulash
    const pillsBox = document.getElementById('ledzona-pills-box');
    if (pillsBox) {
      pillsBox.querySelectorAll('.ledzona-pill-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          currentFilter = btn.getAttribute('data-region');
          renderScreens();
        });
      });
    }
  }

  // 3. Zamonaviy Drag-and-Drop fayl yuklash zonasi
  function setupModernDropzone(form) {
    const uploadGroup = form.querySelector('.t-input-group_uw');
    if (!uploadGroup) return;

    const inputBlock = uploadGroup.querySelector('.t-input-block');
    if (!inputBlock) return;

    let fileInput = form.querySelector('#ledzona-file-input');
    if (!fileInput) {
      fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.id = 'ledzona-file-input';
      fileInput.accept = 'image/*';
      fileInput.style.display = 'none';
      form.appendChild(fileInput);
    }

    inputBlock.innerHTML = `
      <div class="ledzona-dropzone" id="ledzona-dropzone">
        <div class="ledzona-dropzone__empty" id="dropzone-empty-state">
          <div class="ledzona-dropzone__icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          </div>
          <div class="ledzona-dropzone__text">
            <span>Rasm tanlash uchun bosing</span> yoki faylni bu yerga tashlang
          </div>
          <div class="ledzona-dropzone__sub">PNG, JPG, WEBP formatlar (maks. 15 MB)</div>
        </div>

        <div class="ledzona-dropzone__preview" id="dropzone-preview-state">
          <img class="ledzona-dropzone__thumb" id="dropzone-thumb" src="" alt="Ko‘rinish">
          <div class="ledzona-dropzone__info">
            <div class="ledzona-dropzone__name" id="dropzone-filename">rasm.png</div>
            <div class="ledzona-dropzone__size" id="dropzone-filesize">Tayyor ✅</div>
          </div>
          <button type="button" class="ledzona-dropzone__remove" id="dropzone-remove-btn" title="O‘chirish">✕</button>
        </div>
      </div>
    `;

    const dropzone = document.getElementById('ledzona-dropzone');
    const emptyState = document.getElementById('dropzone-empty-state');
    const previewState = document.getElementById('dropzone-preview-state');
    const thumb = document.getElementById('dropzone-thumb');
    const filenameEl = document.getElementById('dropzone-filename');
    const removeBtn = document.getElementById('dropzone-remove-btn');

    function handleFile(file) {
      if (!file || !file.type.startsWith('image/')) {
        showToast('Iltimos, rasm formatidagi fayl tanlang!', true);
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        thumb.src = e.target.result;
        let displayName = file.name;
        if (displayName.length > 28) {
          displayName = displayName.substring(0, 16) + '...' + displayName.slice(-8);
        }
        filenameEl.textContent = displayName;
        filenameEl.title = file.name;
        emptyState.style.display = 'none';
        previewState.classList.add('active');
      };
      reader.readAsDataURL(file);
    }

    dropzone.addEventListener('click', (e) => {
      if (e.target.closest('#dropzone-remove-btn')) return;
      fileInput.click();
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files[0]) {
        handleFile(fileInput.files[0]);
      }
    });

    // Drag and Drop
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });
    dropzone.addEventListener('dragleave', () => {
      dropzone.classList.remove('dragover');
    });
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        fileInput.files = e.dataTransfer.files;
        handleFile(e.dataTransfer.files[0]);
      }
    });

    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      fileInput.value = '';
      thumb.src = '';
      previewState.classList.remove('active');
      emptyState.style.display = 'block';
    });
  }

  // 4. Formani to'liq sozlash
  function setupForm() {
    const form = document.getElementById('form5136870403') || document.querySelector('form');
    if (!form) return;

    // Form ichiga chiroyli sarlavha panelini joylashtirish
    let formHeader = form.querySelector('.ledzona-form-card-header');
    if (!formHeader) {
      formHeader = document.createElement('div');
      formHeader.className = 'ledzona-form-card-header';
      formHeader.innerHTML = `
        <div class="ledzona-form-card-badge">PLATFORMA BO‘YICHA ARIZA</div>
        <h3 class="ledzona-form-card-title">Ekran ma’lumotlari</h3>
      `;
      form.prepend(formHeader);
    }

    setupModernDropzone(form);

    const submitBtn = form.querySelector('button.t-submit') || form.querySelector('button');
    if (submitBtn) {
      submitBtn.type = 'button';

      // Pastiga ishonch nishonini qo'shish
      let trustBadge = form.querySelector('.ledzona-form-trust');
      if (!trustBadge && submitBtn.parentNode) {
        trustBadge = document.createElement('div');
        trustBadge.className = 'ledzona-form-trust';
        trustBadge.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor" style="width: 15px; height: 15px; min-width: 15px; min-height: 15px; flex-shrink: 0;"><path fill-rule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clip-rule="evenodd" /></svg>
          <span>Ma'lumotlar platforma moderatsiyasidan so'ng efirga chiqariladi</span>
        `;
        submitBtn.parentNode.appendChild(trustBadge);
      }

      submitBtn.onclick = async function (e) {
        e.preventDefault();
        e.stopPropagation();

        const nameInput = form.querySelector('input[name="Name"]');
        const regionSelect = form.querySelector('select[name="Name_2"]');
        const addressInput = form.querySelector('input[name="Name_3"]');
        const descInput = form.querySelector('textarea[name="Qo‘shimcha ma’lumot"]');
        const fileInput = form.querySelector('#ledzona-file-input');
        const submitBtnSpan = submitBtn.querySelector('.t-submit__text') || submitBtn;

        const nameVal = nameInput ? nameInput.value.trim() : '';
        const regionVal = regionSelect ? regionSelect.value.trim() : '';
        const addressVal = addressInput ? addressInput.value.trim() : '';
        const descVal = descInput ? descInput.value.trim() : '';

        if (!nameVal) {
          showToast('Iltimos, ekran nomini kiriting!', true);
          if (nameInput) nameInput.focus();
          return;
        }
        if (!regionVal) {
          showToast('Iltimos, viloyatni tanlang!', true);
          if (regionSelect) regionSelect.focus();
          return;
        }
        if (!addressVal) {
          showToast('Iltimos, aniq manzilni kiriting!', true);
          if (addressInput) addressInput.focus();
          return;
        }

        const formData = new FormData();
        formData.append('name', nameVal);
        formData.append('region', regionVal);
        formData.append('address', addressVal);
        formData.append('description', descVal);

        if (fileInput && fileInput.files && fileInput.files[0]) {
          formData.append('image', fileInput.files[0]);
        }

        const originalText = submitBtnSpan.textContent;
        submitBtnSpan.textContent = 'Saqlanmoqda...';
        submitBtn.disabled = true;

        try {
          const res = await fetch('/api/screens', {
            method: 'POST',
            body: formData
          });
          const result = await res.json();

          if (res.ok && result.success) {
            showToast(result.message || 'Arizangiz qabul qilindi! Ma’lumotlar platforma moderatsiyasidan so‘ng efirga chiqariladi.');
            form.reset();
            const removeBtn = document.getElementById('dropzone-remove-btn');
            if (removeBtn) removeBtn.click();

            // Ekranlarni yangilash (agar biror o'zgarish bo'lsa)
            await fetchScreensData();
          } else {
            showToast(result.message || 'Xatolik yuz berdi', true);
          }
        } catch (err) {
          showToast('Serverga ulanishda xatolik yuz berdi!', true);
        } finally {
          submitBtnSpan.textContent = originalText;
          submitBtn.disabled = false;
        }
      };
    }
  }

  // 5. Desktop va Mobil Menyu uchun Smooth Navigation
  function setupNavigation() {
    const navMap = [
      { text: 'LED ekranlar', target: '#rec5153177603' },
      { text: 'Biz haqimizda', target: '#rec4809365303' },
      { text: 'Qanday ishlaydi?', target: '#rec4795294703' },
      { text: 'Aloqa', target: '#rec4848266503' },
      { text: 'Reklama joylashtirish', target: '#rec5136870403' },
      { text: 'Bosh sahifa', top: true }
    ];

    document.querySelectorAll('.tn-atom, .t-menu__link-item, a').forEach(el => {
      const txt = el.textContent.trim();
      const match = navMap.find(item => item.text.toLowerCase() === txt.toLowerCase());
      if (match) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', (e) => {
          e.preventDefault();

          // Agar mobil menyu ochiq bo'lsa, uni yopish
          const closePopupBtn = document.querySelector('.t-popup__close, .t-menuburger');
          if (closePopupBtn && document.querySelector('.t-popup_show')) {
            closePopupBtn.click();
          }

          if (match.top) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            const targetEl = document.querySelector(match.target);
            if (targetEl) {
              targetEl.scrollIntoView({ behavior: 'smooth' });
            }
          }
        });
      }
    });

    // Qahramon banneridagi barcha tugmalar
    document.querySelectorAll('.tn-atom, a').forEach(el => {
      if (el.textContent.includes('LED ekranlarni ko‘rish')) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.getElementById('rec5153177603');
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
      }
    });
  }

  // 6. Floating "Yuqoriga qaytish" tugmasi
  function setupScrollToTop() {
    let btn = document.getElementById('ledzona-scroll-top-btn');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'ledzona-scroll-top-btn';
      btn.className = 'ledzona-scroll-top';
      btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
      btn.title = 'Yuqoriga qaytish';
      document.body.appendChild(btn);

      btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
          btn.classList.add('visible');
        } else {
          btn.classList.remove('visible');
        }
      });
    }
  }

  // 7. Yangilangan zamonaviy Footer
  function setupFooter() {
    let footer = document.getElementById('custom-ledzona-footer');
    if (!footer) {
      footer = document.createElement('footer');
      footer.id = 'custom-ledzona-footer';
      footer.className = 'custom-ledzona-footer';
      footer.innerHTML = `
        <div class="footer-brand">LED<span>ZONE</span></div>
        <p style="margin: 0 0 10px 0; color: #94a3b8; font-size: 14px;">O‘zbekiston bo‘ylab eng yirik tashqi LED ekranlar tarmog‘i va reklama platformasi.</p>
        <p style="margin: 0 0 12px 0; font-size: 14px;">Bog‘lanish: <a href="https://t.me/Ulug_2400" target="_blank">@Ulug_2400</a> &bull; <a href="tel:+998918012400">+998 91 801 24 00</a></p>
        <p style="margin: 0; font-size: 13px; color: #475569;">&copy; ${new Date().getFullYear()} LEDZONE. Barcha huquqlar himoyalangan.</p>
      `;
      document.body.appendChild(footer);
    }
  }

  // 8. Silliq Scroll Animatsiyalari (Intersection Observer) va Header effekti
  function setupScrollAnimations() {
    const header = document.getElementById('rec4758242503');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        if (header) header.classList.add('lz-scrolled');
      } else {
        if (header) header.classList.remove('lz-scrolled');
      }
    }, { passive: true });

    const sections = document.querySelectorAll('.r.t-rec');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('lz-revealed');
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.05,
        rootMargin: '0px 0px -30px 0px'
      });

      sections.forEach(sec => observer.observe(sec));
    } else {
      sections.forEach(sec => sec.classList.add('lz-revealed'));
    }
  }

  // 8. FAQ Accordion Dropdown
  function setupFaqAccordion() {
    const faqRec = document.getElementById('rec4848042303');
    if (!faqRec) return;

    const artboard = faqRec.querySelector('.t396__artboard');
    if (!artboard) return;

    // Tekshirish: agar oldin qo'shilgan bo'lsa qayta qo'shmaslik
    if (artboard.querySelector('.lz-faq-accordion')) return;

    const faqData = [
      {
        question: "Reklama joylashtirish qancha turadi?",
        answer: "Narxlar LED ekranning joylashuvi, o‘lchami va namoyish davomiyligiga qarab belgilanadi. Ulug‘bek har bir so‘rov bo‘yicha optimal taklifni shakllantiradi va ekran egasidan to‘g‘ridan-to‘g‘ri eng maqbul shartlarni olib beradi."
      },
      {
        question: "Qanday reklama videosini yuborish kerak?",
        answer: "Telegram orqali yuborishingiz mumkin, keyin siz bilan mutaxassislarimiz bog'lanib barcha texnik talablar va formatlarni tasdiqlashadi."
      },
      {
        question: "LED ekran qayerda joylashganini qanday bilaman?",
        answer: "Siz bizga Telegram orqali reklamangizni qayerga qo'ymoqchi ekanligingizni aytasiz (misol uchun Toshkent, Andijon shahar yoki boshqa bir viloyat) keyin biz sizga aynan mos lokatsiyalardagi LED ekranlarni ko'rsatamiz."
      }
    ];

    const accordion = document.createElement('div');
    accordion.className = 'lz-faq-accordion';

    faqData.forEach((item, index) => {
      const itemEl = document.createElement('div');
      // 1-savol boshlanishida ochiq (open) turadi
      itemEl.className = 'lz-faq-item' + (index === 0 ? ' lz-open' : '');

      itemEl.innerHTML = `
        <button class="lz-faq-trigger" type="button" aria-expanded="${index === 0 ? 'true' : 'false'}">
          <span class="lz-faq-question">${item.question}</span>
          <span class="lz-faq-chevron">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </button>
        <div class="lz-faq-collapse">
          <div class="lz-faq-content">${item.answer}</div>
        </div>
      `;

      const trigger = itemEl.querySelector('.lz-faq-trigger');
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = itemEl.classList.contains('lz-open');

        // Boshqa barcha ochiq kartochkalarni yopish (Accordion tartibi)
        accordion.querySelectorAll('.lz-faq-item').forEach(other => {
          if (other !== itemEl) {
            other.classList.remove('lz-open');
            const otherBtn = other.querySelector('.lz-faq-trigger');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        if (isOpen) {
          itemEl.classList.remove('lz-open');
          trigger.setAttribute('aria-expanded', 'false');
        } else {
          itemEl.classList.add('lz-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });

      accordion.appendChild(itemEl);
    });

    artboard.appendChild(accordion);
  }

  // Boshlang'ich initsializatsiya
  function init() {
    injectStyles();
    fetchScreensData();
    setupForm();
    setupNavigation();
    setupFaqAccordion();
    setupScrollToTop();
    setupFooter();
    setupScrollAnimations();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
