import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Phone, 
  Mail, 
  Linkedin, 
  Github,
  Send, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  Clock, 
  MapPin, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const Contact = () => {
  const { data, addMessage } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please provide a valid full name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide a message with at least 10 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      // Store message in context for Admin review
      addMessage({
        senderName: formData.name.trim(),
        senderEmail: formData.email.trim(),
        subject: formData.subject.trim() || 'General Inquiry',
        message: formData.message.trim()
      });

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 }
      });

      // Clear form
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    }, 600);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/40">
      
      {/* Decorative ambient blur */}
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Let's Talk Tech</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Have a project in mind, an internship opportunity, or just want to connect? Reach out through any channel below or drop a quick note.
          </p>
        </div>

        {/* Contact Grid: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Contact Card 1: Phone / Mobile */}
            <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Mobile Phone / WhatsApp</div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white">
                    +91 {data.profile.phone}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <a
                  href={`tel:${data.profile.phone}`}
                  className="flex-1 text-center py-2 px-3 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-colors"
                >
                  Call Now
                </a>
                <a
                  href={`https://wa.me/91${data.profile.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2 px-3 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Contact Card 2: Email */}
            <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 font-bold">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Email Address</div>
                  <div className="text-base font-bold text-slate-900 dark:text-white truncate max-w-[240px]" title={data.profile.email}>
                    {data.profile.email}
                  </div>
                </div>
              </div>

              <a
                href={`mailto:${data.profile.email}`}
                className="block text-center py-2 px-3 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-colors"
              >
                Send Email Directly
              </a>
            </div>

            {/* Contact Card 3: LinkedIn */}
            <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0a66c2]/15 text-[#0a66c2] dark:text-[#38bdf8] flex items-center justify-center shrink-0 font-bold">
                  <Linkedin className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">LinkedIn Profile</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[240px]">
                    prashant-singh-8b7209348
                  </div>
                </div>
              </div>

              <a
                href={data.profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-[#0a66c2] hover:bg-[#004182] text-white shadow-sm transition-colors"
              >
                <span>Visit LinkedIn Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Contact Card 4: GitHub */}
            <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900/10 dark:bg-white/10 text-slate-900 dark:text-white flex items-center justify-center shrink-0 font-bold">
                  <Github className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">GitHub Profile</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[240px]">
                    prashantsingh00887
                  </div>
                </div>
              </div>

              <a
                href={data.profile.github || "https://github.com/prashantsingh00887"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-black dark:bg-slate-800 dark:hover:bg-slate-700 text-white shadow-sm transition-colors"
              >
                <span>Visit GitHub Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Location & Status note */}
            <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200">
                <MapPin className="w-4 h-4 text-indigo-500" />
                <span>Based in {data.profile.location} (Open to Relocation & Remote Work)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Clock className="w-4 h-4 text-emerald-500" />
                <span>Response Time: Typically within 24 hours</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-xl">
              
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 dark:text-white mb-2">
                Send a Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
                Fill out the form below and I'll receive your inquiry directly.
              </p>

              {isSubmitted && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3 animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5">
                      Thank you for getting in touch, Prashant has received your message and will get back to you shortly.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs font-semibold text-emerald-800 dark:text-emerald-200 underline mt-2"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name Field */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma / Recruiter Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl text-sm bg-white dark:bg-slate-800 border ${
                      errors.name 
                        ? 'border-rose-500 focus:ring-rose-500' 
                        : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500'
                    } text-slate-900 dark:text-white focus:outline-none transition-colors`}
                  />
                  {errors.name && (
                    <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. rahul@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl text-sm bg-white dark:bg-slate-800 border ${
                      errors.email 
                        ? 'border-rose-500 focus:ring-rose-500' 
                        : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500'
                    } text-slate-900 dark:text-white focus:outline-none transition-colors`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Subject Field (Optional) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Subject / Topic (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Internship Opportunity / Software Project Discussion"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Write your message, project idea, or job specification here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl text-sm bg-white dark:bg-slate-800 border ${
                      errors.message 
                        ? 'border-rose-500 focus:ring-rose-500' 
                        : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500'
                    } text-slate-900 dark:text-white focus:outline-none transition-colors`}
                  ></textarea>
                  {errors.message && (
                    <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
