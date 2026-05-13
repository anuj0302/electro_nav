export default function GlowOrb({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{
        background:
          "radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 70%)",
      }}
    />
  );
}
