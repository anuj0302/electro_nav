import { CalendarDays, Zap, CheckCircle2, Clock3 } from "lucide-react";

export default function BookingStatsStrip({ bookings = [] }) {
  const total = bookings.length;

  const completed = bookings.filter(
    (b) => b.bookingStatus === "completed",
  ).length;

  const upcoming = bookings.filter((b) =>
    ["confirmed", "charging"].includes(b.bookingStatus),
  ).length;

  const totalEnergy = bookings.length * 18;

  const STATS = [
    {
      label: "Total",
      value: total,
      Icon: CalendarDays,
      color: "text-[#38BDF8]",
      bg: "bg-[#38BDF8]/10",
    },

    {
      label: "Completed",
      value: completed,
      Icon: CheckCircle2,
      color: "text-[#22C55E]",
      bg: "bg-[#22C55E]/10",
    },

    {
      label: "Upcoming",
      value: upcoming,
      Icon: Clock3,
      color: "text-[#F59E0B]",
      bg: "bg-[#F59E0B]/10",
    },

    {
      label: "Energy",
      value: totalEnergy,
      suffix: "kWh",
      Icon: Zap,
      color: "text-[#A78BFA]",
      bg: "bg-[#A78BFA]/10",
    },
  ];

  return (
    <section className="mb-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {STATS.map(({ label, value, suffix, Icon, color, bg }) => (
          <div
            key={label}
            className="relative overflow-hidden rounded-[22px] border border-white/[0.07] bg-white dark:bg-[#111827]/80 backdrop-blur-xl p-4"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#22C55E]/30 to-transparent" />

            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-3 ${bg}`}
            >
              <Icon size={18} className={color} />
            </div>

            <div className="flex items-end gap-1">
              <h2 className="text-[24px] font-extrabold font-['Syne',sans-serif] text-[#111827] dark:text-[#F9FAFB]">
                {value}
              </h2>

              {suffix && (
                <span className="text-[11px] text-gray-500 dark:text-[#9CA3AF] mb-[3px]">
                  {suffix}
                </span>
              )}
            </div>

            <p className="text-[11px] uppercase tracking-[0.6px] text-gray-500 dark:text-[#9CA3AF] mt-1.5 font-medium">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}