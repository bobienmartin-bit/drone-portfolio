// ========================================================
// AEROSCOPE CMS STUDIO: ADMIN CONTROLLER
// ========================================================

let currentMediaList = [];
let currentFilter = "all";
let pendingUploadFile = null;

document.addEventListener("DOMContentLoaded", async () => {
  if (window.lucide) window.lucide.createIcons();

  initConnectionStatus();
  setupAdminEventListeners();

  if (window.AeroSupabase.isSupabaseConfigured()) {
    await loadCmsMedia();
  } else {
    showSetupBanner(true);
  }
});

// ========================================================
// 1. Connection Status & UI Setup
// ========================================================
function initConnectionStatus() {
  const isConfigured = window.AeroSupabase.isSupabaseConfigured();
  const connPill = document.getElementById("conn-status-pill");
  const connDot = document.getElementById("conn-dot");
  const connLabel = document.getElementById("conn-label");

  if (!connPill) return;

  if (isConfigured) {
    connDot.className = "w-2 h-2 rounded-full bg-emerald-400 pulse-radar";
    connLabel.textContent = "Supabase Terhubung";
    connLabel.className = "text-emerald-400 font-mono text-xs";
    connPill.className = "hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono border bg-emerald-950/40 border-emerald-500/30 text-emerald-300";
    showSetupBanner(false);
  } else {
    connDot.className = "w-2 h-2 rounded-full bg-amber-400";
    connLabel.textContent = "Supabase Belum Diatur";
    connLabel.className = "text-amber-400 font-mono text-xs";
    connPill.className = "hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono border bg-amber-950/40 border-amber-500/30 text-amber-300";
    showSetupBanner(true);
  }
}

function showSetupBanner(show) {
  const banner = document.getElementById("setup-banner");
  if (banner) {
    if (show) banner.classList.remove("hidden");
    else banner.classList.add("hidden");
  }
}

// ========================================================
// 2. Data Loading & Rendering
// ========================================================
async function loadCmsMedia() {
  const tbody = document.getElementById("media-table-body");
  const emptyState = document.getElementById("table-empty-state");
  if (!tbody) return;

  tbody.innerHTML = `
    <tr>
      <td colspan="6" class="py-12 text-center text-slate-400 font-mono text-xs">
        <div class="inline-flex items-center gap-2">
          <i data-lucide="loader-2" class="w-4 h-4 animate-spin text-cyan-400"></i>
          <span>Memuat data dari database Supabase...</span>
        </div>
      </td>
    </tr>
  `;
  if (window.lucide) window.lucide.createIcons();

  try {
    const data = await window.AeroSupabase.fetchMediaFromSupabase();
    if (!data) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="py-8 text-center text-rose-400 font-mono text-xs">
            Gagal menghubungkan ke tabel <code>portfolio_media</code>. Pastikan skrip SQL sudah dijalankan di Supabase.
          </td>
        </tr>
      `;
      return;
    }

    currentMediaList = data;
    updateStats(data);
    renderMediaTable();
  } catch (err) {
    console.error("Load media error:", err);
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="py-8 text-center text-rose-400 font-mono text-xs">
          Terjadi kesalahan saat memuat media: ${err.message}
        </td>
      </tr>
    `;
  }
}

function renderMediaTable() {
  const tbody = document.getElementById("media-table-body");
  const emptyState = document.getElementById("table-empty-state");
  if (!tbody) return;

  const filtered = currentMediaList.filter(item => {
    if (currentFilter === "all") return true;
    return item.type === currentFilter;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = "";
    if (emptyState) emptyState.classList.remove("hidden");
    return;
  }

  if (emptyState) emptyState.classList.add("hidden");

  tbody.innerHTML = filtered.map(item => {
    const isVideo = item.type === "video";
    const dateFormatted = item.createdAt 
      ? new Date(item.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
      : "-";

    return `
      <tr class="hover:bg-slate-900/60 transition-colors group">
        <!-- Media Preview -->
        <td class="py-4 px-6">
          <div class="relative w-20 h-14 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex-shrink-0">
            ${isVideo ? `
              <video src="${item.mediaUrl}" poster="${item.thumbnailUrl || ''}" muted class="w-full h-full object-cover"></video>
              <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
                <i data-lucide="play" class="w-4 h-4 text-cyan-400 fill-current"></i>
              </div>
            ` : `
              <img src="${item.thumbnailUrl || item.mediaUrl}" alt="${item.title}" class="w-full h-full object-cover">
            `}
          </div>
        </td>

        <!-- Title & Category -->
        <td class="py-4 px-6">
          <div class="font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
            ${item.title}
          </div>
          <div class="flex items-center gap-2 mt-1">
            <span class="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400 capitalize">
              ${item.category}
            </span>
            ${item.isFeatured ? `
              <span class="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Featured
              </span>
            ` : ''}
          </div>
        </td>

        <!-- Drone & Specs -->
        <td class="py-4 px-6 font-mono text-xs">
          <div class="text-slate-200 flex items-center gap-1">
            <i data-lucide="plane" class="w-3.5 h-3.5 text-cyan-400"></i> ${item.drone || 'Drone'}
          </div>
          <div class="text-[11px] text-slate-500 mt-0.5">${item.altitude || '120m'} • ${item.specs || '4K'}</div>
        </td>

        <!-- Type Badge -->
        <td class="py-4 px-6">
          ${isVideo ? `
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <i data-lucide="video" class="w-3.5 h-3.5"></i> Video
            </span>
          ` : `
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
              <i data-lucide="camera" class="w-3.5 h-3.5"></i> Foto
            </span>
          `}
        </td>

        <!-- Date -->
        <td class="py-4 px-6 font-mono text-xs text-slate-400">
          ${dateFormatted}
        </td>

        <!-- Actions -->
        <td class="py-4 px-6 text-right space-x-2">
          <a href="${item.mediaUrl}" target="_blank" title="Buka File" class="inline-block p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800">
            <i data-lucide="external-link" class="w-4 h-4"></i>
          </a>
          <button onclick="editMediaItem('${item.id}')" title="Edit Data" class="p-2 rounded-lg bg-slate-900 text-cyan-400 hover:text-cyan-300 hover:bg-slate-800">
            <i data-lucide="edit-3" class="w-4 h-4"></i>
          </button>
          <button onclick="deleteMediaItem('${item.id}', '${item.mediaUrl}')" title="Hapus Media" class="p-2 rounded-lg bg-slate-900 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </td>
      </tr>
    `;
  }).join("");

  if (window.lucide) window.lucide.createIcons();
}

function updateStats(items) {
  const totalElem = document.getElementById("stat-total");
  const videoElem = document.getElementById("stat-videos");
  const photoElem = document.getElementById("stat-photos");

  if (totalElem) totalElem.textContent = items.length;
  if (videoElem) videoElem.textContent = items.filter(i => i.type === "video").length;
  if (photoElem) photoElem.textContent = items.filter(i => i.type === "photo").length;
}

// ========================================================
// 3. Add / Edit Media Actions
// ========================================================
function openMediaModal(item = null) {
  const modal = document.getElementById("media-modal");
  const title = document.getElementById("media-modal-title");
  const form = document.getElementById("media-form");
  const idInput = document.getElementById("form-media-id");

  resetMediaForm();

  if (item) {
    title.textContent = "Edit Media Supabase";
    idInput.value = item.id;
    document.getElementById("form-title").value = item.title || "";
    document.getElementById("form-type").value = item.type || "video";
    document.getElementById("form-category").value = item.category || "landscape";
    document.getElementById("form-drone").value = item.drone || "";
    document.getElementById("form-altitude").value = item.altitude || "";
    document.getElementById("form-specs").value = item.specs || "";
    document.getElementById("form-location").value = item.location || "";
    document.getElementById("form-description").value = item.description || "";
    document.getElementById("form-featured").checked = Boolean(item.isFeatured);
    document.getElementById("form-media-url").value = item.mediaUrl || "";
  } else {
    title.textContent = "Tambah Media ke Supabase";
  }

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeMediaModal() {
  const modal = document.getElementById("media-modal");
  if (modal) modal.classList.add("hidden");
  document.body.style.overflow = "";
  resetMediaForm();
}

function resetMediaForm() {
  pendingUploadFile = null;
  const form = document.getElementById("media-form");
  const preview = document.getElementById("form-file-preview");
  const placeholder = document.getElementById("form-placeholder");
  const progressBox = document.getElementById("upload-progress-box");
  const fileInput = document.getElementById("form-file-input");

  if (form) form.reset();
  if (fileInput) fileInput.value = "";
  if (preview) {
    preview.innerHTML = "";
    preview.classList.add("hidden");
  }
  if (placeholder) placeholder.classList.remove("hidden");
  if (progressBox) progressBox.classList.add("hidden");
}

function editMediaItem(id) {
  const item = currentMediaList.find(i => i.id === id);
  if (item) openMediaModal(item);
}

async function deleteMediaItem(id, mediaUrl) {
  if (!confirm("Apakah Anda yakin ingin menghapus media ini dari database Supabase? File di Storage juga akan dibersihkan.")) {
    return;
  }

  try {
    await window.AeroSupabase.deleteMediaFromSupabase(id, mediaUrl);
    showCmsToast("Media berhasil dihapus dari Supabase!", "success");
    await loadCmsMedia();
  } catch (err) {
    console.error("Delete error:", err);
    showCmsToast("Gagal menghapus: " + err.message, "error");
  }
}

// Form Submission Handler
async function handleMediaFormSubmit(e) {
  e.preventDefault();

  const id = document.getElementById("form-media-id").value;
  const title = document.getElementById("form-title").value.trim();
  const type = document.getElementById("form-type").value;
  const category = document.getElementById("form-category").value;
  const drone = document.getElementById("form-drone").value.trim() || "DJI Mavic 3 Pro";
  const altitude = document.getElementById("form-altitude").value.trim() || "120m AGL";
  const specs = document.getElementById("form-specs").value.trim() || "4K UHD";
  const location = document.getElementById("form-location").value.trim() || "Indonesia";
  const description = document.getElementById("form-description").value.trim();
  const isFeatured = document.getElementById("form-featured").checked;
  let mediaUrl = document.getElementById("form-media-url").value.trim();

  const submitBtn = document.getElementById("form-submit-btn");
  const submitLabel = document.getElementById("form-submit-label");
  const progressBox = document.getElementById("upload-progress-box");
  const progressBar = document.getElementById("upload-progress-bar");
  const progressPct = document.getElementById("upload-progress-pct");
  const progressText = document.getElementById("upload-progress-text");

  // If a new file was chosen, upload to Supabase Storage first
  if (pendingUploadFile) {
    submitBtn.disabled = true;
    progressBox.classList.remove("hidden");
    progressBar.style.width = "40%";
    progressPct.textContent = "40%";
    progressText.textContent = `Mengunggah ${pendingUploadFile.name} ke Supabase Storage...`;

    try {
      mediaUrl = await window.AeroSupabase.uploadMediaFileToStorage(pendingUploadFile);
      progressBar.style.width = "100%";
      progressPct.textContent = "100%";
      progressText.textContent = "Upload selesai! Menyimpan data...";
    } catch (uploadErr) {
      console.error("Storage upload error:", uploadErr);
      showCmsToast("Gagal upload file ke Storage: " + uploadErr.message, "error");
      submitBtn.disabled = false;
      progressBox.classList.add("hidden");
      return;
    }
  }

  if (!mediaUrl) {
    showCmsToast("Silakan pilih file foto/video untuk diunggah atau masukkan URL media!", "warning");
    return;
  }

  submitBtn.disabled = true;
  submitLabel.textContent = "Menyimpan...";

  const payload = {
    title,
    type,
    category,
    drone,
    altitude,
    specs,
    location,
    description,
    isFeatured,
    mediaUrl,
    thumbnailUrl: mediaUrl
  };

  try {
    if (id) {
      await window.AeroSupabase.updateMediaInSupabase(id, payload);
      showCmsToast("Data media berhasil diperbarui di Supabase!", "success");
    } else {
      await window.AeroSupabase.insertMediaToSupabase(payload);
      showCmsToast("Karya baru berhasil ditambahkan ke Supabase!", "success");
    }

    closeMediaModal();
    await loadCmsMedia();
  } catch (dbErr) {
    console.error("Database save error:", dbErr);
    showCmsToast("Gagal menyimpan ke database: " + dbErr.message, "error");
  } finally {
    submitBtn.disabled = false;
    submitLabel.textContent = "Simpan ke Supabase";
  }
}

// ========================================================
// 4. Config Modal & Test Connection
// ========================================================
function openConfigModal() {
  const modal = document.getElementById("config-modal");
  const cfg = window.AeroSupabase.getSupabaseConfig();
  document.getElementById("cfg-url").value = cfg.url || "";
  document.getElementById("cfg-key").value = cfg.anonKey || "";
  document.getElementById("cfg-test-result").classList.add("hidden");
  modal.classList.remove("hidden");
}

function closeConfigModal() {
  document.getElementById("config-modal").classList.add("hidden");
}

async function testConnectionFromModal() {
  const url = document.getElementById("cfg-url").value.trim();
  const key = document.getElementById("cfg-key").value.trim();
  const resBox = document.getElementById("cfg-test-result");

  if (!url || !key) {
    resBox.className = "p-3 rounded-xl text-xs font-mono bg-amber-950/60 text-amber-300 border border-amber-500/30";
    resBox.textContent = "Isi URL dan Anon Key terlebih dahulu.";
    resBox.classList.remove("hidden");
    return;
  }

  resBox.className = "p-3 rounded-xl text-xs font-mono bg-slate-900 text-cyan-300 border border-cyan-500/30";
  resBox.textContent = "Sedang menguji koneksi ke Supabase...";
  resBox.classList.remove("hidden");

  const res = await window.AeroSupabase.testSupabaseConnection(url, key);
  if (res.success) {
    resBox.className = "p-3 rounded-xl text-xs font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-500/30";
    resBox.textContent = "✓ Koneksi Berhasil! Terhubung ke tabel portfolio_media.";
  } else {
    resBox.className = "p-3 rounded-xl text-xs font-mono bg-rose-950/60 text-rose-300 border border-rose-500/30";
    resBox.textContent = "✗ Koneksi Gagal: " + res.message;
  }
}

function handleConfigSubmit(e) {
  e.preventDefault();
  const url = document.getElementById("cfg-url").value.trim();
  const key = document.getElementById("cfg-key").value.trim();

  window.AeroSupabase.saveSupabaseConfig(url, key);
  initConnectionStatus();
  closeConfigModal();
  showCmsToast("Konfigurasi Supabase berhasil disimpan!", "success");
  loadCmsMedia();
}

// ========================================================
// 5. SQL Modal & Clipboard
// ========================================================
function openSqlModal() {
  document.getElementById("sql-modal").classList.remove("hidden");
}
function closeSqlModal() {
  document.getElementById("sql-modal").classList.add("hidden");
}
function copySqlCode() {
  const code = document.getElementById("sql-code-block").innerText;
  navigator.clipboard.writeText(code).then(() => {
    const btn = document.getElementById("copy-sql-btn");
    btn.innerHTML = `<i data-lucide="check" class="w-4 h-4"></i> Berhasil Disalin!`;
    if (window.lucide) window.lucide.createIcons();
    setTimeout(() => {
      btn.innerHTML = `<i data-lucide="copy" class="w-4 h-4"></i> Salin Skrip SQL`;
      if (window.lucide) window.lucide.createIcons();
    }, 2000);
  });
}

// ========================================================
// 6. Event Listeners Setup
// ========================================================
function setupAdminEventListeners() {
  // Dropzone file selection
  const dropzone = document.getElementById("form-dropzone");
  const fileInput = document.getElementById("form-file-input");

  if (dropzone && fileInput) {
    dropzone.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        handleFileSelection(e.target.files[0]);
      }
    });

    ["dragenter", "dragover"].forEach(evt => {
      dropzone.addEventListener(evt, (e) => {
        e.preventDefault();
        dropzone.classList.add("border-cyan-400", "bg-cyan-500/10");
      });
    });

    ["dragleave", "drop"].forEach(evt => {
      dropzone.addEventListener(evt, (e) => {
        e.preventDefault();
        dropzone.classList.remove("border-cyan-400", "bg-cyan-500/10");
      });
    });

    dropzone.addEventListener("drop", (e) => {
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileSelection(e.dataTransfer.files[0]);
      }
    });
  }

  // Media Form submit
  const mediaForm = document.getElementById("media-form");
  if (mediaForm) mediaForm.addEventListener("submit", handleMediaFormSubmit);

  // Config Form submit
  const configForm = document.getElementById("config-form");
  if (configForm) configForm.addEventListener("submit", handleConfigSubmit);

  // Filter buttons
  const filterBtns = document.querySelectorAll(".cms-filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => {
        b.classList.remove("bg-cyan-500", "text-slate-950", "font-bold");
        b.classList.add("bg-slate-900", "text-slate-300");
      });
      btn.classList.add("bg-cyan-500", "text-slate-950", "font-bold");
      btn.classList.remove("bg-slate-900", "text-slate-300");
      currentFilter = btn.dataset.filter || "all";
      renderMediaTable();
    });
  });
}

function handleFileSelection(file) {
  pendingUploadFile = file;
  const isVideo = file.type.startsWith("video/");

  const typeSelect = document.getElementById("form-type");
  if (typeSelect) typeSelect.value = isVideo ? "video" : "photo";

  const titleInput = document.getElementById("form-title");
  if (titleInput && !titleInput.value) {
    const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
    titleInput.value = cleanName;
  }

  const placeholder = document.getElementById("form-placeholder");
  const preview = document.getElementById("form-file-preview");

  if (placeholder) placeholder.classList.add("hidden");
  if (preview) {
    preview.classList.remove("hidden");
    const tempUrl = URL.createObjectURL(file);
    if (isVideo) {
      preview.innerHTML = `
        <video src="${tempUrl}" class="w-full h-32 object-contain rounded-xl bg-black"></video>
        <p class="text-[11px] font-mono text-cyan-400 mt-2 text-center">Video Siap Upload: ${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB)</p>
      `;
    } else {
      preview.innerHTML = `
        <img src="${tempUrl}" class="w-full h-32 object-contain rounded-xl bg-black" />
        <p class="text-[11px] font-mono text-emerald-400 mt-2 text-center">Foto Siap Upload: ${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB)</p>
      `;
    }
  }
}

// Toast Notification
function showCmsToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  const colors = {
    success: "bg-emerald-900/90 border-emerald-500 text-emerald-200",
    error: "bg-rose-900/90 border-rose-500 text-rose-200",
    warning: "bg-amber-900/90 border-amber-500 text-amber-200",
    info: "bg-slate-900/90 border-cyan-500 text-cyan-200"
  };

  toast.className = `px-4 py-3 rounded-xl border backdrop-blur-md shadow-2xl flex items-center justify-between gap-3 text-sm transition-all duration-300 transform translate-y-4 opacity-0 ${colors[type] || colors.info}`;
  toast.innerHTML = `
    <span>${message}</span>
    <button class="opacity-70 hover:opacity-100 text-lg leading-none" onclick="this.parentElement.remove()">&times;</button>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.remove("translate-y-4", "opacity-0"), 10);
  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-4");
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Global window exposures
window.openMediaModal = openMediaModal;
window.closeMediaModal = closeMediaModal;
window.editMediaItem = editMediaItem;
window.deleteMediaItem = deleteMediaItem;
window.openConfigModal = openConfigModal;
window.closeConfigModal = closeConfigModal;
window.openSqlModal = openSqlModal;
window.closeSqlModal = closeSqlModal;
window.copySqlCode = copySqlCode;
window.loadCmsMedia = loadCmsMedia;
window.testConnectionFromModal = testConnectionFromModal;
