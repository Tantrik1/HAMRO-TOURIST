import React from 'react';

interface WhyChooseUsProps {
  config: Record<string, unknown>;
}

interface Feature {
  title: string;
  description: string;
}

const defaultFeatures: Feature[] = [
  { title: 'Curated Experiences', description: 'Every journey is thoughtfully designed by seasoned travel experts.' },
  { title: 'Local Connections', description: 'We connect you with authentic local experiences and communities.' },
  { title: 'Sustainable Travel', description: 'Eco-conscious practices that preserve the beauty we explore.' },
  { title: 'Personalized Service', description: 'Your journey, your pace. Tailored itineraries for every traveller.' },
  { title: 'Safety & Comfort', description: 'Professional guides and carefully vetted accommodations throughout.' },
  { title: 'Seamless Planning', description: 'From booking to boarding, we handle every detail so you can relax.' },
];

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ config }) => {
  const heading = (config.heading as string) ?? 'Why Travel With Us';
  const subheading = (config.subheading as string) ?? 'What sets our journeys apart.';
  const features = (config.features as Feature[]) ?? defaultFeatures;

  return (
    <section className="bg-[#FAFAFA] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#D97706] mb-3">Why Us</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0A0A0F] mb-4">{heading}</h2>
          <p className="font-body text-base sm:text-lg text-[#5C5C78] max-w-xl mx-auto">{subheading}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <div key={i} className="bg-white border border-[#E4E4EF] rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-[#0D9488]/10 flex items-center justify-center mb-5">
                <span className="font-mono text-sm font-medium text-[#0D9488]">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="font-display font-semibold text-lg text-[#0A0A0F] mb-2">{feat.title}</h3>
              <p className="font-body text-sm text-[#5C5C78] leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
