import { Zap } from "lucide-react";

export default function AuthHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-7">
      <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-[#22C55E]/20 to-[#22C55E]/5 border border-[#22C55E]/30 relative">
        <Zap size={26} className="text-[#22C55E]" fill="currentColor" />
      </div>

      <p className="font-['Syne',sans-serif] text-xl font-bold tracking-tight text-[#111827] dark:text-[#F9FAFB] transition-colors duration-300">
        Electro<span className="text-[#22C55E]">Nav</span>
      </p>

      <p className="text-xs text-[#9CA3AF] tracking-wide mt-0.5 mb-4">
        EV Charging Station Network
      </p>

      <h1 className="font-['Syne',sans-serif] text-[19px] font-semibold text-[#111827] dark:text-[#F9FAFB]">
        {title}
      </h1>

      <p className="text-[13px] text-[#9CA3AF] mt-1">
        {subtitle}
      </p>
    </div>
  );
}