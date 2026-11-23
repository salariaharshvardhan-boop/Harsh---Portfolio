import React from 'react';
import { FadeIn } from './FadeIn';
import { ServiceItem } from '../types';

const SERVICES: ServiceItem[] = [
  {
    id: 'Video Editing',
    number: '01',
    name: 'Video Editing',
    description:
      'Editing and enhancing videos to create a professional and engaging final product.',
  },
  {
    id: 'AI Video Generation',
    number: '02',
    name: 'AI Video Generation',
    description:
      'Using AI to generate professional trending videos with a catchy title and description.',
  },
  {
    id: 'Thumbnail Design',
    number: '03',
    name: 'Script Writing',
    description:
      'Writing a script for a video based on a prompt or idea.',
  },
  {
    id: 'Website Design',
    number: '04',
    name: 'Website Design',
    description:
      'Designing a 3d professional website for a client with a modern and clean design.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="relative z-0 w-full bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Heading */}
        <FadeIn delay={0} y={40} className="w-full text-center">
          <h2
            className="text-[#0C0C0C] font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20 md:mb-28"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Services
          </h2>
        </FadeIn>

        {/* 5 Service Items in vertical list */}
        <div className="flex flex-col w-full border-t border-[rgba(12,12,12,0.15)]">
          {SERVICES.map((service, index) => (
            <FadeIn
              key={service.id}
              delay={index * 0.1}
              y={25}
              className="w-full"
            >
              <div className="flex flex-row items-center justify-between gap-4 sm:gap-8 md:gap-14 py-8 sm:py-10 md:py-12 border-b border-[rgba(12,12,12,0.15)] group transition-colors duration-200">
                {/* Number on the left */}
                <span
                  className="font-black text-[#0C0C0C] leading-none shrink-0 select-none tracking-tight w-[100px] sm:w-[150px] md:w-[200px]"
                  style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                >
                  {service.number}
                </span>

                {/* Name + Description stacked vertically on the right */}
                <div className="flex flex-col flex-grow text-left">
                  <h3
                    className="font-medium uppercase text-[#0C0C0C] tracking-wide mb-1.5 sm:mb-2.5 transition-transform duration-200 group-hover:translate-x-1"
                    style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                  >
                    {service.name}
                  </h3>
                  <p
                    className="font-light text-[#0C0C0C] leading-relaxed max-w-2xl"
                    style={{
                      fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                      opacity: 0.6,
                    }}
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
