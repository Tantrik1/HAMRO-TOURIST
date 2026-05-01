import React from 'react';

interface NewsletterSignupProps {
  config: Record<string, unknown>;
}

export function NewsletterSignup({ config }: NewsletterSignupProps) {
  const heading = (config.heading as string) ?? 'Stay Informed';
  const subheading = (config.subheading as string) ?? 'Receive curated travel inspiration and exclusive offers.';

  return (
    <section className="bg-[#FFFBF5] py-20 lg:py-28">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1C1510] border-2 border-[#B8860B] p-8 sm:p-12 lg:p-16 text-center">
          {/* Ornamental top */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 bg-[#B8860B]" />
            <div className="text-[#B8860B]">✦</div>
            <div className="h-px w-16 bg-[#B8860B]" />
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#FDF8F0] mb-4">{heading}</h2>
          <p className="font-body text-base text-[#FDF8F0]/70 max-w-lg mx-auto mb-8">{subheading}</p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-3.5 bg-transparent border border-[#D4C4A8] text-[#FDF8F0] font-body text-sm placeholder-[#8B7E6A] focus:outline-none focus:border-[#B8860B] transition-colors min-h-[48px]"
            />
            <button type="submit" className="px-7 py-3.5 bg-[#1B5E3B] text-[#FDF8F0] font-body font-semibold text-sm border border-[#B8860B] hover:bg-[#B8860B] hover:text-[#1C1510] transition-all duration-300 min-h-[48px] whitespace-nowrap">
              Subscribe
            </button>
          </form>

          <p className="font-body text-xs text-[#8B7E6A] mt-4">No spam. Unsubscribe anytime.</p>

          {/* Ornamental bottom */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-px w-16 bg-[#B8860B]/50" />
            <div className="text-[#B8860B]/50 text-sm">✦</div>
            <div className="h-px w-16 bg-[#B8860B]/50" />
          </div>
        </div>
      </div>
    </section>
  );
}
