import { Zap, MapPin } from "lucide-react";

import { GlassCard, CardTitle } from "./BookingSummaryCard";

const Pill = ({
  children,
  green,
}) => (
  <span
    className={`
      px-2 py-1 rounded-full
      text-[10px]
      border
      font-medium
      ${
        green
          ? `
            bg-[#22C55E]/10
            text-[#22C55E]
            border-[#22C55E]/20
          `
          : `
            bg-[#F8FAFC]
            dark:bg-[#162338]
            text-gray-500 dark:text-[#9CA3AF]
            border-gray-200 dark:border-white/[0.08]
          `
      } 
    `}
  >
    {children}
  </span>
);

export default function SelectedStationCard({ station }) {
  return (
    <GlassCard>
      <CardTitle icon={Zap}>Station</CardTitle>

      <div className="flex items-start gap-3">
        <div className="w-[44px] h-[44px] rounded-[13px] bg-[#22C55E]/10 flex items-center justify-center text-[#22C55E]">
          <Zap size={22} fill="currentColor" />
        </div>

        <div className="flex-1">
          <p className="text-[14.5px] font-bold text-[#111827] dark:text-[#F9FAFB]">
            {station.name}
          </p>

          <p className="text-[11.5px] text-gray-500 dark:text-[#9CA3AF] flex items-center gap-1 mb-2">
            <MapPin size={11} className="text-[#22C55E]" />
            {station.address}
          </p>

          <div className="flex flex-wrap gap-[5px]">
            <Pill green>{station.isOpen ? "Open 24x7" : "Closed"}</Pill>

            <Pill>{station?.distanceKm || 0}</Pill>

            <Pill>★ {station.rating}</Pill>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}