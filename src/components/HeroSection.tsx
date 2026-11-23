import React from 'react';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { ContactButton } from './ContactButton';

interface HeroSectionProps {
  onContactClick: () => void;
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onContactClick,
  onNavigate,
}) => {
  const portraitUrl =
    'https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png';

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Price', id: 'services' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact', isContact: true },
  ];

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[640px] w-full flex flex-col justify-between overflow-x-clip bg-[#0C0C0C]"
    >
      {/* 1. Navbar */}
      <FadeIn delay={0} y={-20} className="w-full z-20">
        <nav
          className="flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8 w-full"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => {
                if (link.isContact) {
                  onContactClick();
                } else {
                  onNavigate(link.id);
                }
              }}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 cursor-pointer bg-transparent border-none"
            >
              {link.label}
            </button>
          ))}
        </nav>
      </FadeIn>

      {/* 2. Hero Heading */}
      <div className="w-full overflow-x-clip z-0 select-none text-center">
        <FadeIn delay={0.15} y={40} className="w-full">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[8vw] sm:text-[7.5vw] md:text-[8vw] lg:text-[8.5vw] mt-6 sm:mt-4 md:-mt-5">
            Hi, i&apos;m harshvardhan
          </h1>
        </FadeIn>
      </div>

      {/* 3. Hero Portrait with Magnet effect */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 pointer-events-auto top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0">
        <FadeIn delay={0.6} y={30}>
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <div className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] select-none flex items-end justify-center pointer-events-auto">
              <img
                src={portraitUrl}
                alt="Harshvardhan - Creator"
                className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                loading="eager"
                draggable={false}
              />
            </div>
          </Magnet>
        </FadeIn>
      </div>

      {/* 4. Bottom bar */}
      <div className="relative z-20 flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 mt-auto">
        {/* Left paragraph */}
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            a creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>

        {/* Right contact button */}
        <FadeIn delay={0.5} y={20}>
          <ContactButton onClick={onContactClick} />
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroSection;
