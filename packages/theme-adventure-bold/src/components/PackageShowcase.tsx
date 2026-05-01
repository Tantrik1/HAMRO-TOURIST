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
  const subheading = (config.subheading as string) ?? 'Complete adventures, bundled for the ultimate experience.';

  return (
    <section className="bg-[#111118] py-20 lg:py-28">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-body font-medium uppercase tracking-widest text-[#84CC16] mb-3">
            Packages
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#F1F0FF] mb-4">{heading}</h2>
          <p className="font-body text-[#9B9BB8] text-base sm:text-lg max-w-xl mx-auto">{subheading}</p>
        </div>

        {pkgs.length === 0 ? (
          <div className="text-center py-16 text-[#5C5C78] font-body">No packages available yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pkgs.map((pkg) => (
              <a
                key={pkg.id}
                href={`/packages/${pkg.slug}`}
                className="group relative block rounded-[20px] overflow-hidden min-h-[320px] border border-transparent hover:border-[#7C3AED]/50 transition-all duration-300"
              >
                {/* Gradient border effect */}
                <div className="absolute inset-0 rounded-[20px] p-px bg-gradient-to-br from-[#7C3AED]/40 to-[#06B6D4]/40 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative h-full bg-[#1A1A24] rounded-[20px] overflow-hidden">
                  {pkg.coverImageUrl ? (
                    <img src={pkg.coverImageUrl} alt={pkg.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#84CC16]/15 to-[#06B6D4]/15" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/50 to-transparent" />

                  <div className="relative z-10 flex flex-col justify-end h-full p-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-[#84CC16]/15 text-[#84CC16] border border-[#84CC16]/30 self-start mb-3">
                      Package
                    </span>
                    <h3 className="font-display font-bold text-2xl text-[#F1F0FF] mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#7C3AED] group-hover:to-[#06B6D4] transition-all duration-200">
                      {pkg.title}
                    </h3>
                    {pkg.description && (
                      <p className="font-body text-sm text-[#9B9BB8] line-clamp-2">{pkg.description}</p>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
