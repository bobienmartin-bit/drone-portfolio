// ========================================================
// AEROSCOPE: SUPABASE CLIENT & CMS ENGINE
// ========================================================

const STORAGE_KEY_CONFIG = "AEROSCOPE_SUPABASE_CONFIG";
const BUCKET_NAME = "drone-media";

// Default embedded config (User can also override via CMS Settings in localStorage)
const DEFAULT_CONFIG = {
  url: "",      // e.g. "https://xyzcompany.supabase.co"
  anonKey: ""   // e.g. "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
};

let supabaseClient = null;

/**
 * Get active Supabase configuration (from localStorage or DEFAULT_CONFIG)
 */
function getSupabaseConfig() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.url && parsed.anonKey) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Could not read Supabase config from storage", e);
  }
  return DEFAULT_CONFIG;
}

/**
 * Save Supabase config into localStorage
 */
function saveSupabaseConfig(url, anonKey) {
  const cleanUrl = (url || "").trim().replace(/\/+$/, "");
  const cleanKey = (anonKey || "").trim();
  const config = { url: cleanUrl, anonKey: cleanKey };
  localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
  supabaseClient = null; // reset client
  return initSupabase();
}

/**
 * Check if Supabase credentials are set
 */
function isSupabaseConfigured() {
  const config = getSupabaseConfig();
  return Boolean(config.url && config.anonKey);
}

/**
 * Initialize and get the Supabase Client instance
 */
function initSupabase() {
  if (supabaseClient) return supabaseClient;

  const config = getSupabaseConfig();
  if (!config.url || !config.anonKey) {
    return null;
  }

  if (typeof window.supabase === "undefined" || !window.supabase.createClient) {
    console.warn("Supabase JS SDK not loaded yet.");
    return null;
  }

  try {
    supabaseClient = window.supabase.createClient(config.url, config.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    });
    return supabaseClient;
  } catch (err) {
    console.error("Failed to initialize Supabase client:", err);
    return null;
  }
}

/**
 * Test connectivity with Supabase database
 */
async function testSupabaseConnection(url, anonKey) {
  try {
    const testClient = window.supabase.createClient(url, anonKey);
    const { data, error } = await testClient
      .from("portfolio_media")
      .select("id")
      .limit(1);

    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true, count: data ? data.length : 0 };
  } catch (err) {
    return { success: false, message: err.message || "Gagal menghubungi Supabase." };
  }
}

// ========================================================
// DATABASE OPERATIONS (portfolio_media)
// ========================================================

/**
 * Fetch all media records from Supabase
 */
async function fetchMediaFromSupabase() {
  const client = initSupabase();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from("portfolio_media")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase select error:", error);
      return null;
    }

    return (data || []).map(row => ({
      id: row.id,
      type: row.type,
      title: row.title,
      category: row.category,
      mediaUrl: row.media_url,
      thumbnailUrl: row.thumbnail_url || row.media_url,
      drone: row.drone || "DJI Drone",
      altitude: row.altitude || "120m AGL",
      specs: row.specs || "4K UHD",
      location: row.location || "Indonesia",
      description: row.description || "",
      isFeatured: Boolean(row.is_featured),
      createdAt: row.created_at,
      isSupabase: true
    }));
  } catch (err) {
    console.error("Failed to fetch from Supabase:", err);
    return null;
  }
}

/**
 * Insert a new media record into Supabase
 */
async function insertMediaToSupabase(item) {
  const client = initSupabase();
  if (!client) throw new Error("Supabase belum dikonfigurasi.");

  const payload = {
    type: item.type,
    title: item.title,
    category: item.category || "landscape",
    media_url: item.mediaUrl,
    thumbnail_url: item.thumbnailUrl || item.mediaUrl,
    drone: item.drone || "DJI Drone",
    altitude: item.altitude || "120m AGL",
    specs: item.specs || "4K 60fps",
    location: item.location || "Indonesia",
    description: item.description || "",
    is_featured: Boolean(item.isFeatured)
  };

  const { data, error } = await client
    .from("portfolio_media")
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update existing media record
 */
async function updateMediaInSupabase(id, item) {
  const client = initSupabase();
  if (!client) throw new Error("Supabase belum dikonfigurasi.");

  const payload = {
    type: item.type,
    title: item.title,
    category: item.category,
    media_url: item.mediaUrl,
    thumbnail_url: item.thumbnailUrl,
    drone: item.drone,
    altitude: item.altitude,
    specs: item.specs,
    location: item.location,
    description: item.description,
    is_featured: Boolean(item.isFeatured)
  };

  const { data, error } = await client
    .from("portfolio_media")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Delete a media record and its storage file
 */
async function deleteMediaFromSupabase(id, mediaUrl) {
  const client = initSupabase();
  if (!client) throw new Error("Supabase belum dikonfigurasi.");

  // 1. Delete from database
  const { error: dbError } = await client
    .from("portfolio_media")
    .delete()
    .eq("id", id);

  if (dbError) throw dbError;

  // 2. Try to remove from Storage bucket if hosted on Supabase
  if (mediaUrl && mediaUrl.includes(BUCKET_NAME)) {
    try {
      const urlParts = mediaUrl.split(`${BUCKET_NAME}/`);
      if (urlParts.length > 1) {
        const filePath = decodeURIComponent(urlParts[1].split("?")[0]);
        await client.storage.from(BUCKET_NAME).remove([filePath]);
      }
    } catch (storageErr) {
      console.warn("Storage cleanup warning:", storageErr);
    }
  }

  return true;
}

// ========================================================
// STORAGE OPERATIONS (Supabase Bucket 'drone-media')
// ========================================================

/**
 * Upload high-res photo or 4K video file to Supabase Storage
 */
async function uploadMediaFileToStorage(file, folder = "uploads") {
  const client = initSupabase();
  if (!client) throw new Error("Supabase belum dikonfigurasi.");

  // Generate safe sanitized filename with timestamp
  const ext = file.name.split(".").pop();
  const safeName = file.name
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-zA-Z0-9-_]/g, "_")
    .substring(0, 30);
  const filePath = `${folder}/${Date.now()}_${safeName}.${ext}`;

  const { data, error } = await client.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false
    });

  if (error) throw error;

  // Get public permanent URL
  const { data: publicUrlData } = client.storage
    .from(BUCKET_NAME)
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
}

// ========================================================
// AUTHENTICATION OPERATIONS
// ========================================================

async function signInAdmin(email, password) {
  const client = initSupabase();
  if (!client) throw new Error("Supabase belum dikonfigurasi.");

  const { data, error } = await client.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;
  return data;
}

async function signOutAdmin() {
  const client = initSupabase();
  if (!client) return;
  await client.auth.signOut();
}

async function getAdminSession() {
  const client = initSupabase();
  if (!client) return null;

  try {
    const { data: { session }, error } = await client.auth.getSession();
    if (error || !session) return null;
    return session;
  } catch (err) {
    return null;
  }
}

// Expose on global window object
window.AeroSupabase = {
  BUCKET_NAME,
  getSupabaseConfig,
  saveSupabaseConfig,
  isSupabaseConfigured,
  initSupabase,
  testSupabaseConnection,
  fetchMediaFromSupabase,
  insertMediaToSupabase,
  updateMediaInSupabase,
  deleteMediaFromSupabase,
  uploadMediaFileToStorage,
  signInAdmin,
  signOutAdmin,
  getAdminSession
};
