import React from 'react';

interface ContactFormProps {
  config: Record<string, unknown>;
}

export function ContactForm({ config }: ContactFormProps) {
  const heading = (config.heading as string) ?? 'Enquire Now';
  const subheading = (config.subheading as string) ?? 'We would be delighted to help you plan your next journey.';
  const email = (config.email as string) ?? '';
  const phone = (config.phone as string) ?? '';
  const address = (config.address as string) ?? '';

  return (
    <section className="bg-[#FDF8F0] py-20 lg:py-28">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="w-full lg:w-5/12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#B8860B]" />
              <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#B8860B]">Contact</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#1C1510] mb-4">{heading}</h2>
            <p className="font-body text-base text-[#5C4F3D] leading-relaxed mb-8">{subheading}</p>

            <div className="space-y-4">
              {email && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 border border-[#D4C4A8] flex items-center justify-center text-[#B8860B]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <span className="font-body text-sm text-[#5C4F3D]">{email}</span>
                </div>
              )}
              {phone && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 border border-[#D4C4A8] flex items-center justify-center text-[#B8860B]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <span className="font-body text-sm text-[#5C4F3D]">{phone}</span>
                </div>
              )}
              {address && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 border border-[#D4C4A8] flex items-center justify-center text-[#B8860B]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <span className="font-body text-sm text-[#5C4F3D]">{address}</span>
                </div>
              )}
            </div>
          </div>

          <div className="w-full lg:w-7/12">
            <form className="bg-[#FFFBF5] border border-[#D4C4A8] p-6 lg:p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-body text-sm text-[#1C1510] mb-1.5">Full Name</label>
                  <input type="text" placeholder="Your name" className="w-full px-4 py-3 bg-[#FDF8F0] border border-[#D4C4A8] text-[#1C1510] font-body text-sm placeholder-[#8B7E6A] focus:outline-none focus:border-[#1B5E3B] transition-colors min-h-[44px]" />
                </div>
                <div>
                  <label className="block font-body text-sm text-[#1C1510] mb-1.5">Email</label>
                  <input type="email" placeholder="your@email.com" className="w-full px-4 py-3 bg-[#FDF8F0] border border-[#D4C4A8] text-[#1C1510] font-body text-sm placeholder-[#8B7E6A] focus:outline-none focus:border-[#1B5E3B] transition-colors min-h-[44px]" />
                </div>
              </div>
              <div>
                <label className="block font-body text-sm text-[#1C1510] mb-1.5">Subject</label>
                <input type="text" placeholder="Tour enquiry" className="w-full px-4 py-3 bg-[#FDF8F0] border border-[#D4C4A8] text-[#1C1510] font-body text-sm placeholder-[#8B7E6A] focus:outline-none focus:border-[#1B5E3B] transition-colors min-h-[44px]" />
              </div>
              <div>
                <label className="block font-body text-sm text-[#1C1510] mb-1.5">Message</label>
                <textarea rows={5} placeholder="Tell us about your travel plans..." className="w-full px-4 py-3 bg-[#FDF8F0] border border-[#D4C4A8] text-[#1C1510] font-body text-sm placeholder-[#8B7E6A] focus:outline-none focus:border-[#1B5E3B] transition-colors resize-none" />
              </div>
              <button type="submit" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1B5E3B] text-[#FDF8F0] font-body font-semibold text-base border-2 border-[#B8860B] hover:bg-[#B8860B] hover:text-[#1C1510] transition-all duration-300 min-h-[48px]">
                Send Enquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
