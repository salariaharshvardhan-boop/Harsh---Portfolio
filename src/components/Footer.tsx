import React from 'react';
import { ArrowUp, Instagram, Youtube } from 'lucide-react';
import { ContactButton } from './ContactButton';

interface FooterProps {
  onContactClick: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onContactClick, onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#0C0C0C] text-[#D7E2EA] px-6 md:px-10 py-16 border-t border-[#D7E2EA]/10 select-none">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <h3 className="hero-heading font-black uppercase text-4xl sm:text-6xl md:text-7xl tracking-tight mb-6">
          Have an Idea?
        </h3>
        <p className="text-sm sm:text-base md:text-lg font-light text-[#D7E2EA]/70 max-w-lg mb-8 leading-relaxed">
          From concept sketches to high-end 3D visual campaigns, let&apos;s bring your next project to reality.
        </p>

        <div className="mb-14">
          <ContactButton onClick={onContactClick} label="Get in Touch" />
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://www.youtube.com/@hvs_thenics"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-[#D7E2EA]/20 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-[#D7E2EA]/80 transition-all duration-200 hover:border-[#D7E2EA]/40 hover:text-white hover:bg-white/10"
          >
            <Youtube size={16} />
            <span>YouTube</span>
          </a>

          <a
            href="https://www.instagram.com/hvsthenics/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-[#D7E2EA]/20 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-[#D7E2EA]/80 transition-all duration-200 hover:border-[#D7E2EA]/40 hover:text-white hover:bg-white/10"
          >
            <Instagram size={16} />
            <span>Instagram</span>
          </a>
        </div>

        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-[#D7E2EA]/10 text-xs uppercase tracking-widest text-[#D7E2EA]/60">
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => onNavigate('services')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Services
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Projects
            </button>
            <button
              onClick={onContactClick}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>

          <p className="font-light">
            © {new Date().getFullYear()} HARSHVARDHAN. ALL RIGHTS RESERVED.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
            aria-label="Scroll back to top"
          >
            <span>Top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
