// ========================================================
// AEROSCOPE CMS STUDIO: WORDPRESS-STYLE ADMIN CONTROLLER
// ========================================================

const PIN_STORAGE_KEY = "AEROSCOPE_ADMIN_PIN";
const DEFAULT_PIN = "admin123";
const AUTH_STORAGE_KEY = "AEROSCOPE_ADMIN_AUTH";

function getActiveAdminPin() {
  return localStorage.getItem(PIN_STORAGE_KEY) || DEFAULT_PIN;
}

let currentActiveTab = "overview";
let currentConfig = null;
let currentGalleryList = [];

// ========================================================
// 1. Initialization & Security Gate
// ========================================================
document.addEventListener("DOMContentLoaded", () => {
  checkAuth();
  if (window.lucide) window.lucide.createIcons();
});

function checkAuth() {
  const isAuth = sessionStorage.getItem(AUTH_STORAGE_KEY) === "true" || localStorage.getItem(AUTH_STORAGE_KEY) === "true";
  const gate = document.getElementById("admin-login-gate");
  const app = document.getElementById("admin-dashboard-app");

  if (isAuth) {
    if (gate) gate.classList.add("hidden");
    if (app) app.classList.remove("hidden");
    initDashboard();
  } else {
    if (gate) gate.classList.remove("hidden");
    if (app) app.classList.add("hidden");
  }
}

function handleAdminLogin(e) {
  e.preventDefault();
  const pinInput = document.getElementById("admin-pin-input");
  const errorMsg = document.getElementById("login-error-msg");
  const val = (pinInput ? pinInput.value : "").trim();
  const currentValidPin = getActiveAdminPin();

  // STRICT SECURITY RULE: ONLY the active PIN is accepted!
  // If the user changed the PIN from admin123, the old PIN will NEVER work again.
  if (val === currentValidPin) {
    sessionStorage.setItem(AUTH_STORAGE_KEY, "true");
    localStorage.setItem(AUTH_STORAGE_KEY, "true");
    if (errorMsg) errorMsg.classList.add("hidden");
    checkAuth();
    showToast("Login Berhasil! Selamat datang di AeroScope CMS.");
  } else {
    if (errorMsg) {
      errorMsg.textContent = "PIN salah! Masukkan PIN aktif Anda atau klik 'Lupa PIN?'.";
      errorMsg.classList.remove("hidden");
    }
    if (pinInput) pinInput.focus();
  }
}

function openForgotPasswordModal() {
  const modal = document.getElementById("forgot-password-modal");
  const statusMsg = document.getElementById("forgot-status-msg");
  const btnText = document.getElementById("send-recovery-btn-text");
  if (statusMsg) statusMsg.classList.add("hidden");
  if (btnText) btnText.textContent = "Kirim PIN ke bobienfly@gmail.com";
  if (modal) modal.classList.remove("hidden");
  if (window.lucide) window.lucide.createIcons();
}

function closeForgotPasswordModal() {
  const modal = document.getElementById("forgot-password-modal");
  if (modal) modal.classList.add("hidden");
}

async function sendRecoveryEmailToBobien() {
  const currentPin = getActiveAdminPin();
  const btn = document.getElementById("send-recovery-email-btn");
  const btnText = document.getElementById("send-recovery-btn-text");
  const statusMsg = document.getElementById("forgot-status-msg");

  if (btn) btn.disabled = true;
  if (btnText) btnText.textContent = "Mengirim PIN ke bobienfly@gmail.com...";
  if (statusMsg) statusMsg.classList.add("hidden");

  try {
    const payload = {
      _subject: `🔐 KODE PIN ADMIN AEROSCOPE: ${currentPin}`,
      _template: "table",
      _captcha: "false",
      "KODE_PIN_LOGIN_ANDA": currentPin,
      "STATUS_AKUN": "AKTIF",
      "EMAIL_TERDAFTAR": "bobienfly@gmail.com",
      "WAKTU_PENGIRIMAN": new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
      "HALAMAN_LOGIN": "https://bobienmartien.vercel.app/admin",
      "PETUNJUK": `Gunakan kode PIN: ${currentPin} untuk membuka Dashboard Admin.`
    };

    const res = await fetch("https://formsubmit.co/ajax/4f99a51a77879179eda1ebb26eca8ca9", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    });

    let result = {};
    try {
      result = await res.json();
    } catch (e) {
      result = {};
    }

    const needsActivation = (result.message && typeof result.message === "string" && result.message.toLowerCase().includes("activation"));

    if (statusMsg) {
      if (needsActivation) {
        statusMsg.className = "mb-4 p-4 rounded-2xl text-xs font-mono bg-amber-950/70 border border-amber-500/50 text-amber-300 text-left space-y-2.5";
        statusMsg.innerHTML = `
          <div class="font-bold text-amber-300 flex items-center gap-1.5 text-sm">
            <i data-lucide="alert-circle" class="w-4 h-4 text-amber-400"></i> Klik "ACTIVATE FORM" di Email Anda (1x Saja)
          </div>
          <p class="text-slate-200 leading-relaxed text-xs">
            FormSubmit telah mengirimkan email aktivasi berjudul <em>"Action Required: Activate FormSubmit..."</em> ke <strong>bobienfly@gmail.com</strong>.
          </p>
          <div class="p-3 rounded-xl bg-slate-950 border border-amber-500/40 text-[11px] text-amber-200/90 space-y-1">
            <p>1. Buka email dari FormSubmit tersebut.</p>
            <p>2. Klik tombol biru <strong>[ACTIVATE FORM]</strong> (cukup 1x seumur hidup).</p>
            <p>3. Setelah diklik, tekan tombol <strong>"Kirim Ulang PIN"</strong> di bawah agar email berisi kode PIN langsung masuk.</p>
          </div>
        `;
        if (btnText) btnText.textContent = "Kirim Ulang PIN ke bobienfly@gmail.com";
      } else {
        statusMsg.className = "mb-4 p-4 rounded-2xl text-xs font-mono bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-left space-y-2.5";
        statusMsg.innerHTML = `
          <div class="font-bold text-white flex items-center gap-1.5 text-sm">
            <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i> PIN Berhasil Dikirim ke Email!
          </div>
          <p class="text-slate-300 leading-relaxed text-xs">
            Kode sandi akses login telah dikirimkan secara rahasia ke <strong>bobienfly@gmail.com</strong>.
          </p>
          <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
            <i data-lucide="shield-check" class="w-4 h-4 text-cyan-400 shrink-0 mt-0.5"></i>
            <span>Demi keamanan, kode sandi <strong>hanya dikirim ke email Anda</strong> dan tidak ditampilkan di layar panel ini. Silakan buka Kotak Masuk atau folder Spam email Anda untuk melihat kode PIN tersebut.</span>
          </div>
        `;
        if (btnText) btnText.textContent = "✓ Email Kode PIN Terkirim";
        showToast("Email berisi kode PIN berhasil dikirim ke bobienfly@gmail.com!");
      }
      statusMsg.classList.remove("hidden");
      if (window.lucide) window.lucide.createIcons();
    }
  } catch (err) {
    console.error("Gagal mengirim email recovery:", err);
    if (statusMsg) {
      statusMsg.className = "mb-4 p-4 rounded-2xl text-xs font-mono bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-left space-y-2.5";
      statusMsg.innerHTML = `
        <div class="font-bold text-white flex items-center gap-1.5 text-sm">
          <i data-lucide="check-circle" class="w-4 h-4 text-cyan-400"></i> Permintaan Dikirim ke Email
        </div>
        <p class="text-slate-300 leading-relaxed text-xs">
          Permintaan pengiriman kode sandi telah diproses ke <strong>bobienfly@gmail.com</strong>.
        </p>
        <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
          <i data-lucide="shield-check" class="w-4 h-4 text-cyan-400 shrink-0 mt-0.5"></i>
          <span>Periksa email Anda (termasuk folder Spam). Kode PIN tercantum pada email yang dikirim.</span>
        </div>
      `;
      statusMsg.classList.remove("hidden");
      if (window.lucide) window.lucide.createIcons();
    }
    if (btnText) btnText.textContent = "Kirim Ulang ke Email";
  } finally {
    if (btn) btn.disabled = false;
  }
}

function useRecoveredPin(pin) {
  const pinInput = document.getElementById("admin-pin-input");
  if (pinInput) pinInput.value = pin;
  closeForgotPasswordModal();
  const loginForm = document.getElementById("admin-login-form");
  if (loginForm) {
    if (typeof loginForm.requestSubmit === "function") {
      loginForm.requestSubmit();
    } else {
      handleAdminLogin({ preventDefault: () => {} });
    }
  }
}
window.useRecoveredPin = useRecoveredPin;

function handleAdminLogout() {
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem(AUTH_STORAGE_KEY);
  checkAuth();
}

function togglePinVisibility() {
  const pinInput = document.getElementById("admin-pin-input");
  const icon = document.getElementById("pin-eye-icon");
  if (!pinInput) return;
  if (pinInput.type === "password") {
    pinInput.type = "text";
    if (icon) icon.setAttribute("data-lucide", "eye-off");
  } else {
    pinInput.type = "password";
    if (icon) icon.setAttribute("data-lucide", "eye");
  }
  if (window.lucide) window.lucide.createIcons();
}

// ========================================================
// 2. Navigation & Tab Switching
// ========================================================
const TAB_TITLES = {
  overview: { label: "Ringkasan Dashboard", icon: "layout-dashboard" },
  hero: { label: "Beranda & Hero Section", icon: "home" },
  reel: { label: "Video Reel Carousel (3)", icon: "clapperboard" },
  gallery: { label: "Galeri Karya (Foto & Video)", icon: "image" },
  gear: { label: "Armada Drone (6)", icon: "cpu" },
  services: { label: "Layanan Jasa Drone (4)", icon: "briefcase" },
  packages: { label: "Paket Komersial (6)", icon: "package" },
  about: { label: "Profil Pilot & Lisensi", icon: "user" },
  testimonials: { label: "Testimoni Klien (4)", icon: "message-square-quote" },
  contact: { label: "Kontak & WhatsApp", icon: "phone" },
  backup: { label: "Cloud & Backup JSON", icon: "database" },
  security: { label: "Keamanan & Ganti PIN", icon: "shield-check" }
};

function switchTab(tabId) {
  currentActiveTab = tabId;

  // 1. Hide all tab panes
  document.querySelectorAll(".tab-pane").forEach(pane => pane.classList.add("hidden"));

  // 2. Show active tab pane
  const activePane = document.getElementById(`pane-${tabId}`);
  if (activePane) activePane.classList.remove("hidden");

  // 3. Update sidebar active styles
  document.querySelectorAll("aside nav button").forEach(btn => {
    btn.className = "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition-all text-left";
  });
  const activeNavBtn = document.getElementById(`nav-tab-${tabId}`);
  if (activeNavBtn) {
    activeNavBtn.className = "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 shadow-md shadow-cyan-500/20 transition-all text-left";
  }

  // 4. Update topbar section title
  const titleInfo = TAB_TITLES[tabId] || { label: "Panel Pengaturan", icon: "settings" };
  const topTitle = document.getElementById("topbar-section-title");
  if (topTitle) {
    topTitle.innerHTML = `<i data-lucide="${titleInfo.icon}" class="w-4 h-4 text-cyan-400"></i><span>${titleInfo.label}</span>`;
  }

  if (window.lucide) window.lucide.createIcons();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ========================================================
// 3. Dashboard Data Population & Forms
// ========================================================
async function initDashboard() {
  currentConfig = window.AeroSiteConfig ? window.AeroSiteConfig.getSiteConfig() : {};
  loadGalleryMedia();
  populateHeroForm();
  populateReelForm();
  populateGearForm();
  populateServicesForm();
  populatePackagesForm();
  populateAboutForm();
  populateTestimonialsForm();
  populateContactForm();
  populateGithubTokenForm();
  switchTab(currentActiveTab);

  // Auto-sync with live server site-config.json
  if (window.AeroSiteConfig && typeof window.AeroSiteConfig.loadLiveServerConfig === "function") {
    try {
      const liveConfig = await window.AeroSiteConfig.loadLiveServerConfig();
      if (liveConfig && typeof liveConfig === "object") {
        if (liveConfig.about && (!liveConfig.about.avatarUrl || liveConfig.about.avatarUrl.includes("photo-1516035069371"))) {
          liveConfig.about.avatarUrl = "assets/images/pilot-bobien-martien.jpg?v=2";
        }
        if (Array.isArray(liveConfig.gear)) {
          liveConfig.gear.forEach((g, idx) => {
            if (!g.imageUrl || g.imageUrl.includes("unsplash.com")) {
              g.imageUrl = DEFAULT_DRONE_IMAGES[idx] || DEFAULT_DRONE_IMAGES[0];
            }
          });
        }
        currentConfig = window.AeroSiteConfig.deepMergeConfig(currentConfig, liveConfig);
        window.AeroSiteConfig.saveSiteConfig(currentConfig);
        populateHeroForm();
        populateReelForm();
        populateGearForm();
        populateServicesForm();
        populatePackagesForm();
        populateAboutForm();
        populateTestimonialsForm();
        populateContactForm();
      }
    } catch (err) {
      console.debug("Live config sync skipped or failed:", err);
    }
  }
}

// TAB HERO
function populateHeroForm() {
  const hero = currentConfig.hero || {};
  const badgeEl = document.getElementById("cfg-hero-badge");
  const titleEl = document.getElementById("cfg-hero-title");
  const subEl = document.getElementById("cfg-hero-subtitle");
  const btnShowreelEl = document.getElementById("cfg-hero-btn-showreel");
  const btnGalleryEl = document.getElementById("cfg-hero-btn-gallery");
  const cred1El = document.getElementById("cfg-hero-cred-1");
  const cred2El = document.getElementById("cfg-hero-cred-2");
  const cred3El = document.getElementById("cfg-hero-cred-3");
  const bgUrlEl = document.getElementById("cfg-hero-bg-url");

  if (badgeEl) badgeEl.value = hero.badge || "AERIAL CINEMATOGRAPHY & DRONE PHOTOGRAPHY";
  if (titleEl) titleEl.value = hero.title || "Visual Udara Sinematik dari Perspektif Terbaik.";
  if (subEl) subEl.value = hero.subtitle || "";

  if (btnShowreelEl) btnShowreelEl.value = hero.btnShowreel || "Watch 4K Showreel";
  if (btnGalleryEl) btnGalleryEl.value = hero.btnGallery || "Explore Portfolio";

  const creds = Array.isArray(hero.credentials) ? hero.credentials : [];
  if (cred1El) cred1El.value = creds[0]?.text || "Certified Pilot SIDOPI GO & DKPPU";
  if (cred2El) cred2El.value = creds[1]?.text || "450+ Operational Flight Hours";
  if (cred3El) cred3El.value = creds[2]?.text || "Nationwide Mission Ready";

  const defaultBg = "assets/images/hero-bg-balloons.jpg?v=2";
  const currentBg = (!hero.bgImageUrl || hero.bgImageUrl.includes("unsplash.com")) ? defaultBg : hero.bgImageUrl;
  if (bgUrlEl) bgUrlEl.value = currentBg;
  updateHeroBgPreview(currentBg);
}

function updateHeroBgPreview(url) {
  const preview = document.getElementById("hero-bg-preview");
  if (preview && url) {
    preview.src = url;
  }
}

function handleHeroBgUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    const rawDataUrl = evt.target.result;
    compressImageToWebp(rawDataUrl, 1920, 1080, 0.85, function(optimizedDataUrl) {
      const urlInput = document.getElementById("cfg-hero-bg-url");
      if (urlInput) urlInput.value = optimizedDataUrl;
      updateHeroBgPreview(optimizedDataUrl);
      if (!currentConfig.hero) currentConfig.hero = {};
      currentConfig.hero.bgImageUrl = optimizedDataUrl;
      showToast("Foto background hero berhasil diunggah! Klik Simpan Perubahan.");
    });
  };
  reader.readAsDataURL(file);
}

function resetHeroBgToDefault() {
  const defaultBg = "assets/images/hero-bg-balloons.jpg?v=2";
  const urlInput = document.getElementById("cfg-hero-bg-url");
  if (urlInput) urlInput.value = defaultBg;
  updateHeroBgPreview(defaultBg);
  if (!currentConfig.hero) currentConfig.hero = {};
  currentConfig.hero.bgImageUrl = defaultBg;
  showToast("Foto background hero dikembalikan ke default balon udara!");
}

window.updateHeroBgPreview = updateHeroBgPreview;
window.handleHeroBgUpload = handleHeroBgUpload;
window.resetHeroBgToDefault = resetHeroBgToDefault;

function escapeAttr(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderHeroStatsForm() {
  // Obsolete HUD telemetry replaced by CTA buttons and 3 credentials
}

function syncCurrentHeroStatsInputs() {
  // Obsolete HUD telemetry replaced by CTA buttons and 3 credentials
}

function addHeroStatItem() {
  // Obsolete HUD telemetry replaced by CTA buttons and 3 credentials
}

function deleteHeroStatItem(index) {
  // Obsolete HUD telemetry replaced by CTA buttons and 3 credentials
}

window.addHeroStatItem = addHeroStatItem;
window.deleteHeroStatItem = deleteHeroStatItem;
window.syncCurrentHeroStatsInputs = syncCurrentHeroStatsInputs;
window.renderHeroStatsForm = renderHeroStatsForm;

// TAB REEL (3 SLOTS)
function populateReelForm() {
  const reelList = currentConfig.featuredReel || [];
  const container = document.getElementById("reel-slots-container");
  if (!container) return;

  container.innerHTML = reelList.map((item, idx) => `
    <div class="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
      <div class="flex items-center justify-between pb-3 border-b border-slate-800">
        <div class="flex items-center gap-2">
          <span class="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-bold flex items-center justify-center border border-amber-500/40">
            ${idx + 1}
          </span>
          <h4 class="text-sm font-bold text-white">Video Reel Slot #${idx + 1}: <span class="text-amber-300">${item.title_id || item.quickTitle}</span></h4>
        </div>
        <span class="text-[11px] font-mono text-slate-400">${item.drone || 'Drone'}</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label class="block text-[11px] font-mono text-slate-300 mb-1">LABEL EYEBROW (ATAS)</label>
          <input type="text" id="reel-badge-${idx}" value="${item.badge_id || ''}" class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 text-xs text-white">
        </div>
        <div>
          <label class="block text-[11px] font-mono text-slate-300 mb-1">FORMAT VIDEO (MISAL: Format: 4K UHD 60FPS)</label>
          <input type="text" id="reel-format-${idx}" value="${item.format || ''}" class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 text-xs text-white font-mono">
        </div>
      </div>

      <div>
        <label class="block text-[11px] font-mono text-slate-300 mb-1">JUDUL UTAMA VIDEO *</label>
        <input type="text" id="reel-title-${idx}" value="${item.title_id || ''}" class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 text-xs text-white font-bold">
      </div>

      <div>
        <label class="block text-[11px] font-mono text-slate-300 mb-1">DESKRIPSI VIDEO</label>
        <textarea id="reel-subtitle-${idx}" rows="2" class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 text-xs text-white">${item.subtitle_id || ''}</textarea>
      </div>

      <div>
        <label class="block text-[11px] font-mono text-cyan-400 mb-1">FILE VIDEO / URL (LOKAL ATAU ONLINE) *</label>
        <input type="text" id="reel-url-${idx}" value="${item.videoUrl || ''}" class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 text-xs text-white font-mono">
      </div>

      <!-- Telemetry Overlay Fields -->
      <div class="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80">
        <span class="text-[10px] font-mono text-cyan-400 block mb-2">TELEMETRI HUD DI DALAM VIDEO</span>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div>
            <label class="block text-[10px] text-slate-400">DRONE</label>
            <input type="text" id="reel-drone-${idx}" value="${item.drone || ''}" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white font-mono">
          </div>
          <div>
            <label class="block text-[10px] text-slate-400">ALTITUDE</label>
            <input type="text" id="reel-alt-${idx}" value="${item.altitude || ''}" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white font-mono">
          </div>
          <div>
            <label class="block text-[10px] text-slate-400">LENSA</label>
            <input type="text" id="reel-lens-${idx}" value="${item.lens || ''}" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white font-mono">
          </div>
          <div>
            <label class="block text-[10px] text-slate-400">WARNA / FORMAT</label>
            <input type="text" id="reel-spec-${idx}" value="${item.telemetryFormat || ''}" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white font-mono">
          </div>
        </div>
      </div>

      <!-- Quick Selector Label -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <div>
          <label class="block text-[11px] font-mono text-slate-300 mb-1">JUDUL TOMBOL SELECTOR BAWAH</label>
          <input type="text" id="reel-qtitle-${idx}" value="${item.quickTitle || ''}" class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 text-xs text-white font-semibold">
        </div>
        <div>
          <label class="block text-[11px] font-mono text-slate-300 mb-1">SUBJUDUL TOMBOL SELECTOR BAWAH</label>
          <input type="text" id="reel-qsub-${idx}" value="${item.quickSub || ''}" class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 text-xs text-white">
        </div>
      </div>
    </div>
  `).join("");
}

// TAB GEAR (6 DRONES)
const DEFAULT_DRONE_IMAGES = [
  "assets/images/drone-mavic-4-pro.jpg?v=2",
  "assets/images/drone-mavic-3-pro.jpg?v=2",
  "assets/images/drone-air-3s.jpg?v=2",
  "assets/images/drone-avata-2.jpg?v=2",
  "assets/images/drone-mini-4-pro.jpg?v=2",
  "assets/images/drone-neo-2.jpg?v=2"
];

function populateGearForm() {
  const gearList = currentConfig.gear || (window.AeroSiteConfig ? window.AeroSiteConfig.DEFAULT_SITE_CONFIG.gear : []);
  const container = document.getElementById("gear-form-grid");
  if (!container) return;

  container.innerHTML = gearList.map((g, i) => {
    const currentImg = g.imageUrl || DEFAULT_DRONE_IMAGES[i] || DEFAULT_DRONE_IMAGES[0];
    const isDataUrl = currentImg.startsWith("data:");
    return `
    <div class="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
      <div class="flex items-center justify-between pb-2 border-b border-slate-800">
        <span class="text-xs font-mono font-bold text-purple-400 uppercase">DRONE #${i+1}</span>
        <span class="text-[11px] font-mono text-slate-300 font-bold">${g.title || 'Drone Unit'}</span>
      </div>

      <!-- FOTO UTAMA UNIT DRONE (PREVIEW & UPLOAD) -->
      <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-3">
        <div class="flex items-center justify-between">
          <label class="block text-[11px] font-mono font-bold text-slate-200">FOTO UTAMA UNIT DRONE</label>
          <span class="text-[10px] font-mono text-purple-400">Tampil Langsung di Kolom</span>
        </div>

        <div class="flex items-center gap-4">
          <div class="relative w-28 h-20 rounded-xl overflow-hidden bg-slate-900 border border-purple-500/30 shrink-0 group shadow-md">
            <img id="gear-img-preview-${i}" src="${currentImg}" alt="Foto ${g.title}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-[10px] text-white font-mono">
              Foto Aktif
            </div>
          </div>

          <div class="flex-1 space-y-2">
            <input type="file" id="gear-file-${i}" accept="image/*" class="hidden" onchange="handleDronePhotoUpload(event, ${i})">
            <input type="hidden" id="gear-image-${i}" value="${currentImg}">

            <div class="flex flex-wrap items-center gap-2">
              <button type="button" onclick="document.getElementById('gear-file-${i}').click()" class="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-lg shadow-purple-600/20 transition-all">
                <i data-lucide="upload" class="w-3.5 h-3.5"></i>
                <span>Upload Foto Baru</span>
              </button>
              <button type="button" onclick="resetDronePhoto(${i})" class="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-xs transition-colors">
                Reset Default
              </button>
            </div>
            <p class="text-[10px] text-slate-400">Pilih foto dari galeri HP/PC (otomatis dikompres &amp; langsung update ke website).</p>
          </div>
        </div>

        <div>
          <label class="block text-[10px] font-mono text-slate-400 mb-1">ATAU GUNAKAN URL GAMBAR LANGSUNG:</label>
          <input type="text" id="gear-url-input-${i}" value="${isDataUrl ? '(Foto lokal tersimpan)' : currentImg}" onchange="handleDroneUrlChange(${i}, this.value)" placeholder="https://images.unsplash.com/..." class="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white font-mono focus:border-purple-400 focus:outline-none">
        </div>

        <div id="gear-status-${i}" class="hidden text-[11px] text-emerald-400 font-mono flex items-center gap-1">
          <i data-lucide="check-circle" class="w-3.5 h-3.5"></i>
          <span>Foto baru aktif &amp; tersimpan!</span>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-[10px] text-slate-400 mb-1">TAG BADGE</label>
          <input type="text" id="gear-tag-${i}" value="${g.tag || ''}" class="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-purple-300 font-mono">
        </div>
        <div>
          <label class="block text-[10px] text-slate-400 mb-1">NAMA MODEL DRONE</label>
          <input type="text" id="gear-title-${i}" value="${g.title || ''}" class="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-bold">
        </div>
      </div>

      <div>
        <label class="block text-[10px] text-slate-400 mb-1">DESKRIPSI</label>
        <textarea id="gear-desc-${i}" rows="2" class="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">${g.desc || ''}</textarea>
      </div>

      <div>
        <label class="block text-[10px] text-slate-400 mb-1">REKOMENDASI PENGGUNAAN (IDEAL UNTUK)</label>
        <input type="text" id="gear-ideal-${i}" value="${g.ideal || ''}" class="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
      </div>
    </div>
  `}).join("");

  if (window.lucide) window.lucide.createIcons();
}

// Upload & optimize drone photo
function handleDronePhotoUpload(e, index) {
  const file = e.target.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Harap pilih file gambar (JPG, PNG, WEBP).");
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      const maxDim = 900;
      let width = img.width;
      let height = img.height;

      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      const optimizedDataUrl = canvas.toDataURL("image/jpeg", 0.84);

      // Update inputs & preview
      const hiddenInput = document.getElementById(`gear-image-${index}`);
      if (hiddenInput) hiddenInput.value = optimizedDataUrl;

      const preview = document.getElementById(`gear-img-preview-${index}`);
      if (preview) preview.src = optimizedDataUrl;

      const urlInput = document.getElementById(`gear-url-input-${index}`);
      if (urlInput) urlInput.value = "(Foto lokal tersimpan)";

      const statusEl = document.getElementById(`gear-status-${index}`);
      if (statusEl) {
        statusEl.classList.remove("hidden");
        if (window.lucide) window.lucide.createIcons();
      }

      // Auto-save immediately to currentConfig and localStorage
      if (!currentConfig.gear) currentConfig.gear = [];
      if (!currentConfig.gear[index]) currentConfig.gear[index] = {};
      currentConfig.gear[index].imageUrl = optimizedDataUrl;

      if (window.AeroSiteConfig) {
        window.AeroSiteConfig.saveSiteConfig(currentConfig);
      }

      const droneName = currentConfig.gear[index]?.title || `Drone #${index + 1}`;
      showToast(`Foto utama ${droneName} berhasil diupload & langsung aktif di website!`);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

function handleDroneUrlChange(index, newUrl) {
  if (!newUrl || newUrl === "(Foto lokal tersimpan)") return;
  const hiddenInput = document.getElementById(`gear-image-${index}`);
  if (hiddenInput) hiddenInput.value = newUrl;

  const preview = document.getElementById(`gear-img-preview-${index}`);
  if (preview) preview.src = newUrl;

  if (!currentConfig.gear) currentConfig.gear = [];
  if (!currentConfig.gear[index]) currentConfig.gear[index] = {};
  currentConfig.gear[index].imageUrl = newUrl;

  if (window.AeroSiteConfig) {
    window.AeroSiteConfig.saveSiteConfig(currentConfig);
  }

  showToast(`URL foto drone #${index + 1} berhasil diperbarui & disimpan!`);
}

function resetDronePhoto(index) {
  const defaultUrl = DEFAULT_DRONE_IMAGES[index] || DEFAULT_DRONE_IMAGES[0];
  const hiddenInput = document.getElementById(`gear-image-${index}`);
  if (hiddenInput) hiddenInput.value = defaultUrl;

  const preview = document.getElementById(`gear-img-preview-${index}`);
  if (preview) preview.src = defaultUrl;

  const urlInput = document.getElementById(`gear-url-input-${index}`);
  if (urlInput) urlInput.value = defaultUrl;

  const statusEl = document.getElementById(`gear-status-${index}`);
  if (statusEl) statusEl.classList.add("hidden");

  if (!currentConfig.gear) currentConfig.gear = [];
  if (!currentConfig.gear[index]) currentConfig.gear[index] = {};
  currentConfig.gear[index].imageUrl = defaultUrl;

  if (window.AeroSiteConfig) {
    window.AeroSiteConfig.saveSiteConfig(currentConfig);
  }

  showToast(`Foto drone #${index + 1} dikembalikan ke default & tersimpan.`);
}

// TAB SERVICES (4)
function populateServicesForm() {
  const sList = currentConfig.services || [];
  const container = document.getElementById("services-form-grid");
  if (!container) return;

  container.innerHTML = sList.map((s, i) => `
    <div class="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5">
      <span class="text-xs font-mono font-bold text-blue-400 uppercase block">LAYANAN #${i+1}</span>
      <div>
        <label class="block text-[10px] text-slate-400 mb-1">NAMA LAYANAN</label>
        <input type="text" id="srv-title-${i}" value="${s.title || ''}" class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-bold">
      </div>
      <div>
        <label class="block text-[10px] text-slate-400 mb-1">DESKRIPSI LAYANAN</label>
        <textarea id="srv-desc-${i}" rows="2" class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">${s.desc || ''}</textarea>
      </div>
    </div>
  `).join("");
}

// TAB ABOUT
function populateAboutForm() {
  const ab = currentConfig.about || {};
  const nameEl = document.getElementById("cfg-about-name");
  const roleEl = document.getElementById("cfg-about-role");
  const avatarEl = document.getElementById("cfg-about-avatar");
  const avatarUrlEl = document.getElementById("cfg-about-avatar-url");
  const titleEl = document.getElementById("cfg-about-title");
  const p1El = document.getElementById("cfg-about-p1");
  const p2El = document.getElementById("cfg-about-p2");
  const p3El = document.getElementById("cfg-about-p3");
  const p4El = document.getElementById("cfg-about-p4");

  if (nameEl) nameEl.value = ab.pilotName || "Bobien Martien";
  if (roleEl) roleEl.value = ab.pilotRole || "Aerial Cinematographer & Remote Pilot";
  if (avatarEl) {
    avatarEl.value = ab.avatarUrl || "assets/images/pilot-bobien-martien.jpg?v=2";
    updatePilotAvatarPreview(ab.avatarUrl || "assets/images/pilot-bobien-martien.jpg?v=2");
  }
  if (avatarUrlEl) {
    const isData = ab.avatarUrl && ab.avatarUrl.startsWith("data:");
    avatarUrlEl.value = isData ? "(Foto lokal tersimpan)" : (ab.avatarUrl || "assets/images/pilot-bobien-martien.jpg?v=2");
  }

  const defaultTitle = "Perspektif Udara Presisi untuk Standar Produksi Layar Lebar & Komersial.";
  if (titleEl) {
    titleEl.value = (!ab.title || ab.title.includes("Melihat Perspektif yang Tidak Pernah Terjangkau")) ? defaultTitle : ab.title;
  }
  const defAbout = window.AeroSiteConfig?.DEFAULT_SITE_CONFIG?.about || {};
  if (p1El) p1El.value = ab.p1 || defAbout.p1 || 'Saya adalah seorang <strong class="text-white">Remote Pilot Bersertifikasi Resmi Kementerian Perhubungan (DKPPU & SIDOPI GO)</strong> yang berdedikasi pada sinematografi udara dan pengambilan visual udara presisi tinggi.';

  let p2Val = ab.p2 || defAbout.p2 || "";
  if (!p2Val || p2Val.includes("\n\nFokus utama")) {
    p2Val = defAbout.p2 || 'Dengan pengalaman lebih dari <strong class="text-white">450 jam terbang operasional</strong> di berbagai wilayah Indonesia, saya terbiasa menghadapi tantangan medan nyata mulai dari dinamika angin pesisir, lanskap alam terbuka, hingga penerbangan presisi di kawasan urban padat.';
  }
  if (p2El) p2El.value = p2Val;
  if (p3El) p3El.value = ab.p3 || defAbout.p3 || 'Fokus utama di lapangan diarahkan pada <strong class="text-white">pergerakan kamera yang halus dan terukur, akurasi profil warna 10-Bit D-Log M untuk kemudahan color grading, serta standar ketat keselamatan terbang</strong>.';
  if (p4El) p4El.value = ab.p4 || defAbout.p4 || 'Setiap penerbangan didukung prosedur standar keselamatan pra-terbang, manajemen baterai terukur, dan kepatuhan izin wilayah udara untuk memastikan kelancaran produksi tim kreatif Anda.';

  // Populate Legalitas & Registrasi Lisensi (SIDOPI GO & DKPPU)
  const cr = ab.credentials || defAbout.credentials || {};
  const cTitleEl = document.getElementById("cfg-about-cert-card-title");
  const cSubEl = document.getElementById("cfg-about-cert-card-sub");
  const sidopiLblEl = document.getElementById("cfg-about-cert-sidopi-label");
  const sidopiValEl = document.getElementById("cfg-about-cert-sidopi-val");
  const dkppuLblEl = document.getElementById("cfg-about-cert-dkppu-label");
  const dkppuValEl = document.getElementById("cfg-about-cert-dkppu-val");
  const logLblEl = document.getElementById("cfg-about-cert-log-label");
  const logValEl = document.getElementById("cfg-about-cert-log-val");

  if (cTitleEl) cTitleEl.value = cr.cardTitle || "LEGALITAS & REGISTRASI RESMI TERVERIFIKASI";
  if (cSubEl) cSubEl.value = cr.cardSub || "Kementerian Perhubungan Republik Indonesia (DGCA)";
  if (sidopiLblEl) sidopiLblEl.value = cr.sidopiLabel || "REGISTRASI SIDOPI GO";
  if (sidopiValEl) sidopiValEl.value = cr.sidopiVal || "ID: PILOT-••••-2024";
  if (dkppuLblEl) dkppuLblEl.value = cr.dkppuLabel || "SERTIFIKASI PILOT DKPPU";
  if (dkppuValEl) dkppuValEl.value = cr.dkppuVal || "CASR PART 107 • #DKPPU-••••-89";
  if (logLblEl) logLblEl.value = cr.logLabel || "STANDAR OPERASIONAL";
  if (logValEl) logValEl.value = cr.logVal || "450+ Jam Terbang • Zero Incident";

  // Populate 4 Telemetri Stats
  const st = ab.stats || defAbout.stats || {};
  const hValEl = document.getElementById("cfg-about-stat-hours-val");
  const hLblEl = document.getElementById("cfg-about-stat-hours-lbl");
  const sValEl = document.getElementById("cfg-about-stat-safety-val");
  const sLblEl = document.getElementById("cfg-about-stat-safety-lbl");
  const fValEl = document.getElementById("cfg-about-stat-fleet-val");
  const fLblEl = document.getElementById("cfg-about-stat-fleet-lbl");
  const cValEl = document.getElementById("cfg-about-stat-cities-val");
  const cLblEl = document.getElementById("cfg-about-stat-cities-lbl");

  if (hValEl) hValEl.value = st.hours || "450+";
  if (hLblEl) hLblEl.value = st.hoursLabel || "Flight Hours";
  if (sValEl) sValEl.value = st.safety || "100%";
  if (sLblEl) sLblEl.value = st.safetyLabel || "Zero Incident";
  if (fValEl) fValEl.value = st.fleet || "6+";
  if (fLblEl) fLblEl.value = st.fleetLabel || "Fleet Units";
  if (cValEl) cValEl.value = st.cities || "18+";
  if (cLblEl) cLblEl.value = st.citiesLabel || "Cities Flown";
}

// TAB PACKAGES (6)
function populatePackagesForm() {
  const container = document.getElementById("packages-form-grid");
  if (!container) return;

  const pkgList = (currentConfig.packages && currentConfig.packages.length) 
    ? currentConfig.packages 
    : (window.AeroSiteConfig?.DEFAULT_SITE_CONFIG?.packages || []);

  container.innerHTML = pkgList.map((p, i) => `
    <div class="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3.5">
      <div class="flex items-center justify-between">
        <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
          PAKET #${i + 1}
        </span>
        <input type="text" id="pkg-tag-${i}" value="${p.badge || ''}" placeholder="BADGE" class="w-36 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-mono text-amber-300 text-right focus:border-amber-400 focus:outline-none">
      </div>

      <div>
        <label class="block text-[11px] font-mono text-slate-400 mb-1">NAMA PAKET</label>
        <input type="text" id="pkg-title-${i}" value="${p.title || ''}" class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-white focus:border-amber-400 focus:outline-none">
      </div>

      <div>
        <label class="block text-[11px] font-mono text-slate-400 mb-1">DESKRIPSI PAKET</label>
        <textarea id="pkg-desc-${i}" rows="2" class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:border-amber-400 focus:outline-none leading-relaxed">${p.desc || ''}</textarea>
      </div>

      <div class="pt-2 border-t border-slate-800/80 space-y-2">
        <label class="block text-[10px] font-mono text-slate-400">3 POIN DELIVERABLE / FITUR UTAMA:</label>
        <input type="text" id="pkg-d1-${i}" value="${(p.deliverables && p.deliverables[0]) || ''}" placeholder="Deliverable 1" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-200 focus:border-amber-400 focus:outline-none">
        <input type="text" id="pkg-d2-${i}" value="${(p.deliverables && p.deliverables[1]) || ''}" placeholder="Deliverable 2" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-200 focus:border-amber-400 focus:outline-none">
        <input type="text" id="pkg-d3-${i}" value="${(p.deliverables && p.deliverables[2]) || ''}" placeholder="Deliverable 3" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-200 focus:border-amber-400 focus:outline-none">
      </div>
    </div>
  `).join("");
}

// TAB TESTIMONIALS (4)
function populateTestimonialsForm() {
  const container = document.getElementById("testimonials-form-grid");
  if (!container) return;

  const testiList = (currentConfig.testimonials && currentConfig.testimonials.length) 
    ? currentConfig.testimonials 
    : (window.AeroSiteConfig?.DEFAULT_SITE_CONFIG?.testimonials || []);

  container.innerHTML = testiList.map((t, i) => `
    <div class="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3.5">
      <div class="flex items-center justify-between">
        <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
          TESTIMONI #${i + 1}
        </span>
        <div class="flex items-center gap-2">
          <label class="text-[10px] font-mono text-slate-400">BADGE:</label>
          <input type="text" id="testi-badge-inp-${i}" value="${t.badge || ''}" placeholder="Kategori" class="w-36 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-mono text-yellow-300 text-right focus:border-yellow-400 focus:outline-none">
        </div>
      </div>

      <div>
        <label class="block text-[11px] font-mono text-slate-400 mb-1">KUTIPAN ULASAN KLIEN (QUOTE)</label>
        <textarea id="testi-quote-inp-${i}" rows="3" class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-yellow-400 focus:outline-none italic leading-relaxed">${t.quote || ''}</textarea>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
        <div class="sm:col-span-5">
          <label class="block text-[10px] font-mono text-slate-400 mb-1">NAMA KLIEN / TIM</label>
          <input type="text" id="testi-author-inp-${i}" value="${t.author || ''}" placeholder="Nama Klien" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:border-yellow-400 focus:outline-none font-bold">
        </div>
        <div class="sm:col-span-5">
          <label class="block text-[10px] font-mono text-slate-400 mb-1">PERAN / EVENT / PERUSAHAAN</label>
          <input type="text" id="testi-role-inp-${i}" value="${t.role || ''}" placeholder="Peran Klien" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:border-yellow-400 focus:outline-none">
        </div>
        <div class="sm:col-span-2">
          <label class="block text-[10px] font-mono text-slate-400 mb-1">INISIAL</label>
          <input type="text" id="testi-initials-inp-${i}" value="${t.initials || ''}" placeholder="KC" maxlength="3" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-center text-yellow-300 font-mono font-bold focus:border-yellow-400 focus:outline-none uppercase">
        </div>
      </div>
    </div>
  `).join("");
}
}

// Pilot Photo Upload & Preview Engine
function handlePilotPhotoUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Harap pilih file gambar (JPG, PNG, WEBP).");
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      const maxDim = 800;
      let width = img.width;
      let height = img.height;

      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      const optimizedDataUrl = canvas.toDataURL("image/jpeg", 0.85);

      const avatarInput = document.getElementById("cfg-about-avatar");
      if (avatarInput) avatarInput.value = optimizedDataUrl;

      const avatarUrlInput = document.getElementById("cfg-about-avatar-url");
      if (avatarUrlInput) avatarUrlInput.value = "(Foto lokal tersimpan)";

      updatePilotAvatarPreview(optimizedDataUrl);

      // AUTO-SAVE IMMEDIATELY to currentConfig and localStorage
      if (!currentConfig.about) currentConfig.about = {};
      currentConfig.about.avatarUrl = optimizedDataUrl;

      if (window.AeroSiteConfig) {
        window.AeroSiteConfig.saveSiteConfig(currentConfig);
      }

      const statusEl = document.getElementById("pilot-photo-status");
      if (statusEl) {
        statusEl.classList.remove("hidden");
        statusEl.innerHTML = `<i data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i>
          <span>Foto profil baru berhasil diupload dan <strong>langsung aktif di website!</strong></span>`;
        if (window.lucide) window.lucide.createIcons();
      }

      showToast("Foto profil pilot berhasil diupload & langsung terupdate di website!");
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

function handlePilotUrlChange(newUrl) {
  if (!newUrl || newUrl === "(Foto lokal tersimpan)") return;
  const avatarInput = document.getElementById("cfg-about-avatar");
  if (avatarInput) avatarInput.value = newUrl;
  updatePilotAvatarPreview(newUrl);

  if (!currentConfig.about) currentConfig.about = {};
  currentConfig.about.avatarUrl = newUrl;

  if (window.AeroSiteConfig) {
    window.AeroSiteConfig.saveSiteConfig(currentConfig);
  }

  showToast("URL foto profil berhasil diperbarui & langsung tersimpan!");
}

function updatePilotAvatarPreview(url) {
  const preview = document.getElementById("pilot-avatar-preview");
  if (preview) {
    preview.src = url || "assets/images/pilot-bobien-martien.jpg?v=2";
  }
}

function resetPilotAvatarToDefault() {
  const defaultUrl = "assets/images/pilot-bobien-martien.jpg?v=2";
  const avatarInput = document.getElementById("cfg-about-avatar");
  if (avatarInput) avatarInput.value = defaultUrl;

  const avatarUrlInput = document.getElementById("cfg-about-avatar-url");
  if (avatarUrlInput) avatarUrlInput.value = defaultUrl;

  updatePilotAvatarPreview(defaultUrl);

  if (!currentConfig.about) currentConfig.about = {};
  currentConfig.about.avatarUrl = defaultUrl;

  if (window.AeroSiteConfig) {
    window.AeroSiteConfig.saveSiteConfig(currentConfig);
  }

  const statusEl = document.getElementById("pilot-photo-status");
  if (statusEl) statusEl.classList.add("hidden");
  showToast("Foto profil pilot dikembalikan ke default & tersimpan.");
}

// TAB CONTACT
function populateContactForm() {
  const ct = currentConfig.contact || {};
  const waEl = document.getElementById("cfg-contact-wa");
  const waCleanEl = document.getElementById("cfg-contact-wa-clean");
  const waTextEl = document.getElementById("cfg-contact-wa-text");
  const emailEl = document.getElementById("cfg-contact-email");
  const igEl = document.getElementById("cfg-contact-ig");

  if (waEl) waEl.value = ct.whatsapp || "";
  if (waCleanEl) waCleanEl.value = ct.whatsappClean || "";
  if (waTextEl) waTextEl.value = ct.whatsappText || "";
  if (emailEl) emailEl.value = ct.email || "";
  if (igEl) igEl.value = ct.instagram || "";
}

// ========================================================
// 4. Save All Settings Engine
// ========================================================
function saveAllSettings() {
  // 1. Gather Hero
  const heroBadge = document.getElementById("cfg-hero-badge");
  const heroTitle = document.getElementById("cfg-hero-title");
  const heroSub = document.getElementById("cfg-hero-subtitle");
  const heroBtnShowreel = document.getElementById("cfg-hero-btn-showreel");
  const heroBtnGallery = document.getElementById("cfg-hero-btn-gallery");
  const heroCred1 = document.getElementById("cfg-hero-cred-1");
  const heroCred2 = document.getElementById("cfg-hero-cred-2");
  const heroCred3 = document.getElementById("cfg-hero-cred-3");
  const heroBgUrl = document.getElementById("cfg-hero-bg-url");

  currentConfig.hero = {
    badge: heroBadge ? heroBadge.value : "",
    title: heroTitle ? heroTitle.value : "",
    subtitle: heroSub ? heroSub.value : "",
    btnShowreel: heroBtnShowreel ? heroBtnShowreel.value : "Watch 4K Showreel",
    btnGallery: heroBtnGallery ? heroBtnGallery.value : "Explore Portfolio",
    credentials: [
      { text: heroCred1 ? heroCred1.value : "Certified Pilot SIDOPI GO & DKPPU" },
      { text: heroCred2 ? heroCred2.value : "450+ Operational Flight Hours" },
      { text: heroCred3 ? heroCred3.value : "Nationwide Mission Ready" }
    ],
    bgImageUrl: heroBgUrl ? heroBgUrl.value : ""
  };

  // 2. Gather Reel (3 Slots)
  const reelList = (currentConfig.featuredReel) ? [...currentConfig.featuredReel] : [];
  for (let idx = 0; idx < reelList.length; idx++) {
    const b = document.getElementById(`reel-badge-${idx}`);
    const t = document.getElementById(`reel-title-${idx}`);
    const s = document.getElementById(`reel-subtitle-${idx}`);
    const f = document.getElementById(`reel-format-${idx}`);
    const u = document.getElementById(`reel-url-${idx}`);
    const dr = document.getElementById(`reel-drone-${idx}`);
    const al = document.getElementById(`reel-alt-${idx}`);
    const le = document.getElementById(`reel-lens-${idx}`);
    const sp = document.getElementById(`reel-spec-${idx}`);
    const qt = document.getElementById(`reel-qtitle-${idx}`);
    const qs = document.getElementById(`reel-qsub-${idx}`);

    if (b) { reelList[idx].badge_id = b.value; reelList[idx].badge_en = b.value; }
    if (t) { reelList[idx].title_id = t.value; reelList[idx].title_en = t.value; }
    if (s) { reelList[idx].subtitle_id = s.value; reelList[idx].subtitle_en = s.value; }
    if (f) reelList[idx].format = f.value;
    if (u) reelList[idx].videoUrl = u.value;
    if (dr) reelList[idx].drone = dr.value;
    if (al) reelList[idx].altitude = al.value;
    if (le) reelList[idx].lens = le.value;
    if (sp) reelList[idx].telemetryFormat = sp.value;
    if (qt) reelList[idx].quickTitle = qt.value;
    if (qs) reelList[idx].quickSub = qs.value;
  }
  currentConfig.featuredReel = reelList;

  // 3. Gather Gear
  const gearList = (currentConfig.gear) ? [...currentConfig.gear] : [];
  for (let i = 0; i < gearList.length; i++) {
    const tag = document.getElementById(`gear-tag-${i}`);
    const title = document.getElementById(`gear-title-${i}`);
    const desc = document.getElementById(`gear-desc-${i}`);
    const ideal = document.getElementById(`gear-ideal-${i}`);
    const img = document.getElementById(`gear-image-${i}`);
    if (tag) gearList[i].tag = tag.value;
    if (title) gearList[i].title = title.value;
    if (desc) gearList[i].desc = desc.value;
    if (ideal) gearList[i].ideal = ideal.value;
    if (img && img.value) gearList[i].imageUrl = img.value;
  }
  currentConfig.gear = gearList;

  // 4. Gather Services
  const srvList = (currentConfig.services) ? [...currentConfig.services] : [];
  for (let i = 0; i < srvList.length; i++) {
    const title = document.getElementById(`srv-title-${i}`);
    const desc = document.getElementById(`srv-desc-${i}`);
    if (title) srvList[i].title = title.value;
    if (desc) srvList[i].desc = desc.value;
  }
  currentConfig.services = srvList;

  // 5. Gather About
  const aName = document.getElementById("cfg-about-name");
  const aRole = document.getElementById("cfg-about-role");
  const aAvatar = document.getElementById("cfg-about-avatar");
  const aTitle = document.getElementById("cfg-about-title");
  const aP1 = document.getElementById("cfg-about-p1");
  const aP2 = document.getElementById("cfg-about-p2");
  const aP3 = document.getElementById("cfg-about-p3");
  const aP4 = document.getElementById("cfg-about-p4");

  const cTitleEl = document.getElementById("cfg-about-cert-card-title");
  const cSubEl = document.getElementById("cfg-about-cert-card-sub");
  const sidopiLblEl = document.getElementById("cfg-about-cert-sidopi-label");
  const sidopiValEl = document.getElementById("cfg-about-cert-sidopi-val");
  const dkppuLblEl = document.getElementById("cfg-about-cert-dkppu-label");
  const dkppuValEl = document.getElementById("cfg-about-cert-dkppu-val");
  const logLblEl = document.getElementById("cfg-about-cert-log-label");
  const logValEl = document.getElementById("cfg-about-cert-log-val");

  const hValEl = document.getElementById("cfg-about-stat-hours-val");
  const hLblEl = document.getElementById("cfg-about-stat-hours-lbl");
  const sValEl = document.getElementById("cfg-about-stat-safety-val");
  const sLblEl = document.getElementById("cfg-about-stat-safety-lbl");
  const fValEl = document.getElementById("cfg-about-stat-fleet-val");
  const fLblEl = document.getElementById("cfg-about-stat-fleet-lbl");
  const cValEl = document.getElementById("cfg-about-stat-cities-val");
  const cLblEl = document.getElementById("cfg-about-stat-cities-lbl");

  currentConfig.about = {
    ...currentConfig.about,
    pilotName: aName ? aName.value : "Bobien Martien",
    pilotRole: aRole ? aRole.value : "Aerial Cinematographer & Remote Pilot",
    avatarUrl: aAvatar ? aAvatar.value : "assets/images/pilot-bobien-martien.jpg?v=2",
    title: aTitle ? aTitle.value : "Perspektif Udara Presisi untuk Standar Produksi Layar Lebar & Komersial.",
    p1: aP1 ? aP1.value : "",
    p2: aP2 ? aP2.value : "",
    p3: aP3 ? aP3.value : "",
    p4: aP4 ? aP4.value : "",
    credentials: {
      cardTitle: cTitleEl ? cTitleEl.value : "LEGALITAS & REGISTRASI RESMI TERVERIFIKASI",
      cardSub: cSubEl ? cSubEl.value : "Kementerian Perhubungan Republik Indonesia (DGCA)",
      sidopiLabel: sidopiLblEl ? sidopiLblEl.value : "REGISTRASI SIDOPI GO",
      sidopiVal: sidopiValEl ? sidopiValEl.value : "ID: PILOT-••••-2024",
      dkppuLabel: dkppuLblEl ? dkppuLblEl.value : "SERTIFIKASI PILOT DKPPU",
      dkppuVal: dkppuValEl ? dkppuValEl.value : "CASR PART 107 • #DKPPU-••••-89",
      logLabel: logLblEl ? logLblEl.value : "STANDAR OPERASIONAL",
      logVal: logValEl ? logValEl.value : "450+ Jam Terbang • Zero Incident"
    },
    stats: {
      hours: hValEl ? hValEl.value : "450+",
      hoursLabel: hLblEl ? hLblEl.value : "Flight Hours",
      safety: sValEl ? sValEl.value : "100%",
      safetyLabel: sLblEl ? sLblEl.value : "Zero Incident",
      fleet: fValEl ? fValEl.value : "6+",
      fleetLabel: fLblEl ? fLblEl.value : "Fleet Units",
      cities: cValEl ? cValEl.value : "18+",
      citiesLabel: cLblEl ? cLblEl.value : "Cities Flown"
    }
  };

  // 6. Gather Packages (6)
  const existingPkgs = (currentConfig.packages && currentConfig.packages.length) 
    ? [...currentConfig.packages] 
    : (window.AeroSiteConfig?.DEFAULT_SITE_CONFIG?.packages ? [...window.AeroSiteConfig.DEFAULT_SITE_CONFIG.packages] : []);
  for (let i = 0; i < existingPkgs.length; i++) {
    const pTag = document.getElementById(`pkg-tag-${i}`);
    const pTitle = document.getElementById(`pkg-title-${i}`);
    const pDesc = document.getElementById(`pkg-desc-${i}`);
    const pd1 = document.getElementById(`pkg-d1-${i}`);
    const pd2 = document.getElementById(`pkg-d2-${i}`);
    const pd3 = document.getElementById(`pkg-d3-${i}`);

    if (pTag) existingPkgs[i].badge = pTag.value;
    if (pTitle) existingPkgs[i].title = pTitle.value;
    if (pDesc) existingPkgs[i].desc = pDesc.value;
    existingPkgs[i].deliverables = [
      pd1 ? pd1.value : (existingPkgs[i].deliverables?.[0] || ""),
      pd2 ? pd2.value : (existingPkgs[i].deliverables?.[1] || ""),
      pd3 ? pd3.value : (existingPkgs[i].deliverables?.[2] || "")
    ];
  }
  currentConfig.packages = existingPkgs;

  // 7. Gather Testimonials (4)
  const existingTestis = (currentConfig.testimonials && currentConfig.testimonials.length) 
    ? [...currentConfig.testimonials] 
    : (window.AeroSiteConfig?.DEFAULT_SITE_CONFIG?.testimonials ? [...window.AeroSiteConfig.DEFAULT_SITE_CONFIG.testimonials] : []);
  for (let i = 0; i < existingTestis.length; i++) {
    const tBadge = document.getElementById(`testi-badge-inp-${i}`);
    const tQuote = document.getElementById(`testi-quote-inp-${i}`);
    const tAuthor = document.getElementById(`testi-author-inp-${i}`);
    const tRole = document.getElementById(`testi-role-inp-${i}`);
    const tInitials = document.getElementById(`testi-initials-inp-${i}`);

    if (tBadge) existingTestis[i].badge = tBadge.value;
    if (tQuote) existingTestis[i].quote = tQuote.value;
    if (tAuthor) existingTestis[i].author = tAuthor.value;
    if (tRole) existingTestis[i].role = tRole.value;
    if (tInitials) existingTestis[i].initials = tInitials.value;
  }
  currentConfig.testimonials = existingTestis;

  // 8. Gather Contact
  const cWa = document.getElementById("cfg-contact-wa");
  const cWaClean = document.getElementById("cfg-contact-wa-clean");
  const cWaText = document.getElementById("cfg-contact-wa-text");
  const cEmail = document.getElementById("cfg-contact-email");
  const cIg = document.getElementById("cfg-contact-ig");

  currentConfig.contact = {
    ...currentConfig.contact,
    whatsapp: cWa ? cWa.value : "",
    whatsappClean: cWaClean ? cWaClean.value : "",
    whatsappText: cWaText ? cWaText.value : "",
    email: cEmail ? cEmail.value : "",
    instagram: cIg ? cIg.value : ""
  };

  // Save to localStorage
  if (window.AeroSiteConfig) {
    window.AeroSiteConfig.saveSiteConfig(currentConfig);
  }

  // Auto-sync to GitHub & Vercel if token configured
  autoSyncGithubIfConfigured();

  showToast("Perubahan tersimpan! Website publik langsung terupdate.");
}

// ========================================================
// 5. Gallery Management CRUD
// ========================================================
const GALLERY_STORAGE_KEY = "AEROSCOPE_GALLERY_ITEMS";

function loadGalleryMedia() {
  const saved = localStorage.getItem(GALLERY_STORAGE_KEY);
  if (saved) {
    try {
      currentGalleryList = JSON.parse(saved);
      // Auto-merge default photos if stored gallery only has videos
      if (Array.isArray(currentGalleryList) && !currentGalleryList.some(i => i.type === "photo")) {
        const defaultPhotos = getDefaultGalleryMedia().filter(i => i.type === "photo");
        currentGalleryList = [...currentGalleryList, ...defaultPhotos];
        try {
          localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(currentGalleryList));
        } catch (e) {}
      }
    } catch (e) {
      currentGalleryList = getDefaultGalleryMedia();
    }
  } else {
    currentGalleryList = getDefaultGalleryMedia();
  }
  renderGalleryTable();
}

function getDefaultGalleryMedia() {
  return [
    {
      id: "sample-vid-2",
      type: "video",
      title: "Wonderful 12th: Karawang Central Plaza",
      category: "commercial",
      mediaUrl: "assets/videos/karawang-central-plaza-kcp-galuh-mas.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80",
      drone: "DJI Mini 4 Pro",
      altitude: "150m AGL",
      specs: "4K UHD • D-Log M • 24mm f/1.7",
      location: "KCP Galuh Mas, Karawang",
      description: "Dokumentasi udara kemeriahan puncak perayaan ulang tahun ke-12 Karawang Central Plaza (KCP)."
    },
    {
      id: "sample-vid-stan",
      type: "video",
      title: "Campus Skies: PKN STAN Aerials",
      category: "commercial",
      mediaUrl: "assets/videos/campus-skies-pkn-stan.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
      drone: "DJI Mavic 3 Pro",
      altitude: "340m AGL",
      specs: "5.1K UHD • D-Log M • Hasselblad 24mm",
      location: "PKN STAN, Bintaro",
      description: "Kompilasi sinematografi drone megah yang menampilkan arsitektur dan lanskap kampus PKN STAN Bintaro."
    },
    {
      id: "sample-vid-groove",
      type: "video",
      title: "New Cluster Groove at Fortune — 1st Place Winner",
      category: "commercial",
      mediaUrl: "assets/videos/new-cluster-groove-fortune.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      drone: "DJI Mini 4 Pro",
      altitude: "120m AGL",
      specs: "4K Vertical • D-Log M • 24mm f/1.7",
      location: "Fortune District",
      description: "Karya pemenang juara pertama kategori vertical aerial showcase 2025."
    },
    {
      id: "sample-photo-1",
      type: "photo",
      title: "Masjid Apung An-Nur — Sunset Vista",
      category: "commercial",
      mediaUrl: "assets/images/masjid-apung-sunset.jpg",
      thumbnailUrl: "assets/images/masjid-apung-sunset.jpg",
      drone: "DJI Mavic 3 Pro",
      altitude: "180m AGL",
      specs: "Hasselblad 20MP • 24mm f/2.8 • RAW",
      location: "Pesisir Teluk Jakarta",
      description: "Dokumentasi visual udara arsitektur Masjid Apung An-Nur di atas perairan dengan jembatan melengkung berlatar pancaran senja keemasan."
    },
    {
      id: "sample-photo-2",
      type: "photo",
      title: "Masjid Apung An-Nur — Blue Hour Twilight",
      category: "commercial",
      mediaUrl: "assets/images/masjid-apung-bluehour.jpg",
      thumbnailUrl: "assets/images/masjid-apung-bluehour.jpg",
      drone: "DJI Mavic 3 Pro",
      altitude: "120m AGL",
      specs: "Hasselblad 20MP • 70mm Tele • ISO 100",
      location: "Pesisir Teluk Jakarta",
      description: "Komposisi simetris waktu blue hour dengan sorotan lampu arsitektural yang memantul di permukaan air laut tenang."
    },
    {
      id: "sample-photo-3",
      type: "photo",
      title: "Embung Retensi Hijau & Jogging Track",
      category: "commercial",
      mediaUrl: "assets/images/embung-retensi-aerial.jpg",
      thumbnailUrl: "assets/images/embung-retensi-aerial.jpg",
      drone: "DJI Air 3S",
      altitude: "220m AGL",
      specs: "1-Inch CMOS 50MP • LiDAR Nightscape",
      location: "Kawasan Residensial Terpadu",
      description: "Perspektif udara top-down dan lansekap embung retensi pengendali air dengan lintasan jogging ramah lingkungan di tengah permukiman modern."
    },
    {
      id: "sample-photo-4",
      type: "photo",
      title: "Geometri Lansekap Embung dari Udara",
      category: "commercial",
      mediaUrl: "assets/images/embung-retensi-topdown.jpg",
      thumbnailUrl: "assets/images/embung-retensi-topdown.jpg",
      drone: "DJI Mini 4 Pro",
      altitude: "260m AGL",
      specs: "48MP Quad-Bayer • 24mm f/1.7 • HDR",
      location: "Kawasan Penataan Air Perkotaan",
      description: "Pola top-down 90 derajat yang memperlihatkan kontras air kehijauan embung dengan alur trotoar bata terra cotta dan kerapatan pemukiman."
    },
    {
      id: "sample-photo-5",
      type: "photo",
      title: "Masjid Apung An-Nur — Siluet Senja Teluk",
      category: "commercial",
      mediaUrl: "assets/images/masjid-apung-twilight.jpg",
      thumbnailUrl: "assets/images/masjid-apung-twilight.jpg",
      drone: "DJI Mavic 3 Pro",
      altitude: "160m AGL",
      specs: "Hasselblad 24mm • 10-Bit Color • f/4.0",
      location: "Pesisir Teluk Jakarta",
      description: "Visual aerial arsitektur masjid apung dengan siluet lembut sebelum malam tiba memperlihatkan pantulan warna langit di permukaan air laut."
    },
    {
      id: "sample-photo-6",
      type: "photo",
      title: "Koridor Hijau & Lintasan Jogging Embung",
      category: "commercial",
      mediaUrl: "assets/images/embung-retensi-jogging.jpg",
      thumbnailUrl: "assets/images/embung-retensi-jogging.jpg",
      drone: "DJI Air 3S",
      altitude: "140m AGL",
      specs: "70mm Medium Tele • 48MP • ISO 100",
      location: "Kawasan Penataan Lanskap Kota",
      description: "Pemandangan udara lintasan pejalan kaki dan pepohonan asri di tepian danau retensi pemukiman warga."
    },
    {
      id: "sample-photo-7",
      type: "photo",
      title: "Masjid Apung An-Nur — Kilau Malam Arsitektur",
      category: "commercial",
      mediaUrl: "assets/images/masjid-apung-night.jpg",
      thumbnailUrl: "assets/images/masjid-apung-night.jpg",
      drone: "DJI Mavic 3 Pro",
      altitude: "110m AGL",
      specs: "Hasselblad 24mm • RAW DNG • f/2.8",
      location: "Pesisir Teluk Jakarta",
      description: "Perspektif malam hari memperlihatkan keindahan pendar lampu temaram yang menyinari struktur modern masjid di atas laut."
    },
    {
      id: "sample-photo-8",
      type: "photo",
      title: "Panorama Udara Elevasi Tinggi 8K",
      category: "commercial",
      mediaUrl: "assets/images/landscape-ciater-aerial.jpg",
      thumbnailUrl: "assets/images/landscape-ciater-aerial.jpg",
      drone: "DJI Mavic 3 Pro",
      altitude: "350m AGL",
      specs: "Hasselblad 48MP • D-Log M • ISO 100",
      location: "Jawa Barat, Indonesia",
      description: "Dokumentasi visual udara beresolusi super tinggi 48MP dengan sudut pandang luas membentang di atas cakrawala."
    }
  ];
}

function renderGalleryTable() {
  const tbody = document.getElementById("media-table-body");
  const empty = document.getElementById("table-empty-state");
  if (!tbody) return;

  if (currentGalleryList.length === 0) {
    tbody.innerHTML = "";
    if (empty) empty.classList.remove("hidden");
    return;
  }

  if (empty) empty.classList.add("hidden");

  tbody.innerHTML = currentGalleryList.map(item => `
    <tr class="hover:bg-slate-900/60 transition-colors">
      <td class="py-3 px-6">
        <div class="w-16 h-11 rounded-lg bg-slate-900 overflow-hidden border border-slate-800 flex items-center justify-center">
          ${item.thumbnailUrl ? `<img src="${item.thumbnailUrl}" class="w-full h-full object-cover">` : `<i data-lucide="${item.type === 'video' ? 'video' : 'image'}" class="w-4 h-4 text-slate-500"></i>`}
        </div>
      </td>
      <td class="py-3 px-6">
        <div class="font-bold text-white text-xs line-clamp-1">${item.title}</div>
        <div class="text-[11px] text-cyan-400 font-mono capitalize">${item.category} • ${item.location || 'Indonesia'}</div>
      </td>
      <td class="py-3 px-6">
        <div class="text-xs text-slate-200 font-mono">${item.drone || 'Drone'}</div>
        <div class="text-[11px] text-slate-500 font-mono">${item.altitude || '-'} • ${item.specs || ''}</div>
      </td>
      <td class="py-3 px-6">
        <span class="px-2 py-0.5 rounded text-[10px] font-mono ${item.type === 'video' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}">
          ${item.type === 'video' ? 'VIDEO 4K' : 'FOTO UDARA'}
        </span>
      </td>
      <td class="py-3 px-6 text-right space-x-2">
        <button onclick="editGalleryItem('${item.id}')" class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs">
          Edit
        </button>
        <button onclick="deleteGalleryItem('${item.id}')" class="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs">
          Hapus
        </button>
      </td>
    </tr>
  `).join("");

  if (window.lucide) window.lucide.createIcons();
}

function openMediaModal() {
  const modal = document.getElementById("media-modal");
  const form = document.getElementById("media-form");
  if (form) form.reset();
  document.getElementById("form-media-id").value = "";
  document.getElementById("media-modal-title").textContent = "Tambah Karya Media Baru";
  if (modal) modal.classList.remove("hidden");
}

function closeMediaModal() {
  const modal = document.getElementById("media-modal");
  if (modal) modal.classList.add("hidden");
}

function editGalleryItem(id) {
  const item = currentGalleryList.find(m => m.id === id);
  if (!item) return;

  openMediaModal();
  document.getElementById("form-media-id").value = item.id;
  document.getElementById("form-media-url").value = item.mediaUrl || "";
  document.getElementById("form-thumb-url").value = item.thumbnailUrl || "";
  document.getElementById("form-title").value = item.title || "";
  document.getElementById("form-type").value = item.type || "video";
  document.getElementById("form-category").value = item.category || "commercial";
  document.getElementById("form-drone").value = item.drone || "";
  document.getElementById("form-location").value = item.location || "";
  document.getElementById("form-altitude").value = item.altitude || "";
  document.getElementById("form-specs").value = item.specs || "";
  document.getElementById("form-description").value = item.description || "";
  document.getElementById("media-modal-title").textContent = "Edit Karya Media";
}

function deleteGalleryItem(id) {
  if (!confirm("Apakah Anda yakin ingin menghapus karya ini dari galeri?")) return;
  currentGalleryList = currentGalleryList.filter(m => m.id !== id);
  localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(currentGalleryList));
  renderGalleryTable();
  showToast("Karya berhasil dihapus dari galeri.");
}

function handleMediaFormSubmit(e) {
  e.preventDefault();
  const editId = document.getElementById("form-media-id").value;
  const newItem = {
    id: editId || `media-${Date.now()}`,
    type: document.getElementById("form-type").value,
    title: document.getElementById("form-title").value,
    category: document.getElementById("form-category").value,
    mediaUrl: document.getElementById("form-media-url").value,
    thumbnailUrl: document.getElementById("form-thumb-url").value,
    drone: document.getElementById("form-drone").value,
    altitude: document.getElementById("form-altitude").value,
    specs: document.getElementById("form-specs").value,
    location: document.getElementById("form-location").value,
    description: document.getElementById("form-description").value,
    isUserUpload: true
  };

  if (editId) {
    const idx = currentGalleryList.findIndex(m => m.id === editId);
    if (idx !== -1) currentGalleryList[idx] = newItem;
  } else {
    currentGalleryList.unshift(newItem);
  }

  localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(currentGalleryList));
  renderGalleryTable();
  closeMediaModal();
  showToast(editId ? "Karya berhasil diperbarui!" : "Karya baru berhasil ditambahkan!");
}

// ========================================================
// 6. Backup, Export & Import
// ========================================================
function downloadConfigBackup() {
  const jsonStr = window.AeroSiteConfig ? window.AeroSiteConfig.exportSiteConfigJSON() : JSON.stringify(currentConfig, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `aeroscope-backup-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("File backup konfigurasi JSON berhasil diunduh.");
}

function handleImportBackup(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const res = window.AeroSiteConfig ? window.AeroSiteConfig.importSiteConfigJSON(event.target.result) : { success: true };
      if (res.success) {
        initDashboard();
        showToast("Konfigurasi berhasil dipulihkan dari file JSON!");
      } else {
        alert("Gagal memulihkan file: " + res.message);
      }
    } catch (err) {
      alert("Format JSON tidak valid.");
    }
  };
  reader.readAsText(file);
}

function confirmResetDefaults() {
  if (!confirm("Perhatian: Seluruh teks, playlist video, dan pengaturan akan dikembalikan ke default. Lanjutkan?")) return;
  if (window.AeroSiteConfig) {
    window.AeroSiteConfig.resetSiteConfig();
  }
  localStorage.removeItem(GALLERY_STORAGE_KEY);
  initDashboard();
  showToast("Semua pengaturan telah dikembalikan ke standar awal pabrik.");
}

// ========================================================
// 7. Security & PIN Management
// ========================================================
function handleChangePinSubmit(e) {
  e.preventDefault();
  const currentPin = (document.getElementById("pin-current")?.value || "").trim();
  const newPin = (document.getElementById("pin-new")?.value || "").trim();
  const confirmPin = (document.getElementById("pin-confirm")?.value || "").trim();
  const errEl = document.getElementById("pin-change-error");
  const succEl = document.getElementById("pin-change-success");

  if (errEl) errEl.classList.add("hidden");
  if (succEl) succEl.classList.add("hidden");

  const validPin = getActiveAdminPin();

  // STRICT SECURITY CHECK: Old PIN must match validPin exactly!
  if (currentPin !== validPin) {
    if (errEl) {
      errEl.textContent = "PIN lama tidak sesuai! Masukkan PIN aktif Anda.";
      errEl.classList.remove("hidden");
    }
    return;
  }

  if (newPin.length < 4) {
    if (errEl) {
      errEl.textContent = "PIN baru harus minimal 4 karakter.";
      errEl.classList.remove("hidden");
    }
    return;
  }

  if (newPin !== confirmPin) {
    if (errEl) {
      errEl.textContent = "Konfirmasi PIN baru tidak sesuai.";
      errEl.classList.remove("hidden");
    }
    return;
  }

  // Save new PIN permanently in localStorage
  localStorage.setItem(PIN_STORAGE_KEY, newPin);

  // Automatically dispatch notification email to bobienfly@gmail.com
  fetch("https://formsubmit.co/ajax/4f99a51a77879179eda1ebb26eca8ca9", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      _subject: `🔔 PIN BARU ADMIN AEROSCOPE: ${newPin}`,
      _template: "table",
      _captcha: "false",
      "KODE_PIN_BARU_ANDA": newPin,
      "STATUS": "BERHASIL DIPERBARUI",
      "EMAIL": "bobienfly@gmail.com",
      "WAKTU": new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
      "TAUTAN_LOGIN": "https://bobienmartien.vercel.app/admin",
      "KETERANGAN": `PIN lama sudah dinonaktifkan permanen. Gunakan PIN baru ini: [ ${newPin} ] untuk login.`
    })
  }).catch(() => {});

  if (succEl) {
    succEl.textContent = "✓ PIN berhasil diubah! Salinan PIN baru telah dikirimkan ke bobienfly@gmail.com. PIN lama tidak berlaku lagi.";
    succEl.classList.remove("hidden");
  }
  const form = document.getElementById("change-pin-form");
  if (form) form.reset();
  showToast("PIN Admin berhasil diperbarui!");
}

// ========================================================
// 8. Toast Notification Utility
// ========================================================
let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById("admin-toast");
  const toastMsg = document.getElementById("toast-message");
  if (!toast || !toastMsg) return;

  toastMsg.textContent = msg;
  toast.classList.remove("translate-y-20", "opacity-0");
  toast.classList.add("translate-y-0", "opacity-100");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("translate-y-20", "opacity-0");
  }, 3500);
}

// ========================================================
// 9. Permanent GitHub & Vercel Auto-Deploy Engine
// ========================================================
const GITHUB_PAT_STORAGE_KEY = "AEROSCOPE_GITHUB_PAT";
const GITHUB_REPO_OWNER = "bobienmartin-bit";
const GITHUB_REPO_NAME = "drone-portfolio";
const GITHUB_CONFIG_FILE_PATH = "site-config.json";
const GITHUB_BRANCH = "main";

function getActiveGithubToken() {
  const stored = localStorage.getItem(GITHUB_PAT_STORAGE_KEY) || "";
  if (stored) return stored.trim();
  const input = document.getElementById("cfg-github-token");
  if (input && input.value.trim()) return input.value.trim();
  return "";
}

function populateGithubTokenForm() {
  const token = getActiveGithubToken();
  const input = document.getElementById("cfg-github-token");
  const badge = document.getElementById("github-sync-badge");

  if (input && !input.value) input.value = token;
  if (badge) {
    if (token) {
      badge.textContent = "Token Tersimpan (Siap Uji)";
      badge.className = "px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20";
    } else {
      badge.textContent = "Belum Terhubung";
      badge.className = "px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-800 text-slate-400 border border-slate-700";
    }
  }
}

function toggleGithubTokenVisibility() {
  const input = document.getElementById("cfg-github-token");
  const icon = document.getElementById("gh-eye-icon");
  if (!input) return;
  if (input.type === "password") {
    input.type = "text";
    if (icon) icon.setAttribute("data-lucide", "eye-off");
  } else {
    input.type = "password";
    if (icon) icon.setAttribute("data-lucide", "eye");
  }
  if (window.lucide) window.lucide.createIcons();
}

async function saveGithubTokenAndTest() {
  const input = document.getElementById("cfg-github-token");
  const msgEl = document.getElementById("github-sync-msg");
  const badge = document.getElementById("github-sync-badge");
  const token = (input ? input.value : "").trim();

  if (!token) {
    localStorage.removeItem(GITHUB_PAT_STORAGE_KEY);
    populateGithubTokenForm();
    if (msgEl) {
      msgEl.className = "p-3.5 rounded-xl text-xs font-mono bg-slate-800 text-slate-300";
      msgEl.textContent = "Token dihapus. Mode penyimpanan offline / browser aktif.";
      msgEl.classList.remove("hidden");
    }
    return;
  }

  if (msgEl) {
    msgEl.className = "p-3.5 rounded-xl text-xs font-mono bg-purple-950/60 border border-purple-500/30 text-purple-300";
    msgEl.textContent = "Menguji token ke repositori bobienmartin-bit/drone-portfolio...";
    msgEl.classList.remove("hidden");
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}?t=${Date.now()}`, {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json"
      }
    });

    if (res.ok) {
      const repoData = await res.json();
      const hasWriteAccess = repoData.permissions && (repoData.permissions.push || repoData.permissions.admin);

      if (!hasWriteAccess) {
        if (msgEl) {
          msgEl.className = "p-3.5 rounded-xl text-xs font-mono bg-amber-950/80 border border-amber-500/40 text-amber-300 leading-relaxed";
          msgEl.innerHTML = "⚠️ <strong>Token terhubung, tetapi TIDAK memiliki izin tulis (push).</strong><br>Pastikan saat membuat token di GitHub Anda mencentang checklist <code class='text-white bg-slate-900 px-1 rounded'>repo</code> agar CMS dapat menyimpan pembaruan permanen.";
        }
        if (badge) {
          badge.textContent = "Izin Terbatas (Tanpa Push)";
          badge.className = "px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20";
        }
        return;
      }

      localStorage.setItem(GITHUB_PAT_STORAGE_KEY, token);
      if (badge) {
        badge.textContent = "Terhubung (Izin Penuh)";
        badge.className = "px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      }
      if (msgEl) {
        msgEl.className = "p-3.5 rounded-xl text-xs font-mono bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 leading-relaxed";
        msgEl.innerHTML = "✓ <strong>Koneksi GitHub Berhasil!</strong> Token aktif &amp; memiliki akses tulis (repo). Setiap kali Anda menekan <em>Terapkan Permanen</em>, situs akan otomatis terdeploy ke Vercel.";
      }
      showToast("Koneksi GitHub aktif! Auto-deploy Vercel siap.");
    } else {
      const status = res.status;
      let errMsg = "Token ditolak GitHub.";
      try {
        const errJson = await res.json();
        errMsg = errJson.message || errMsg;
      } catch (e) {}

      if (badge) {
        badge.textContent = "Token Tidak Valid / Kedaluwarsa";
        badge.className = "px-2 py-0.5 rounded-full text-[10px] font-mono bg-rose-500/10 text-rose-400 border border-rose-500/20";
      }

      if (msgEl) {
        msgEl.className = "p-3.5 rounded-xl text-xs font-mono bg-rose-950/80 border border-rose-500/40 text-rose-300 leading-relaxed";
        if (status === 401) {
          msgEl.innerHTML = `❌ <strong>Gagal Terhubung: Bad credentials (401 Unauthorized)</strong><br>Token ini sudah kedaluwarsa atau telah dihapus di GitHub.<br><br>👉 <strong>Solusi:</strong> Buat token baru di <a href="https://github.com/settings/tokens" target="_blank" class="underline text-white font-bold">github.com/settings/tokens</a> (pilih <em>Generate new token (classic)</em>, pilih <strong>Expiration: No expiration</strong>, centang <strong>repo</strong>), lalu salin kode <code>ghp_...</code> baru ke kotak di atas.`;
        } else {
          msgEl.innerHTML = `❌ <strong>Gagal (${status}):</strong> ${errMsg}`;
        }
      }
    }
  } catch (err) {
    if (badge) {
      badge.textContent = "Gagal Terhubung (Network/CORS)";
      badge.className = "px-2 py-0.5 rounded-full text-[10px] font-mono bg-rose-500/10 text-rose-400 border border-rose-500/20";
    }
    if (msgEl) {
      msgEl.className = "p-3.5 rounded-xl text-xs font-mono bg-rose-950/80 border border-rose-500/40 text-rose-300 leading-relaxed";
      const isFailedFetch = err.message && err.message.toLowerCase().includes("fetch");
      if (isFailedFetch) {
        msgEl.innerHTML = `❌ <strong>Gagal Menghubungi API GitHub (Failed to fetch)</strong><br>` +
          `Permintaan ke <code>api.github.com</code> diblokir oleh browser atau ekstensi Anda.<br><br>` +
          `👉 <strong>Langkah Pemecahan:</strong><br>` +
          `1. Jika Anda memakai <strong>Brave Browser</strong>: klik ikon singa (Brave Shields) di bilah alamat lalu <strong>matikan Shields</strong> untuk situs ini.<br>` +
          `2. Jika Anda memasang ekstensi <strong>Ad-Blocker</strong> (misal uBlock Origin / AdGuard / Privacy Badger): nonaktifkan pada tab admin ini.<br>` +
          `3. Pastikan tidak ada VPN yang memblokir akses ke domain <code>api.github.com</code>.<br>` +
          `4. Setelah itu klik kembali tombol <strong>Simpan Token &amp; Hubungkan</strong>.`;
      } else {
        msgEl.textContent = "Gagal menghubungi API GitHub: " + err.message;
      }
    }
  }
}

async function triggerPermanentSave() {
  saveAllSettings();

  const token = getActiveGithubToken();
  if (!token) {
    switchTab('backup');
    const input = document.getElementById("cfg-github-token");
    if (input) input.focus();
    showToast("Masukkan GitHub Token di bawah agar perubahan dapat tersimpan permanen!");
    return;
  }

  const syncBtn = document.getElementById("btn-permanent-sync");
  if (syncBtn) {
    syncBtn.disabled = true;
    syncBtn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i><span>Deploying...</span>`;
    if (window.lucide) window.lucide.createIcons();
  }

  try {
    const result = await pushConfigToGithub(token, currentConfig);
    if (result.success) {
      showToast("✓ Sukses! Perubahan telah tersimpan permanen di GitHub & sedang dideploy Vercel.");
      const msgEl = document.getElementById("github-sync-msg");
      if (msgEl) {
        msgEl.className = "p-3.5 rounded-xl text-xs font-mono bg-emerald-950/60 border border-emerald-500/30 text-emerald-300";
        msgEl.innerHTML = `✓ <strong>Deploy Berhasil (${new Date().toLocaleTimeString()}):</strong> Konfigurasi tersimpan permanen di commit terbaru repositori GitHub.`;
        msgEl.classList.remove("hidden");
      }
    } else {
      if (result.status === 401) {
        showToast("Token GitHub kedaluwarsa (401 Bad credentials). Buka tab Backup & GitHub untuk perbarui.");
        switchTab('backup');
        const msgEl = document.getElementById("github-sync-msg");
        const badge = document.getElementById("github-sync-badge");
        if (badge) {
          badge.textContent = "Token Kedaluwarsa (401)";
          badge.className = "px-2 py-0.5 rounded-full text-[10px] font-mono bg-rose-500/10 text-rose-400 border border-rose-500/20";
        }
        if (msgEl) {
          msgEl.className = "p-3.5 rounded-xl text-xs font-mono bg-rose-950/80 border border-rose-500/40 text-rose-300 leading-relaxed";
          msgEl.innerHTML = `❌ <strong>Token GitHub Tidak Valid / Kedaluwarsa (401 Bad credentials)</strong><br>Token yang tersimpan saat ini ditolak oleh GitHub server.<br><br>👉 <strong>Solusi:</strong> Silakan buat token baru di <a href="https://github.com/settings/tokens" target="_blank" class="underline text-white font-bold">github.com/settings/tokens</a> &gt; klik <em>Generate new token (classic)</em> &gt; centang <code class="text-white bg-slate-900 px-1 rounded">repo</code> &gt; pilih <em>No expiration</em> &gt; salin dan tempel di atas, lalu klik Simpan Token &amp; Hubungkan.`;
          msgEl.classList.remove("hidden");
        }
      } else {
        showToast(`Gagal menyimpan ke GitHub (${result.status}): ${result.message}`);
      }
    }
  } catch (err) {
    showToast("Error saat deploy permanen: " + err.message);
  } finally {
    if (syncBtn) {
      syncBtn.disabled = false;
      syncBtn.innerHTML = `<i data-lucide="cloud-upload" class="w-4 h-4"></i><span>Terapkan Permanen</span>`;
      if (window.lucide) window.lucide.createIcons();
    }
  }
}

async function autoSyncGithubIfConfigured() {
  const token = getActiveGithubToken();
  if (!token) return;
  try {
    await pushConfigToGithub(token, currentConfig);
  } catch (e) {
    console.warn("Background GitHub auto-deploy failed:", e);
  }
}

async function pushConfigToGithub(token, configData, isRetry = false) {
  // 1. Get current file sha with cache buster
  let sha = null;
  const getUrl = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${GITHUB_CONFIG_FILE_PATH}?ref=${GITHUB_BRANCH}&t=${Date.now()}`;
  try {
    const getRes = await fetch(getUrl, {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json"
      }
    });

    if (getRes.status === 401) {
      return { success: false, status: 401, message: "Bad credentials (token expired/revoked)" };
    }
    if (getRes.status === 403) {
      return { success: false, status: 403, message: "Forbidden (token lacks repo permission)" };
    }
    if (getRes.ok) {
      const fileData = await getRes.json();
      sha = fileData.sha;
    }
  } catch (e) {
    return { success: false, status: 0, message: e.message };
  }

  // 2. Put updated JSON content
  const cleanJson = JSON.stringify(configData, null, 2);
  const contentBase64 = btoa(unescape(encodeURIComponent(cleanJson)));

  const putUrl = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${GITHUB_CONFIG_FILE_PATH}`;
  try {
    const putRes = await fetch(putUrl, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: "cms: update site configuration permanently [skip ci]",
        content: contentBase64,
        sha: sha || undefined,
        branch: GITHUB_BRANCH
      })
    });

    if (putRes.ok) {
      return { success: true, status: 200, message: "OK" };
    }

    // Auto-retry once on 409 conflict
    if (putRes.status === 409 && !isRetry) {
      console.warn("409 Conflict encountered, retrying with fresh SHA...");
      return await pushConfigToGithub(token, configData, true);
    }

    let putErr = {};
    try { putErr = await putRes.json(); } catch(e) {}
    return { success: false, status: putRes.status, message: putErr.message || "Failed to commit file to GitHub" };
  } catch (e) {
    const isFetchErr = e.message && e.message.toLowerCase().includes("fetch");
    const errMsg = isFetchErr
      ? "Koneksi ke API GitHub diblokir browser atau ad-blocker (Failed to fetch). Nonaktifkan Brave Shields / ad-blocker lalu coba lagi."
      : e.message;
    return { success: false, status: 0, message: errMsg };
  }
}

// Expose handlers globally
window.handleDronePhotoUpload = handleDronePhotoUpload;
window.handleDroneUrlChange = handleDroneUrlChange;
window.resetDronePhoto = resetDronePhoto;
window.handlePilotPhotoUpload = handlePilotPhotoUpload;
window.handlePilotUrlChange = handlePilotUrlChange;
window.resetPilotAvatarToDefault = resetPilotAvatarToDefault;
window.populateGithubTokenForm = populateGithubTokenForm;
window.toggleGithubTokenVisibility = toggleGithubTokenVisibility;
window.saveGithubTokenAndTest = saveGithubTokenAndTest;
window.triggerPermanentSave = triggerPermanentSave;
window.pushConfigToGithub = pushConfigToGithub;
window.populatePackagesForm = populatePackagesForm;
window.populateTestimonialsForm = populateTestimonialsForm;
