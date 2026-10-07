import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Play, 
  Sparkles, 
  Plus, 
  Layers, 
  ArrowUpRight 
} from 'lucide-react';

export const Projects = () => {
  const { data, setSelectedProject, setIsAdminOpen, isAdminAuthenticated } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState('All');

  // Extract unique categories
  const categories = ['All', ...new Set(data.projects.map(p => p.category))];

  const filteredProjects = data.projects.filter(p => {
    if (activeCategory === 'All') return true;
    return p.category === activeCategory;
  });

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      
      {/* Decorative ambient blur */}
      <div className="absolute top-1/4 right-5 w-96 h-96 bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-3">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Real-World Development</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-2xl text-base">
              A collection of software systems and web platforms engineered using Java, React, SQL, Python, and modern web architectures.
            </p>
          </div>

          {isAdminAuthenticated && (
            <button
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 shadow-sm transition-all"
            >
              <Plus className="w-3.5 h-3.5 text-indigo-500" />
              <span>Add / Manage Projects</span>
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-3xl overflow-hidden flex flex-col group border border-slate-200/80 dark:border-slate-800 hover:-translate-y-1.5 transition-all duration-300"
            >
              
              {/* Project Image Banner */}
              <div 
                className="relative aspect-video w-full overflow-hidden bg-slate-950 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-white border border-white/10">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/90 text-white backdrop-blur-md flex items-center gap-1 shadow-sm">
                      <Sparkles className="w-2.5 h-2.5" /> Featured
                    </span>
                  )}
                </div>

                {/* View Details hover trigger */}
                <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                  <span className="px-4 py-2 rounded-xl bg-white text-slate-900 text-xs font-bold shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <span>View Project & Demo</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Card Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                
                <div className="space-y-2.5">
                  <h3 
                    onClick={() => setSelectedProject(project)}
                    className="text-lg sm:text-xl font-bold font-heading text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Tech badges */}
                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-lg text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-0.5 rounded-lg text-[11px] font-medium text-slate-400">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Actions Row */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                    >
                      <span>Explore Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="View GitHub Repository"
                          aria-label={`GitHub repo for ${project.title}`}
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}

                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="Open Live Demo"
                          aria-label={`Live demo for ${project.title}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
