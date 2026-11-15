import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Check, Send, Sparkles } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '3D Modeling & Rendering',
    budget: '$100 - $1000',
    message: '',
  });

  const email = 'salariaharshvardhan@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-xl rounded-[32px] sm:rounded-[40px] border-2 border-[#D7E2EA]/30 bg-[#121212] p-6 sm:p-8 md:p-10 text-[#D7E2EA] shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full text-[#D7E2EA]/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X size={22} />
            </button>

            {/* Header */}
            <div className="mb-6">
              <span className="text-xs uppercase font-medium tracking-widest text-[#BBCCD7]/60 block mb-1">
                Available for Q1 / Q2 Commissions
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight hero-heading">
                Let&apos;s Build Together
              </h2>
              <p className="text-sm sm:text-base text-[#D7E2EA]/70 mt-2 font-light">
                Got a product launch, motion design, or 3D brand identity in mind? Drop me a line.
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

            {submitted ? (
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-medium tracking-wider text-[#D7E2EA]/70 mb-1.5">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-purple-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-medium tracking-wider text-[#D7E2EA]/70 mb-1.5">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="alex@studio.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-purple-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-medium tracking-wider text-[#D7E2EA]/70 mb-1.5">
                      Service
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#1c1c1c] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-400 transition-colors cursor-pointer"
                    >
                      <option>Video Editing</option>
                      <option>AI Video Generation</option>
                      <option>Script Writing</option>
                      <option>Website Design</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-medium tracking-wider text-[#D7E2EA]/70 mb-1.5">
                      Estimated Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#1c1c1c] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-400 transition-colors cursor-pointer"
                    >
                      <option>&lt; $5,000</option>
                      <option>$5,000 - $10,000</option>
                      <option>$10,000 - $25,000</option>
                      <option>$25,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-medium tracking-wider text-[#D7E2EA]/70 mb-1.5">
                    Project Brief & Goals
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell me about your concept, timeline, and deliverables..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-purple-400 transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    style={{
                      background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                      boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
                    }}
                    className="w-full py-3.5 rounded-full text-white font-medium uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-opacity cursor-pointer border border-white/20"
                  >
                    <span>Send Inquiry</span>
                    <Send size={15} />
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
