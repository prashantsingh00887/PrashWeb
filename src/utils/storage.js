// Storage utilities for PrashWeb

const STORAGE_KEY = 'prashweb_portfolio_data_v1';

export const loadStoredData = (defaultData) => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData;
    const parsed = JSON.parse(raw);
    // Ensure all critical top-level keys exist by shallow merging with defaultData
    const profile = { ...defaultData.profile, ...(parsed.profile || {}) };
    if (!profile.github || profile.github === 'https://github.com' || profile.github === 'https://github.com/prashantsingh') {
      profile.github = 'https://github.com/prashantsingh00887';
    }

    const projects = (parsed.projects || defaultData.projects).map((proj, idx) => {
      const defaultProj = defaultData.projects[idx];
      let gh = proj.github;
      if (!gh || gh === 'https://github.com' || gh === 'https://github.com/prashantsingh') {
        gh = defaultProj?.github || 'https://github.com/prashantsingh00887';
      }
      return { ...proj, github: gh };
    });

    return {
      ...defaultData,
      ...parsed,
      profile,
      projects,
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
