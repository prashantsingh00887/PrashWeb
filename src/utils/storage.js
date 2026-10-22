// Storage utilities for PrashWeb
import { getApiUrl } from './apiConfig';

const STORAGE_KEY = 'prashweb_portfolio_data_v1';

// Helper to remove duplicates from an array of objects
export const dedupeList = (list) => {
  if (!Array.isArray(list)) return [];
  const seen = new Set();
  return list.filter(item => {
    if (!item || typeof item !== 'object') return false;
    const key = String(item.id || item._id || item.title || item.name || '').trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export const loadStoredData = (defaultData) => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData;
    const parsed = JSON.parse(raw);

    const profile = { ...defaultData.profile, ...(parsed.profile || {}) };
    if (!profile.github || profile.github === 'https://github.com' || profile.github === 'https://github.com/prashantsingh') {
      profile.github = 'https://github.com/prashantsingh00887';
    }

    return {
      profile,
      education: dedupeList(parsed.education || defaultData.education),
      skills: dedupeList(parsed.skills || defaultData.skills),
      projects: dedupeList(parsed.projects || defaultData.projects),
      certificates: dedupeList(parsed.certificates || defaultData.certificates),
      achievements: dedupeList(parsed.achievements || defaultData.achievements),
      messages: dedupeList(parsed.messages || []),
      adminConfig: { ...defaultData.adminConfig, ...(parsed.adminConfig || {}) }
    };
  } catch (err) {
    console.error('Failed to load data from localStorage:', err);
    return defaultData;
  }
};

export const saveStoredData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (err) {
    console.error('Failed to save data to localStorage:', err);
    return false;
  }
};

export const resetStoredData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (err) {
    console.error('Failed to reset data:', err);
    return false;
  }
};

export const exportDataAsJSON = (data) => {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `PrashWeb_Backup_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Convert uploaded file to base64 string for immediate preview & local persistence
export const readFileAsDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

// Upload media to Cloudinary via /api/upload with fallback to base64
export const uploadMedia = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(getApiUrl('/api/upload'), {
      method: 'POST',
      body: formData
    });
    if (res.ok) {
      const data = await res.json();
      if (data.url) {
        console.log('[Cloudinary] Successfully uploaded media:', data.url);
        return data.url;
      }
    }
  } catch (err) {
    console.warn('[Cloudinary] Upload failed, falling back to local base64:', err);
  }
  return await readFileAsDataURL(file);
};

