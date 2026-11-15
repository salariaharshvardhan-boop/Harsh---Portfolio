import React, { useEffect, useRef, useState } from 'react';

const ROW1_IMAGES = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
];

const ROW2_IMAGES = [
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      // Scroll offset formula from spec: (window.scrollY - sectionTop + window.innerHeight) * 0.3
      const calculatedOffset =
        (window.scrollY - sectionTop + window.innerHeight) * 0.3;

      animationFrameId = requestAnimationFrame(() => {
        setOffset(calculatedOffset);
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Row 1: tripled for seamless scrolling. Moves RIGHT on scroll: translateX(offset - 200)
  const row1Tripled = [...ROW1_IMAGES, ...ROW1_IMAGES, ...ROW1_IMAGES];
  // Row 2: tripled. Moves LEFT on scroll: translateX(-(offset - 200))
  const row2Tripled = [...ROW2_IMAGES, ...ROW2_IMAGES, ...ROW2_IMAGES];

  const row1Transform = `translateX(${offset - 200}px)`;
  const row2Transform = `translateX(${-(offset - 200)}px)`;

  return (
    <section
      ref={sectionRef}
      id="marquee"
      className="relative w-full overflow-hidden bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10"
    >
      <div className="flex flex-col gap-3">
        {/* Row 1 - Moves Right */}
        <div className="w-full overflow-hidden">
          <div
            className="flex gap-3"
            style={{
              transform: row1Transform,
              willChange: 'transform',
            }}
          >
            {row1Tripled.map((url, idx) => (
              <div
                key={`row1-${idx}`}
                className="w-[420px] h-[270px] min-w-[420px] rounded-2xl overflow-hidden bg-[#181818] shadow-lg shrink-0 border border-white/5"
              >
                <img
                  src={url}
                  alt={`3D Design Preview ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Moves Left */}
        <div className="w-full overflow-hidden">
          <div
            className="flex gap-3"
            style={{
              transform: row2Transform,
              willChange: 'transform',
            }}
          >
            {row2Tripled.map((url, idx) => (
              <div
                key={`row2-${idx}`}
                className="w-[420px] h-[270px] min-w-[420px] rounded-2xl overflow-hidden bg-[#181818] shadow-lg shrink-0 border border-white/5"
              >
                <img
                  src={url}
                  alt={`3D Experience Preview ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
