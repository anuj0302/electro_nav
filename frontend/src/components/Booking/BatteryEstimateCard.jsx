import { Battery, Clock, TrendingUp, DollarSign, Zap } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { GlassCard, CardTitle } from "./BookingSummaryCard";

const BATTERY_KWH = 40.5;
const CHARGER_POWER = 50;
const RATE_PER_KWH = 15;
const RANGE_PER_KWH = 6;

export function computeEstimates(current, target) {
  const delta = Math.max(0, target - current);
  const energy = parseFloat(((delta / 100) * BATTERY_KWH).toFixed(1));
  const mins = Math.round((energy / CHARGER_POWER) * 60);
  const cost = Math.round(energy * RATE_PER_KWH);
  const range = Math.round(energy * RANGE_PER_KWH);

  return {
    energy, 
    mins,
    cost,
    range,
  };
}

function BatteryRing({ current, target }) {
  const { darkMode } = useTheme();
  const circumference = 339.3;
  const currentOffset = circumference - (current / 100) * circumference;
  const targetOffset = circumference - (target / 100) * circumference;

  return (
    <div className="relative w-[150px] h-[150px] mx-auto mb-4">
      <svg
        width="150"
        height="150"
        viewBox="0 0 150 150"
        className="-rotate-90"
      >
        <circle
          cx="75"
          cy="75"
          r="54"
          fill="none"
          stroke={darkMode ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)"}
          strokeWidth="12"
        />

        <circle
          cx="75"
          cy="75"
          r="54"
          fill="none"
          stroke="#22C55E"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={targetOffset}
          opacity={0.25}
          style={{
            transition: "stroke-dashoffset .6s cubic-bezier(.4,0,.2,1)",
          }}
        />

        <circle
          cx="75"
          cy="75"
          r="54"
          fill="none"
          stroke={
            current <= 25 ? "#EF4444" : current <= 50 ? "#F59E0B" : "#22C55E"
          }
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={currentOffset}
          style={{
            transition:
              "stroke-dashoffset .6s cubic-bezier(.4,0,.2,1), stroke .3s",
          }}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p
          className={`
            text-[30px]
            font-extrabold
            font-['Syne',sans-serif]
            leading-none
            ${darkMode ? "text-[#F9FAFB]" : "text-[#0F172A]"}
          `}
        >
          {current}%
        </p>
        <p
          className={`
            text-[10px]
            uppercase
            tracking-[0.6px]
            ${darkMode ? "text-[#9CA3AF]" : "text-[#64748B]"}
          `}
        >
          Current
        </p>
      </div>
    </div>
  );
}

export default function BatteryEstimateCard({
  current,
  target,
  onCurrentChange,
  onTargetChange,
  showSliders = true,
  showRing = false,
}) {
  const { darkMode } = useTheme();
  const est = computeEstimates(current, target);

  if (showSliders) {
    return (
      <GlassCard>
        <CardTitle icon={Battery}>Battery & Estimation</CardTitle>
        <div className="mb-5">
          <div className="flex justify-between items-end mb-3">
            <div>
              <p
                className={`
                  text-[11px]
                  uppercase
                  tracking-[0.5px]
                  mb-1
                  ${darkMode ? "text-[#9CA3AF]" : "text-[#64748B]"}
                `}
              >
                Current Battery
              </p>
              <p className="text-[30px] font-extrabold font-['Syne',sans-serif] text-[#22C55E] leading-none">
                {current}%
              </p>
            </div>

            <div className="text-right">
              <p
                className={`
                  text-[11px]
                  ${darkMode ? "text-[#9CA3AF]" : "text-[#64748B]"}
                `}
              >
                Target
              </p>

              <p
                className={`
                  text-[24px]
                  font-bold
                  font-['Syne',sans-serif]
                  ${darkMode ? "text-[#F9FAFB]" : "text-[#0F172A]"}
                `}
              >
                {target}%
              </p>
            </div>
          </div>

          <div
            className={`
              h-[10px]
              rounded-full
              overflow-hidden
              border
              mb-2
              ${
                darkMode
                  ? "bg-[#1a2640] border-white/[0.08]"
                  : "bg-slate-200 border-slate-300"
              }
            `}
          >
            <div
              className={`
                h-full
                rounded-full
                transition-all duration-500
                ${
                  current <= 25
                    ? "bg-gradient-to-r from-[#EF4444] to-[#F87171]"
                    : current <= 50
                      ? "bg-gradient-to-r from-[#F59E0B] to-[#FCD34D]"
                      : "bg-gradient-to-r from-[#22C55E] to-[#86efac]"
                }
              `}
              style={{
                width: `${current}%`,
              }}
            />
          </div>

          <input
            type="range"
            min="5"
            max="95"
            value={current}
            onChange={(e) => onCurrentChange?.(Number(e.target.value))}
            className="range-slider w-full mb-5"
          />

          <div
            className={`
              h-[10px]
              rounded-full
              overflow-hidden
              border
              mb-2
              ${
                darkMode
                  ? "bg-[#1a2640] border-white/[0.08]"
                  : "bg-slate-200 border-slate-300"
              }
            `}
          >
            <div
              className="
                h-full
                rounded-full
                bg-gradient-to-r
                from-[#22C55E]
                to-[#86efac]
                transition-all duration-500
              "
              style={{
                width: `${target}%`,
              }}
            />
          </div>

          <input
            type="range"
            min="20"
            max="100"
            value={target}
            onChange={(e) =>
              onTargetChange?.(Math.max(current + 5, Number(e.target.value)))
            }
            className="range-slider w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            {
              Icon: Clock,
              val: est.mins,
              unit: " min",
              label: "Duration",
            },

            {
              Icon: Zap,
              val: est.energy,
              unit: " kWh",
              label: "Energy",
            },

            {
              Icon: DollarSign,
              val: `₹${est.cost}`,
              unit: "",
              label: "Est. Cost",
            },

            {
              Icon: TrendingUp,
              val: est.range,
              unit: " km",
              label: "Added Range",
            },
          ].map((item) => (
            <div
              key={item.label}
              className={`
                rounded-2xl
                p-[15px]
                border
                transition-all duration-300
                ${
                  darkMode
                    ? "bg-[#1a2640] border-white/[0.08]"
                    : "bg-slate-100 border-slate-200"
                }
              `}
            >
              <item.Icon size={18} className="text-[#22C55E] mb-2" />

              <p
                className={`
                  text-[20px]
                  font-bold
                  font-['Syne',sans-serif]
                  leading-none
                  ${darkMode ? "text-[#F9FAFB]" : "text-[#0F172A]"}
                `}
              >
                {item.val}

                <span
                  className={`
                    text-[11px]
                    font-normal
                    ${darkMode ? "text-[#9CA3AF]" : "text-[#64748B]"}
                  `}
                >
                  {item.unit}
                </span>
              </p>

              <p
                className={`
                  text-[10px]
                  uppercase
                  tracking-[0.6px]
                  mt-[6px]
                  ${darkMode ? "text-[#9CA3AF]" : "text-[#64748B]"}
                `}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </GlassCard>
    );
  }

  return (
    <div
      className={`
        rounded-[24px]
        p-5
        mb-4
        border
        transition-all duration-300
        ${
          darkMode
            ? "bg-[#111827] border-white/[0.08]"
            : "bg-white border-slate-200"
        }
      `}
    >
      <BatteryRing current={current} target={target} />

      <div className="flex items-center gap-3">
        {[
          {
            value: `${current}%`,
            label: "From",
          },

          null,

          {
            value: `${target}%`,
            label: "To",
          },
        ].map((item, index) =>
          item ? (
            <div
              key={index}
              className={`
                flex-1
                rounded-2xl
                p-3
                text-center
                border
                ${
                  darkMode
                    ? "bg-[#1a2640] border-white/[0.08]"
                    : "bg-slate-100 border-slate-200"
                }
              `}
            >
              <p className="text-[20px] font-bold font-['Syne',sans-serif] text-[#22C55E]">
                {item.value}
              </p>

              <p
                className={`
                  text-[10px]
                  mt-1
                  ${darkMode ? "text-[#9CA3AF]" : "text-[#64748B]"}
                `}
              >
                {item.label}
              </p>
            </div>
          ) : (
            <Zap
              key={index}
              size={20}
              fill="currentColor"
              className="text-[#22C55E] flex-shrink-0"
            />
          ),
        )}
      </div>
    </div>
  );
}
