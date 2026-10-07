import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  X, 
  ExternalLink, 
  Award, 
  Calendar, 
  CheckCircle, 
  Copy, 
  Check 
} from 'lucide-react';

export const CertificateModal = () => {
  const { selectedCertificate, setSelectedCertificate } = usePortfolio();
  const [copied, setCopied] = React.useState(false);

  if (!selectedCertificate) return null;

  const handleCopyId = () => {
    if (selectedCertificate.credentialId) {
      navigator.clipboard.writeText(selectedCertificate.credentialId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
      onClick={() => setSelectedCertificate(null)}
    >
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              Certificate Preview
            </span>
          </div>

          <button
            onClick={() => setSelectedCertificate(null)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Image Preview */}
        <div className="relative aspect-[16/10] bg-slate-950 flex items-center justify-center overflow-hidden">
          <img
            src={selectedCertificate.image}
            alt={selectedCertificate.title}
            className="w-full h-full object-contain p-2"
          />
        </div>

        {/* Details Content */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
              {selectedCertificate.title}
            </h3>
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
              Issued by {selectedCertificate.organization}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {selectedCertificate.description}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                <Calendar className="w-4 h-4 text-indigo-500" />
                <span>Issued: {selectedCertificate.issueDate}</span>
              </div>

              {selectedCertificate.credentialId && (
                <button
                  onClick={handleCopyId}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
                  title="Copy Credential ID"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>ID: {selectedCertificate.credentialId}</span>
                </button>
              )}
            </div>

            {selectedCertificate.verifyUrl && (
              <a
                href={selectedCertificate.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-colors"
              >
                <span>Verify Credential</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
