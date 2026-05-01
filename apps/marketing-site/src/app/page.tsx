export default function MarketingPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-cyan-900">
      <div className="text-center space-y-6 text-white">
        <h1 className="text-6xl font-bold">Hamro Tourist</h1>
        <p className="text-xl opacity-80 max-w-lg mx-auto">
          The SaaS platform for travel agencies. Build your website, manage your products, grow your business.
        </p>
        <a
          href="https://app.hamrotourist.com"
          className="inline-block bg-white text-purple-900 font-semibold rounded-full px-8 py-3 hover:scale-105 transition-transform"
        >
          Get Started Free
        </a>
      </div>
    </main>
  );
}
