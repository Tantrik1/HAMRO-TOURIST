import React from 'react';

interface PackageItem {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  coverImageUrl: string | null;
}

interface PackageShowcaseProps {
  config: Record<string, unknown>;
  packages?: PackageItem[];
}

export const PackageShowcase: React.FC<PackageShowcaseProps> = ({ config, packages: pkgs = [] }) => {
  const heading = (config.heading as string) ?? 'Travel Packages';
  const subheading = (config.subheading as string) ?? 'Complete journeys designed for a seamless experience.';

  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#0D9488] mb-3">Packages</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0A0A0F] mb-4">{heading}</h2>
          <p className="font-body text-base sm:text-lg text-[#5C5C78] max-w-xl mx-auto">{subheading}</p>
        </div>

        {pkgs.length === 0 ? (
          <div className="py-20 text-center text-[#9B9BB8] font-body">No packages available yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pkgs.map((pkg) => (
              <a
                key={pkg.id}
                href={`/packages/${pkg.slug}`}
                className="group relative block rounded-2xl overflow-hidden min-h-[340px] shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {pkg.coverImageUrl ? (
                  <img src={pkg.coverImageUrl} alt={pkg.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0D9488]/20 to-[#D97706]/20" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                <div className="relative z-10 flex flex-col justify-end h-full p-6">
                  <span className="inline-flex self-start px-2.5 py-1 rounded-full text-xs font-body font-semibold bg-white/90 text-[#0D9488] mb-3">
                    Package
                  </span>
                  <h3 className="font-display font-bold text-2xl text-white mb-2">{pkg.title}</h3>
                  {pkg.description && (
                    <p className="font-body text-sm text-white/80 line-clamp-2">{pkg.description}</p>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
