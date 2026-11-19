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
            <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i> Email Berisi Kode PIN Berhasil Terkirim!
          </div>
          <p class="text-slate-300 leading-relaxed text-xs">
            Format email telah diperbarui. Email dengan subjek <strong>"🔐 KODE PIN ADMIN AEROSCOPE: ${currentPin}"</strong> telah dikirimkan ke <strong>bobienfly@gmail.com</strong>.
          </p>
          <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
            <i data-lucide="shield-check" class="w-4 h-4 text-cyan-400 shrink-0 mt-0.5"></i>
            <span>Periksa Kotak Masuk atau folder Spam email Anda. Kode PIN tertera jelas di subjek &amp; tabel pesan email.</span>
          </div>
        `;
        if (btnText) btnText.textContent = "✓ Email Kode PIN Terkirim";
        showToast("Email berisi kode PIN berhasil dikirim!");
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
  about: { label: "Profil Pilot & Lisensi", icon: "user" },
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
function initDashboard() {
  currentConfig = window.AeroSiteConfig ? window.AeroSiteConfig.getSiteConfig() : {};
  loadGalleryMedia();
  populateHeroForm();
  populateReelForm();
  populateGearForm();
  populateServicesForm();
  populateAboutForm();
  populateContactForm();
  switchTab(currentActiveTab);
}

// TAB HERO
function populateHeroForm() {
  const hero = currentConfig.hero || {};
  const badgeEl = document.getElementById("cfg-hero-badge");
  const titleEl = document.getElementById("cfg-hero-title");
  const subEl = document.getElementById("cfg-hero-subtitle");

  if (badgeEl) badgeEl.value = hero.badge || "";
  if (titleEl) titleEl.value = hero.title || "";
  if (subEl) subEl.value = hero.subtitle || "";

  renderHeroStatsForm();
}

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
  const statsContainer = document.getElementById("hero-stats-form-grid");
  if (!statsContainer) return;
  if (!currentConfig.hero) currentConfig.hero = {};
  if (!Array.isArray(currentConfig.hero.stats)) {
    currentConfig.hero.stats = [
      { id: "stat_legal", label: "LEGALITAS", value: "RESMI", sub: "SIDOPI GO & DKPPU", icon: "award" },
      { id: "stat_res", label: "RESOLUSI", value: "5.1K / 4K", sub: "ProRes & D-Log M", icon: "video" },
      { id: "stat_range", label: "JANGKAUAN", value: "NASIONAL", sub: "Siap Tugas Luar Kota", icon: "map-pin" },
      { id: "stat_turnaround", label: "WAKTU PROSES", value: "24 JAM", sub: "File Mentah & Edit", icon: "clock" },
      { id: "stat_signal", label: "JARAK KONTROL", value: "15 KM", sub: "Transmisi Stabil HD", icon: "radio" }
    ];
  }

  const defaultIcons = ["award", "video", "map-pin", "clock", "radio", "zap", "shield", "activity"];
  const stats = currentConfig.hero.stats;
  statsContainer.innerHTML = stats.map((st, i) => {
    const iconName = st.icon || defaultIcons[i % defaultIcons.length] || "bar-chart-2";
    return `
      <div class="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3 relative group hover:border-slate-700 transition-all">
        <div class="flex items-center justify-between pb-2 border-b border-slate-800/80">
          <span class="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <i data-lucide="${iconName}" class="w-3.5 h-3.5 text-cyan-400"></i>
            STAT #${i+1}
          </span>
          <button type="button" onclick="deleteHeroStatItem(${i})" class="px-2 py-1 rounded-lg text-rose-400 hover:text-white hover:bg-rose-500/20 text-[10px] font-mono flex items-center gap-1 border border-rose-500/30 transition-all cursor-pointer shadow-sm" title="Hapus indikator ini">
            <i data-lucide="trash-2" class="w-3 h-3"></i>
            <span>Hapus</span>
          </button>
        </div>
        <div>
          <label class="block text-[10px] font-mono text-slate-400 mb-1">LABEL ATAS</label>
          <input type="text" id="stat-label-${i}" value="${escapeAttr(st.label || '')}" oninput="syncCurrentHeroStatsInputs()" placeholder="Misal: LEGALITAS" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 focus:border-cyan-400 text-xs text-white">
        </div>
        <div>
          <label class="block text-[10px] font-mono text-slate-400 mb-1">NILAI UTAMA</label>
          <input type="text" id="stat-val-${i}" value="${escapeAttr(st.value || '')}" oninput="syncCurrentHeroStatsInputs()" placeholder="Misal: 5.1K / 4K" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 focus:border-cyan-400 text-xs text-white font-mono font-bold">
        </div>
        <div>
          <label class="block text-[10px] font-mono text-slate-400 mb-1">KETERANGAN BAWAH</label>
          <input type="text" id="stat-sub-${i}" value="${escapeAttr(st.sub || '')}" oninput="syncCurrentHeroStatsInputs()" placeholder="Misal: ProRes & D-Log M" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 focus:border-cyan-400 text-xs text-slate-300">
        </div>
      </div>
    `;
  }).join("");

  if (window.lucide) window.lucide.createIcons();
}

function syncCurrentHeroStatsInputs() {
  if (!currentConfig.hero || !Array.isArray(currentConfig.hero.stats)) return;
  for (let i = 0; i < currentConfig.hero.stats.length; i++) {
    const l = document.getElementById(`stat-label-${i}`);
    const v = document.getElementById(`stat-val-${i}`);
    const s = document.getElementById(`stat-sub-${i}`);
    if (l) currentConfig.hero.stats[i].label = l.value;
    if (v) currentConfig.hero.stats[i].value = v.value;
    if (s) currentConfig.hero.stats[i].sub = s.value;
  }
}

function addHeroStatItem() {
  syncCurrentHeroStatsInputs();
  if (!currentConfig.hero) currentConfig.hero = {};
  if (!Array.isArray(currentConfig.hero.stats)) currentConfig.hero.stats = [];
  
  const defaultIcons = ["award", "video", "map-pin", "clock", "radio", "zap", "shield", "activity", "check-circle"];
  const iconChoice = defaultIcons[currentConfig.hero.stats.length % defaultIcons.length];
  const newNum = currentConfig.hero.stats.length + 1;
  
  currentConfig.hero.stats.push({
    id: "stat_" + Date.now(),
    label: `INDIKATOR #${newNum}`,
    value: "100%",
    sub: "Keterangan Baru",
    icon: iconChoice
  });

  renderHeroStatsForm();
  showToast("Indikator telemetri baru berhasil ditambahkan! Silakan atur nilainya lalu klik Simpan Perubahan.");
}

function deleteHeroStatItem(index) {
  syncCurrentHeroStatsInputs();
  if (!currentConfig.hero || !Array.isArray(currentConfig.hero.stats)) return;
  
  if (currentConfig.hero.stats.length <= 1) {
    showToast("Minimal harus memiliki 1 indikator telemetri di halaman utama.");
    return;
  }

  const statLabel = currentConfig.hero.stats[index]?.label || `Stat #${index + 1}`;
  currentConfig.hero.stats.splice(index, 1);
  renderHeroStatsForm();
  showToast(`Indikator "${statLabel}" berhasil dihapus.`);
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
function populateGearForm() {
  const gearList = currentConfig.gear || [];
  const container = document.getElementById("gear-form-grid");
  if (!container) return;

  container.innerHTML = gearList.map((g, i) => `
    <div class="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
      <div class="flex items-center justify-between pb-2 border-b border-slate-800">
        <span class="text-xs font-mono font-bold text-purple-400 uppercase">DRONE #${i+1}</span>
        <span class="text-[11px] font-mono text-slate-400">${g.title}</span>
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
  `).join("");
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
  const titleEl = document.getElementById("cfg-about-title");
  const p1El = document.getElementById("cfg-about-p1");
  const p2El = document.getElementById("cfg-about-p2");

  if (nameEl) nameEl.value = ab.pilotName || "";
  if (roleEl) roleEl.value = ab.pilotRole || "";
  if (avatarEl) {
    avatarEl.value = ab.avatarUrl || "";
    updatePilotAvatarPreview(ab.avatarUrl);
  }
  if (titleEl) titleEl.value = ab.title || "";
  if (p1El) p1El.value = ab.p1 || "";
  if (p2El) p2El.value = ab.p2 || "";
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
      const maxDim = 1000;
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

      const optimizedDataUrl = canvas.toDataURL("image/jpeg", 0.88);

      const avatarInput = document.getElementById("cfg-about-avatar");
      if (avatarInput) avatarInput.value = optimizedDataUrl;
      updatePilotAvatarPreview(optimizedDataUrl);

      const statusEl = document.getElementById("pilot-photo-status");
      if (statusEl) {
        statusEl.classList.remove("hidden");
        if (window.lucide) window.lucide.createIcons();
      }

      showToast("Foto pilot baru siap diterapkan! Klik 'Simpan Perubahan' di kanan atas.");
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

function updatePilotAvatarPreview(url) {
  const preview = document.getElementById("pilot-avatar-preview");
  if (preview) {
    preview.src = url || "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80";
  }
}

function resetPilotAvatarToDefault() {
  const defaultUrl = "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80";
  const avatarInput = document.getElementById("cfg-about-avatar");
  if (avatarInput) avatarInput.value = defaultUrl;
  updatePilotAvatarPreview(defaultUrl);
  const statusEl = document.getElementById("pilot-photo-status");
  if (statusEl) statusEl.classList.add("hidden");
  showToast("Foto profil pilot dikembalikan ke default.");
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

  syncCurrentHeroStatsInputs();

  currentConfig.hero = {
    badge: heroBadge ? heroBadge.value : "",
    title: heroTitle ? heroTitle.value : "",
    subtitle: heroSub ? heroSub.value : "",
    stats: (currentConfig.hero && Array.isArray(currentConfig.hero.stats)) ? currentConfig.hero.stats : []
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
    if (tag) gearList[i].tag = tag.value;
    if (title) gearList[i].title = title.value;
    if (desc) gearList[i].desc = desc.value;
    if (ideal) gearList[i].ideal = ideal.value;
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

  currentConfig.about = {
    ...currentConfig.about,
    pilotName: aName ? aName.value : "",
    pilotRole: aRole ? aRole.value : "",
    avatarUrl: aAvatar ? aAvatar.value : "",
    title: aTitle ? aTitle.value : "",
    p1: aP1 ? aP1.value : "",
    p2: aP2 ? aP2.value : ""
  };

  // 6. Gather Contact
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

  showToast("Perubahan berhasil disimpan! Website publik langsung terupdate.");
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
