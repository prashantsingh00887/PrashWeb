import React, { useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  FileText, 
  Download, 
  Printer, 
  Upload, 
  Eye, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink,
  GraduationCap,
  Briefcase,
  Mail,
  Phone,
  Linkedin,
  Github
} from 'lucide-react';
import { readFileAsDataURL } from '../utils/storage';

export const Resume = () => {
  const { data, updateCustomCv, setIsAdminOpen, isAdminAuthenticated } = usePortfolio();
  const fileInputRef = useRef(null);

  const handleCvUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await readFileAsDataURL(file);
        updateCustomCv(file.name, base64);
        alert(`Successfully uploaded and updated CV: ${file.name}`);
      } catch (err) {
        console.error('Failed to upload CV:', err);
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (data.adminConfig?.customPdfDataUrl) {
      const link = document.createElement('a');
      link.href = data.adminConfig.customPdfDataUrl;
      link.download = data.adminConfig.cvFilename || 'Prashant_Singh_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Trigger print dialog as high-quality PDF saver
      window.print();
    }
  };

  return (
    <section id="resume" className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/30">
      
      {/* Decorative ambient blur */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-3">
              <FileText className="w-3.5 h-3.5" />
              <span>Curriculum Vitae</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
              My <span className="text-gradient">Resume</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-xl text-base">
              A comprehensive view of my academic qualifications, core programming proficiencies, and software projects ready for recruiter review.
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/25 transition-all"
              title="Download CV"
            >
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm transition-all"
              title="Print CV (A4 Format)"
            >
              <Printer className="w-4 h-4 text-indigo-500" />
              <span>Print CV</span>
            </button>

            {isAdminAuthenticated && (
              <>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleCvUpload}
                  accept="application/pdf"
                  className="hidden"
                />
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  title="Admin: Upload new PDF CV"
                >
                  <Upload className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Replace PDF</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Uploaded PDF Notification Banner (if any) */}
        {data.adminConfig?.customPdfDataUrl && (
          <div className="mb-6 p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  Custom PDF Uploaded: {data.adminConfig.cvFilename}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Visitors can download your custom PDF directly.
                </p>
              </div>
            </div>
            <a
              href={data.adminConfig.customPdfDataUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>Preview PDF</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

        {/* Digital Interactive CV Sheet (Printable A4 container) */}
        <div 
          id="printable-cv"
          className="glass-card rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200/90 dark:border-slate-800 space-y-8 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
        >
          
          {/* Resume Header */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
                {data.profile.name}
              </h1>
              <p className="text-sm sm:text-base font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
                {data.profile.headline}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {data.profile.location} • Bachelor of Computer Applications Undergraduate
              </p>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span>+91 {data.profile.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span>{data.profile.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className="w-3.5 h-3.5 text-[#0a66c2] shrink-0" />
                <a 
                  href={data.profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate max-w-[200px] hover:underline hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  {data.profile.linkedin.replace('https://', '')}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Github className="w-3.5 h-3.5 text-slate-800 dark:text-slate-200 shrink-0" />
                <a 
                  href={data.profile.github || "https://github.com/prashantsingh00887"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate max-w-[200px] hover:underline hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  {(data.profile.github || "https://github.com/prashantsingh00887").replace('https://', '')}
                </a>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-slate-200 dark:border-slate-800 pb-1">
              Professional Profile
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {data.profile.aboutIntro}
            </p>
          </div>

          {/* Education Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-slate-200 dark:border-slate-800 pb-1">
              Education
            </h3>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 text-xs">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-sm">
                      {edu.degree}
                    </div>
                    <div className="text-slate-600 dark:text-slate-400 font-medium">
                      {edu.institution} — {edu.location}
                    </div>
                    <div className="text-slate-500 text-[11px] mt-0.5">
                      {edu.description}
                    </div>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{edu.duration}</span>
                    {edu.score && (
                      <div className="font-bold text-indigo-600 dark:text-indigo-400 text-[11px]">
                        {edu.score}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-slate-200 dark:border-slate-800 pb-1">
              Technical Proficiencies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200">Programming & Languages: </span>
                <span className="text-slate-600 dark:text-slate-400">Java (OOP, Collections, Multithreading), Python, JavaScript (ES6+), C/C++</span>
              </div>
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200">Web Technologies: </span>
                <span className="text-slate-600 dark:text-slate-400">HTML5, CSS3, Tailwind CSS, React.js, Responsive Design</span>
              </div>
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200">Database & Tools: </span>
                <span className="text-slate-600 dark:text-slate-400">SQL, MySQL, Git & GitHub, MS Excel</span>
              </div>
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200">Core Concepts & Creative: </span>
                <span className="text-slate-600 dark:text-slate-400">Data Structures & Algorithms (DSA), Data Analytics, Video Editing, AI Tools</span>
              </div>
            </div>
          </div>

          {/* Key Projects */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-slate-200 dark:border-slate-800 pb-1">
              Key Academic & Software Projects
            </h3>
            <div className="space-y-3">
              {data.projects.slice(0, 3).map((proj) => (
                <div key={proj.id} className="text-xs space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      {proj.title}
                    </span>
                    <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
                      Tech: {proj.technologies.slice(0, 4).join(', ')}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Achievements */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-slate-200 dark:border-slate-800 pb-1">
              Certifications & Recognitions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {data.certificates.map((cert) => (
                <div key={cert.id} className="text-slate-600 dark:text-slate-300">
                  • <span className="font-semibold text-slate-800 dark:text-slate-200">{cert.title}</span> ({cert.organization}, {cert.issueDate})
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
