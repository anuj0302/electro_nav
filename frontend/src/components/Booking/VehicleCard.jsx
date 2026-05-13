import { Car } from "lucide-react";

import { GlassCard, CardTitle } from "./BookingSummaryCard";

const CONNECTORS = ["CCS2", "CHAdeMO", "Type 2", "GB/T"];

export default function VehicleCard({ vehicle, onChange }) {
  const update = (field, value) =>
    onChange({
      ...vehicle,
      [field]: value,
    });

  const inputCls = `
    w-full
    bg-[#F8FAFC] dark:bg-[#162338]
    border border-gray-200 dark:border-white/[0.08]
    rounded-[14px]
    px-[14px] py-[11px]
    text-[13px]
    text-[#111827] dark:text-[#F9FAFB]
    placeholder:text-gray-400 dark:placeholder:text-[#9CA3AF]/55
    outline-none
    focus:border-[#22C55E]/40
    focus:ring-4 focus:ring-[#22C55E]/10
    transition-all duration-200
    mb-[10px]
  `;

  return (
    <GlassCard className="h-full">
      <CardTitle icon={Car} iconBg="bg-[#38BDF8]/10" iconColor="text-[#38BDF8]">
        Your Vehicle
      </CardTitle>

      {[
        {
          field: "driverName",
          label: "Driver Name",
          placeholder: "Your name",
        },
        {
          field: "model",
          label: "EV Model",
          placeholder: "Tata Nexon EV",
        },
        {
          field: "registration",
          label: "Registration",
          placeholder: "MP XX XX XXXX",
        },
      ].map((item) => (
        <div key={item.field}>
          <label className="block text-[11px] font-medium text-gray-500 dark:text-[#9CA3AF] mb-[6px]">
            {item.label}
          </label>

          <input 
            type="text"
            value={vehicle[item.field] ?? ""}
            onChange={(e) =>
              update(
                item.field,
                item.field === "registration"
                  ? e.target.value.toUpperCase()
                  : e.target.value,
              )
            }
            placeholder={item.placeholder}
            className={inputCls}
          />
        </div>
      ))}

      <div className="flex gap-[7px] flex-wrap">
        {CONNECTORS.map((c) => (
          <button
            type="button"
            key={c}
            onClick={() => update("connector", c)}
            className={`
              flex-1 min-w-[72px]
              py-[10px] px-2
              rounded-[12px]
              text-[11.5px] font-semibold
              border
              transition-all duration-200
              ${
                vehicle.connector === c
                  ? `
                    bg-[#22C55E]/10
                    border-[#22C55E]/30
                    text-[#22C55E]
                  `
                  : `
                    bg-[#F8FAFC]
                    dark:bg-[#162338]
                    border-gray-200 dark:border-white/[0.08]
                    text-gray-500 dark:text-[#9CA3AF]
                  `
              }
            `}
          >
            {c}
          </button>
        ))}
      </div>
    </GlassCard>
  );
}
