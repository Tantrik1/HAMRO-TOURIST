import React from 'react';

interface WhyChooseUsProps {
  config: Record<string, unknown>;
}

interface Feature {
  title: string;
  description: string;
}

const defaultFeatures: Feature[] = [
  { title: 'Decades of Experience', description: 'Years of tradition in crafting unforgettable travel experiences.' },
  { title: 'Expert Local Guides', description: 'Knowledgeable guides with deep cultural and historical insight.' },
  { title: 'Handpicked Accommodations', description: 'Charming hotels and lodges that reflect local heritage.' },
  { title: 'Small Group Journeys', description: 'Intimate groups for a more personal and enriching experience.' },
  { title: 'Responsible Tourism', description: 'We travel thoughtfully, respecting communities and environments.' },
  { title: 'Dedicated Support', description: 'Personal attention from the moment you enquire to the journey home.' },
];

export function WhyChooseUs({ config }: WhyChooseUsProps) {
  const heading = (config.heading as string) ?? 'Why Choose Us';
  const subheading = (config.subheading as string) ?? 'Trusted by travellers for quality and authenticity.';
  const features = (config.features as Feature[]) ?? defaultFeatures;

  return (
    <section className="bg-[#FDF8F0] py-20 lg:py-28">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#B8860B]" />
            <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#B8860B]">Why Us</span>
            <div className="h-px w-12 bg-[#B8860B]" />
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1C1510] mb-4">{heading}</h2>
          <p className="font-body text-base sm:text-lg text-[#5C4F3D] max-w-xl mx-auto">{subheading}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <div key={i} className="bg-[#FFFBF5] border border-[#D4C4A8] p-6 lg:p-8 hover:border-[#B8860B] transition-all duration-300">
              <div className="w-10 h-10 flex items-center justify-center border border-[#B8860B] text-[#B8860B] font-mono text-sm font-medium mb-5">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="font-display font-bold text-lg text-[#1C1510] mb-2">{feat.title}</h3>
              <p className="font-body text-sm text-[#5C4F3D] leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
