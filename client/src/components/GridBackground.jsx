export default function GridBackground() {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        fixed inset-0
        z-0
        opacity-40
      "
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(34,197,94,0.05) 1px,
            transparent 1px
          ),
          linear-gradient(
            90deg,
            rgba(34,197,94,0.05) 1px,
            transparent 1px
          )
        `,
        backgroundSize: "40px 40px",
      }}
    />
  );
}