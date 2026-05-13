import { useMemo } from "react";
import { Battery, Clock, Zap, DollarSign, TrendingUp } from "lucide-react";
import { GlassCard, CardTitle } from "./BookingSummaryCard";
import { computeEstimates } from "../../utils/bookingHelpers";

function battFillClass(p) {
  if (p <= 25) {
    return "from-[#ef4444] to-[#f87171]";
  }

  if (p <= 55) {
    return "from-[#f59e0b] to-[#fcd34d]";
  }

  return "from-[#22C55E] to-[#86efac]"; 
}
 
export default function BatterySliderCard({
  current,
  target,
  onCurrentChange,
  onTargetChange,
}) {
  const est = useMemo(
    () => computeEstimates(current, target),
    [current, target],
  );

  const sliderCls = `
    w-full appearance-none bg-transparent cursor-pointer
    [&::-webkit-slider-runnable-track]:h-[7px]
    [&::-webkit-slider-runnable-track]:rounded-full
    [&::-webkit-slider-runnable-track]:bg-[#162338]
    [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:w-[20px]
    [&::-webkit-slider-thumb]:h-[20px]
    [&::-webkit-slider-thumb]:rounded-full
    [&::-webkit-slider-thumb]:bg-[#22C55E]
    [&::-webkit-slider-thumb]:border-[3px]
    [&::-webkit-slider-thumb]:border-white
    [&::-webkit-slider-thumb]:-mt-[7px]
    [&::-webkit-slider-thumb]:shadow-[0_0_18px_rgba(34,197,94,.45)]
    transition-all duration-200
  `;

  const BattBar = ({ value, gradient }) => (
    <div className="h-[10px] overflow-hidden rounded-full bg-[#162338]">
      <div
        className={`h-full rounded-full bg-gradient-to-r transition-all duration-300 ${gradient}`}
        style={{
          width: `${value}%`,
        }}
      />
    </div>
  );

  const EstBox = ({ icon: Icon, value, unit, label }) => (
    <div className="flex min-h-[118px] flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#162338] p-4 transition-all duration-200">
      <div className="flex h-[36px] w-[36px] items-center justify-center rounded-xl bg-[#22C55E]/10 text-[#22C55E]">
        <Icon size={18} />
      </div>

      <div>
        <p className="font-['Syne',sans-serif] text-[24px] font-extrabold leading-none text-[#F9FAFB]">
          {value}

          <span className="ml-1 text-[11px] font-medium text-[#9CA3AF]">
            {unit}
          </span>
        </p>

        <p className="mt-2 text-[10px] uppercase tracking-[.7px] text-[#9CA3AF]">
          {label}
        </p>
      </div>
    </div>
  );

  return (
    <GlassCard className="h-full">
      <CardTitle icon={Battery}>Battery & Estimation</CardTitle>

      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="mb-1 text-[10px] uppercase tracking-[.7px] text-[#9CA3AF]">
            Current Battery
          </p>

          <p className="font-['Syne',sans-serif] text-[34px] font-extrabold leading-none text-[#22C55E]">
            {current}%
          </p>
        </div>

        <div className="text-right">
          <p className="mb-1 text-[10px] uppercase tracking-[.7px] text-[#9CA3AF]">
            Target
          </p>

          <p className="font-['Syne',sans-serif] text-[28px] font-bold leading-none text-[#F9FAFB]">
            {target}%
          </p>
        </div>
      </div>

      <div className="mb-7">
        <div className="mb-2 flex justify-between">
          <p className="text-[10px] uppercase tracking-[.7px] text-[#9CA3AF]">
            Current Level
          </p>

          <span className="text-[12px] font-semibold text-[#22C55E]">
            {current}%
          </span>
        </div>

        <BattBar value={current} gradient={battFillClass(current)} />

        <input
          type="range"
          min="5"
          max="95"
          step="1"
          value={current}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);

            onCurrentChange(v);

            if (target < v + 5) {
              onTargetChange(Math.min(v + 5, 100));
            }
          }}
          className={`${sliderCls} mt-4`}
        />
      </div>

      <div className="mb-8">
        <div className="mb-2 flex justify-between">
          <p className="text-[10px] uppercase tracking-[.7px] text-[#9CA3AF]">
            Target Level
          </p>

          <span className="text-[12px] font-semibold text-[#22C55E]">
            {target}%
          </span>
        </div>

        <BattBar value={target} gradient="from-[#22C55E] to-[#86efac]" />
      </div>

      <div>
        <p className="mb-3 text-[10px] uppercase tracking-[.7px] text-[#9CA3AF]">
          Charging Estimates
        </p>

        <div className="grid grid-cols-2 gap-3">
          <EstBox icon={Clock} value={est.mins} unit="min" label="Duration" />

          <EstBox icon={Zap} value={est.energy} unit="kWh" label="Energy" />

          <EstBox
            icon={DollarSign}
            value={`₹${est.cost}`}
            unit=""
            label="Est. Cost"
          />

          <EstBox
            icon={TrendingUp}
            value={est.km}
            unit="km"
            label="Added Range"
          />
        </div>
      </div>
    </GlassCard>
  );
}
