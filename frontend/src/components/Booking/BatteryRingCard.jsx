import { Battery, Zap } from "lucide-react";
import { GlassCard, CardTitle } from "./BookingSummaryCard";
import { ringStrokeColor } from "../../utils/bookingHelpers";

const CIRCLE = 314.2;

function BatteryBox({ value, label }) {
  return (
    <div className="flex-1 bg-[#F8FAFC] dark:bg-[#162338] border border-gray-200 dark:border-white/[0.08] rounded-2xl p-3 text-center">
      <p className="text-[17px] font-bold font-['Syne',sans-serif] text-[#22C55E]">
        {value}%
      </p>

      <p className="text-[10px] text-gray-500 dark:text-[#9CA3AF] mt-0.5">
        {label}
      </p>
    </div>
  ); 
} 

export default function BatteryRingCard({
  current = 0,
  target = 80,
}) {
  const safeCurrent = Math.min(Math.max(current, 0), 100);

  const safeTarget = Math.min(Math.max(target, 0), 100);

  const currentOffset = CIRCLE - (safeCurrent / 100) * CIRCLE;

  const targetOffset = CIRCLE - (safeTarget / 100) * CIRCLE;

  return (
    <GlassCard>
      <CardTitle icon={Battery}>
        Battery Progress
      </CardTitle>

      <div className="bg-[#F8FAFC] dark:bg-[#162338] border border-gray-200 dark:border-white/[0.08] rounded-[20px] p-5">
        <div className="relative w-[130px] h-[130px] mx-auto mb-4">
          <svg
            width="130"
            height="130"
            viewBox="0 0 130 130"
            className="-rotate-90"
          >
            <circle
              cx="65"
              cy="65"
              r="50"
              fill="none"
              stroke="rgba(148,163,184,0.18)"
              strokeWidth="11"
            />

            <circle
              cx="65"
              cy="65"
              r="50"
              fill="none"
              stroke="#22C55E"
              strokeWidth="11"
              strokeLinecap="round"
              strokeDasharray={CIRCLE}
              strokeDashoffset={targetOffset}
              opacity={0.25}
            />

            <circle
              cx="65"
              cy="65"
              r="50"
              fill="none"
              stroke={ringStrokeColor(safeCurrent)}
              strokeWidth="11"
              strokeLinecap="round"
              strokeDasharray={CIRCLE}
              strokeDashoffset={currentOffset}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-[28px] font-extrabold text-[#111827] dark:text-[#F9FAFB]">
              {safeCurrent}%
            </p>

            <p className="text-[9px] uppercase text-gray-500 dark:text-[#9CA3AF]">
              current
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <BatteryBox
            value={safeCurrent}
            label="From"
          />

          <Zap
            size={20}
            fill="currentColor"
            className="text-[#22C55E]"
          />

          <BatteryBox
            value={safeTarget}
            label="To"
          />
        </div>
      </div>
    </GlassCard>
  );
}