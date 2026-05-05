import Nav from '@/components/sections/nav';
import ScrollHero from '@/components/sections/hero';
import Clients from '@/components/sections/clients';
import Templates from '@/components/sections/templates';
import Crm from '@/components/sections/crm';
import Finance from '@/components/sections/finance';
import Payments from '@/components/sections/payments';
import HowToLaunch from '@/components/sections/how-to-launch';
import Testimonials from '@/components/sections/testimonials';
import Pricing from '@/components/sections/pricing';
import Comparison from '@/components/sections/comparison';
import Resources from '@/components/sections/resources';
import FinalOffer from '@/components/sections/final-offer';
import Footer from '@/components/sections/footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <ScrollHero />
        <Clients />
        <section id="features">
          <Templates />
          <Crm />
          <Finance />
          <Payments />
        </section>
        <section id="how-it-works">
          <HowToLaunch />
        </section>
        <Testimonials />
        <section id="pricing">
          <Pricing />
          <Comparison />
        </section>
        <section id="resources">
          <Resources />
        </section>
        <FinalOffer />
      </main>
      <Footer />
    </div>
  );
}
