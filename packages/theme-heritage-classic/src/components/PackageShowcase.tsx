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

export function PackageShowcase({ config, packages: pkgs = [] }: PackageShowcaseProps) {
  const heading = (config.heading as string) ?? 'Travel Packages';
  const subheading = (config.subheading as string) ?? 'Comprehensive journeys crafted with care and tradition.';

  return (
    <section className="bg-[#FFFBF5] py-20 lg:py-28">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#B8860B]" />
            <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#B8860B]">Packages</span>
            <div className="h-px w-12 bg-[#B8860B]" />
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1C1510] mb-4">{heading}</h2>
          <p className="font-body text-base sm:text-lg text-[#5C4F3D] max-w-xl mx-auto">{subheading}</p>
        </div>

        {pkgs.length === 0 ? (
          <div className="py-16 text-center text-[#8B7E6A] font-body">No packages available yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pkgs.map((pkg) => (
              <a
                key={pkg.id}
                href={`/packages/${pkg.slug}`}
                className="group relative block min-h-[320px] border-2 border-[#D4C4A8] overflow-hidden hover:border-[#B8860B] transition-all duration-300"
              >
                {pkg.coverImageUrl ? (
                  <img src={pkg.coverImageUrl} alt={pkg.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1B5E3B]/15 to-[#B8860B]/15" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1510]/80 via-[#1C1510]/40 to-transparent" />
                <div className="relative z-10 flex flex-col justify-end h-full p-6">
                  <span className="inline-flex self-start px-3 py-1 bg-[#B8860B] text-[#FDF8F0] text-xs font-body font-semibold uppercase tracking-wider mb-3">
                    Package
                  </span>
                  <h3 className="font-display font-bold text-2xl text-[#FDF8F0] mb-2">{pkg.title}</h3>
                  {pkg.description && (
                    <p className="font-body text-sm text-[#FDF8F0]/80 line-clamp-2">{pkg.description}</p>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
