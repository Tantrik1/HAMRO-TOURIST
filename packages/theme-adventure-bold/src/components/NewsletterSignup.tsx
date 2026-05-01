import React from 'react';

interface NewsletterSignupProps {
  config: Record<string, unknown>;
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ config }) => {
  const heading = (config.heading as string) ?? 'Stay in the Loop';
  const subheading = (config.subheading as string) ?? 'Get the latest adventures, deals, and travel tips delivered to your inbox.';

  return (
    <section className="bg-[#111118] py-20 lg:py-28">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[20px] overflow-hidden bg-gradient-to-br from-[#7C3AED]/20 via-[#111118] to-[#06B6D4]/20 border border-[#2A2A3A] p-8 sm:p-12 lg:p-16">
          {/* Glow effects */}
          <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-[#7C3AED]/15 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-[#06B6D4]/10 blur-[80px] pointer-events-none" />

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <span className="inline-block text-xs font-body font-medium uppercase tracking-widest text-[#06B6D4] mb-3">
              Newsletter
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#F1F0FF] mb-4">{heading}</h2>
            <p className="font-body text-[#9B9BB8] text-base sm:text-lg mb-8">{subheading}</p>

            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3.5 rounded-full bg-[#0A0A0F] border border-[#2A2A3A] text-[#F1F0FF] font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-[#7C3AED] transition-colors min-h-[48px]"
              />
              <button
                type="submit"
                className="px-8 py-3.5 rounded-full font-body font-semibold text-base text-white bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] shadow-[0_0_40px_rgba(124,58,237,0.35)] hover:shadow-[0_0_60px_rgba(124,58,237,0.55)] hover:scale-[1.02] transition-all duration-200 min-h-[48px] whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>

            <p className="font-body text-xs text-[#5C5C78] mt-4">No spam, ever. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
