import { Zap } from "lucide-react";

import MapMarker from "./MapMarker";

import MapControls from "./MapControls";

const getRandomPosition = () => ({
  left: `${20 + Math.random() * 60}%`,
  top: `${20 + Math.random() * 60}%`,
});

export default function MapView({ stations = [] }) {
  return (
    <div className="relative h-[220px] rounded-3xl overflow-hidden border border-gray-200 dark:border-white/[0.07] bg-white dark:bg-[#111827] transition-colors duration-300">
      <svg
        viewBox="0 0 420 220"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
      >
        <rect
          width="420"
          height="220"
          fill="#1a2235"
        />

        <line
          x1="0"
          y1="90"
          x2="420"
          y2="90"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="8"
        />

        <line
          x1="0"
          y1="140"
          x2="420"
          y2="140"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="5"
        />

        <line
          x1="120"
          y1="0"
          x2="120"
          y2="220"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="8"
        />

        <line
          x1="280"
          y1="0"
          x2="280"
          y2="220"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="5"
        />

        <line
          x1="60"
          y1="0"
          x2="200"
          y2="220"
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="3"
        />

        <line
          x1="320"
          y1="0"
          x2="420"
          y2="120"
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="3"
        />

        <line
          x1="0"
          y1="90"
          x2="420"
          y2="90"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1.5"
          strokeDasharray="12,10"
        />

        <line
          x1="120"
          y1="0"
          x2="120"
          y2="220"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1.5"
          strokeDasharray="12,10"
        />

        <path
          d="M80 90 Q120 90 120 70 Q120 30 200 30 Q280 30 280 90 Q280 140 340 140"
          stroke="#22C55E"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
        />

        <rect
          x="130"
          y="98"
          width="140"
          height="34"
          rx="4"
          fill="rgba(255,255,255,0.03)"
        />

        <rect
          x="0"
          y="98"
          width="110"
          height="34"
          rx="4"
          fill="rgba(255,255,255,0.02)"
        />

        <rect
          x="130"
          y="148"
          width="140"
          height="68"
          rx="4"
          fill="rgba(255,255,255,0.02)"
        />

        <rect
          x="290"
          y="98"
          width="130"
          height="34"
          rx="4"
          fill="rgba(255,255,255,0.02)"
        />
      </svg>

      {stations.map((station) => (
        <MapMarker
          key={station?._id || station?.id}
          busy={station.status === "busy"}
          style={getRandomPosition()}
        />
      ))}

      <MapMarker
        isUser
        style={{
          left: "42%",
          top: "42%",
        }}
      />

      <div
        className="absolute rounded-full border-2 border-[#3B82F6]/30 animate-ping pointer-events-none"
        style={{
          left: "calc(42% - 20px)",
          top: "calc(42% - 40px)",
          width: 40,
          height: 40,
        }}
      />

      <MapControls />

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white dark:bg-[#111827] border border-gray-200 dark:border-white/[0.07] rounded-full px-4 py-[7px] text-[12px] font-medium text-[#111827] dark:text-[#F9FAFB] flex items-center gap-1.5 shadow-xl whitespace-nowrap transition-colors duration-300">
        <Zap
          size={13}
          className="text-[#22C55E]"
          fill="currentColor"
        />

        <span className="text-[#22C55E] font-bold">
          {stations.length}
        </span>

        stations within 5 km
      </div>
    </div>
  );
}