import React, { useEffect, useState } from 'react';
import { X, Play, Instagram, Youtube, ExternalLink } from 'lucide-react';
import { FadeIn } from './FadeIn';

type Platform = 'youtube' | 'instagram';

interface VideoItem {
  id: string; // YouTube video ID, or Instagram reel code
  platform: Platform;
  title: string;
  category: string;
  url: string; // original link (used for "Open on ..." button)
}

// ADD MORE VIDEOS HERE — just copy one block and change the values.
const VIDEOS: VideoItem[] = [
  {
    id: '12nmx8Q1fkM',
    platform: 'youtube',
    title: 'YouTube Short Edit',
    category: 'Short-form Edit',
    url: 'https://youtube.com/shorts/12nmx8Q1fkM',
  },
  {
    id: 'DdeeCMxS-Er',
    platform: 'instagram',
    title: 'Instagram Reel Edit',
    category: 'Reel Edit',
    url: 'https://www.instagram.com/reel/DdeeCMxS-Er/',
  },
];

const embedUrl = (v: VideoItem) =>
  v.platform === 'youtube'
    ? `https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0&playsinline=1`
    : `https://www.instagram.com/reel/${v.id}/embed`;

const ytThumb = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

const accent = (p: Platform) =>
  p === 'youtube'
    ? { color: '#f87171', glow: 'rgba(248,113,113,0.25)', label: 'YouTube Short' }
    : { color: '#f472b6', glow: 'rgba(244,114,182,0.25)', label: 'Instagram Reel' };

export const VideoGallery: React.FC = () => {
  const [active, setActive] = useState<VideoItem | null>(null);

  // Close popup with Escape key + lock page scroll while open
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null);
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  return (
    <div id="video-edits" className="mt-24 sm:mt-32">
      <FadeIn y={40} className="w-full text-center">
        <span className="block mb-3 text-xs uppercase tracking-[0.3em] text-[#D7E2EA]/60">
          Selected Work
        </span>
        <h3
          className="hero-heading font-black uppercase leading-none tracking-tight mb-4"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}
        >
          Video Edits
        </h3>
        <p className="mx-auto mb-12 max-w-xl text-sm sm:text-base font-light text-[#D7E2EA]/70">
          Short-form edits crafted for reels and shorts. Tap any video to watch it right here.
        </p>
      </FadeIn>

      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 place-items-center">
        {VIDEOS.map((v, i) => {
          const a = accent(v.platform);
          return (
            <FadeIn key={v.id} delay={i * 0.12} y={30} className="w-full max-w-[340px]">
              <button
                type="button"
                onClick={() => setActive(v)}
                className="group relative block w-full aspect-[9/16] overflow-hidden rounded-[32px] border-2 border-[#D7E2EA]/70 bg-[#181818] text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#D7E2EA]"
                style={{ boxShadow: `0 20px 50px ${a.glow}` }}
                aria-label={`Play ${v.title}`}
              >
                {v.platform === 'youtube' ? (
                  <img
                    src={ytThumb(v.id)}
                    alt={v.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  // Instagram doesn't provide public thumbnails, so use a styled cover
                  <div
                    className="flex h-full w-full items-center justify-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                      background:
                        'linear-gradient(135deg, #18011F 5%, #B600A8 45%, #7621B0 75%, #BE4C00 100%)',
                    }}
                  >
                    <Instagram size={72} className="text-white/25" />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

                {/* Platform badge */}
                <span
                  className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm"
                  style={{ borderColor: `${a.color}99`, background: 'rgba(0,0,0,0.4)' }}
                >
                  {v.platform === 'youtube' ? <Youtube size={12} /> : <Instagram size={12} />}
                  {a.label}
                </span>

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#D7E2EA] bg-black/40 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                    <Play size={24} className="ml-1 text-[#D7E2EA]" fill="currentColor" />
                  </span>
                </div>

                {/* Title */}
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-[10px] uppercase tracking-widest text-[#D7E2EA]/60">
                    {v.category}
                  </p>
                  <p className="text-lg font-medium uppercase tracking-wide text-[#D7E2EA]">
                    {v.title}
                  </p>
                </div>
              </button>
            </FadeIn>
          );
        })}
      </div>

      {/* Popup player */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={() => setActive(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-md"
          />
          <div className="relative z-10 w-full max-w-[380px]">
            <button
              onClick={() => setActive(null)}
              className="absolute -top-12 right-0 rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close video"
            >
              <X size={24} />
            </button>

            <div className="aspect-[9/16] max-h-[78vh] overflow-hidden rounded-[28px] border-2 border-[#D7E2EA]/40 bg-black mx-auto">
              <iframe
                key={active.id}
                src={embedUrl(active)}
                title={active.title}
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>

            <a
              href={active.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#D7E2EA]/70 transition-colors hover:text-white"
            >
              <span>Open on {active.platform === 'youtube' ? 'YouTube' : 'Instagram'}</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGallery;
