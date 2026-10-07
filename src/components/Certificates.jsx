import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Award, 
  ExternalLink, 
  Calendar, 
  Eye, 
  Plus, 
  Sparkles,
  ShieldCheck 
} from 'lucide-react';

export const Certificates = () => {
  const { data, setSelectedCertificate, setIsAdminOpen, isAdminAuthenticated } = usePortfolio();

  return (
    <section id="certificates" className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/30">
      
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[110px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Qualifications</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
              Certificates & <span className="text-gradient">Courses</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-2xl text-base">
              Industry credentials and rigorous course certifications validating skills in Java, Modern Web Technologies, SQL, and Data Analytics.
            </p>
          </div>

          {isAdminAuthenticated && (
            <button
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-amber-500 shadow-sm transition-all"
            >
              <Plus className="w-3.5 h-3.5 text-amber-500" />
              <span>Add / Manage Certificates</span>
            </button>
          )}
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.certificates.map((cert) => (
            <div
              key={cert.id}
              className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group border border-slate-200/80 dark:border-slate-800 hover:-translate-y-1 transition-all duration-300"
            >
              
              {/* Image banner with overlay */}
              <div 
                className="relative aspect-[16/10] overflow-hidden bg-slate-950 cursor-pointer"
                onClick={() => setSelectedCertificate(cert)}
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1.5 rounded-lg bg-white/95 text-slate-900 text-xs font-bold shadow-lg flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Enlarge Preview</span>
                  </span>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    {cert.organization}
                  </div>
                  
                  <h3 
                    onClick={() => setSelectedCertificate(cert)}
                    className="text-base font-bold font-heading text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    {cert.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                    {cert.description}
                  </p>
                </div>

                {/* Footer with date and action */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {cert.issueDate}
                  </span>

                  <button
                    onClick={() => setSelectedCertificate(cert)}
                    className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                  >
                    <span>View</span>
                    <Eye className="w-3 h-3" />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
