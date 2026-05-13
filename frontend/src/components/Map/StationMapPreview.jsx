import {
  Zap,
  Navigation2,
} from "lucide-react";

export default function StationMapPreview() {
  /**
   * Production: replace SVG mock with @react-google-maps/api GoogleMap
   * centered on station.latlng with DARK_MAP_STYLES applied.
   */
  return (
    <div className="relative h-[200px] rounded-[22px] overflow-hidden border border-white/[0.07] bg-[#111827] mb-4">
      {/* Road SVG mock */}
      <svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
        <rect width="420" height="200" fill="#1a2235"/>
        <line x1="0" y1="80" x2="420" y2="80" stroke="rgba(255,255,255,0.06)" strokeWidth="8"/>
        <line x1="0" y1="130" x2="420" y2="130" stroke="rgba(255,255,255,0.04)" strokeWidth="5"/>
        <line x1="140" y1="0" x2="140" y2="200" stroke="rgba(255,255,255,0.06)" strokeWidth="8"/>
        <line x1="290" y1="0" x2="290" y2="200" stroke="rgba(255,255,255,0.04)" strokeWidth="5"/>
        <line x1="140" y1="0" x2="140" y2="200" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" strokeDasharray="10,9"/>
        <line x1="0" y1="80" x2="420" y2="80" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" strokeDasharray="10,9"/>
        <rect x="150" y="88" width="130" height="34" rx="4" fill="rgba(255,255,255,0.03)"/>
        <rect x="0"   y="88" width="130" height="34" rx="4" fill="rgba(255,255,255,0.025)"/>
        <rect x="300" y="88" width="120" height="34" rx="4" fill="rgba(255,255,255,0.025)"/>
        <circle cx="210" cy="80" r="28" fill="rgba(34,197,94,0.08)" stroke="rgba(34,197,94,0.25)" strokeWidth="1.5"/>
        <path d="M60 170 Q80 140 140 80 Q180 40 210 60" stroke="#22C55E" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="8,5" opacity="0.7"/>
        <circle cx="60" cy="172" r="7" fill="#3B82F6" opacity="0.9"/>
        <circle cx="60" cy="172" r="12" fill="rgba(59,130,246,0.2)"/>
        <text x="155" y="109" fill="rgba(255,255,255,0.35)" fontSize="8" fontFamily="DM Sans">Civil Lines</text>
        <text x="8"   y="109" fill="rgba(255,255,255,0.3)"  fontSize="8" fontFamily="DM Sans">MP Nagar</text>
      </svg>
      {/* Green station pin */}
      <div className="absolute left-1/2 top-[18px] -translate-x-1/2">
        <div className="w-[34px] h-[34px] rounded-[50%_50%_50%_0deg] rotate-[-45deg] bg-[#22C55E] flex items-center justify-center shadow-[0_6px_16px_rgba(34,197,94,0.45)] border-2 border-white/20">
          <Zap size={15} className="rotate-45 text-white" fill="currentColor" />
        </div>
      </div>
      {/* Open in Maps button */}
      <button className="
        absolute bottom-3 right-3 bg-[#111827] border border-white/[0.07] rounded-xl
        px-3.5 py-[7px] text-[12px] font-medium text-[#F9FAFB]
        flex items-center gap-1.5 shadow-xl
        hover:border-[#22C55E]/30 hover:text-[#22C55E] transition-all duration-200
      ">
        <Navigation2 size={13} /> Open in Maps
      </button>
    </div>
  );
}