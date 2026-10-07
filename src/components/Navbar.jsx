import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Sun, 
  Moon, 
  Bot, 
  Menu, 
  X, 
  Sparkles,
  Download,
  Github,
  Linkedin,
  GraduationCap,
  Briefcase,
  Award,
  Layers,
  Phone,
  User,
  Heart
} from 'lucide-react';

export const Navbar = () => {
  const { 
    theme, 
    toggleTheme, 
    setIsAiOpen, 
    setIsAdminOpen, 
    data 
  } = usePortfolio();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Resume', href: '#resume' },
    { name: 'GitHub', href: '#github' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-white/80 dark:bg-slate-950/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm dark:shadow-black/20' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a 
            href="#home" 
            onDoubleClick={(e) => {
              e.preventDefault();
              setIsAdminOpen(true);
            }}
            className="flex items-center gap-2.5 group focus:outline-none select-none cursor-pointer"
            title="PrashWeb"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              P
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold font-heading tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                PrashWeb
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500 dark:text-slate-400">
                {data.profile.name}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 rounded-lg hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Tools */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* PrashWeb AI Navigation Trigger */}
            <button
              onClick={() => setIsAiOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-pink-500/20 border border-indigo-500/30 text-indigo-600 dark:text-indigo-300 hover:border-indigo-500 hover:shadow-sm transition-all"
              title="Chat with PrashWeb AI"
            >
              <Bot className="w-4 h-4 text-indigo-500 animate-bounce" />
              <span>PrashWeb AI</span>
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
            </button>

            {/* Direct GitHub Profile Link */}
            <a
              href={data.profile.github || "https://github.com/prashantsingh00887"}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Visit GitHub (@prashantsingh00887)"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu & Theme button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>

            <button
              onClick={() => setIsAiOpen(true)}
              className="p-2 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Open AI Assistant"
            >
              <Bot className="w-5 h-5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Open Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-6 py-6 space-y-3 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className="px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAiOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 transition-colors"
            >
              <Bot className="w-4 h-4" />
              Chat with PrashWeb AI
            </button>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={data.profile.github || "https://github.com/prashantsingh00887"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href={data.profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-[#0a66c2]/10 text-[#0a66c2] dark:text-[#38bdf8] hover:bg-[#0a66c2]/20"
              >
                <Linkedin className="w-3.5 h-3.5 fill-current" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
