import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Trophy, 
  Calendar, 
  Play, 
  Plus, 
  Sparkles, 
  Video, 
  Image as ImageIcon,
  Heart,
  Eye
} from 'lucide-react';

export const Achievements = () => {
  const { data, setSelectedMedia, setIsAdminOpen, isAdminAuthenticated } = usePortfolio();
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'Achievements', 'College', 'Events', 'Certificates', 'Memories'];

  const filteredItems = data.achievements.filter((item) => {
    if (selectedFilter === 'All') return true;
    return item.category.toLowerCase() === selectedFilter.toLowerCase();
  });

  return (
    <section id="achievements" className="py-24 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-950/80 text-pink-700 dark:text-pink-300 text-xs font-semibold mb-3">
              <Trophy className="w-3.5 h-3.5" />
              <span>Milestones & Moments</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
              My Achievements & <span className="text-gradient">Memories</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-2xl text-base">
              A gallery of coding competition awards, campus tech hackathons, workshops, and cherished moments from my BCA college journey.
            </p>
          </div>

          {isAdminAuthenticated && (
            <button
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-pink-500 shadow-sm transition-all"
            >
              <Plus className="w-3.5 h-3.5 text-pink-500" />
              <span>Add Photos & Videos</span>
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedFilter === filter
                  ? 'bg-pink-600 text-white shadow-md shadow-pink-600/20'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => {
            const isVideo = item.mediaType === 'video';

            return (
              <div
                key={item.id}
                className="glass-card rounded-3xl overflow-hidden flex flex-col group border border-slate-200/80 dark:border-slate-800 hover:-translate-y-1.5 transition-all duration-300"
              >
                
                {/* Media Container */}
                <div 
                  className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950 cursor-pointer"
                  onClick={() => setSelectedMedia(item)}
                >
                  {isVideo ? (
                    <div className="relative w-full h-full flex items-center justify-center bg-slate-900">
                      <video
                        src={item.mediaUrl}
                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                        muted
                        playsInline
                        loop
                        onMouseOver={(e) => e.target.play().catch(() => {})}
                        onMouseOut={(e) => { e.target.pause(); e.target.currentTime = 0; }}
                      />
                      {/* Play Badge */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-2xl bg-indigo-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                          <Play className="w-7 h-7 ml-0.5 fill-current" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={item.mediaUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}

                  {/* Badges on media */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-white border border-white/10 flex items-center gap-1.5">
                      {isVideo ? <Video className="w-3 h-3 text-indigo-400" /> : <ImageIcon className="w-3 h-3 text-pink-400" />}
                      <span>{item.category}</span>
                    </span>
                  </div>

                  {item.badge && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-sm flex items-center gap-1">
                        <Trophy className="w-3 h-3" />
                        <span>{item.badge}</span>
                      </span>
                    </div>
                  )}

                  {/* Hover hint */}
                  <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="px-3.5 py-1.5 rounded-xl bg-white text-slate-900 text-xs font-bold shadow-lg flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{isVideo ? 'Play Video' : 'View Photo'}</span>
                    </span>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-pink-500" />
                      <span>{item.date}</span>
                    </div>

                    <h3 
                      onClick={() => setSelectedMedia(item)}
                      className="text-base font-bold font-heading text-slate-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors cursor-pointer"
                    >
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-medium text-slate-400">
                      {isVideo ? 'Direct Video Playback' : 'High Resolution Photo'}
                    </span>
                    <button
                      onClick={() => setSelectedMedia(item)}
                      className="font-bold text-pink-600 dark:text-pink-400 hover:underline"
                    >
                      {isVideo ? 'Watch Video' : 'Zoom In'}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 glass-card rounded-2xl">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              No memories or achievements found in this category yet.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
