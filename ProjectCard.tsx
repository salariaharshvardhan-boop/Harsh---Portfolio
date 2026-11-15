import React, { useRef } from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { LiveProjectButton } from './LiveProjectButton';
import { ProjectItem } from '../types';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  onLiveProjectClick: (project: ProjectItem) => void;
}

const getProjectTheme = (projectName: string) => {
  const normalizedName = projectName.toLowerCase();

  if (normalizedName.includes('video') || normalizedName.includes('editing')) {
    return {
      accent: '#f97316',
      accentSoft: '#facc15',
      badge: 'Edit Flow',
      tags: ['Cut', 'Color', 'Motion'],
    };
  }

  if (normalizedName.includes('website') || normalizedName.includes('design')) {
    return {
      accent: '#60a5fa',
      accentSoft: '#a78bfa',
      badge: 'UI System',
      tags: ['Layout', 'UX', 'Brand'],
    };
  }

  return {
    accent: '#f472b6',
    accentSoft: '#a78bfa',
    badge: 'Script Draft',
    tags: ['Story', 'Scene', 'Voice'],
  };
};

const renderProjectVisual = (projectName: string) => {
  const normalizedName = projectName.toLowerCase();

  if (normalizedName.includes('video') || normalizedName.includes('editing')) {
    return (
      <div className="absolute inset-0 flex items-end justify-center p-4 sm:p-5">
        <div className="w-full max-w-[84%] rounded-2xl border border-white/15 bg-black/30 p-3 backdrop-blur-sm shadow-[0_15px_30px_rgba(249,115,22,0.16)]">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffd93d]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#6ee7b7]" />
          </div>

          <div className="mb-2 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-[#ff7b72] via-[#fbbf24] to-[#fde68a]" />
          </div>

          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#ff7b72] to-[#fbbf24]" />
            <div className="flex-1 space-y-2">
              <div className="h-2.5 w-2/3 rounded-full bg-white/15" />
              <div className="h-2.5 w-1/2 rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (normalizedName.includes('website') || normalizedName.includes('design')) {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-5">
        <div className="w-full max-w-[84%] rounded-[26px] border border-white/10 bg-[#070b16]/80 p-3 shadow-[0_15px_30px_rgba(96,165,250,0.18)] backdrop-blur-sm">
          <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffd93d]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#6ee7b7]" />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="h-16 rounded-xl bg-gradient-to-br from-[#60a5fa] to-[#a78bfa]" />
            <div className="h-16 rounded-xl bg-white/10" />
            <div className="h-16 rounded-xl bg-white/10" />
            <div className="col-span-2 h-12 rounded-xl bg-white/10" />
            <div className="h-12 rounded-xl bg-gradient-to-br from-[#22d3ee] to-[#60a5fa]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-5">
      <div className="w-full max-w-[82%] rounded-[24px] border border-white/15 bg-[#130d1b]/80 p-4 shadow-[0_15px_30px_rgba(244,114,182,0.18)] backdrop-blur-sm">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/70">
            Script Draft
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[9px] uppercase tracking-[0.2em] text-white/80">
            Scene 08
          </span>
        </div>

        <div className="space-y-2">
          <div className="h-2.5 w-4/5 rounded-full bg-white/15" />
          <div className="h-2.5 w-full rounded-full bg-white/10" />
          <div className="h-2.5 w-5/6 rounded-full bg-white/10" />
          <div className="h-2.5 w-3/4 rounded-full bg-white/10" />
          <div className="h-2.5 w-2/3 rounded-full bg-white/15" />
        </div>
      </div>
    </div>
  );
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  progress,
  range,
  targetScale,
  onLiveProjectClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = getProjectTheme(project.name);

  const scale = useTransform(progress, range, [1, targetScale]);
  const topOffset = index * 28;

  return (
    <div
      ref={containerRef}
      className="sticky top-24 md:top-32 h-[85vh] min-h-[580px] w-full flex items-start justify-center"
      style={{
        top: `calc(5.5rem + ${topOffset}px)`,
      }}
    >
      <motion.div
        style={{
          scale,
        }}
        className="w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8)] origin-top transition-shadow duration-300"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-[#D7E2EA]/15">
          <div className="flex items-center gap-4 sm:gap-6">
            <span
              className="font-black text-[#D7E2EA] leading-none select-none tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
            >
              {project.number}
            </span>

            <div className="flex flex-col">
              <span className="font-light uppercase tracking-widest text-[#D7E2EA]/60 text-xs sm:text-sm">
                {project.category}
              </span>
              <h3 className="font-medium uppercase text-[#D7E2EA] tracking-wide text-lg sm:text-2xl md:text-3xl">
                {project.name}
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {theme.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border px-2 py-1 text-[9px] font-medium uppercase tracking-[0.18em]"
                    style={{
                      borderColor: `${theme.accent}66`,
                      color: theme.accent,
                      background: `linear-gradient(135deg, ${theme.accent}1A, rgba(255,255,255,0.03))`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="shrink-0 self-end md:self-center">
            <LiveProjectButton
              onClick={() => onLiveProjectClick(project)}
              label="Live Project"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 md:gap-5 pt-4 sm:pt-6">
          <div className="md:col-span-5 flex flex-col gap-3 sm:gap-4 md:gap-5">
            <div
              className="relative w-full overflow-hidden rounded-[30px] sm:rounded-[40px] md:rounded-[50px] border border-white/5 bg-[#181818]"
              style={{
                height: 'clamp(130px, 16vw, 230px)',
              }}
            >
              <img
                src={project.col1Image1}
                alt={`${project.name} preview 1`}
                loading="lazy"
                className="w-full h-full object-cover select-none pointer-events-none hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${theme.accent}33, rgba(12,12,12,0) 55%)`,
                }}
              />
              <span
                className="absolute left-3 top-3 rounded-full border px-2 py-1 text-[9px] uppercase tracking-[0.2em] text-white/90"
                style={{
                  borderColor: `${theme.accent}99`,
                  background: `linear-gradient(135deg, ${theme.accent}66, rgba(0,0,0,0.18))`,
                }}
              >
                {theme.badge}
              </span>
            </div>

            <div
              className="relative w-full overflow-hidden rounded-[30px] sm:rounded-[40px] md:rounded-[50px] bg-[#181818] border border-white/5"
              style={{
                height: 'clamp(160px, 22vw, 340px)',
              }}
            >
              <img
                src={project.col1Image2}
                alt={`${project.name} preview 2`}
                loading="lazy"
                className="w-full h-full object-cover select-none pointer-events-none hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${theme.accentSoft}22, rgba(12,12,12,0) 50%)`,
                }}
              />
              {renderProjectVisual(project.name)}
            </div>
          </div>

          <div className="md:col-span-7">
            <div
              className="relative w-full h-full min-h-[280px] md:min-h-full overflow-hidden rounded-[30px] sm:rounded-[40px] md:rounded-[60px] bg-[#181818] border border-white/5"
              style={{
                height: 'clamp(300px, 39vw, 590px)',
              }}
            >
              <img
                src={project.col2Image}
                alt={`${project.name} hero showcase`}
                loading="lazy"
                className="w-full h-full object-cover select-none pointer-events-none hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.45))`,
                }}
              />
              <div
                className="absolute right-4 top-4 rounded-full border px-3 py-1.5 text-[9px] uppercase tracking-[0.22em] text-white/90"
                style={{
                  borderColor: `${theme.accent}99`,
                  background: `linear-gradient(135deg, ${theme.accent}66, rgba(0,0,0,0.26))`,
                }}
              >
                Featured
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
