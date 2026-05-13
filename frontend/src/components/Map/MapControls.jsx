import { MapPin } from "lucide-react";

export default function MapControls({ onZoomIn, onZoomOut, onLocate }) {
  const btnCls =
    "w-[34px] h-[34px] rounded-[10px] bg-white dark:bg-[#111827] border border-gray-200 dark:border-white/[0.07] flex items-center justify-center text-gray-500 dark:text-[#9CA3AF] hover:text-[#22C55E] hover:border-[#22C55E]/30 transition-all duration-200 shadow-lg";
  return (
    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
      <button className={btnCls} onClick={onZoomIn} aria-label="Zoom in">
        <span className="text-lg font-light leading-none">+</span>
      </button>
      <button className={btnCls} onClick={onZoomOut} aria-label="Zoom out">
        <span className="text-lg font-light leading-none">−</span>
      </button>
      <button className={btnCls} onClick={onLocate} aria-label="My location">
        <MapPin size={14} />
      </button>
    </div>
  );
}
