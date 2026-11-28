import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Check, Send, Sparkles, Loader2, AlertCircle } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Get a free access key at https://web3forms.com (enter salariaharshvardhan@gmail.com),
// then set it as VITE_WEB3FORMS_KEY in your .env file AND in your hosting dashboard
// (Netlify / Vercel -> Environment variables). Redeploy after adding it.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

interface BudgetOption {
  value: string;
  label: string;
  hint: string;
  enterprise?: boolean;
}

interface ServiceConfig {
  name: string;
  budgets: BudgetOption[];
}

// Edit tiers/hints per service here.
const SERVICES: ServiceConfig[] = [
  {
    name: 'Video Editing',
    budgets: [
      { value: '$10 - $100', label: '$10 – $100', hint: 'Short reels, shorts, simple cuts & captions' },
      { value: '$100 - $1,000', label: '$100 – $1,000', hint: 'Full YouTube videos, motion graphics, color grading' },
      { value: '$1,000 - $5,000', label: '$1,000 – $5,000', hint: 'Series, ad campaigns, brand videos with revisions' },
      { value: 'Enterprise', label: 'Enterprise (Custom)', hint: 'Ongoing retainers, large teams, high-volume content pipelines', enterprise: true },
    ],
  },
  {
    name: 'AI Video Generation',
    budgets: [
      { value: '$10 - $100', label: '$10 – $100', hint: 'Single short AI clip or trending reel' },
      { value: '$100 - $1,000', label: '$100 – $1,000', hint: 'Multi-scene AI videos with voice, music & edits' },
      { value: '$1,000 - $5,000', label: '$1,000 – $5,000', hint: 'AI ad campaigns, branded series, custom workflows' },
      { value: 'Enterprise', label: 'Enterprise (Custom)', hint: 'Automated AI video pipelines, large-scale production', enterprise: true },
    ],
  },
  {
    name: 'Script Writing',
    budgets: [
      { value: '$10 - $100', label: '$10 – $100', hint: 'Short-form scripts, hooks & captions' },
      { value: '$100 - $1,000', label: '$100 – $1,000', hint: 'Long-form YouTube scripts, ad & explainer scripts' },
      { value: '$1,000 - $5,000', label: '$1,000 – $5,000', hint: 'Script packages, series, brand storytelling' },
      { value: 'Enterprise', label: 'Enterprise (Custom)', hint: 'Content calendars, full creative direction, ongoing writing', enterprise: true },
    ],
  },
  {
    name: 'Website Design',
    budgets: [
      { value: '$10 - $100', label: '$10 – $100', hint: 'Simple one-page site or landing page tweaks' },
      { value: '$100 - $1,000', label: '$100 – $1,000', hint: 'Portfolio or business site, responsive & animated' },
      { value: '$1,000 - $5,000', label: '$1,000 – $5,000', hint: 'Multi-page 3D / premium site with custom features' },
      { value: 'Enterprise', label: 'Enterprise (Custom)', hint: 'Web apps, e-commerce, integrations, full product builds', enterprise: true },
    ],
  },
];

type Status = 'idle' | 'sending' | 'success' | 'error';

const initialForm = {
  name: '',
  email: '',
  company: '',
  projectType: SERVICES[0].name,
  budget: SERVICES[0].budgets[0].value,
  message: '',
};

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [honeypot, setHoneypot] = useState(false);
  const [formData, setFormData] = useState(initialForm);

  const email = 'salariaharshvardhan@gmail.com';

  const currentService = SERVICES.find((s) => s.name === formData.projectType) ?? SERVICES[0];
  const currentBudget =
    currentService.budgets.find((b) => b.value === formData.budget) ?? currentService.budgets[0];
  const isEnterprise = !!currentBudget.enterprise;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleServiceChange = (name: string) => {
    const svc = SERVICES.find((s) => s.name === name) ?? SERVICES[0];
    setFormData({ ...formData, projectType: name, budget: svc.budgets[0].value });
  };

  const handleClose = () => {
    if (status === 'sending') return;
    onClose();
    setTimeout(() => {
      setStatus('idle');
      setErrorMsg('');
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;

    // Bots tick the hidden box. Never show success unless the message was really sent.
    if (honeypot) {
      setStatus('error');
      setErrorMsg('Your message was not sent. Please email me directly using the address above.');
      return;
    }

    if (!WEB3FORMS_KEY) {
      setStatus('error');
      setErrorMsg(
        'The contact form is not configured yet. Please email me directly using the address above.'
      );
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New inquiry: ${formData.projectType} (${formData.budget}) from ${formData.name}`,
          from_name: 'Portfolio Website',
          name: formData.name,
          email: formData.email, // used as Reply-To so you can reply straight to the client
          company: formData.company || 'N/A',
          service: formData.projectType,
          budget: formData.budget,
          message: formData.message,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setStatus('success');
        setFormData(initialForm);
        setTimeout(() => {
          setStatus('idle');
          onClose();
        }, 3200);
      } else {
        setStatus('error');
        setErrorMsg(data.message || 'Something went wrong while sending. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please check your connection and try again.');
    }
  };

  const labelCls = 'block text-xs uppercase font-medium tracking-wider text-[#D7E2EA]/70 mb-1.5';
  const inputCls =
    'w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-purple-400 transition-colors';
  const selectCls =
    'w-full px-4 py-3 rounded-xl bg-[#1c1c1c] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-400 transition-colors cursor-pointer';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-[32px] sm:rounded-[40px] border-2 border-[#D7E2EA]/30 bg-[#121212] p-6 sm:p-8 md:p-10 text-[#D7E2EA] shadow-2xl"
          >
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 rounded-full text-[#D7E2EA]/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X size={22} />
            </button>

            {/* Header */}
            <div className="mb-6">
              <span className="text-xs uppercase font-medium tracking-widest text-[#BBCCD7]/60 block mb-1">
                Available for new projects
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight hero-heading">
                Let&apos;s Build Together
              </h2>
              <p className="text-sm sm:text-base text-[#D7E2EA]/70 mt-2 font-light">
                Got a video, AI content, script, or website idea in mind? Drop me a line.
              </p>
            </div>

            {/* Quick Email Copy Box */}
            <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300">
                  <Mail size={18} />
                </div>
                <div className="truncate">
                  <p className="text-[10px] uppercase tracking-wider text-white/50">Direct Email</p>
                  <p className="text-sm sm:text-base font-medium truncate">{email}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="shrink-0 ml-3 px-3 py-1.5 rounded-full text-xs uppercase font-medium tracking-wider bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-1.5"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <span>Copy</span>
                )}
              </button>
            </div>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="inline-flex p-4 rounded-full bg-emerald-500/20 text-emerald-400 mb-4">
                  <Sparkles size={32} />
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-tight text-white mb-2">
                  Message Dispatched!
                </h3>
                <p className="text-sm text-[#D7E2EA]/70">
                  Thanks for reaching out! Harshvardhan will reply within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot (hidden from humans) */}
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  checked={honeypot}
                  onChange={(e) => setHoneypot(e.target.checked)}
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Your Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="alex@studio.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Service</label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => handleServiceChange(e.target.value)}
                      className={selectCls}
                    >
                      {SERVICES.map((s) => (
                        <option key={s.name} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Estimated Budget</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className={selectCls}
                    >
                      {currentService.budgets.map((b) => (
                        <option key={b.value} value={b.value}>
                          {b.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Budget hint */}
                <p className="text-xs text-[#D7E2EA]/50 -mt-1">
                  {isEnterprise ? 'Enterprise: ' : 'Typically includes: '}
                  {currentBudget.hint}
                </p>

                {isEnterprise && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="overflow-hidden"
                  >
                    <label className={labelCls}>Company / Organization</label>
                    <input
                      type="text"
                      placeholder="Your company name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className={inputCls}
                    />
                    <p className="text-xs text-purple-300/80 mt-2">
                      Enterprise projects are custom-scoped. Share your goals, scale, and timeline below
                      and I&apos;ll send a tailored proposal.
                    </p>
                  </motion.div>
                )}

                <div>
                  <label className={labelCls}>
                    {isEnterprise ? 'Project Scope, Scale & Timeline' : 'Project Brief & Goals'}
                  </label>
                  <textarea
                    rows={isEnterprise ? 5 : 3}
                    required
                    placeholder={
                      isEnterprise
                        ? 'Describe the project, deliverables, team size, volume, and deadlines...'
                        : 'Tell me about your concept, timeline, and deliverables...'
                    }
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-300">
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    style={{
                      background:
                        'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                      boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
                    }}
                    className="w-full py-3.5 rounded-full text-white font-medium uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-opacity cursor-pointer border border-white/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Inquiry</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
