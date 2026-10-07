import React, { useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  ArrowRight, 
  Download, 
  Linkedin, 
  Github,
  Mail, 
  Sparkles, 
  Code2, 
  GraduationCap, 
  Camera, 
  CheckCircle2,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { readFileAsDataURL } from '../utils/storage';

export const Hero = () => {
  const { data, updateProfile, setIsAdminOpen, isAdminAuthenticated } = usePortfolio();
  const fileInputRef = useRef(null);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await readFileAsDataURL(file);
        updateProfile({ avatarUrl: base64 });
      } catch (err) {
        console.error('Error uploading photo:', err);
      }
    }
  };

  const handleDownloadCv = () => {
    const resumeEl = document.getElementById('resume');
    if (resumeEl) {
      resumeEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[92vh] pt-28 pb-20 flex items-center justify-center overflow-hidden"
    >
      {/* Background Animated Blobs and Grid */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        {/* Modern subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)]"></div>
        
        {/* Subtle glowing ambient lights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/15 dark:bg-indigo-600/20 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute top-1/3 -left-20 w-[350px] h-[350px] bg-purple-500/15 dark:bg-purple-600/15 rounded-full blur-[100px] animate-blob [animation-delay:2s]"></div>
        <div className="absolute bottom-10 right-0 w-[400px] h-[400px] bg-cyan-500/15 dark:bg-cyan-600/15 rounded-full blur-[110px] animate-blob [animation-delay:4s]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs (7 cols) */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/80 text-xs font-semibold text-indigo-700 dark:text-indigo-300 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{data.profile.status || "Open to Internships & Opportunities"}</span>
            </div>

            {/* Main Greeting and Name */}
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-medium tracking-wide text-slate-600 dark:text-slate-400">
                Hi, I’m
              </h2>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold font-heading tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                <span className="text-gradient">{data.profile.name}</span>
              </h1>
              <p className="text-lg sm:text-2xl font-semibold text-slate-700 dark:text-slate-200 flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
                <span>{data.profile.headline}</span>
              </p>
            </div>

            {/* Short Introduction */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {data.profile.aboutIntro}
            </p>

            {/* 4 Required Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
              
              {/* Button 1: View My Projects */}
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/35 hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Button 2: Download CV */}
              <button
                onClick={handleDownloadCv}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 shadow-sm hover:-translate-y-0.5 transition-all duration-200"
              >
                <Download className="w-4 h-4 text-indigo-500" />
                <span>Download CV</span>
              </button>

              {/* Button 3: Contact Me */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 hover:-translate-y-0.5 transition-all duration-200"
              >
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>Contact Me</span>
              </a>

              {/* Button 4: LinkedIn */}
              <a
                href={data.profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm bg-[#0a66c2]/10 dark:bg-[#0a66c2]/20 text-[#0a66c2] dark:text-[#38bdf8] border border-[#0a66c2]/30 hover:bg-[#0a66c2]/20 hover:-translate-y-0.5 transition-all duration-200"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>

              {/* Button 5: GitHub */}
              <a
                href={data.profile.github || "https://github.com/prashantsingh00887"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm bg-slate-900/10 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 hover:bg-slate-900 hover:text-white dark:hover:bg-slate-700 hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <Github className="w-4 h-4 text-slate-800 dark:text-slate-200 group-hover:text-white transition-colors" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>

            </div>

            {/* Quick Stats Badges */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto lg:mx-0">
              <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 text-center">
                <div className="text-xl sm:text-2xl font-bold font-heading text-indigo-600 dark:text-indigo-400">
                  {data.projects.length}+
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Projects Built</div>
              </div>
              
              <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 text-center">
                <div className="text-xl sm:text-2xl font-bold font-heading text-purple-600 dark:text-purple-400">
                  {data.skills.length}+
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Technical Skills</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 text-center">
                <div className="text-xl sm:text-2xl font-bold font-heading text-cyan-600 dark:text-cyan-400">
                  {data.certificates.length}+
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Certificates</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 text-center">
                <div className="text-xl sm:text-2xl font-bold font-heading text-emerald-600 dark:text-emerald-400">
                  2027
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">BCA Graduation</div>
              </div>
            </div>

          </div>

          {/* Right Column: Profile Photo Card & Floating Accents (5 cols) */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-72 sm:w-80 md:w-96 aspect-square max-w-full">
              
              {/* Outer decorative ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 p-[3px] shadow-2xl shadow-indigo-500/20 dark:shadow-indigo-500/30">
                <div className="w-full h-full rounded-3xl bg-white dark:bg-slate-900 overflow-hidden relative group">
                  
                  {/* Photo itself */}
                  <img
                    src={data.profile.avatarUrl}
                    alt={data.profile.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient bottom overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60"></div>

                  {/* Quick Photo Upload Trigger - Visible ONLY to authenticated Admin */}
                  {isAdminAuthenticated && (
                    <div className="absolute bottom-3 right-3 animate-fadeIn">
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handlePhotoUpload} 
                        accept="image/*" 
                        className="hidden" 
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900/90 text-white backdrop-blur-md border border-white/20 hover:bg-indigo-600 transition-colors shadow-lg"
                        title="Admin: Change profile photo"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>Change Photo</span>
                      </button>
                    </div>
                  )}

                  {/* Name badge on image */}
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300">Verified Profile</p>
                    <p className="text-sm font-bold">{data.profile.name}</p>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex justify-center">
          <a
            href="#about"
            className="flex flex-col items-center text-xs font-medium text-slate-400 hover:text-indigo-500 transition-colors gap-1 animate-bounce"
            aria-label="Scroll down to About section"
          >
            <span>Scroll down</span>
            <ChevronDown className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
