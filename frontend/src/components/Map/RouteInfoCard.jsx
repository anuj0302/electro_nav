import {
  Navigation2,
  Clock3,
  Route,
  Zap,
  MapPin,
  X,
  ArrowRight,
  Navigation,
  ChevronUp,
} from "lucide-react";

import { useState, useEffect } from "react";

import { useTheme } from "../../context/ThemeContext";

export default function RouteInfoCard({
  visible = false,
  selectedStation,
  routeInfo,
  onClose,
  onStartNavigation,
  onCancelNavigation,
}) {
  const { dark } = useTheme();

  const [isNavigating, setIsNavigating] = useState(false);

  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    setIsMinimized(false);
  }, [selectedStation]);

  useEffect(() => {
    if (!selectedStation) {
      setIsNavigating(false);
    }
  }, [selectedStation]);

  if (!visible || !selectedStation) {
    return null;
  }

  const {
    name,
    address,
    chargerTypes = [],
  } = selectedStation;

  const distance =
    routeInfo?.distanceKm || "--";

  const eta =
    routeInfo?.timeMins || "--";

  const handleStartNavigation = () => {
    if (isNavigating) return;

    setIsNavigating(true);

    onStartNavigation?.(selectedStation);
  };

  const handleCancelNavigation = () => {
    setIsNavigating(false);

    onCancelNavigation?.();
  };

  if (isMinimized) {
    return (
      <button
        onClick={() =>
          setIsMinimized(false)
        }
        className={`
          absolute
          left-3
          lg:left-6
          bottom-[95px]
          sm:bottom-[92px]
          lg:bottom-6
          z-[1000]
          group
          flex items-center gap-3
          rounded-full
          px-4 py-3
          backdrop-blur-2xl
          border
          shadow-[0_10px_35px_rgba(0,0,0,0.2)]
          transition-all duration-300
          hover:scale-[1.03]
          active:scale-[0.97]
          ${
            dark
              ? `
                bg-[#0F172AE8]
                border-white/[0.08]
              `
              : `
                bg-white/95
                border-gray-200
              `
          }
        `}
      >
        <div className="relative w-11 h-11 rounded-full flex items-center justify-center bg-[#22C55E]/15 border border-[#22C55E]/20">
          <Navigation2
            size={20}
            className="text-[#22C55E]"
          />

          {isNavigating && (
            <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-[#22C55E] border-2 border-white animate-pulse" />
          )}
        </div>

        <div className="flex flex-col items-start">
          <span
            className={`text-[12px] font-bold ${
              dark
                ? "text-white"
                : "text-gray-900"
            }`}
          >
            {isNavigating
              ? "Navigation Active"
              : "Route Ready"}
          </span>

          <span
            className={`text-[10px] ${
              dark
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          >
            Tap to expand
          </span>
        </div>

        <ChevronUp
          size={18}
          className={`transition-transform group-hover:-translate-y-0.5 ${
            dark
              ? "text-gray-400"
              : "text-gray-500"
          }`}
        />
      </button>
    );
  }

  return (
    <div
      className={`
        absolute
        left-3
        lg:left-6
        bottom-[92px]
        lg:bottom-6
        z-[1000]
        w-[calc(100vw-24px)]
        max-w-[390px]
        transition-all duration-500
        ${
          visible
            ? `
              opacity-100
              translate-y-0
              scale-100
            `
            : `
              opacity-0
              translate-y-5
              scale-[0.98]
              pointer-events-none
            `
        }
      `}
    >
      <div
        className={`
          relative overflow-hidden
          rounded-[30px]
          px-4 py-4
          border
          backdrop-blur-2xl
          shadow-[0_10px_40px_rgba(0,0,0,0.18)]
          transition-all duration-300
          ${
            dark
              ? `
                bg-[#0F172AE8]
                border-white/[0.08]
              `
              : `
                bg-white/95
                border-gray-200
              `
          }
        `}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#22C55E]/50 to-transparent" />

        <button
          onClick={() => setIsMinimized(true)}
          className={`
            absolute
            top-3
            right-3
            w-8 h-8
            rounded-full
            flex items-center justify-center
            transition-all duration-200
            ${
              dark
                ? `
                  bg-white/[0.05]
                  hover:bg-white/[0.08]
                  text-[#9CA3AF]
                `
                : `
                  bg-gray-100
                  hover:bg-gray-200
                  text-gray-500
                `
            }
          `}
        >
          <X size={15} />
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] text-[10px] font-bold tracking-[0.5px] mb-4">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />

          {isNavigating
            ? "NAVIGATION ACTIVE"
            : "ROUTE READY"}
        </div>

        <div className="flex items-start gap-3">
          <div className="w-[50px] h-[50px] rounded-2xl flex items-center justify-center bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] flex-shrink-0">
            <Navigation2
              size={24}
              strokeWidth={2.3}
            />
          </div>

          <div className="flex-1 min-w-0 pr-8">
            <p
              className={`text-[16px] font-extrabold leading-tight ${
                dark
                  ? "text-[#F9FAFB]"
                  : "text-[#111827]"
              }`}
            >
              {name}
            </p>

            <p
              className={`mt-1 flex items-start gap-1 text-[11px] leading-relaxed ${
                dark
                  ? "text-[#9CA3AF]"
                  : "text-gray-500"
              }`}
            >
              <MapPin
                size={12}
                className="mt-[1px] flex-shrink-0 text-[#22C55E]"
              />

              <span className="line-clamp-2">
                {address}
              </span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <div
            className={`
              rounded-2xl
              px-3 py-3
              border
              ${
                dark
                  ? `
                    bg-[#111827]
                    border-white/[0.06]
                  `
                  : `
                    bg-[#F9FAFB]
                    border-gray-200
                  `
              }
            `}
          >
            <div className="flex items-center gap-2 mb-1">
              <Route
                size={14}
                className="text-[#22C55E]"
              />

              <span
                className={`text-[10px] font-medium ${
                  dark
                    ? "text-[#9CA3AF]"
                    : "text-gray-500"
                }`}
              >
                Distance
              </span>
            </div>

            <p
              className={`text-[20px] font-black ${
                dark
                  ? "text-[#F9FAFB]"
                  : "text-[#111827]"
              }`}
            >
              {distance}

              <span className="text-[12px] ml-1 font-semibold text-[#22C55E]">
                km
              </span>
            </p>
          </div>

          <div
            className={`
              rounded-2xl
              px-3 py-3
              border
              ${
                dark
                  ? `
                    bg-[#111827]
                    border-white/[0.06]
                  `
                  : `
                    bg-[#F9FAFB]
                    border-gray-200
                  `
              }
            `}
          >
            <div className="flex items-center gap-2 mb-1">
              <Clock3
                size={14}
                className="text-[#F59E0B]"
              />

              <span
                className={`text-[10px] font-medium ${
                  dark
                    ? "text-[#9CA3AF]"
                    : "text-gray-500"
                }`}
              >
                ETA
              </span>
            </div>

            <p
              className={`text-[20px] font-black ${
                dark
                  ? "text-[#F9FAFB]"
                  : "text-[#111827]"
              }`}
            >
              {eta}

              <span className="text-[12px] ml-1 font-semibold text-[#F59E0B]">
                mins
              </span>
            </p>
          </div>
        </div>

        {!!chargerTypes.length && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap
                size={13}
                className="text-[#22C55E]"
              />

              <span
                className={`text-[11px] font-medium ${
                  dark
                    ? "text-[#9CA3AF]"
                    : "text-gray-500"
                }`}
              >
                Available Chargers
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {chargerTypes.map((type) => (
                <span
                  key={type}
                  className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-5 flex gap-2">
          {!isNavigating ? (
            <button
              onClick={handleStartNavigation}
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-[#22C55E] hover:bg-[#16A34A] py-3.5 text-[13px] font-bold text-white shadow-[0_8px_24px_rgba(34,197,94,0.28)] transition-all duration-200 hover:-translate-y-[1px] active:scale-[0.98]"
            >
              <Navigation size={16} />

              Start Navigation

              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleCancelNavigation}
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-red-500 hover:bg-red-600 py-3.5 text-[13px] font-bold text-white shadow-[0_8px_24px_rgba(239,68,68,0.25)] transition-all duration-200 hover:-translate-y-[1px] active:scale-[0.98]"
            >
              Cancel Navigation
            </button>
          )}
        </div>
      </div>
    </div>
  );
}