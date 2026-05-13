const FILTERS = [
  "All",
  "Upcoming",
  "Completed",
  "Cancelled",
];

export default function BookingFilterTabs({
  activeFilter,
  onChange,
}) {
  return (
    <section className="mb-5">
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {FILTERS.map((filter) => {
          const active = activeFilter === filter;

          return (
            <button
              key={filter}
              type="button"
              onClick={() => onChange(filter)}
              className={`
                flex-shrink-0
                px-4 py-[10px]
                rounded-2xl
                text-[12px]
                font-semibold
                tracking-[0.2px]
                border
                transition-all duration-300
                ${
                  active
                    ? `
                      bg-[#22C55E]
                      border-[#22C55E]
                      text-white
                      shadow-[0_4px_18px_rgba(34,197,94,.28)]
                    `
                    : `
                      bg-white
                      dark:bg-[#111827]/80
                      border-gray-200 dark:border-white/[0.07]
                      text-gray-500 dark:text-[#9CA3AF]
                      hover:border-[#22C55E]/25
                      dark:hover:text-[#F9FAFB]
                      hover:text-[#111827]
                    `
                }
              `}
            >
              {filter}
            </button>
          );
        })}
      </div>
    </section>
  );
}