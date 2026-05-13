const BADGE_STYLES = {
  available: "bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/25",

  busy: "bg-[#EF4444]/12 text-[#EF4444] border border-[#EF4444]/20",

  limited: "bg-[#F59E0B]/12 text-[#F59E0B] border border-[#F59E0B]/20",
};

const BADGE_LABELS = {
  available: "● Available",

  busy: "● Busy",

  limited: "● Limited",
};

export default function AvailabilityBadge({ status = "available" }) {
  const normalized = status?.toLowerCase();

  return (
    <span
      className={`
        inline-flex items-center
        flex-shrink-0

        text-[10px]
        font-semibold

        px-[10px]
        py-1

        rounded-full

        uppercase
        tracking-[0.3px]

        transition-all duration-200

        ${BADGE_STYLES[normalized] ?? BADGE_STYLES.available}
      `}
    >
      {BADGE_LABELS[normalized] ?? "● Unknown"}
    </span>
  );
}
