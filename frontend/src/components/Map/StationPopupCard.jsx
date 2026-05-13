import { Zap, MapPin, Star, Navigation } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { openNavigation } from "../../utils/mapHelpers";

export default function StationPopupCard({ station, position }) {
  const navigate = useNavigate();

  const {
    _id,
    name,
    address,
    rating,
    distance,
    availableSlots,
    totalSlots,
    chargerTypes,
    pricePerKWh,
    waitTime,
  } = station || {};

  const handleNavigate = () => {
    openNavigation(position?.[0], position?.[1]);
  };

  const handleBook = () => {
    navigate(`/station/${_id}`);
  };

  return (
    <div
      className="
        w-[260px]
      "
    >
      <div className="flex gap-3">
        <div
          className="
            w-[46px]
            h-[46px]
            rounded-2xl
            flex items-center justify-center
            bg-[#22C55E]/10
            border border-[#22C55E]/20
            text-[#22C55E]
            flex-shrink-0
          "
        >
          <Zap size={22} fill="currentColor" />
        </div>

        {/* INFO */}
        <div className="flex-1 min-w-0">
          <h3
            className="
              text-[15px]
              font-bold
              text-[#111827]
              leading-tight
            "
          >
            {name}
          </h3>

          <p
            className="
              flex items-start gap-1
              mt-1
              text-[11px]
              text-gray-500
              leading-relaxed
            "
          >
            <MapPin
              size={11}
              className="
                mt-[1px]
                text-[#22C55E]
                flex-shrink-0
              "
            />

            {address}
          </p>

          <div
            className="
              flex items-center gap-3
              mt-2
            "
          >
            <span
              className="
                flex items-center gap-1
                text-[11px]
                font-medium
                text-gray-600
              "
            >
              <Star size={11} className="text-[#F59E0B]" fill="currentColor" />

              {rating || 4.5}
            </span>

            <span
              className="
                text-[11px]
                text-gray-500
              "
            >
              {distance || "Nearby"}
            </span>
          </div>
        </div>
      </div>

      <div
        className="
          flex flex-wrap gap-1.5
          mt-4
        "
      >
        {(chargerTypes || []).map((type) => (
          <span
            key={type}
            className="
                px-2 py-[4px]
                rounded-lg
                text-[10px]
                font-semibold
                bg-[#22C55E]/10
                text-[#22C55E]
                border border-[#22C55E]/20
              "
          >
            {type}
          </span>
        ))}
      </div>

      <div
        className="
          grid grid-cols-3 gap-2
          mt-4
        "
      >
        {[
          {
            label: "Slots",
            value: `${availableSlots}/${totalSlots}`,
          },

          {
            label: "Price",
            value: `₹${pricePerKWh || 18}`,
          },

          {
            label: "Wait",
            value: waitTime || "~5m",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="
              rounded-xl
              bg-[#F8FAFC]
              border border-gray-200
              px-2 py-3
              text-center
            "
          >
            <p
              className="
                text-[13px]
                font-bold
                text-[#111827]
              "
            >
              {item.value}
            </p>

            <p
              className="
                text-[9px]
                uppercase
                tracking-[0.4px]
                text-gray-400
                mt-1
              "
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>

      <div
        className="
          flex gap-2
          mt-4
        "
      >
        <button
          onClick={handleNavigate}
          className="
            flex-1
            flex items-center justify-center gap-1.5
            rounded-2xl
            py-3
            bg-[#F3F4F6]
            hover:bg-[#E5E7EB]
            border border-gray-200
            text-[12px]
            font-semibold
            text-[#111827]
            transition-all duration-200
          "
        >
          <Navigation size={14} />
          Navigate
        </button>

        <button
          onClick={handleBook}
          className="
            flex-[1.4]
            flex items-center justify-center gap-1.5
            rounded-2xl
            py-3
            bg-[#22C55E]
            hover:bg-[#16A34A]
            text-white
            text-[12px]
            font-bold
            shadow-[0_6px_24px_rgba(34,197,94,.25)]
            transition-all duration-200
          "
        >
          <Zap size={14} fill="currentColor" />
          Book Slot
        </button>
      </div>
    </div>
  );
}
