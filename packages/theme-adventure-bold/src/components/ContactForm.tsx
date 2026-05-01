import React from 'react';

interface ContactFormProps {
  config: Record<string, unknown>;
}

export const ContactForm: React.FC<ContactFormProps> = ({ config }) => {
  const heading = (config.heading as string) ?? 'Get In Touch';
  const subheading = (config.subheading as string) ?? 'Ready for your next adventure? Drop us a message.';
  const email = (config.email as string) ?? '';
  const phone = (config.phone as string) ?? '';
  const address = (config.address as string) ?? '';

  return (
    <section className="bg-ht-ink py-20 lg:py-28">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Info side */}
          <div className="w-full lg:w-5/12">
            <span className="inline-block text-xs font-body font-medium uppercase tracking-widest text-[#7C3AED] mb-3">
              Contact
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#F1F0FF] mb-4">{heading}</h2>
            <p className="font-body text-[#9B9BB8] text-base leading-relaxed mb-8">{subheading}</p>

            <div className="space-y-4">
              {email && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#111118] border border-[#2A2A3A] flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <span className="font-body text-sm text-[#9B9BB8]">{email}</span>
                </div>
              )}
              {phone && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#111118] border border-[#2A2A3A] flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <span className="font-body text-sm text-[#9B9BB8]">{phone}</span>
                </div>
              )}
              {address && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#111118] border border-[#2A2A3A] flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <span className="font-body text-sm text-[#9B9BB8]">{address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Form side */}
          <div className="w-full lg:w-7/12">
            <form className="bg-[#111118] border border-[#2A2A3A] rounded-[20px] p-6 lg:p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-body text-sm text-[#9B9BB8] mb-2">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl bg-[#0A0A0F] border border-[#2A2A3A] text-[#F1F0FF] font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-[#7C3AED] transition-colors min-h-[44px]" />
                </div>
                <div>
                  <label className="block font-body text-sm text-[#9B9BB8] mb-2">Email</label>
                  <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl bg-[#0A0A0F] border border-[#2A2A3A] text-[#F1F0FF] font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-[#7C3AED] transition-colors min-h-[44px]" />
                </div>
              </div>
              <div>
                <label className="block font-body text-sm text-[#9B9BB8] mb-2">Subject</label>
                <input type="text" placeholder="Tour inquiry" className="w-full px-4 py-3 rounded-xl bg-[#0A0A0F] border border-[#2A2A3A] text-[#F1F0FF] font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-[#7C3AED] transition-colors min-h-[44px]" />
              </div>
              <div>
                <label className="block font-body text-sm text-[#9B9BB8] mb-2">Message</label>
                <textarea rows={5} placeholder="Tell us about your dream adventure..." className="w-full px-4 py-3 rounded-xl bg-[#0A0A0F] border border-[#2A2A3A] text-[#F1F0FF] font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-[#7C3AED] transition-colors resize-none" />
              </div>
              <button type="submit" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-body font-semibold text-base text-white bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] shadow-[0_0_40px_rgba(124,58,237,0.35)] hover:shadow-[0_0_60px_rgba(124,58,237,0.55)] hover:scale-[1.02] transition-all duration-200 min-h-[48px]">
                Send Message
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
