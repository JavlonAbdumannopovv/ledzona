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

      
      /* ==========================================
         LEDZONE ZAMONAVIY MOBIL HAMBURGER VA MENYU
         ========================================== */
      .ledzona-burger-btn {
        display: none;
        position: fixed;
        top: 13px;
        right: 16px;
        width: 40px;
        height: 40px;
        background: rgba(15, 23, 42, 0.9);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 10px;
        cursor: pointer;
        z-index: 10002;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
        padding: 0;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        transition: all 0.25s ease;
      }
      .ledzona-burger-btn span {
        display: block;
        width: 20px;
        height: 2px;
        background: #10b981;
        border-radius: 2px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        transform-origin: center;
      }
      .ledzona-burger-btn.active span:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
        background: #ef4444;
      }
      .ledzona-burger-btn.active span:nth-child(2) {
        opacity: 0;
        transform: scaleX(0);
      }
      .ledzona-burger-btn.active span:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
        background: #ef4444;
      }

      .ledzona-mobile-nav-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.75);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        z-index: 10000;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
      }
      .ledzona-mobile-nav-backdrop.open {
        opacity: 1;
        visibility: visible;
      }

      .ledzona-mobile-nav-drawer {
        position: fixed;
        top: 0;
        right: -320px;
        width: 290px;
        max-width: 82vw;
        height: 100vh;
        height: 100dvh;
        background: #090e17;
        border-left: 1px solid rgba(255, 255, 255, 0.1);
        z-index: 10001;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 22px 18px;
        box-sizing: border-box;
        box-shadow: -10px 0 30px rgba(0, 0, 0, 0.85);
        transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        overflow-y: auto;
      }
      .ledzona-mobile-nav-drawer.open {
        transform: translateX(-320px);
      }

      .ledzona-mobile-nav-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }
      .ledzona-mobile-nav-logo {
        font-size: 19px;
        font-weight: 800;
        color: #ffffff;
        letter-spacing: 1px;
      }
      .ledzona-mobile-nav-logo span {
        color: #10b981;
      }

      .ledzona-mobile-nav-links {
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin: 18px 0;
      }
      .ledzona-mobile-nav-link {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 14px;
        color: #e2e8f0;
        font-size: 14.5px;
        font-weight: 500;
        text-decoration: none;
        border-radius: 10px;
        transition: background 0.2s, color 0.2s;
        cursor: pointer;
      }
      .ledzona-mobile-nav-link:hover,
      .ledzona-mobile-nav-link:active {
        background: rgba(16, 185, 129, 0.12);
        color: #10b981;
      }
      .ledzona-mobile-nav-link svg {
        width: 18px;
        height: 18px;
        stroke: #10b981;
        fill: none;
        flex-shrink: 0;
      }

      .ledzona-mobile-nav-footer {
        padding-top: 18px;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .ledzona-mobile-nav-phone {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #ffffff;
        font-size: 14px;
        font-weight: 600;
        text-decoration: none;
      }
      .ledzona-mobile-nav-phone svg {
        width: 16px;
        height: 16px;
        stroke: #10b981;
        fill: none;
      }
      .ledzona-mobile-nav-cta {
        display: block;
        width: 100%;
        text-align: center;
        background: #10b981;
        color: #051a14;
        font-weight: 700;
        font-size: 14px;
        padding: 12px;
        border-radius: 10px;
        text-decoration: none;
        box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        box-sizing: border-box;
      }

      @media screen and (max-width: 960px) {
        .ledzona-burger-btn {
          display: flex !important;
        }
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
          padding: 12px;
          gap: 12px;
        }
        .ledzona-search-box {
          min-width: 0 !important;
          width: 100% !important;
        }
      }
      @media screen and (max-width: 480px) {
        .ledzona-screens-wrapper {
          padding: 0 10px;
        }
        .ledzona-toolbar {
          padding: 10px;
          gap: 10px;
        }
        .ledzona-search-box input {
          font-size: 13px;
          padding: 0 12px 0 36px;
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
        width: 100%;
        box-sizing: border-box;
      }
      @media screen and (max-width: 768px) {
        .ledzona-filter-pills {
          overflow-x: visible;
          flex-wrap: wrap;
          padding-bottom: 6px;
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
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
        color: #34d399;
        background: rgba(16, 185, 129, 0.1);
        border: 1px solid rgba(16, 185, 129, 0.25);
        padding: 6px 12px;
        border-radius: 20px;
        font-weight: 600;
        box-sizing: border-box;
        max-width: 100%;
        width: fit-content;
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

      /* Mobil holatda: Zamonaviy gorizontal swipe (Slider/Karusel) */
      @media screen and (max-width: 768px) {
        .ledzona-cards-container {
          display: flex !important;
          flex-direction: row !important;
          overflow-x: auto !important;
          overflow-y: hidden !important;
          scroll-snap-type: x mandatory !important;
          -webkit-overflow-scrolling: touch !important;
          gap: 16px !important;
          padding: 8px 16px 20px 16px !important;
          margin: 0 -16px !important;
          width: calc(100% + 32px) !important;
          scrollbar-width: thin !important;
        }
        .ledzona-cards-container::-webkit-scrollbar {
          height: 5px;
          display: block !important;
        }
        .ledzona-cards-container::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.04);
          border-radius: 4px;
        }
        .ledzona-cards-container::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.45);
          border-radius: 4px;
        }
        .led-screen-card {
          flex: 0 0 285px !important;
          min-width: 285px !important;
          max-width: 285px !important;
          scroll-snap-align: center !important;
          box-sizing: border-box !important;
        }
      }

      /* Slider ko'rsatmasi (faqat mobilda) */
      .ledzona-slider-hint {
        display: none;
      }
      @media screen and (max-width: 768px) {
        .ledzona-slider-hint {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #10b981;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 14px;
          padding: 6px 14px;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.22);
          border-radius: 20px;
          width: fit-content;
          margin-left: auto;
          margin-right: auto;
        }
        .ledzona-slider-hint svg {
          width: 16px;
          height: 16px;
        }
      }

      /* Ko'proq LED ekranlar tugmasi (alohida screens.html pagega) */
      .ledzona-more-screens-box {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 36px;
        width: 100%;
      }
      .ledzona-more-screens-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: #ffffff !important;
        text-decoration: none !important;
        font-size: 15px;
        font-weight: 700;
        padding: 14px 34px;
        border-radius: 30px;
        box-shadow: 0 8px 24px rgba(16, 185, 129, 0.35);
        transition: all 0.25s ease;
        border: none;
        cursor: pointer;
      }
      .ledzona-more-screens-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 30px rgba(16, 185, 129, 0.5);
        background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
      }
      .ledzona-more-screens-btn svg {
        width: 18px;
        height: 18px;
        transition: transform 0.25s ease;
      }
      .ledzona-more-screens-btn:hover svg {
        transform: translateX(4px);
      }
      @media screen and (max-width: 768px) {
        .ledzona-more-screens-box {
          margin-top: 24px;
        }
        .ledzona-more-screens-btn {
          width: 100%;
          padding: 14px 20px;
          font-size: 14px;
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

      /* Multi-rasm slayder tugmalari */
      .led-screen-card__arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: rgba(7, 10, 16, 0.8);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: #fff;
        font-size: 16px;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 4;
        transition: all 0.2s ease;
        padding: 0;
      }
      .led-screen-card__arrow:hover {
        background: #10b981;
        border-color: #10b981;
      }
      .led-screen-card__arrow.prev { left: 8px; }
      .led-screen-card__arrow.next { right: 8px; }

      .led-screen-card__dots {
        position: absolute;
        bottom: 8px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 5px;
        z-index: 4;
        background: rgba(7, 10, 16, 0.7);
        padding: 3px 7px;
        border-radius: 10px;
        backdrop-filter: blur(4px);
      }
      .led-screen-card__dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .led-screen-card__dot.active {
        background: #10b981;
        transform: scale(1.3);
      }
      .led-screen-card__count {
        position: absolute;
        bottom: 8px;
        right: 8px;
        background: rgba(7, 10, 16, 0.85);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: #fff;
        font-size: 11px;
        font-weight: 600;
        padding: 2px 7px;
        border-radius: 6px;
        z-index: 4;
        pointer-events: none;
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
        min-height: 1220px !important;
        padding-bottom: 90px !important;
      }
      #rec5136870403 .tn-elem[data-elem-id="1792924985228000003"] {
        display: none !important;
      }
      @media screen and (max-width: 640px) {
        #rec5136870403 .tn-elem[data-elem-id="1792926405257"] {
          width: calc(100vw - 32px) !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          max-width: 440px !important;
        }
        #rec5136870403 .tn-elem[data-elem-id="1792924985228000003"] {
          display: none !important;
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

      /* Ko'p rasmli (multi-upload, maks. 3 ta) dropzone uslublari */
      .ledzona-dropzone__list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 10px;
        width: 100%;
      }
      .ledzona-dropzone__item {
        display: flex;
        align-items: center;
        gap: 12px;
        background: rgba(18, 24, 38, 0.95);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        padding: 8px 12px;
        text-align: left;
        box-sizing: border-box;
      }
      .ledzona-dropzone__item-num {
        font-size: 11px;
        font-weight: 700;
        color: #10b981;
        background: rgba(16, 185, 129, 0.12);
        padding: 3px 7px;
        border-radius: 4px;
        flex-shrink: 0;
      }
      .ledzona-dropzone__item-thumb {
        width: 44px;
        height: 44px;
        min-width: 44px;
        border-radius: 6px;
        object-fit: cover;
        border: 1px solid rgba(255, 255, 255, 0.12);
        flex-shrink: 0;
      }
      .ledzona-dropzone__item-info {
        flex: 1 1 auto;
        min-width: 0;
      }
      .ledzona-dropzone__item-name {
        font-size: 13px;
        color: #ffffff;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .ledzona-dropzone__item-size {
        font-size: 11.5px;
        color: #34d399;
        margin-top: 2px;
      }
      .ledzona-dropzone__item-del {
        background: rgba(239, 68, 68, 0.15);
        color: #ef4444;
        border: none;
        width: 28px;
        height: 28px;
        min-width: 28px;
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        font-weight: bold;
        transition: all 0.2s;
        flex-shrink: 0;
      }
      .ledzona-dropzone__item-del:hover {
        background: #ef4444;
        color: #ffffff;
      }
      .ledzona-dropzone__add-more {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        background: rgba(16, 185, 129, 0.08);
        border: 1px dashed rgba(16, 185, 129, 0.4);
        color: #10b981;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 12.5px;
        font-weight: 600;
        margin-top: 10px;
        cursor: pointer;
        transition: all 0.2s;
      }
      .ledzona-dropzone__add-more:hover {
        background: rgba(16, 185, 129, 0.18);
        border-color: #10b981;
      }
      .led-screen-card__badge-multi {
        position: absolute;
        bottom: 12px;
        right: 12px;
        background: rgba(7, 10, 16, 0.85);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        color: #ffffff;
        font-size: 11px;
        font-weight: 700;
        padding: 3px 8px;
        border-radius: 6px;
        border: 1px solid rgba(255, 255, 255, 0.15);
        z-index: 2;
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
      const res = await fetch('/api/screens?_t=' + Date.now(), {
        cache: 'no-store',
        headers: {
          'Pragma': 'no-cache',
          'Cache-Control': 'no-cache'
        }
      });
      if (!res.ok) throw new Error('Ekranlarni yuklab bo‘lmadi');
      allScreens = await res.json();
      renderScreens();
    } catch (err) {
      console.error('Ekranlar yuklashda xatolik:', err);
    }
  }

  // Real vaqt rejimida admin paneldagi o'zgarishlarni qabul qilish va yangilash
  try {
    if (window.BroadcastChannel) {
      const bc = new BroadcastChannel('ledzona_sync_channel');
      bc.onmessage = (event) => {
        if (event.data && event.data.type === 'SCREENS_CHANGED') {
          fetchScreensData();
        }
      };
    }
  } catch (e) {}

  window.addEventListener('storage', (e) => {
    if (e.key === 'ledzona_screens_last_sync') {
      fetchScreensData();
    }
  });

  // Admin paneldan asosiy saytga o'tilganda (tab almashganda) darhol avtomatik yangilash
  window.addEventListener('focus', () => {
    fetchScreensData();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      fetchScreensData();
    }
  });

  window.ledzonaCardScreensMap = window.ledzonaCardScreensMap || {};
  window.setMainCardImg = function(id, idx) {
    const item = window.ledzonaCardScreensMap[id];
    if (!item) return;
    item.currentIndex = (idx + item.images.length) % item.images.length;
    const imgEl = document.getElementById('main-card-img-' + id);
    if (imgEl) imgEl.src = item.images[item.currentIndex];
    const countEl = document.getElementById('main-count-' + id);
    if (countEl) countEl.textContent = `📸 ${item.currentIndex + 1}/${item.images.length}`;
    const dotsEl = document.getElementById('main-dots-' + id);
    if (dotsEl) {
      dotsEl.querySelectorAll('.led-screen-card__dot').forEach((d, i) => {
        d.classList.toggle('active', i === item.currentIndex);
      });
    }
  };
  window.shiftMainCardImg = function(id, dir) {
    const item = window.ledzonaCardScreensMap[id];
    if (!item) return;
    window.setMainCardImg(id, item.currentIndex + dir);
  };

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

    // Bosh sahifada avvaliga faqat oxirgi 10 ta LED ekran ko'rsatiladi
    const displayedScreens = filtered.slice(0, 10);

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
          <input type="text" id="ledzona-search-input" placeholder="Ekran nomi yoki manzil qidiruvi..." value="${escapeHtml(searchQuery)}">
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

      <!-- Slider ko'rsatmasi (faqat mobil ekranda ko'rinadi) -->
      ${displayedScreens.length > 1 ? `
        <div class="ledzona-slider-hint">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          <span>Chapga / o‘ngga suring (10 ta eng yangi ekran)</span>
        </div>
      ` : ''}

      <!-- Kartochkalar paneli -->
      <div class="ledzona-cards-container">
        ${displayedScreens.length === 0 ? `
          <div class="ledzona-empty-state">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h4 style="color:#fff; font-size:17px; margin:0 0 6px 0;">Hech qanday ekran topilmadi</h4>
            <p style="margin:0; font-size:14px;">Boshqa so‘z bilan qidiring yoki filtrlarni tozalang</p>
          </div>
        ` : displayedScreens.map(screen => {
          const images = (Array.isArray(screen.images) && screen.images.length > 0)
            ? screen.images
            : (screen.imageUrl ? [screen.imageUrl] : ['./ledzona_files/AB6AXuApGaUgZtrFcE--.png.webp']);
          window.ledzonaCardScreensMap[screen.id] = { images, currentIndex: 0 };

          const locationText = [screen.region, screen.address].filter(Boolean).join(', ');
          const telegramMessage = encodeURIComponent(`Assalomu alaykum! Men "${screen.name}" ekrani bo'yicha reklama joylashtirmoqchiman.`);
          return `
            <div class="led-screen-card" data-id="${screen.id}">
              <div class="led-screen-card__img-box">
                <span class="led-screen-card__badge-region">📍 ${escapeHtml(screen.region || 'O‘zbekiston')}</span>
                <span class="led-screen-card__badge-live">Efirda</span>
                <img id="main-card-img-${screen.id}" class="led-screen-card__img" src="${images[0]}" alt="${escapeHtml(screen.name)}" onerror="this.src='./ledzona_files/AB6AXuApGaUgZtrFcE--.png.webp'">
                ${images.length > 1 ? `
                  <button type="button" class="led-screen-card__arrow prev" onclick="event.stopPropagation(); window.shiftMainCardImg('${screen.id}', -1)" title="Oldingi rasm">‹</button>
                  <button type="button" class="led-screen-card__arrow next" onclick="event.stopPropagation(); window.shiftMainCardImg('${screen.id}', 1)" title="Keyingi rasm">›</button>
                  <div class="led-screen-card__dots" id="main-dots-${screen.id}">
                    ${images.map((_, i) => `<span class="led-screen-card__dot ${i === 0 ? 'active' : ''}" onclick="event.stopPropagation(); window.setMainCardImg('${screen.id}', ${i})"></span>`).join('')}
                  </div>
                  <span class="led-screen-card__count" id="main-count-${screen.id}">📸 1/${images.length}</span>
                ` : ''}
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

      <!-- Ko'proq LED ekranlar tugmasi (alohida screens.html sahifasiga yo'naltiradi) -->
      <div class="ledzona-more-screens-box">
        <a href="/screens.html" class="ledzona-more-screens-btn">
          <span>Ko‘proq LED ekranlar (${allScreens.length > 10 ? allScreens.length + ' ta' : 'Barchasi'})</span>
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </a>
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

  // 3. Zamonaviy Drag-and-Drop fayl yuklash zonasi (Maksimal 3 tagacha rasm)
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
      fileInput.multiple = true;
      fileInput.style.display = 'none';
      form.appendChild(fileInput);
    } else {
      fileInput.multiple = true;
    }

    let selectedFiles = []; // 3 tagacha tanlangan rasmlar

    inputBlock.innerHTML = `
      <div class="ledzona-dropzone" id="ledzona-dropzone">
        <div class="ledzona-dropzone__empty" id="dropzone-empty-state">
          <div class="ledzona-dropzone__icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          </div>
          <div class="ledzona-dropzone__text">
            <span>Rasm tanlash uchun bosing</span> yoki faylni bu yerga tashlang
          </div>
          <div class="ledzona-dropzone__sub">3 tagacha rasm yuklashingiz mumkin (PNG, JPG, WEBP, maks. 4MB)</div>
        </div>

        <div id="dropzone-list-container" style="display: none; width: 100%;">
          <div class="ledzona-dropzone__list" id="dropzone-files-list"></div>
          <div style="text-align: center; margin-top: 8px;">
            <button type="button" class="ledzona-dropzone__add-more" id="dropzone-add-more-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              <span id="dropzone-add-more-text">+ Yana rasm qo‘shish</span>
            </button>
          </div>
        </div>
      </div>
    `;

    const dropzone = document.getElementById('ledzona-dropzone');
    const emptyState = document.getElementById('dropzone-empty-state');
    const listContainer = document.getElementById('dropzone-list-container');
    const filesList = document.getElementById('dropzone-files-list');
    const addMoreBtn = document.getElementById('dropzone-add-more-btn');
    const addMoreText = document.getElementById('dropzone-add-more-text');

    function renderFilesList() {
      if (selectedFiles.length === 0) {
        emptyState.style.display = 'block';
        listContainer.style.display = 'none';
        return;
      }

      emptyState.style.display = 'none';
      listContainer.style.display = 'block';

      filesList.innerHTML = selectedFiles.map((file, idx) => {
        let displayName = file.name;
        if (displayName.length > 26) {
          displayName = displayName.substring(0, 15) + '...' + displayName.slice(-7);
        }
        const sizeKb = (file.size / 1024).toFixed(0);
        const objUrl = URL.createObjectURL(file);

        return `
          <div class="ledzona-dropzone__item">
            <span class="ledzona-dropzone__item-num">#${idx + 1}</span>
            <img class="ledzona-dropzone__item-thumb" src="${objUrl}" alt="${escapeHtml(file.name)}">
            <div class="ledzona-dropzone__item-info">
              <div class="ledzona-dropzone__item-name" title="${escapeHtml(file.name)}">${escapeHtml(displayName)}</div>
              <div class="ledzona-dropzone__item-size">${sizeKb} KB • Tayyor ✅</div>
            </div>
            <button type="button" class="ledzona-dropzone__item-del" data-index="${idx}" title="O‘chirish">✕</button>
          </div>
        `;
      }).join('');

      // O'chirish tugmalariga hodisa ulash
      filesList.querySelectorAll('.ledzona-dropzone__item-del').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const removeIdx = parseInt(btn.getAttribute('data-index'), 10);
          selectedFiles.splice(removeIdx, 1);
          renderFilesList();
        });
      });

      // Agar 3 ta to'lgan bo'lsa "Yana qo'shish" tugmasini yashirish
      if (selectedFiles.length >= 3) {
        addMoreBtn.style.display = 'none';
      } else {
        addMoreBtn.style.display = 'inline-flex';
        addMoreText.textContent = `+ Yana rasm qo‘shish (${selectedFiles.length}/3)`;
      }
    }

    function addFiles(newFiles) {
      if (!newFiles || newFiles.length === 0) return;
      for (let i = 0; i < newFiles.length; i++) {
        const file = newFiles[i];
        if (selectedFiles.length >= 3) {
          showToast('Maksimal 3 tagacha rasm yuklashingiz mumkin!', true);
          break;
        }
        if (!file.type || !file.type.startsWith('image/')) {
          showToast('Faqat rasm formatidagi fayllarni yuklash mumkin!', true);
          continue;
        }
        if (!selectedFiles.some(f => f.name === file.name && f.size === file.size)) {
          selectedFiles.push(file);
        }
      }
      renderFilesList();
    }

    dropzone.addEventListener('click', (e) => {
      if (e.target.closest('.ledzona-dropzone__item-del')) return;
      if (selectedFiles.length >= 3) return;
      fileInput.click();
    });

    if (addMoreBtn) {
      addMoreBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (selectedFiles.length < 3) {
          fileInput.click();
        }
      });
    }

    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files.length > 0) {
        addFiles(Array.from(fileInput.files));
        fileInput.value = ''; // Har safar yangi tanlash uchun tozalash
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
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        addFiles(Array.from(e.dataTransfer.files));
      }
    });

    // Formaga biriktirish (submitda barcha tanlangan rasmlarni olish uchun)
    form.getSelectedFiles = () => selectedFiles;
    form.clearSelectedFiles = () => {
      selectedFiles = [];
      renderFilesList();
    };
  }

  // Rasmni yuborishdan oldin siqish (maks. 1920px, JPEG) — serverga tez va limitdan oshmay yetib boradi
  function compressImage(file, maxSide = 1920, quality = 0.85) {
    return new Promise((resolve) => {
      if (!file || !file.type || !file.type.startsWith('image/') || file.type === 'image/gif') {
        return resolve(file);
      }
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        let { width, height } = img;
        const scale = Math.min(1, maxSide / Math.max(width, height));
        width = Math.round(width * scale);
        height = Math.round(height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          if (!blob || (blob.size >= file.size && scale === 1)) return resolve(file);
          const baseName = (file.name || 'image').replace(/\.[^.]+$/, '');
          resolve(new File([blob], baseName + '.jpg', { type: 'image/jpeg' }));
        }, 'image/jpeg', quality);
      };
      img.onerror = () => { URL.revokeObjectURL(url); resolve(file); };
      img.src = url;
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

        const filesToUpload = (typeof form.getSelectedFiles === 'function' && form.getSelectedFiles().length > 0)
          ? form.getSelectedFiles()
          : (fileInput && fileInput.files && fileInput.files.length > 0 ? Array.from(fileInput.files) : []);

        for (let i = 0; i < filesToUpload.length; i++) {
          const prepared = await compressImage(filesToUpload[i]);
          formData.append('images', prepared, prepared.name || `image_${i + 1}.jpg`);
          if (i === 0) {
            formData.append('image', prepared, prepared.name || 'image.jpg');
          }
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
            if (typeof form.clearSelectedFiles === 'function') {
              form.clearSelectedFiles();
            }
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
  
  // ZAMONAVIY MOBIL HAMBURGER VA MENYU
  function setupMobileMenu() {
    if (document.getElementById('ledzona-burger-btn')) return;

    // 1. Burger tugmasini yaratish
    const burgerBtn = document.createElement('button');
    burgerBtn.id = 'ledzona-burger-btn';
    burgerBtn.className = 'ledzona-burger-btn';
    burgerBtn.setAttribute('aria-label', 'Menyu');
    burgerBtn.innerHTML = '<span></span><span></span><span></span>';

    // 2. Backdrop yaratish
    const backdrop = document.createElement('div');
    backdrop.id = 'ledzona-mobile-backdrop';
    backdrop.className = 'ledzona-mobile-nav-backdrop';

    // 3. Drawer yaratish
    const drawer = document.createElement('div');
    drawer.id = 'ledzona-mobile-drawer';
    drawer.className = 'ledzona-mobile-nav-drawer';
    drawer.innerHTML = `
      <div class="ledzona-mobile-nav-header">
        <div class="ledzona-mobile-nav-logo">LEDZONE<span>.UZ</span></div>
      </div>

      <nav class="ledzona-mobile-nav-links">
        <a class="ledzona-mobile-nav-link" data-target="#rec4760252103">
          <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          Bosh sahifa
        </a>
        <a class="ledzona-mobile-nav-link" data-target="#rec4795873503">
          <svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
          Qanday ishlaydi?
        </a>
        <a class="ledzona-mobile-nav-link" data-target="#rec5153177603">
          <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
          Mavjud LED ekranlar
        </a>
        <a class="ledzona-mobile-nav-link" data-target="#rec4809365303">
          <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
          Biz haqimizda
        </a>
        <a class="ledzona-mobile-nav-link" data-target="#rec4848042303">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          Ko‘p beriladigan savollar
        </a>
        <a class="ledzona-mobile-nav-link" data-target="#rec5136870403">
          <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          LED ekran qo‘shish
        </a>
      </nav>

      <div class="ledzona-mobile-nav-footer">
        <a href="tel:+998918012400" class="ledzona-mobile-nav-phone">
          <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          +998 91 801 24 00
        </a>
        <a class="ledzona-mobile-nav-cta" data-target="#rec5136870403">
          Reklama joylashtirish
        </a>
      </div>
    `;

    document.body.appendChild(burgerBtn);
    document.body.appendChild(backdrop);
    document.body.appendChild(drawer);

    function toggleMenu(open) {
      const isOpen = open !== undefined ? open : !drawer.classList.contains('open');
      burgerBtn.classList.toggle('active', isOpen);
      backdrop.classList.toggle('open', isOpen);
      drawer.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    burgerBtn.addEventListener('click', () => toggleMenu());
    backdrop.addEventListener('click', () => toggleMenu(false));

    drawer.querySelectorAll('[data-target]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSel = link.getAttribute('data-target');
        toggleMenu(false);
        const targetEl = document.querySelector(targetSel);
        if (targetEl) {
          const headerOffset = window.innerWidth <= 960 ? 64 : 81;
          const y = targetEl.getBoundingClientRect().top + window.pageYOffset - headerOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      });
    });
  }

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
              const headerOffset = window.innerWidth <= 960 ? 64 : 81;
              const y = targetEl.getBoundingClientRect().top + window.pageYOffset - headerOffset;
              window.scrollTo({ top: y, behavior: 'smooth' });
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
          if (target) {
            const headerOffset = window.innerWidth <= 960 ? 64 : 81;
            const y = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
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
        <p style="margin: 0 0 12px 0; font-size: 14px;">Bog‘lanish: <a href="https://t.me/Ulug_2400" target="_blank">Biz bilan bog‘lanish (Telegram)</a> &bull; <a href="tel:+998918012400">+998 91 801 24 00</a></p>
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
        answer: "Narxlar LED ekranning joylashuvi, o‘lchami va namoyish davomiyligiga qarab belgilanadi. Biz har bir so‘rov bo‘yicha optimal taklifni shakllantiramiz va ekran egasidan to‘g‘ridan-to‘g‘ri eng maqbul shartlarni olib beramiz."
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

  // 9. Barcha qurilmalarga (mobil, planshet, kompyuter) moslashuvni mukammallashtirish
  function setupResponsiveFixes() {
    function applyFixes() {
      const isMobile = window.innerWidth <= 768;

      // 1. Zoom xatolarini bartaraf etish (Android Chrome da matn va kartalar kattalashib ketmasligi uchun)
      if (isMobile) {
        document.querySelectorAll('.t396__elem').forEach(el => {
          if (el.style.zoom && parseFloat(el.style.zoom) > 1) {
            el.style.zoom = '1';
          }
        });
      }

      // 2. Gorizontal skrollni mutlaqo to'xtatish
      document.documentElement.style.overflowX = 'hidden';
      document.body.style.overflowX = 'hidden';

      // 3. Barcha bo'limlarni ko'rsatish
      document.querySelectorAll('.r.t-rec').forEach(r => r.classList.add('lz-revealed'));
    }

    applyFixes();
    window.addEventListener('resize', applyFixes);
    window.addEventListener('orientationchange', applyFixes);
    setTimeout(applyFixes, 200);
    setTimeout(applyFixes, 600);
    setTimeout(applyFixes, 1500);
  }

  // Boshlang'ich initsializatsiya
  
  // DIAGNOSTIC FOR ELEMENT CENTERING
  window.addEventListener('load', () => {
    setTimeout(() => {
      const vw = window.innerWidth;
      const vCenter = vw / 2;
      console.log('=== CHECKING ALIGNMENT FOR VW: ' + vw + ' ===');
      const allElems = document.querySelectorAll('.tn-elem, .r.t-rec, .t396__artboard, .led-screen-card, .custom-ledzona-footer');
      allElems.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden') return;
        
        const elCenter = rect.left + rect.width / 2;
        const diff = elCenter - vCenter;
        
        // If element extends beyond viewport on the right:
        if (rect.right > vw + 2) {
          console.log('[OVERFLOW RIGHT]', el.getAttribute('data-elem-id') || el.className, 'right:', rect.right, 'vw:', vw);
        }
        // If element is not centered (> 15px off center) and has block/card nature:
        if (Math.abs(diff) > 20 && (rect.width > vw * 0.6)) {
          console.log('[OFF-CENTER WIDE]', el.getAttribute('data-elem-id') || el.className, 'diff:', diff, 'left:', rect.left, 'width:', rect.width);
        }
      });
    }, 500);
  });

  function init() {
    injectStyles();
    fetchScreensData();
    setupForm();
    setupNavigation();
    setupMobileMenu();
    setupFaqAccordion();
    setupScrollToTop();
    setupFooter();
    setupScrollAnimations();
    setupResponsiveFixes();

    try {
      const sp = new URLSearchParams(window.location.search);
      const sc = sp.get('scroll');
      if (sc) window.scrollTo(0, parseInt(sc));
    } catch(e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
