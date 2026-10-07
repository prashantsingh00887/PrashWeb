import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Github, 
  ExternalLink, 
  GitBranch, 
  Code2, 
  Sparkles, 
  Star, 
  ArrowUpRight,
  FolderGit2
} from 'lucide-react';

export const GitHub = () => {
  const { data } = usePortfolio();
  const githubUrl = data.profile.github || 'https://github.com/prashantsingh00887';
  const username = 'prashantsingh00887';

  return (
    <section id="github" className="py-20 relative overflow-hidden bg-slate-50/40 dark:bg-slate-950/40">
      
      {/* Subtle purple/slate ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-indigo-500/10 dark:bg-purple-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Standout GitHub Card */}
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden border border-slate-300/80 dark:border-slate-800 bg-gradient-to-br from-white via-slate-50/60 to-indigo-50/30 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 shadow-xl">
          
          {/* Top subtle badge */}
          <div className="flex items-center justify-between mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/10 dark:bg-white/10 text-slate-800 dark:text-slate-200 text-xs font-bold">
              <Github className="w-3.5 h-3.5" />
              <span>Open Source & Code Repositories</span>
            </div>
            
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Active Code Contributions</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
                Explore My Code on <span className="text-gradient">GitHub</span>
              </h2>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Check out my public repositories, project architectures, algorithms, and continuous development journey. From Java database systems and full-stack web applications to AI utilities, all source code is organized and open for review.
              </p>

              {/* Profile Preview Pill */}
              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  github.com/{username}
                </span>
                <span>•</span>
                <span>BCA Projects</span>
                <span>•</span>
                <span>Java, Web & AI Repositories</span>
              </div>

              {/* Action Button */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-7 py-3.5 rounded-xl font-bold text-sm bg-slate-900 hover:bg-black dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white shadow-lg shadow-black/20 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Github className="w-5 h-5" />
                  <span>Visit @{username} on GitHub</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <span>View Project Showcase</span>
                </a>
              </div>
            </div>

            {/* Right Graphic / Highlights (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <div className="p-4 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                  <FolderGit2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">5+ Showcase Repositories</div>
                  <div className="text-[11px] text-slate-500">Event booking, library, AI & finance tools</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                  <GitBranch className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Git Version Control</div>
                  <div className="text-[11px] text-slate-500">Structured branching & commit history</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Clean & Documented</div>
                  <div className="text-[11px] text-slate-500">Well-structured code & READMEs</div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
