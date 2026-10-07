import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultPortfolioData } from '../data/defaultData';
import { loadStoredData, saveStoredData, resetStoredData, exportDataAsJSON } from '../utils/storage';

const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(() => loadStoredData(defaultPortfolioData));

  // Theme: Dark mode default (premium modern tech aesthetic)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('prashweb_theme') || 'dark';
  });

  // Admin authentication state
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem('prashweb_admin_auth') === 'true';
  });

  // Modals state
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isAiOpen, setIsAiOpen] = useState(false);

  // Synchronize data changes to localStorage
  useEffect(() => {
    saveStoredData(data);
  }, [data]);

  // Discreet Admin Triggers: URL hash (#admin or #cms) and keyboard shortcut (Ctrl+Shift+A)
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin' || window.location.hash === '#cms') {
        setIsAdminOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);

    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAdminOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Apply theme class to root html element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('prashweb_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Admin auth methods
  const loginAdmin = (enteredPasscode) => {
    const expected = data.adminConfig?.passcode || 'prashant2026';
    if (enteredPasscode === expected) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('prashweb_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('prashweb_admin_auth');
  };

  const updatePasscode = (newPasscode) => {
    setData(prev => ({
      ...prev,
      adminConfig: {
        ...prev.adminConfig,
        passcode: newPasscode
      }
    }));
  };

  // CRUD for Profile
  const updateProfile = (newProfile) => {
    setData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...newProfile
      }
    }));
  };

  // CRUD for Education
  const addEducation = (item) => {
    const newItem = { ...item, id: `edu-${Date.now()}` };
    setData(prev => ({
      ...prev,
      education: [newItem, ...prev.education]
    }));
  };

  const updateEducation = (id, updatedItem) => {
    setData(prev => ({
      ...prev,
      education: prev.education.map(e => e.id === id ? { ...e, ...updatedItem } : e)
    }));
  };

  const deleteEducation = (id) => {
    setData(prev => ({
      ...prev,
      education: prev.education.filter(e => e.id !== id)
    }));
  };

  // CRUD for Skills
  const addSkill = (item) => {
    const newItem = { ...item, id: `sk-${Date.now()}` };
    setData(prev => ({
      ...prev,
      skills: [...prev.skills, newItem]
    }));
  };

  const updateSkill = (id, updatedItem) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.map(s => s.id === id ? { ...s, ...updatedItem } : s)
    }));
  };

  const deleteSkill = (id) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id)
    }));
  };

  // CRUD for Projects
  const addProject = (item) => {
    const newItem = { ...item, id: `proj-${Date.now()}` };
    setData(prev => ({
      ...prev,
      projects: [newItem, ...prev.projects]
    }));
  };

  const updateProject = (id, updatedItem) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, ...updatedItem } : p)
    }));
  };

  const deleteProject = (id) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  // CRUD for Certificates
  const addCertificate = (item) => {
    const newItem = { ...item, id: `cert-${Date.now()}` };
    setData(prev => ({
      ...prev,
      certificates: [newItem, ...prev.certificates]
    }));
  };

  const updateCertificate = (id, updatedItem) => {
    setData(prev => ({
      ...prev,
      certificates: prev.certificates.map(c => c.id === id ? { ...c, ...updatedItem } : c)
    }));
  };

  const deleteCertificate = (id) => {
    setData(prev => ({
      ...prev,
      certificates: prev.certificates.filter(c => c.id !== id)
    }));
  };

  // CRUD for Achievements & Memories
  const addAchievement = (item) => {
    const newItem = { ...item, id: `ach-${Date.now()}` };
    setData(prev => ({
      ...prev,
      achievements: [newItem, ...prev.achievements]
    }));
  };

  const updateAchievement = (id, updatedItem) => {
    setData(prev => ({
      ...prev,
      achievements: prev.achievements.map(a => a.id === id ? { ...a, ...updatedItem } : a)
    }));
  };

  const deleteAchievement = (id) => {
    setData(prev => ({
      ...prev,
      achievements: prev.achievements.filter(a => a.id !== id)
    }));
  };

  // CV PDF management
  const updateCustomCv = (filename, dataUrl) => {
    setData(prev => ({
      ...prev,
      adminConfig: {
        ...prev.adminConfig,
        cvFilename: filename || 'Prashant_Singh_CV.pdf',
        customPdfDataUrl: dataUrl
      }
    }));
  };

  // Contact form messages
  const addMessage = (msg) => {
    const newMsg = {
      ...msg,
      id: `msg-${Date.now()}`,
      createdAt: new Date().toLocaleString()
    };
    setData(prev => ({
      ...prev,
      messages: [newMsg, ...(prev.messages || [])]
    }));
  };

  const deleteMessage = (id) => {
    setData(prev => ({
      ...prev,
      messages: (prev.messages || []).filter(m => m.id !== id)
    }));
  };

  // Export / Import / Reset
  const exportData = () => {
    exportDataAsJSON(data);
  };

  const importData = (newJsonData) => {
    if (newJsonData && typeof newJsonData === 'object') {
      setData({
        ...defaultPortfolioData,
        ...newJsonData
      });
      return true;
    }
    return false;
  };

  const resetData = () => {
    resetStoredData();
    setData(defaultPortfolioData);
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        theme,
        toggleTheme,
        isAdminOpen,
        setIsAdminOpen,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        updatePasscode,
        updateProfile,
        addEducation,
        updateEducation,
        deleteEducation,
        addSkill,
        updateSkill,
        deleteSkill,
        addProject,
        updateProject,
        deleteProject,
        addCertificate,
        updateCertificate,
        deleteCertificate,
        addAchievement,
        updateAchievement,
        deleteAchievement,
        updateCustomCv,
        addMessage,
        deleteMessage,
        exportData,
        importData,
        resetData,
        selectedProject,
        setSelectedProject,
        selectedCertificate,
        setSelectedCertificate,
        selectedMedia,
        setSelectedMedia,
        isAiOpen,
        setIsAiOpen
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
