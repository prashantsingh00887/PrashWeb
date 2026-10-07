import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Heart, 
  Linkedin, 
  Github,
  Mail, 
  Phone, 
  ArrowUp, 
  Bot
} from 'lucide-react';

export const Footer = () => {
  const { data, setIsAiOpen } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 py-16 text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md">
                P
              </div>
              <span className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                PrashWeb
              </span>
            </div>

            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Personal Portfolio of Prashant Singh
            </p>

            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              BCA Student, Tech Enthusiast, and Aspiring Software Developer. Built with React, Tailwind CSS, dynamic CMS architecture, and offline AI intelligence.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={data.profile.github || "https://github.com/prashantsingh00887"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
                title="GitHub (@prashantsingh00887)"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={data.profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-[#0a66c2] hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4 fill-current" />
              </a>

              <a
                href={`mailto:${data.profile.email}`}
                className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-500 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>

              <a
                href={`tel:${data.profile.phone}`}
                className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-emerald-500 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
                title="Call"
              >
                <Phone className="w-4 h-4" />
              </a>

              <button
                onClick={() => setIsAiOpen(true)}
                className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 flex items-center justify-center transition-colors"
                title="Chat with PrashWeb AI"
              >
                <Bot className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Navigation Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About Me</a></li>
              <li><a href="#education" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Education Timeline</a></li>
              <li><a href="#skills" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Technical Skills</a></li>
              <li><a href="#projects" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Featured Projects</a></li>
              <li><a href="#certificates" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Certificates & Courses</a></li>
              <li><a href="#github" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">GitHub Showcase</a></li>
            </ul>
          </div>

          {/* Resources & Contact (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Direct Channels
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href={data.profile.github || "https://github.com/prashantsingh00887"} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium flex items-center gap-1"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub: @prashantsingh00887</span>
                </a>
              </li>
              <li>
                <a 
                  href={data.profile.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium flex items-center gap-1"
                >
                  <Linkedin className="w-3.5 h-3.5 fill-current" />
                  <span>LinkedIn Profile</span>
                </a>
              </li>
              <li>
                <a href="#resume" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  View & Download Resume
                </a>
              </li>
              <li>
                <a href="#achievements" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Achievements & Memories Gallery
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Contact Form & Inquiry
                </a>
              </li>
              <li>
                <span className="text-slate-500">Phone: </span>
                <a href={`tel:${data.profile.phone}`} className="font-semibold text-slate-700 dark:text-slate-300 hover:underline">
                  +91 {data.profile.phone}
                </a>
              </li>
              <li>
                <span className="text-slate-500">Email: </span>
                <a href={`mailto:${data.profile.email}`} className="font-semibold text-slate-700 dark:text-slate-300 hover:underline">
                  {data.profile.email}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            © 2026 Prashant Singh. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
