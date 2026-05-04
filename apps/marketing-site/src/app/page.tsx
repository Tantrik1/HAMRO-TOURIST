import Nav from '@/components/sections/nav';
import ScrollHero from '@/components/sections/hero';
import Marquee from '@/components/sections/marquee';
import Problem from '@/components/sections/problem';
import Features from '@/components/sections/features';
import HowItWorks from '@/components/sections/how-it-works';
import Comparison from '@/components/sections/comparison';
import Treks from '@/components/sections/treks';
import Testimonials from '@/components/sections/testimonials';
import Resources from '@/components/sections/resources';
import Pricing from '@/components/sections/pricing';
import FAQ from '@/components/sections/faq';
import CTA from '@/components/sections/cta';
import Footer from '@/components/sections/footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <ScrollHero />
        <Marquee />
        <Problem />
        <Features />
        <HowItWorks />
        <Comparison />
        <Treks />
        <Testimonials />
        <Resources />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
