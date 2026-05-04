export default function Logo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 220 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="18" r="12" fill="url(#logoGrad)" />
      <path d="M11 22l5-8.5 5 8.5H11z" fill="white" />
      <text x="34" y="24" fill="currentColor" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="18">Hamro Tourist</text>
      <defs>
        <linearGradient id="logoGrad" x1="4" y1="6" x2="28" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7C3AED" />
          <stop offset="1" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
    </svg>
  );
}
