export default function Logo({ className }: { className?: string }) {
  return (
    <img
      src="/images/hamrotouristlogo.png"
      alt="Hamro Tourist"
      className={className}
      draggable={false}
    />
  );
}
