import React, { useState, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  X, 
  Lock, 
  Unlock, 
  User, 
  GraduationCap, 
  Code2, 
  FolderGit2, 
  Award, 
  Trophy, 
  FileText, 
  Mail, 
  Database, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  Download, 
  Upload, 
  Eye, 
  CheckCircle2, 
  AlertCircle,
  Key,
  LogOut,
  RefreshCw,
  Video,
  Image as ImageIcon
} from 'lucide-react';
import { readFileAsDataURL } from '../utils/storage';

export const AdminModal = () => {
  const { 
    isAdminOpen, 
    setIsAdminOpen, 
    isAdminAuthenticated, 
    loginAdmin, 
    logoutAdmin,
    updatePasscode,
    data,
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
    deleteMessage,
    exportData,
    importData,
    resetData
  } = usePortfolio();

  const [enteredPasscode, setEnteredPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [saveNotification, setSaveNotification] = useState('');

  // Editing state for nested modals / forms
  const [editingItem, setEditingItem] = useState(null); // { type, item, isNew }

  const fileInputRef = useRef(null);
  const jsonImportRef = useRef(null);

  if (!isAdminOpen) return null;

  const showSaveNotice = (msg) => {
    setSaveNotification(msg || 'Changes saved successfully!');
    setTimeout(() => setSaveNotification(''), 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginAdmin(enteredPasscode.trim())) {
      setAuthError('');
      setEnteredPasscode('');
    } else {
      setAuthError('Incorrect passcode. Please try again.');
    }
  };

  // ---------------- Render Authentication Screen ----------------
  if (!isAdminAuthenticated) {
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
        onClick={() => setIsAdminOpen(false)}
      >
        <div 
          className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <button 
              onClick={() => setIsAdminOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>
            <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
              Admin Portal Login
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Enter Prashant Singh's admin passcode to manage portfolio content, photos, videos, and messages.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Admin Passcode
              </label>
              <input
                type="password"
                placeholder="Enter admin passcode"
                value={enteredPasscode}
                onChange={(e) => setEnteredPasscode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                autoFocus
              />
              {authError && (
                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {authError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 transition-colors"
            >
              Unlock Admin Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ---------------- Render Full Admin CMS Dashboard ----------------
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
      onClick={() => setIsAdminOpen(false)}
    >
      <div 
        className="relative w-full max-w-6xl max-h-[94vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Admin Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold">
              <Unlock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                <span>PrashWeb CMS Dashboard</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 text-[10px] font-bold">
                  Live
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Logged in as Prashant Singh • Changes update instantly
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {saveNotification && (
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-lg">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {saveNotification}
              </span>
            )}

            <button
              onClick={logoutAdmin}
              className="p-2 rounded-xl text-slate-500 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Logout from Admin"
            >
              <LogOut className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-1 overflow-x-auto text-xs font-semibold scrollbar-none py-2">
          {[
            { id: 'profile', label: 'Profile & Bio', icon: User },
            { id: 'education', label: `Education (${data.education.length})`, icon: GraduationCap },
            { id: 'skills', label: `Skills (${data.skills.length})`, icon: Code2 },
            { id: 'projects', label: `Projects (${data.projects.length})`, icon: FolderGit2 },
            { id: 'certificates', label: `Certificates (${data.certificates.length})`, icon: Award },
            { id: 'achievements', label: `Memories (${data.achievements.length})`, icon: Trophy },
            { id: 'cv', label: 'Resume / CV', icon: FileText },
            { id: 'messages', label: `Messages (${data.messages?.length || 0})`, icon: Mail },
            { id: 'backup', label: 'Backup & Settings', icon: Database },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setEditingItem(null);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all ${
                  active
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Container */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* TAB 1: PROFILE & CONTACT */}
          {activeTab === 'profile' && (
            <ProfileAdminTab 
              profile={data.profile} 
              onSave={(newProf) => {
                updateProfile(newProf);
                showSaveNotice('Profile info updated!');
              }} 
            />
          )}

          {/* TAB 2: EDUCATION */}
          {activeTab === 'education' && (
            <EducationAdminTab
              education={data.education}
              onAdd={(item) => {
                addEducation(item);
                showSaveNotice('Education milestone added!');
              }}
              onUpdate={(id, item) => {
                updateEducation(id, item);
                showSaveNotice('Education milestone updated!');
              }}
              onDelete={(id) => {
                deleteEducation(id);
                showSaveNotice('Education item removed.');
              }}
            />
          )}

          {/* TAB 3: SKILLS */}
          {activeTab === 'skills' && (
            <SkillsAdminTab
              skills={data.skills}
              onAdd={(item) => {
                addSkill(item);
                showSaveNotice('Skill added!');
              }}
              onUpdate={(id, item) => {
                updateSkill(id, item);
                showSaveNotice('Skill updated!');
              }}
              onDelete={(id) => {
                deleteSkill(id);
                showSaveNotice('Skill removed.');
              }}
            />
          )}

          {/* TAB 4: PROJECTS */}
          {activeTab === 'projects' && (
            <ProjectsAdminTab
              projects={data.projects}
              onAdd={(item) => {
                addProject(item);
                showSaveNotice('Project added!');
              }}
              onUpdate={(id, item) => {
                updateProject(id, item);
                showSaveNotice('Project updated!');
              }}
              onDelete={(id) => {
                deleteProject(id);
                showSaveNotice('Project removed.');
              }}
            />
          )}

          {/* TAB 5: CERTIFICATES */}
          {activeTab === 'certificates' && (
            <CertificatesAdminTab
              certificates={data.certificates}
              onAdd={(item) => {
                addCertificate(item);
                showSaveNotice('Certificate added!');
              }}
              onUpdate={(id, item) => {
                updateCertificate(id, item);
                showSaveNotice('Certificate updated!');
              }}
              onDelete={(id) => {
                deleteCertificate(id);
                showSaveNotice('Certificate removed.');
              }}
            />
          )}

          {/* TAB 6: ACHIEVEMENTS & MEMORIES */}
          {activeTab === 'achievements' && (
            <AchievementsAdminTab
              achievements={data.achievements}
              onAdd={(item) => {
                addAchievement(item);
                showSaveNotice('Memory added!');
              }}
              onUpdate={(id, item) => {
                updateAchievement(id, item);
                showSaveNotice('Memory updated!');
              }}
              onDelete={(id) => {
                deleteAchievement(id);
                showSaveNotice('Memory removed.');
              }}
            />
          )}

          {/* TAB 7: RESUME / CV */}
          {activeTab === 'cv' && (
            <CvAdminTab
              adminConfig={data.adminConfig}
              onUpdateCv={(filename, dataUrl) => {
                updateCustomCv(filename, dataUrl);
                showSaveNotice('CV updated successfully!');
              }}
            />
          )}

          {/* TAB 8: MESSAGES INBOX */}
          {activeTab === 'messages' && (
            <MessagesAdminTab
              messages={data.messages || []}
              onDelete={(id) => {
                deleteMessage(id);
                showSaveNotice('Message deleted.');
              }}
            />
          )}

          {/* TAB 9: BACKUP & PASSCODE SETTINGS */}
          {activeTab === 'backup' && (
            <BackupAdminTab
              currentPasscode={data.adminConfig?.passcode || 'prashant2026'}
              onUpdatePasscode={(newPass) => {
                updatePasscode(newPass);
                showSaveNotice('Passcode updated!');
              }}
              onExport={exportData}
              onImport={(json) => {
                if (importData(json)) {
                  showSaveNotice('Database restored successfully!');
                }
              }}
              onReset={() => {
                if (window.confirm('Reset all portfolio content to default demo data?')) {
                  resetData();
                  showSaveNotice('Reset to default data.');
                }
              }}
            />
          )}

        </div>

      </div>
    </div>
  );
};

// ================= TAB SUB-COMPONENTS =================

// 1. Profile Admin Tab
const ProfileAdminTab = ({ profile, onSave }) => {
  const [form, setForm] = useState(profile);
  const fileInputRef = useRef(null);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await readFileAsDataURL(file);
        setForm(prev => ({ ...prev, avatarUrl: base64 }));
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        onSave(form);
      }} 
      className="space-y-6"
    >
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Profile Details</h3>
          <p className="text-xs text-slate-500">Edit personal introduction, contact, and bio visible across the site.</p>
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 shadow-md"
        >
          <Save className="w-4 h-4" /> Save Profile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div>
          <label className="block font-semibold mb-1">Full Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Headline / Subtitle</label>
          <input
            type="text"
            value={form.headline}
            onChange={(e) => setForm({ ...form, headline: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Mobile Number</label>
          <input
            type="text"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Email Address</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">LinkedIn Profile URL</label>
          <input
            type="text"
            value={form.linkedin}
            onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">GitHub Profile URL</label>
          <input
            type="text"
            placeholder="https://github.com/prashantsingh00887"
            value={form.github || ''}
            onChange={(e) => setForm({ ...form, github: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Location</label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          />
        </div>
      </div>

      {/* Avatar upload */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center gap-4">
        <img
          src={form.avatarUrl}
          alt="Avatar Preview"
          className="w-16 h-16 rounded-2xl object-cover border border-slate-300 dark:border-slate-600"
        />
        <div className="space-y-1">
          <label className="block text-xs font-bold text-slate-900 dark:text-white">Profile Photo</label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-100"
            >
              Upload New Photo
            </button>
            <input
              type="text"
              placeholder="Or paste image URL"
              value={form.avatarUrl}
              onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })}
              className="px-2 py-1 text-xs rounded-lg bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 w-64"
            />
          </div>
        </div>
      </div>

      {/* About text areas */}
      <div className="space-y-4 text-xs">
        <div>
          <label className="block font-semibold mb-1">About Introduction</label>
          <textarea
            rows={3}
            value={form.aboutIntro}
            onChange={(e) => setForm({ ...form, aboutIntro: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          ></textarea>
        </div>

        <div>
          <label className="block font-semibold mb-1">Career Objective</label>
          <textarea
            rows={2}
            value={form.careerObjective}
            onChange={(e) => setForm({ ...form, careerObjective: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          ></textarea>
        </div>

        <div>
          <label className="block font-semibold mb-1">Professional Goals</label>
          <textarea
            rows={2}
            value={form.professionalGoals}
            onChange={(e) => setForm({ ...form, professionalGoals: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          ></textarea>
        </div>
      </div>
    </form>
  );
};

// 2. Education Admin Tab
const EducationAdminTab = ({ education, onAdd, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(null); // null or item

  const emptyEdu = {
    category: 'college',
    institution: '',
    degree: '',
    duration: '',
    currentStatus: '',
    location: 'India',
    score: '',
    description: '',
    courses: []
  };

  const [form, setForm] = useState(emptyEdu);
  const [coursesInput, setCoursesInput] = useState('');

  const startEdit = (item) => {
    setEditing(item);
    setForm(item);
    setCoursesInput(item.courses ? item.courses.join(', ') : '');
  };

  const startNew = () => {
    setEditing({ isNew: true });
    setForm(emptyEdu);
    setCoursesInput('');
  };

  const handleSave = (e) => {
    e.preventDefault();
    const coursesArr = coursesInput.split(',').map(c => c.trim()).filter(Boolean);
    const itemToSave = { ...form, courses: coursesArr };

    if (editing?.isNew) {
      onAdd(itemToSave);
    } else {
      onUpdate(editing.id, itemToSave);
    }
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Education Timeline</h3>
          <p className="text-xs text-slate-500">Manage College (BCA), School (10th, 12th) and future degrees.</p>
        </div>
        {!editing && (
          <button
            onClick={startNew}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 shadow-md"
          >
            <Plus className="w-4 h-4" /> Add Education Entry
          </button>
        )}
      </div>

      {editing ? (
        <form onSubmit={handleSave} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4 text-xs">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              {editing.isNew ? 'Add New Education Entry' : 'Edit Education Entry'}
            </h4>
            <button 
              type="button" 
              onClick={() => setEditing(null)} 
              className="text-slate-400 hover:text-slate-600"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
              >
                <option value="college">College / University</option>
                <option value="school">School (10th / 12th)</option>
                <option value="course">Additional Course / Diploma</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Degree / Class Title</label>
              <input
                type="text"
                placeholder="e.g. BCA or Class 12th (PCM)"
                value={form.degree}
                onChange={(e) => setForm({ ...form, degree: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Institution / School Name</label>
              <input
                type="text"
                placeholder="e.g. University Name or High School"
                value={form.institution}
                onChange={(e) => setForm({ ...form, institution: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Duration / Years</label>
              <input
                type="text"
                placeholder="e.g. 2024 - 2027 or 2022 - 2024"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Status / Semester</label>
              <input
                type="text"
                placeholder="e.g. 2nd Year / 4th Sem or Completed"
                value={form.currentStatus}
                onChange={(e) => setForm({ ...form, currentStatus: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Score / Percentage / CGPA</label>
              <input
                type="text"
                placeholder="e.g. 8.4 CGPA or 82%"
                value={form.score}
                onChange={(e) => setForm({ ...form, score: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Description / Summary</label>
            <textarea
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
            ></textarea>
          </div>

          <div>
            <label className="block font-semibold mb-1">Key Subjects (Comma Separated)</label>
            <input
              type="text"
              placeholder="e.g. Java, Data Structures, SQL, Web Technologies"
              value={coursesInput}
              onChange={(e) => setCoursesInput(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-semibold"
            >
              Save Milestone
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-3">
          {education.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between gap-4"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                  {item.category}
                </span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-1">
                  {item.degree}
                </h4>
                <p className="text-xs text-indigo-600 dark:text-indigo-400">
                  {item.institution} • {item.duration} • {item.score}
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => startEdit(item)}
                  className="p-2 rounded-lg bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-500 shadow-xs"
                  title="Edit entry"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete ${item.degree}?`)) onDelete(item.id);
                  }}
                  className="p-2 rounded-lg bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-rose-500 shadow-xs"
                  title="Delete entry"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 3. Skills Admin Tab
const SkillsAdminTab = ({ skills, onAdd, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(null);
  const emptySkill = {
    name: '',
    category: 'Programming',
    level: 'Proficient',
    percentage: 80,
    icon: 'Code2',
    description: ''
  };

  const [form, setForm] = useState(emptySkill);

  const startEdit = (item) => {
    setEditing(item);
    setForm(item);
  };

  const startNew = () => {
    setEditing({ isNew: true });
    setForm(emptySkill);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editing?.isNew) {
      onAdd(form);
    } else {
      onUpdate(editing.id, form);
    }
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Skills Matrix</h3>
          <p className="text-xs text-slate-500">Add or adjust proficiency levels and categories for skills.</p>
        </div>
        {!editing && (
          <button
            onClick={startNew}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 shadow-md"
          >
            <Plus className="w-4 h-4" /> Add Skill
          </button>
        )}
      </div>

      {editing ? (
        <form onSubmit={handleSave} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4 text-xs">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              {editing.isNew ? 'Add New Skill' : 'Edit Skill'}
            </h4>
            <button type="button" onClick={() => setEditing(null)} className="text-slate-400">Cancel</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Skill Name</label>
              <input
                type="text"
                placeholder="e.g. Java, Python, SQL"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
              >
                <option value="Programming">Programming</option>
                <option value="Web Development">Web Development</option>
                <option value="Database & Tools">Database & Tools</option>
                <option value="Analytical">Analytical</option>
                <option value="Creative">Creative</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Level Label</label>
              <select
                value={form.level}
                onChange={(e) => setForm({ ...form, level: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
              >
                <option value="Advanced">Advanced</option>
                <option value="Proficient">Proficient</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Familiar">Familiar</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Percentage: {form.percentage}%</label>
              <input
                type="range"
                min="30"
                max="100"
                value={form.percentage}
                onChange={(e) => setForm({ ...form, percentage: Number(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Keywords / Scope</label>
            <input
              type="text"
              placeholder="e.g. OOP, Collections, Multithreading, Exception Handling"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-semibold"
            >
              Save Skill
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-xs text-slate-900 dark:text-white">
                  {skill.name} ({skill.percentage}%)
                </div>
                <div className="text-[11px] text-slate-500">
                  {skill.category} • {skill.level}
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => startEdit(skill)}
                  className="p-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-500"
                >
                  <Edit className="w-3 h-3" />
                </button>
                <button
                  onClick={() => onDelete(skill.id)}
                  className="p-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-rose-500"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 4. Projects Admin Tab
const ProjectsAdminTab = ({ projects, onAdd, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(null);
  const fileInputRef = useRef(null);

  const emptyProj = {
    title: '',
    category: 'Full Stack',
    featured: false,
    tagline: '',
    description: '',
    technologies: [],
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000',
    screenshots: [],
    videoUrl: '',
    videoDemoText: '',
    github: 'https://github.com/prashantsingh00887',
    liveDemo: '',
    highlights: []
  };

  const [form, setForm] = useState(emptyProj);
  const [techInput, setTechInput] = useState('');
  const [highlightsInput, setHighlightsInput] = useState('');

  const startEdit = (item) => {
    setEditing(item);
    setForm(item);
    setTechInput(item.technologies ? item.technologies.join(', ') : '');
    setHighlightsInput(item.highlights ? item.highlights.join('\n') : '');
  };

  const startNew = () => {
    setEditing({ isNew: true });
    setForm(emptyProj);
    setTechInput('');
    setHighlightsInput('');
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await readFileAsDataURL(file);
        setForm(prev => ({ 
          ...prev, 
          image: base64,
          screenshots: [base64, ...(prev.screenshots || [])]
        }));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const techArr = techInput.split(',').map(t => t.trim()).filter(Boolean);
    const highArr = highlightsInput.split('\n').map(h => h.trim()).filter(Boolean);

    const itemToSave = {
      ...form,
      technologies: techArr,
      highlights: highArr
    };

    if (editing?.isNew) {
      onAdd(itemToSave);
    } else {
      onUpdate(editing.id, itemToSave);
    }
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Project Showcase</h3>
          <p className="text-xs text-slate-500">Manage unlimited projects with images, videos, tech stacks, and links.</p>
        </div>
        {!editing && (
          <button
            onClick={startNew}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 shadow-md"
          >
            <Plus className="w-4 h-4" /> Add New Project
          </button>
        )}
      </div>

      {editing ? (
        <form onSubmit={handleSave} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4 text-xs">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              {editing.isNew ? 'Create New Project' : 'Edit Project'}
            </h4>
            <button type="button" onClick={() => setEditing(null)} className="text-slate-400">Cancel</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Project Title</label>
              <input
                type="text"
                placeholder="e.g. Event Booking & Management System"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
              >
                <option value="Full Stack">Full Stack</option>
                <option value="Java & Database">Java & Database</option>
                <option value="AI & Analytics">AI & Analytics</option>
                <option value="Web Application">Web Application</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">GitHub Link</label>
              <input
                type="text"
                placeholder="https://github.com/prashantsingh00887/repo"
                value={form.github}
                onChange={(e) => setForm({ ...form, github: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Live Demo Link (Optional)</label>
              <input
                type="text"
                placeholder="https://prashweb.dev/demo"
                value={form.liveDemo}
                onChange={(e) => setForm({ ...form, liveDemo: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Short Tagline</label>
            <input
              type="text"
              placeholder="Brief 1-line catchy explanation"
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Detailed Description</label>
            <textarea
              rows={3}
              placeholder="Comprehensive project explanation..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
              required
            ></textarea>
          </div>

          <div>
            <label className="block font-semibold mb-1">Technologies (Comma Separated)</label>
            <input
              type="text"
              placeholder="e.g. React, Java, SQL, Tailwind, Node.js"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Key Highlights (1 per line)</label>
            <textarea
              rows={3}
              placeholder="Point 1&#10;Point 2&#10;Point 3"
              value={highlightsInput}
              onChange={(e) => setHighlightsInput(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
            ></textarea>
          </div>

          {/* Project Media: Image & Video URL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 rounded-xl bg-slate-100 dark:bg-slate-700/60">
            <div>
              <label className="block font-semibold mb-1">Cover Image</label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-600 border border-slate-300 dark:border-slate-500"
                >
                  Upload File
                </button>
                <input
                  type="text"
                  placeholder="Or Image URL"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full px-2 py-1 rounded-lg bg-white dark:bg-slate-600 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">Project Video URL (MP4 / WebM)</label>
              <input
                type="text"
                placeholder="https://.../demo.mp4"
                value={form.videoUrl}
                onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-600 text-xs"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="projFeatured"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="rounded"
            />
            <label htmlFor="projFeatured" className="font-semibold">Mark as Featured Project</label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setEditing(null)} className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700">Cancel</button>
            <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-semibold">Save Project</button>
          </div>
        </form>
      ) : (
        <div className="space-y-3">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <img src={proj.image} alt={proj.title} className="w-16 h-12 rounded-xl object-cover shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {proj.title}
                  </h4>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400">
                    {proj.category} • {proj.technologies.slice(0, 3).join(', ')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => startEdit(proj)}
                  className="p-2 rounded-lg bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-500 shadow-xs"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete ${proj.title}?`)) onDelete(proj.id);
                  }}
                  className="p-2 rounded-lg bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-rose-500 shadow-xs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 5. Certificates Admin Tab
const CertificatesAdminTab = ({ certificates, onAdd, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(null);
  const fileInputRef = useRef(null);

  const emptyCert = {
    title: '',
    organization: '',
    issueDate: '',
    credentialId: '',
    verifyUrl: '',
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&q=80&w=800',
    description: ''
  };

  const [form, setForm] = useState(emptyCert);

  const startEdit = (item) => {
    setEditing(item);
    setForm(item);
  };

  const startNew = () => {
    setEditing({ isNew: true });
    setForm(emptyCert);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await readFileAsDataURL(file);
        setForm(prev => ({ ...prev, image: base64 }));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editing?.isNew) {
      onAdd(form);
    } else {
      onUpdate(editing.id, form);
    }
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Certificates & Courses</h3>
          <p className="text-xs text-slate-500">Upload certificate screenshots, credential IDs, and verification links.</p>
        </div>
        {!editing && (
          <button
            onClick={startNew}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 shadow-md"
          >
            <Plus className="w-4 h-4" /> Add Certificate
          </button>
        )}
      </div>

      {editing ? (
        <form onSubmit={handleSave} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4 text-xs">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              {editing.isNew ? 'Add Certificate' : 'Edit Certificate'}
            </h4>
            <button type="button" onClick={() => setEditing(null)} className="text-slate-400">Cancel</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Certificate Title</label>
              <input
                type="text"
                placeholder="e.g. Java Programming Fundamentals"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Issuing Organization</label>
              <input
                type="text"
                placeholder="e.g. HackerRank / Oracle / Coursera"
                value={form.organization}
                onChange={(e) => setForm({ ...form, organization: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Issue Date</label>
              <input
                type="text"
                placeholder="e.g. July 2025"
                value={form.issueDate}
                onChange={(e) => setForm({ ...form, issueDate: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Credential ID (Optional)</label>
              <input
                type="text"
                placeholder="e.g. PRASH-JAVA-98214"
                value={form.credentialId}
                onChange={(e) => setForm({ ...form, credentialId: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Verification URL</label>
            <input
              type="text"
              placeholder="https://..."
              value={form.verifyUrl}
              onChange={(e) => setForm({ ...form, verifyUrl: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
            ></textarea>
          </div>

          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-700/60">
            <label className="block font-semibold mb-1">Certificate Image / Document</label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-600 border border-slate-300"
              >
                Upload File
              </button>
              <input
                type="text"
                placeholder="Or Image URL"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="w-full px-2 py-1 rounded-lg bg-white dark:bg-slate-600 text-xs"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setEditing(null)} className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700">Cancel</button>
            <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-semibold">Save Certificate</button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <img src={cert.image} alt={cert.title} className="w-12 h-10 rounded-lg object-cover" />
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">{cert.title}</h4>
                  <p className="text-[11px] text-slate-500">{cert.organization} • {cert.issueDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => startEdit(cert)}
                  className="p-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-500"
                >
                  <Edit className="w-3 h-3" />
                </button>
                <button
                  onClick={() => onDelete(cert.id)}
                  className="p-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-rose-500"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 6. Achievements & Memories Admin Tab
const AchievementsAdminTab = ({ achievements, onAdd, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(null);
  const fileInputRef = useRef(null);

  const emptyAch = {
    title: '',
    category: 'Achievements',
    date: '',
    description: '',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=800',
    badge: ''
  };

  const [form, setForm] = useState(emptyAch);

  const startEdit = (item) => {
    setEditing(item);
    setForm(item);
  };

  const startNew = () => {
    setEditing({ isNew: true });
    setForm(emptyAch);
  };

  const handleMediaUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await readFileAsDataURL(file);
        const isVid = file.type.startsWith('video');
        setForm(prev => ({ 
          ...prev, 
          mediaUrl: base64, 
          mediaType: isVid ? 'video' : 'image' 
        }));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editing?.isNew) {
      onAdd(form);
    } else {
      onUpdate(editing.id, form);
    }
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Achievements & Memories</h3>
          <p className="text-xs text-slate-500">Upload photos, videos, trophies, and milestones across college and hackathons.</p>
        </div>
        {!editing && (
          <button
            onClick={startNew}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 shadow-md"
          >
            <Plus className="w-4 h-4" /> Add Memory / Milestone
          </button>
        )}
      </div>

      {editing ? (
        <form onSubmit={handleSave} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4 text-xs">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              {editing.isNew ? 'Add Memory or Achievement' : 'Edit Memory'}
            </h4>
            <button type="button" onClick={() => setEditing(null)} className="text-slate-400">Cancel</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Title</label>
              <input
                type="text"
                placeholder="e.g. 1st Place - Speed Coding Challenge"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
              >
                <option value="Achievements">Achievements</option>
                <option value="College">College</option>
                <option value="Events">Events</option>
                <option value="Certificates">Certificates</option>
                <option value="Memories">Memories</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Date</label>
              <input
                type="text"
                placeholder="e.g. November 2025"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Badge / Tag (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Winner Trophy / First Place"
                value={form.badge}
                onChange={(e) => setForm({ ...form, badge: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 rounded-xl bg-slate-100 dark:bg-slate-700/60">
            <div>
              <label className="block font-semibold mb-1">Media Type</label>
              <select
                value={form.mediaType}
                onChange={(e) => setForm({ ...form, mediaType: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-600 text-xs"
              >
                <option value="image">Photo / Image</option>
                <option value="video">Video (Plays directly)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Upload Photo or Video</label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleMediaUpload}
                  accept="image/*,video/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-600 border border-slate-300"
                >
                  Upload File
                </button>
                <input
                  type="text"
                  placeholder="Or URL"
                  value={form.mediaUrl}
                  onChange={(e) => setForm({ ...form, mediaUrl: e.target.value })}
                  className="w-full px-2 py-1 rounded-lg bg-white dark:bg-slate-600 text-xs"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setEditing(null)} className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700">Cancel</button>
            <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-semibold">Save Memory</button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between gap-3"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700">
                  {item.category} • {item.mediaType}
                </span>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white mt-1">{item.title}</h4>
                <p className="text-[11px] text-slate-500">{item.date}</p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => startEdit(item)}
                  className="p-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-500"
                >
                  <Edit className="w-3 h-3" />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="p-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-rose-500"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 7. CV Management Tab
const CvAdminTab = ({ adminConfig, onUpdateCv }) => {
  const fileInputRef = useRef(null);

  const handleCvUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await readFileAsDataURL(file);
        onUpdateCv(file.name, base64);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-6 text-xs">
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">CV / Resume File Management</h3>
        <p className="text-slate-500">Upload and replace your PDF CV anytime without changing the website code.</p>
      </div>

      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Current Active CV</h4>
            <p className="text-slate-500 mt-0.5">
              File Name: <span className="font-semibold text-indigo-500">{adminConfig?.cvFilename || 'Prashant_Singh_CV.pdf'}</span>
            </p>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleCvUpload}
            accept="application/pdf"
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 shadow-sm"
          >
            <Upload className="w-4 h-4" /> Upload New PDF File
          </button>
        </div>

        {adminConfig?.customPdfDataUrl ? (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Custom PDF is active and downloadable by visitors.
            </span>
            <button
              onClick={() => onUpdateCv('Prashant_Singh_CV.pdf', null)}
              className="text-rose-500 hover:underline font-semibold"
            >
              Revert to Built-in Printable Template
            </button>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-700/40 text-slate-600 dark:text-slate-300">
            Currently using the modern dynamic interactive CV generated from your profile, skills, education, and projects.
          </div>
        )}
      </div>
    </div>
  );
};

// 8. Messages Admin Tab
const MessagesAdminTab = ({ messages, onDelete }) => {
  return (
    <div className="space-y-6 text-xs">
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Visitor Inquiries Inbox</h3>
        <p className="text-slate-500">Messages submitted through the Contact Me form on your website.</p>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          No inquiries in inbox yet. Test the contact form on your portfolio to see incoming messages appear here!
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {msg.senderName}
                  </h4>
                  <p className="text-indigo-600 dark:text-indigo-400 text-xs">
                    {msg.senderEmail} • {msg.createdAt}
                  </p>
                </div>
                <button
                  onClick={() => onDelete(msg.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-slate-200 dark:hover:bg-slate-700"
                  title="Delete message"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {msg.subject && (
                <div className="font-semibold text-slate-700 dark:text-slate-300">
                  Subject: {msg.subject}
                </div>
              )}

              <p className="text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 leading-relaxed">
                {msg.message}
              </p>

              <div className="pt-1">
                <a
                  href={`mailto:${msg.senderEmail}?subject=Re: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 text-xs shadow-xs"
                >
                  <Mail className="w-3.5 h-3.5" /> Reply by Email
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 9. Backup & Passcode Settings
const BackupAdminTab = ({ currentPasscode, onUpdatePasscode, onExport, onImport, onReset }) => {
  const [newPass, setNewPass] = useState('');
  const jsonImportRef = useRef(null);

  const handlePassChange = (e) => {
    e.preventDefault();
    if (newPass.trim().length >= 4) {
      onUpdatePasscode(newPass.trim());
      setNewPass('');
      alert('Passcode updated successfully!');
    } else {
      alert('Passcode must be at least 4 characters.');
    }
  };

  const handleJsonUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          onImport(parsed);
        } catch (err) {
          alert('Invalid JSON file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Backup, Security & Restore</h3>
        <p className="text-slate-500">Safeguard your portfolio data, export JSON snapshots, and update the admin passcode.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Passcode update */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-4">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-indigo-500" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Change Admin Passcode</h4>
          </div>
          <p className="text-slate-500">
            Passcode Status: <span className="font-semibold text-emerald-500">Active & Protected</span>
          </p>

          <form onSubmit={handlePassChange} className="space-y-3">
            <input
              type="password"
              placeholder="Enter new passcode to update"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 shadow-sm"
            >
              Update Passcode
            </button>
          </form>
        </div>

        {/* Data Backup */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-4">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-purple-500" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Database Snapshot</h4>
          </div>
          <p className="text-slate-500">
            Download a full JSON backup of all portfolio content, or restore a previously saved JSON file.
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={onExport}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-500 shadow-sm"
            >
              <Download className="w-4 h-4" /> Export Backup JSON
            </button>

            <input
              type="file"
              ref={jsonImportRef}
              onChange={handleJsonUpload}
              accept="application/json"
              className="hidden"
            />
            <button
              onClick={() => jsonImportRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200"
            >
              <Upload className="w-4 h-4" /> Import Backup JSON
            </button>
          </div>
        </div>

      </div>

      {/* Danger Zone: Reset */}
      <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 flex items-center justify-between">
        <div>
          <h4 className="font-bold text-rose-800 dark:text-rose-200">Reset to Demo Default Data</h4>
          <p className="text-rose-600 dark:text-rose-400">Restore the initial default dataset for Prashant Singh.</p>
        </div>
        <button
          onClick={onReset}
          className="px-4 py-2 rounded-xl bg-rose-600 text-white font-semibold hover:bg-rose-500 shadow-sm"
        >
          Reset Database
        </button>
      </div>

    </div>
  );
};
