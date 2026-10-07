import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Code2, 
  Layout, 
  Palette, 
  Terminal, 
  Database, 
  FileCode, 
  BarChart3, 
  Cpu, 
  FileSpreadsheet, 
  Film, 
  Sparkles, 
  GitBranch,
  Search,
  Plus,
  SlidersHorizontal
} from 'lucide-react';

const iconMap = {
  Code2,
  Layout,
  Palette,
  Terminal,
  Database,
  FileCode,
  BarChart3,
  Cpu,
  FileSpreadsheet,
  Film,
  Sparkles,
  GitBranch
};

export const Skills = () => {
  const { data, setIsAdminOpen, isAdminAuthenticated } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Programming', 'Web Development', 'Database & Tools', 'Analytical', 'Creative'];

  const filteredSkills = data.skills.filter(skill => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          skill.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/40">
      
      {/* Decorative ambient blur */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Technical & Creative Expertise</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
              Skills & <span className="text-gradient">Proficiencies</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-2xl text-base">
              Hands-on mastery across software languages, modern frontend web tools, database querying, data analytics, and digital media.
            </p>
          </div>

          {isAdminAuthenticated && (
            <button
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-cyan-500 shadow-sm transition-all"
            >
              <Plus className="w-3.5 h-3.5 text-cyan-500" />
              <span>Add / Edit Skills</span>
            </button>
          )}
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px] max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter skills (e.g. Java, SQL)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredSkills.map((skill) => {
            const IconComponent = iconMap[skill.icon] || Code2;
            return (
              <div
                key={skill.id}
                className="glass-card rounded-2xl p-5 flex flex-col justify-between hover:-translate-y-1 transition-all duration-200 group"
              >
                <div>
                  {/* Top: Icon + Level Badge */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {skill.level}
                    </span>
                  </div>

                  {/* Title & Category */}
                  <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                    {skill.name}
                  </h3>
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-2">
                    {skill.category}
                  </p>

                  {/* Description / Scope */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-2">
                    {skill.description}
                  </p>
                </div>

                {/* Progress Bar & Percentage */}
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                    <span className="text-slate-500 dark:text-slate-400">Proficiency</span>
                    <span className="text-indigo-600 dark:text-indigo-400">{skill.percentage}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 transition-all duration-1000"
                      style={{ width: `${skill.percentage}%` }}
                    ></div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-16 glass-card rounded-2xl">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              No skills found matching "{searchQuery}".
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
