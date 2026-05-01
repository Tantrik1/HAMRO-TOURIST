import React from 'react';

interface NewsletterSignupProps {
  config: Record<string, unknown>;
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ config }) => {
  const heading = (config.heading as string) ?? 'Stay Inspired';
  const subheading = (config.subheading as string) ?? 'Travel stories, curated guides, and exclusive offers in your inbox.';

  return (
    <section className="bg-[#FAFAFA] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E4E4EF] rounded-2xl p-8 sm:p-12 lg:p-16 shadow-sm text-center">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#D97706] mb-3">Newsletter</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0A0A0F] mb-4">{heading}</h2>
          <p className="font-body text-base text-[#5C5C78] max-w-lg mx-auto mb-8">{subheading}</p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-3.5 rounded-full bg-[#FAFAFA] border border-[#E4E4EF] text-[#0A0A0F] font-body text-sm placeholder-[#9B9BB8] focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] transition-all min-h-[48px]"
            />
            <button type="submit" className="px-7 py-3.5 rounded-full font-body font-semibold text-sm text-white bg-[#0D9488] hover:bg-[#0B7C72] transition-all duration-200 min-h-[48px] whitespace-nowrap shadow-sm">
              Subscribe
            </button>
          </form>
          <p className="font-body text-xs text-[#9B9BB8] mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
};
