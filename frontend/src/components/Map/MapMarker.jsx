import { Zap } from "lucide-react";

export default function MapMarker({
  busy = false,
  isUser = false,
  style = {},
}) {
  const base =
    "absolute flex flex-col items-center -translate-x-1/2 -translate-y-full hover:-translate-y-1 cursor-pointer transition-all duration-200 hover:scale-110";
  if (isUser) {
    return (
      <div className={base} style={style}>
        <div className="w-[22px] h-[22px] rounded-[50%_50%_50%_0deg] rotate-[-45deg] bg-[#3B82F6] flex items-center justify-center shadow-[0_4px_12px_rgba(59,130,246,0.4)] border border-white/20">
          <div className="rotate-45 w-2 h-2 bg-white rounded-full" />
        </div>
      </div>
    );
  }
  const bg = busy
    ? "bg-[#EF4444] shadow-[0_4px_12px_rgba(239,68,68,0.4)]"
    : "bg-[#22C55E] shadow-[0_4px_12px_rgba(34,197,94,0.4)]";
  return (
    <div className={base} style={style}>
      <div
        className={`w-[30px] h-[30px] rounded-[50%_50%_50%_0deg] rotate-[-45deg] ${bg} flex items-center justify-center border border-white/20`}
      >
        <Zap size={14} className="rotate-45 text-white" fill="currentColor" />
      </div>
    </div>
  );
}
