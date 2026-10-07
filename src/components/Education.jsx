import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  GraduationCap, 
  School, 
  Calendar, 
  MapPin, 
  Award, 
  BookOpen, 
  Plus, 
  Edit3, 
  CheckCircle, 
  Sparkles 
} from 'lucide-react';

export const Education = () => {
  const { data, setIsAdminOpen, isAdminAuthenticated } = usePortfolio();
  const [filter, setFilter] = useState('all');

  const filteredEdu = data.education.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'college') return item.category === 'college';
    if (filter === 'school') return item.category === 'school';
    return item.category === filter;
  });

  return (
    <section id="education" className="py-24 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[110px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 text-xs font-semibold mb-3">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Academic Pathway</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
              Education & <span className="text-gradient">Qualifications</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-2xl text-base">
              My structured learning journey from secondary school fundamentals to advanced undergraduate studies in Computer Applications.
            </p>
          </div>

          {isAdminAuthenticated && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAdminOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-purple-500 shadow-sm transition-all"
              >
                <Plus className="w-3.5 h-3.5 text-purple-500" />
                <span>Add / Manage Education</span>
              </button>
            </div>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              filter === 'all'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            All Milestones ({data.education.length})
          </button>
          <button
            onClick={() => setFilter('college')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              filter === 'college'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            College / BCA ({data.education.filter(e => e.category === 'college').length})
          </button>
          <button
            onClick={() => setFilter('school')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              filter === 'school'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            School (10th & 12th) ({data.education.filter(e => e.category === 'school').length})
          </button>
        </div>

        {/* Timeline Component */}
        <div className="relative border-l-2 border-indigo-200 dark:border-slate-800 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          
          {filteredEdu.map((item, index) => {
            const isCollege = item.category === 'college';
            return (
              <div key={item.id} className="relative group">
                
                {/* Timeline node icon */}
                <div className={`absolute -left-[35px] sm:-left-[51px] top-1.5 w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-md transition-transform duration-200 group-hover:scale-110 ${
                  isCollege 
                    ? 'bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-indigo-500/25' 
                    : 'bg-gradient-to-tr from-slate-700 to-slate-900 shadow-slate-900/25'
                }`}>
                  {isCollege ? <GraduationCap className="w-5 h-5" /> : <School className="w-5 h-5" />}
                </div>

                {/* Timeline Card Content */}
                <div className="glass-card rounded-2xl p-6 sm:p-7 space-y-4">
                  
                  {/* Header Row: Degree, Badge & Duration */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                          isCollege 
                            ? 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300' 
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}>
                          {isCollege ? 'Higher Education' : 'School Education'}
                        </span>
                        
                        {item.currentStatus && (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300">
                            {item.currentStatus}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 dark:text-white mt-1.5">
                        {item.degree}
                      </h3>
                      
                      <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                        {item.institution}
                      </div>
                    </div>

                    {/* Duration & Score */}
                    <div className="sm:text-right shrink-0">
                      <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-3 py-1 rounded-lg">
                        <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{item.duration}</span>
                      </div>
                      
                      {item.score && (
                        <div className="mt-1.5 flex sm:justify-end items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          <Award className="w-3.5 h-3.5" />
                          <span>Score: {item.score}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Location & Details */}
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Key Courses / Subjects */}
                  {item.courses && item.courses.length > 0 && (
                    <div className="pt-2">
                      <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-purple-500" />
                        <span>Core Subjects & Topics:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.courses.map((course, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};
