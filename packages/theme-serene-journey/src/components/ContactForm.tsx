import React from 'react';

interface ContactFormProps {
  config: Record<string, unknown>;
}

export const ContactForm: React.FC<ContactFormProps> = ({ config }) => {
  const heading = (config.heading as string) ?? 'Get In Touch';
  const subheading = (config.subheading as string) ?? 'We would love to help you plan your next journey.';
  const email = (config.email as string) ?? '';
  const phone = (config.phone as string) ?? '';

  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#0D9488] mb-3">Contact</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0A0A0F] mb-4">{heading}</h2>
            <p className="font-body text-base text-[#5C5C78]">{subheading}</p>
            {(email || phone) && (
              <div className="flex items-center justify-center gap-6 mt-4 text-sm font-body text-[#5C5C78]">
                {email && <span>{email}</span>}
                {phone && <span>{phone}</span>}
              </div>
            )}
          </div>

          <form className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-body text-sm text-[#0A0A0F] mb-1.5">Full Name</label>
                <input type="text" placeholder="Jane Smith" className="w-full px-4 py-3 rounded-xl bg-[#FAFAFA] border border-[#E4E4EF] text-[#0A0A0F] font-body text-sm placeholder-[#9B9BB8] focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] transition-all min-h-[44px]" />
              </div>
              <div>
                <label className="block font-body text-sm text-[#0A0A0F] mb-1.5">Email</label>
                <input type="email" placeholder="jane@example.com" className="w-full px-4 py-3 rounded-xl bg-[#FAFAFA] border border-[#E4E4EF] text-[#0A0A0F] font-body text-sm placeholder-[#9B9BB8] focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] transition-all min-h-[44px]" />
              </div>
            </div>
            <div>
              <label className="block font-body text-sm text-[#0A0A0F] mb-1.5">Subject</label>
              <input type="text" placeholder="Trip inquiry" className="w-full px-4 py-3 rounded-xl bg-[#FAFAFA] border border-[#E4E4EF] text-[#0A0A0F] font-body text-sm placeholder-[#9B9BB8] focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] transition-all min-h-[44px]" />
            </div>
            <div>
              <label className="block font-body text-sm text-[#0A0A0F] mb-1.5">Message</label>
              <textarea rows={5} placeholder="Tell us about your dream trip..." className="w-full px-4 py-3 rounded-xl bg-[#FAFAFA] border border-[#E4E4EF] text-[#0A0A0F] font-body text-sm placeholder-[#9B9BB8] focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] transition-all resize-none" />
            </div>
            <div className="text-center pt-2">
              <button type="submit" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-body font-semibold text-base text-white bg-[#0D9488] hover:bg-[#0B7C72] transition-all duration-200 min-h-[48px] shadow-sm hover:shadow-md">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
