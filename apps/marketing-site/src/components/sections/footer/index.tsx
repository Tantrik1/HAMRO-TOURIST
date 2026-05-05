import Logo from '@/components/logo';
import { Instagram, Twitter, Linkedin, Mail, MapPin, ArrowRight, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#090C14] border-t border-white/[0.06] relative overflow-hidden">
      {/* Premium background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full opacity-15 blur-[150px]" style={{ background: 'radial-gradient(circle, rgba(240,116,32,0.1) 0%, transparent 70%)' }} />
        <div className="absolute top-0 right-0 h-[300px] w-[400px] rounded-full opacity-10 blur-[100px]" style={{ background: 'radial-gradient(circle, rgba(58,77,143,0.08) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16 lg:py-20 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column - wider */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <Logo className="h-24 w-auto" />
              <div className="h-8 w-[1px] bg-gradient-to-b from-transparent via-[#F07420] to-transparent" />
              <span className="text-xs font-semibold text-[#F07420] tracking-wider uppercase">Premium Travel CRM</span>
            </div>
            <p className="text-sm text-[#8892A8] max-w-md leading-relaxed mb-6">
              The all-in-one platform for modern travel agencies. Beautiful websites, automated bookings, and a powerful CRM — all in one place.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-8">
              <a href="#" className="flex items-center gap-3 text-sm text-[#8892A8] hover:text-[#F07420] transition-colors group">
                <div className="h-8 w-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center group-hover:bg-[#F07420]/10 group-hover:border-[#F07420]/20 transition-all">
                  <MapPin size={14} />
                </div>
                <span>Kathmandu, Nepal</span>
              </a>
              <a href="mailto:hello@hamrotourist.com" className="flex items-center gap-3 text-sm text-[#8892A8] hover:text-[#F07420] transition-colors group">
                <div className="h-8 w-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center group-hover:bg-[#F07420]/10 group-hover:border-[#F07420]/20 transition-all">
                  <Mail size={14} />
                </div>
                <span>hello@hamrotourist.com</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a href="#" className="h-10 w-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-[#8892A8] hover:bg-[#F07420] hover:border-[#F07420] hover:text-white transition-all">
                <Twitter size={16} />
              </a>
              <a href="#" className="h-10 w-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-[#8892A8] hover:bg-[#F07420] hover:border-[#F07420] hover:text-white transition-all">
                <Instagram size={16} />
              </a>
              <a href="#" className="h-10 w-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-[#8892A8] hover:bg-[#F07420] hover:border-[#F07420] hover:text-white transition-all">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-5">Product</h4>
            <ul className="space-y-3.5 text-sm text-[#8892A8]">
              <li><a href="#features" className="flex items-center gap-2 hover:text-[#F07420] transition-colors group"><span className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all">→</span>Features</a></li>
              <li><a href="#pricing" className="flex items-center gap-2 hover:text-[#F07420] transition-colors group"><span className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all">→</span>Pricing</a></li>
              <li><a href="#resources" className="flex items-center gap-2 hover:text-[#F07420] transition-colors group"><span className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all">→</span>Resources</a></li>
              <li><a href="#faq" className="flex items-center gap-2 hover:text-[#F07420] transition-colors group"><span className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all">→</span>FAQ</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-5">Company</h4>
            <ul className="space-y-3.5 text-sm text-[#8892A8]">
              <li><a href="#" className="flex items-center gap-2 hover:text-[#F07420] transition-colors group"><span className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all">→</span>About</a></li>
              <li><a href="#" className="flex items-center gap-2 hover:text-[#F07420] transition-colors group"><span className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all">→</span>Blog</a></li>
              <li><a href="#" className="flex items-center gap-2 hover:text-[#F07420] transition-colors group"><span className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all">→</span>Careers</a></li>
              <li><a href="#" className="flex items-center gap-2 hover:text-[#F07420] transition-colors group"><span className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all">→</span>Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 pt-8 border-t border-white/[0.06]">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Stay updated</h4>
              <p className="text-xs text-[#8892A8]">Get the latest travel tips and product updates delivered to your inbox.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8892A8]" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-sm text-foreground placeholder:text-[#8892A8] focus:outline-none focus:border-[#F07420]/50 focus:ring-1 focus:ring-[#F07420]/20 transition-all"
                />
              </div>
              <button className="flex items-center gap-2 rounded-lg bg-[#F07420] text-white px-4 py-2.5 text-sm font-semibold hover:brightness-110 transition-all">
                <Send size={14} />
                <span className="hidden sm:inline">Subscribe</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8892A8]">
          <p>© 2026 Hamro Tourist · All rights reserved</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#F07420] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#F07420] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#F07420] transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
