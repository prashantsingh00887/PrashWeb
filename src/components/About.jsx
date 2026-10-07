import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  User, 
  Target, 
  Compass, 
  Award, 
  Heart, 
  Sparkles, 
  Edit3, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  CheckCircle2,
  Calendar
} from 'lucide-react';

export const About = () => {
  const { data, setIsAdminOpen, isAdminAuthenticated } = usePortfolio();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview & Bio', icon: User },
    { id: 'objective', label: 'Career Objective', icon: Target },
    { id: 'goals', label: 'Professional Goals', icon: Compass },
    { id: 'interests', label: 'Interests & Passions', icon: Heart },
    { id: 'achievements', label: 'Key Milestones', icon: Award },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/30">
      
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get To Know Me</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
              About <span className="text-gradient">Prashant Singh</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-2xl text-base">
              A comprehensive glimpse into my educational background, career aspirations, and what drives my pursuit of excellence in software engineering.
            </p>
          </div>

          {isAdminAuthenticated && (
            <button
              onClick={() => setIsAdminOpen(true)}
              className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 shadow-sm transition-all"
              title="Edit About Me details in Admin"
            >
              <Edit3 className="w-3.5 h-3.5 text-indigo-500" />
              <span>Edit About Content</span>
            </button>
          )}
        </div>

        {/* Quick Identity Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          
          <div className="glass-card p-5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Current Degree</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">BCA (2nd Year)</div>
              <div className="text-xs text-indigo-600 dark:text-indigo-400">Expected 2027</div>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Location</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">{data.profile.location}</div>
              <div className="text-xs text-slate-500">Available for Relocation</div>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Direct Phone</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">{data.profile.phone}</div>
              <div className="text-xs text-emerald-600 dark:text-emerald-400">WhatsApp Active</div>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Primary Email</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[170px]" title={data.profile.email}>
                {data.profile.email}
              </div>
              <div className="text-xs text-cyan-600 dark:text-cyan-400">Fast Response</div>
            </div>
          </div>

        </div>

        {/* Interactive Tabs Layout */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-sm">
          
          {/* Tab buttons */}
          <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-slate-200 dark:border-slate-800">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Display */}
          <div className="pt-8">
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed text-base sm:text-lg">
                  <p>{data.profile.aboutIntro}</p>
                </div>
                
                <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-slate-800/60 border border-indigo-100 dark:border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Passionate Student Developer</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      Balancing university coursework with real-world project development in Java, SQL, and Modern Web.
                    </p>
                  </div>
                  <a
                    href="#contact"
                    className="shrink-0 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-sm"
                  >
                    Get In Touch
                  </a>
                </div>
              </div>
            )}

            {activeTab === 'objective' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="p-6 rounded-2xl bg-slate-100/70 dark:bg-slate-800/50 border-l-4 border-indigo-500 space-y-3">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-indigo-500" />
                    Career Objective
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
                    {data.profile.careerObjective}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
                    <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">Seeking</span>
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white mt-1">Internship / Junior Role</h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Software Engineering, Frontend or Full-Stack Development</p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
                    <span className="text-xs font-bold text-purple-500 uppercase tracking-wider">Mindset</span>
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white mt-1">Continuous Learner</h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Quick to adopt new tech stacks, tools, and best engineering practices</p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
                    <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Value Add</span>
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white mt-1">Clean & Reliable Code</h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Focused on readable architecture, good documentation, and testing</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'goals' && (
              <div className="space-y-5 animate-fadeIn">
                <div className="p-6 rounded-2xl bg-purple-50/60 dark:bg-slate-800/50 border-l-4 border-purple-500">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                    <Compass className="w-5 h-5 text-purple-500" />
                    Vision & Long-Term Goals
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
                    {data.profile.professionalGoals}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40">
                    <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-sm font-bold text-slate-900 dark:text-white">Master Full-Stack Architectures</h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Build performant backends with robust database designs and responsive frontend interfaces.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-sm font-bold text-slate-900 dark:text-white">Contribute to Open Source</h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Collaborate with developer communities worldwide on real-world utility software and libraries.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'interests' && (
              <div className="space-y-6 animate-fadeIn">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Topics and domains I actively explore, read about, and build side experiments for:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {data.profile.interests.map((interest, idx) => (
                    <div 
                      key={idx} 
                      className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 hover:border-indigo-500/50 transition-colors"
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{interest}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="space-y-4 animate-fadeIn">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Recognitions and milestones achieved during my academic and software journey:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.profile.personalAchievements.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3 hover:border-amber-500/50 transition-colors"
                    >
                      <Award className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
