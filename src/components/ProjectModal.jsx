import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  X, 
  ExternalLink, 
  Github, 
  Play, 
  Layers, 
  CheckCircle2, 
  Video, 
  Image as ImageIcon,
  Sparkles
} from 'lucide-react';

export const ProjectModal = () => {
  const { selectedProject, setSelectedProject } = usePortfolio();
  const [activeMediaTab, setActiveMediaTab] = useState('screenshots'); // 'screenshots' | 'video'
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!selectedProject) return null;

  const screenshots = selectedProject.screenshots && selectedProject.screenshots.length > 0 
    ? selectedProject.screenshots 
    : [selectedProject.image];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      
      {/* Modal Dialog Card */}
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300">
              {selectedProject.category}
            </span>
            {selectedProject.featured && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Featured Project
              </span>
            )}
          </div>

          <button
            onClick={() => setSelectedProject(null)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close Project Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Title & Tagline */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
              {selectedProject.title}
            </h2>
            <p className="text-sm sm:text-base font-medium text-slate-500 dark:text-slate-400 mt-1">
              {selectedProject.tagline || selectedProject.description.slice(0, 90) + "..."}
            </p>
          </div>

          {/* Media Switcher Tabs: Screenshots vs Video */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <button
              onClick={() => setActiveMediaTab('screenshots')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeMediaTab === 'screenshots'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Screenshots ({screenshots.length})</span>
            </button>

            <button
              onClick={() => setActiveMediaTab('video')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeMediaTab === 'video'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Project Video / Demo</span>
            </button>
          </div>

          {/* Media Player Display */}
          {activeMediaTab === 'screenshots' ? (
            <div className="space-y-3">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800">
                <img
                  src={screenshots[currentImageIndex]}
                  alt={`${selectedProject.title} screenshot ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Thumbnails row */}
              {screenshots.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {screenshots.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                        currentImageIndex === idx
                          ? 'border-indigo-600 scale-105'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
              {selectedProject.videoUrl ? (
                <video
                  src={selectedProject.videoUrl}
                  controls
                  className="w-full h-full object-contain"
                  poster={selectedProject.image}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
                    <Play className="w-8 h-8 ml-1" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Project Walkthrough Demo</h4>
                    <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                      {selectedProject.videoDemoText || "Walkthrough video demonstrates key workflows, real-time UI interactions, and architecture."}
                    </p>
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs border border-slate-700">
                    Live demo link or code repository available below
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Project Overview
            </h4>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedProject.description}
            </p>
          </div>

          {/* Key Highlights / Features */}
          {selectedProject.highlights && selectedProject.highlights.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Key Features & Architecture
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedProject.highlights.map((h, i) => (
                  <div 
                    key={i} 
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies Used */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-500" />
              Technologies & Tools
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedProject.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-900/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Action Footer */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Created by {selectedProject.author || "Prashant Singh"}
          </div>

          <div className="flex items-center gap-3">
            {selectedProject.github && (
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}

            {selectedProject.liveDemo && (
              <a
                href={selectedProject.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/25 transition-colors"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
