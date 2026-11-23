import { VideoGallery } from './VideoGallery';
import React, { useRef, useState } from 'react';
import { useScroll } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { ProjectCard } from './ProjectCard';
import { ProjectItem } from '../types';
import { X, Sparkles } from 'lucide-react';

const PROJECTS: ProjectItem[] = [
  {
    id: 'Video Editing page',
    number: '01',
    name: 'Video Editing page',
    category: 'Client',
    type: '3D Brand Experience & Key Visuals',
    liveUrl: 'https://nextlevel-studio.design',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
  },
  {
    id: 'Website Design',
    number: '02',
    name: 'Website Design',
    category: 'Personal',
    type: 'Designing a website for a client with a modern and clean design.',
    liveUrl: 'https://aura-identity.space',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
  },
  {
    id: 'Script Writing Page',
    number: '03',
    name: 'Script Writing Page',
    category: 'Client',
    type: 'Writing a script for a video based on a prompt or idea.',
    liveUrl: 'https://solaris-digital.art',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
  },
];

export const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const totalCards = PROJECTS.length;

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative z-10 w-full bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-32"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Heading: "Project" (singular) using .hero-heading gradient */}
        <FadeIn delay={0} y={40} className="w-full text-center">
          <h2
            className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20 md:mb-28"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Project
          </h2>
        </FadeIn>

        {/* 3 Sticky-Stacking Project Cards */}
        <div className="flex flex-col gap-12 sm:gap-16 pb-20">
          {PROJECTS.map((project, index) => {
            // Scale calculation: targetScale = 1 - (totalCards - 1 - index) * 0.03
            const targetScale = 1 - (totalCards - 1 - index) * 0.03;
            const rangeStart = index * 0.25;
            const rangeEnd = 1;

            return (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                totalCards={totalCards}
                progress={scrollYProgress}
                range={[rangeStart, rangeEnd]}
                targetScale={targetScale}
                onLiveProjectClick={(p) => setSelectedProject(p)}
              />
            );
          })}
        </div>

        <VideoGallery />
      </div>

      {/* Project Detail / Live View Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />
          <div className="relative z-10 w-full max-w-4xl rounded-[32px] sm:rounded-[40px] border-2 border-[#D7E2EA] bg-[#101010] p-6 sm:p-8 text-[#D7E2EA] max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <span className="font-light uppercase tracking-widest text-[#D7E2EA]/60 text-xs sm:text-sm">
                {selectedProject.category} Case Study
              </span>
              <span className="text-white/30">•</span>
              <span className="text-xs uppercase tracking-wider text-purple-300 font-mono">
                Project {selectedProject.number}
              </span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-black uppercase text-white mb-2">
              {selectedProject.name}
            </h3>
            <p className="text-sm sm:text-base text-[#D7E2EA]/70 mb-6 font-light">
              Full spatial environment renders, material development in Octane & Blender, with custom typography and interactive lighting pipelines.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={selectedProject.col1Image1}
                  alt={selectedProject.name}
                  className="w-full h-56 object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={selectedProject.col1Image2}
                  alt={selectedProject.name}
                  className="w-full h-56 object-cover"
                />
              </div>
              <div className="sm:col-span-2 rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={selectedProject.col2Image}
                  alt={selectedProject.name}
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs text-white/50 uppercase tracking-widest">
                <Sparkles size={14} className="text-purple-400" />
                <span>Direction • Modeling • Shading • Lighting</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="px-6 py-2.5 rounded-full border border-white/30 hover:border-white text-xs uppercase tracking-widest font-medium transition-colors"
              >
                Close Showcase
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
