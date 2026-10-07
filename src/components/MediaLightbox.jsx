import React, { useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  X, 
  Calendar, 
  Award, 
  Tag, 
  Play, 
  Video as VideoIcon, 
  Image as ImageIcon 
} from 'lucide-react';

export const MediaLightbox = () => {
  const { selectedMedia, setSelectedMedia } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedMedia(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedMedia]);

  if (!selectedMedia) return null;

  const isVideo = selectedMedia.mediaType === 'video';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-fadeIn"
      onClick={() => setSelectedMedia(null)}
    >
      <div 
        className="relative w-full max-w-4xl bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2">
            {isVideo ? (
              <VideoIcon className="w-5 h-5 text-indigo-400" />
            ) : (
              <ImageIcon className="w-5 h-5 text-amber-400" />
            )}
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              {selectedMedia.category} • {isVideo ? 'Video' : 'Photo'}
            </span>
          </div>

          <button
            onClick={() => setSelectedMedia(null)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close Media Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Container */}
        <div className="relative flex-1 bg-black flex items-center justify-center min-h-[300px] max-h-[60vh] overflow-hidden">
          {isVideo ? (
            <video
              src={selectedMedia.mediaUrl}
              controls
              autoPlay
              className="w-full h-full max-h-[60vh] object-contain"
            >
              Your browser does not support the video player.
            </video>
          ) : (
            <img
              src={selectedMedia.mediaUrl}
              alt={selectedMedia.title}
              className="w-full h-full max-h-[60vh] object-contain"
            />
          )}
        </div>

        {/* Details Footer */}
        <div className="p-6 bg-slate-900 border-t border-slate-800 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-lg sm:text-xl font-bold font-heading text-white">
              {selectedMedia.title}
            </h3>
            
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-slate-800 px-3 py-1 rounded-lg self-start sm:self-auto">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              <span>{selectedMedia.date}</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {selectedMedia.description}
          </p>
        </div>

      </div>
    </div>
  );
};
