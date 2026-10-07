import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Linkedin, 
  ExternalLink, 
  Users, 
  MessageSquare, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';

export const LinkedIn = () => {
  const { data } = usePortfolio();

  return (
    <section id="linkedin" className="py-20 relative overflow-hidden">
      
      {/* Subtle blue ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#0a66c2]/10 dark:bg-[#0a66c2]/15 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Standout LinkedIn Card */}
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden border border-[#0a66c2]/30 bg-gradient-to-br from-white via-blue-50/40 to-indigo-50/50 dark:from-slate-900 dark:via-slate-900/90 dark:to-blue-950/30 shadow-xl">
          
          {/* Top subtle badge */}
          <div className="flex items-center justify-between mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a66c2]/15 text-[#0a66c2] dark:text-[#38bdf8] text-xs font-bold">
              <Linkedin className="w-3.5 h-3.5 fill-current" />
              <span>Professional Network</span>
            </div>
            
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Actively Networking</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
                Connect with me on <span className="text-[#0a66c2] dark:text-[#38bdf8]">LinkedIn</span>
              </h2>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                I am actively seeking software development internships, freelance collaborations, and tech opportunities. Connect with me on LinkedIn to follow my development journey, view recommendations, or discuss potential roles.
              </p>

              {/* Profile Preview Pill */}
              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  linkedin.com/in/prashant-singh-8b7209348
                </span>
                <span>•</span>
                <span>BCA Undergraduate</span>
                <span>•</span>
                <span>Full Stack & Java Enthusiast</span>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <a
                  href={data.profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-7 py-3.5 rounded-xl font-bold text-sm bg-[#0a66c2] hover:bg-[#004182] text-white shadow-lg shadow-[#0a66c2]/25 hover:shadow-[#0a66c2]/35 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Linkedin className="w-5 h-5 fill-current" />
                  <span>Connect with me on LinkedIn</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Graphic / Stats (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <div className="p-4 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#0a66c2]/15 text-[#0a66c2] dark:text-[#38bdf8] flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Student & Tech Network</div>
                  <div className="text-[11px] text-slate-500">Connecting with devs & mentors</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Open to Inquiries</div>
                  <div className="text-[11px] text-slate-500">Direct InMail & message friendly</div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
