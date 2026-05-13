import { CalendarX2, Zap } from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

export default function EmptyBookings({
  onExplore,
}) {
  const { dark } = useTheme();

  return (
    <section className="flex flex-col items-center justify-center text-center py-16 px-5">
      <div className="relative w-[90px] h-[90px] rounded-full flex items-center justify-center mb-5 bg-[#22C55E]/10 border border-[#22C55E]/20">
        <div className="absolute inset-0 rounded-full bg-[#22C55E]/10 blur-2xl" />

        <CalendarX2
          size={40}
          className="relative z-10 text-[#22C55E]"
        />
      </div>

      <h2
        className={`
          text-[22px]
          font-extrabold
          font-['Syne',sans-serif]
          mb-2
          ${
            dark
              ? "text-[#F9FAFB]"
              : "text-[#111827]"
          }
        `}
      >
        No Bookings Found
      </h2>

      <p className="max-w-[320px] text-[13px] leading-relaxed text-[#9CA3AF] mb-6">
        You haven't booked any charging
        sessions yet. Explore nearby EV
        charging stations and reserve your
        first slot.
      </p>

      <button
        onClick={onExplore}
        className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#22C55E] text-white text-[13px] font-bold font-['Syne',sans-serif] shadow-[0_6px_24px_rgba(34,197,94,.35)] hover:bg-[#16A34A] hover:shadow-[0_8px_30px_rgba(34,197,94,.5)] transition-all duration-300"
      >
        <Zap
          size={17}
          fill="currentColor"
        />

        Explore Stations
      </button>
    </section>
  );
}