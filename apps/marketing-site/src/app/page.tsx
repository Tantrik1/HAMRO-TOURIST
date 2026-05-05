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

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://hamrotourist.com/#organization',
      name: 'Hamro Tourist',
      url: 'https://hamrotourist.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://hamrotourist.com/images/hamrotouristlogo.png',
        width: 203,
        height: 205,
      },
      sameAs: [
        'https://twitter.com/hamrotourist',
        'https://www.linkedin.com/company/hamrotourist',
      ],
      description:
        'Hamro Tourist is an all-in-one SaaS platform for travel agencies in Nepal — AI website builder, CRM, booking management, and local payment integrations.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kathmandu',
        addressCountry: 'NP',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://hamrotourist.com/#website',
      url: 'https://hamrotourist.com',
      name: 'Hamro Tourist',
      publisher: { '@id': 'https://hamrotourist.com/#organization' },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://hamrotourist.com/resources?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://hamrotourist.com/#product',
      name: 'Hamro Tourist',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'NPR',
        availability: 'https://schema.org/InStock',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '124',
      },
      featureList: [
        'AI-powered website builder',
        'Travel CRM',
        'Booking management',
        'eSewa & Khalti payments',
        'Custom domain',
        'Email automation',
      ],
    },
    {
      '@type': 'WebPage',
      '@id': 'https://hamrotourist.com/#webpage',
      url: 'https://hamrotourist.com',
      name: 'Hamro Tourist — Travel Agency Website Builder & CRM | Nepal',
      isPartOf: { '@id': 'https://hamrotourist.com/#website' },
      about: { '@id': 'https://hamrotourist.com/#organization' },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: 'https://hamrotourist.com/opengraph-image',
      },
      description:
        'Launch your travel agency website in 10 minutes with Hamro Tourist. AI-powered website builder, CRM, booking management, eSewa/Khalti payments, custom domain, and email automation.',
    },
  ],
};

export default function LandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
    </>
  );
}
