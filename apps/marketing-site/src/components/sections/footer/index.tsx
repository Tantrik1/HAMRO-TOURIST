import Logo from '@/components/logo';
import LogoMark from '@/components/logo-mark';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-14">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <Logo className="h-10 w-auto text-foreground" />
          <p className="mt-4 text-sm text-muted-foreground max-w-sm">
            The all-in-one AI platform for travel agencies. Get online in 10 minutes — and run
            everything from one place.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-bold text-foreground">Product</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href="#features" className="hover:text-foreground">Features</a></li>
            <li><a href="#pricing" className="hover:text-foreground">Pricing</a></li>
            <li><a href="#resources" className="hover:text-foreground">Resources</a></li>
            <li><a href="#faq" className="hover:text-foreground">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold text-foreground">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">About</a></li>
            <li><a href="#" className="hover:text-foreground">Blog</a></li>
            <li><a href="#" className="hover:text-foreground">Contact</a></li>
            <li><a href="#" className="hover:text-foreground">Privacy</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-5 lg:px-8 mt-10 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
        <p>© 2026 Hamro Tourist · Made with love in Kathmandu</p>
        <div className="flex items-center gap-2">
          <LogoMark className="h-5 w-auto" />
          <span>Built for Nepal · Loved worldwide</span>
        </div>
      </div>
    </footer>
  );
}
