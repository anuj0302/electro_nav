import { Marker, Popup, useMap } from "react-leaflet";

import { useEffect, useMemo, useRef } from "react";

import L from "leaflet";

import {
  Zap,
  MapPin,
  Star,
  Navigation,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const createEVIcon = (
  status = "available",
  active = false,
) => {
  const COLORS = {
    available: "#22C55E",
    limited: "#F59E0B",
    busy: "#EF4444",
  };

  const color =
    COLORS[status] ||
    COLORS.available;

  return L.divIcon({
    className: "custom-ev-marker",

    html: `
      <div
        style="
          position: relative;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        ${
          active
            ? `
          <div
            style="
              position: absolute;
              width: 52px;
              height: 52px;
              border-radius: 999px;
              background: ${color}30;
              animation: pulseMarker 1.8s infinite;
            "
          ></div>
        `
            : ""
        }

        <div
          style="
            position: absolute;
            width: 46px;
            height: 46px;
            border-radius: 999px;
            background: ${color}30;
            filter: blur(12px);
          "
        ></div>

        <div
          style="
            position: relative;
            width: ${active ? "46px" : "42px"};
            height: ${active ? "46px" : "42px"};
            border-radius: 16px;
            background: ${color};
            display: flex;
            align-items: center;
            justify-content: center;
            border: 3px solid white;
            box-shadow:
              0 10px 30px rgba(0,0,0,0.22),
              0 4px 18px ${color}55;
            transform: rotate(45deg);
            transition: all .25s ease;
          "
        >
          <div
            style="
              transform: rotate(-45deg);
              color: white;
              font-size: 18px;
              font-weight: bold;
              line-height: 1;
            "
          >
            ⚡
          </div>
        </div>

        <style>
          @keyframes pulseMarker {
            0% {
              transform: scale(0.9);
              opacity: 0.7;
            }

            70% {
              transform: scale(1.4);
              opacity: 0;
            }

            100% {
              transform: scale(1.4);
              opacity: 0;
            }
          }
        </style>
      </div>
    `,

    iconSize: [60, 60],

    iconAnchor: [30, 46],

    popupAnchor: [0, -40],
  });
};

export default function StationMarker({
  station,
  position,
  onNavigate,
  selected = false,
}) {
  const navigate = useNavigate();

  const map = useMap();

  const markerRef = useRef(null);

  const popupTimeoutRef = useRef(null);

  const isMobile =
    window.innerWidth < 768;

  const lat = Number(position?.[0]);

  const lng = Number(position?.[1]);

  if (
    Number.isNaN(lat) ||
    Number.isNaN(lng)
  ) {
    return null;
  }

  const {
    _id,
    name,
    address,
    rating,
    distance,
    availableSlots,
    totalSlots,
    chargerTypes,
    pricePerUnit,
    status = "available",
  } = station;

  const stationIcon = useMemo(
    () =>
      createEVIcon(
        status,
        selected,
      ),
    [status, selected],
  );

  useEffect(() => {
    if (
      selected &&
      markerRef.current
    ) {
      map.flyTo([lat, lng], 15, {
        duration: 1.2,
      });

      if (isMobile) {
        markerRef.current.openPopup();
      }
    }
  }, [
    selected,
    map,
    lat,
    lng,
    isMobile,
  ]);

  const handleNavigate = () => {
    onNavigate?.(station);

    if (!isMobile) {
      markerRef.current?.closePopup();
    }
  };

  const handleBook = () => {
    navigate(`/station/${_id}`);
  };

  const handleMouseEnter = () => {
    if (isMobile) return;

    clearTimeout(
      popupTimeoutRef.current,
    );

    markerRef.current?.openPopup();
  };

  const handleMouseLeave = () => {
    if (isMobile) return;

    popupTimeoutRef.current =
      setTimeout(() => {
        markerRef.current?.closePopup();
      }, 450);
  };

  const handleMarkerClick = () => {
    onNavigate?.(station);

    markerRef.current?.openPopup();

    if (isMobile) {
      map.flyTo([lat, lng], 15, {
        duration: 0.8,
      });
    }
  };

  return (
    <Marker
      ref={markerRef}
      position={[lat, lng]}
      icon={stationIcon}
      eventHandlers={{
        mouseover: handleMouseEnter,
        mouseout: handleMouseLeave,
        click: handleMarkerClick,
      }}
    >
      <Popup
        closeButton={false}
        autoPan={true}
        keepInView={true}
        autoPanPadding={[80, 240]}
        className="custom-popup"
        eventHandlers={{
          add: (e) => {
            if (isMobile) return;

            const popupEl =
              e.popup._container;

            if (!popupEl) return;

            popupEl.addEventListener(
              "mouseenter",
              () => {
                clearTimeout(
                  popupTimeoutRef.current,
                );
              },
            );

            popupEl.addEventListener(
              "mouseleave",
              () => {
                popupTimeoutRef.current =
                  setTimeout(() => {
                    markerRef.current?.closePopup();
                  }, 300);
              },
            );
          },
        }}
      >
        <div className="w-[280px] p-1">
          {selected && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] text-[10px] font-bold tracking-[0.5px] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              ACTIVE ROUTE
            </div>
          )}

          <div className="flex gap-3">
            <div className="w-[48px] h-[48px] rounded-2xl flex items-center justify-center bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] flex-shrink-0">
              <Zap
                size={22}
                fill="currentColor"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-[15px] font-bold text-[#111827] leading-tight">
                {name}
              </h3>

              <p className="flex items-start gap-1 mt-1 text-[11px] text-gray-500 leading-relaxed">
                <MapPin
                  size={11}
                  className="mt-[1px] text-[#22C55E] flex-shrink-0"
                />

                {address}
              </p>

              <div className="flex items-center gap-3 mt-2">
                <span className="flex items-center gap-1 text-[11px] font-medium text-gray-600">
                  <Star
                    size={11}
                    className="text-[#F59E0B]"
                    fill="currentColor"
                  />

                  {rating || 4.5}
                </span>

                <span className="text-[11px] text-gray-500">
                  {distance || "Nearby"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-4">
            {(chargerTypes || []).map((type) => (
              <span
                key={type}
                className="px-2 py-[4px] rounded-lg text-[10px] font-semibold bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20"
              >
                {type}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4 rounded-2xl bg-[#F8FAFC] border border-gray-200 px-3 py-3">
            <div>
              <p className="text-[10px] uppercase text-gray-400">
                Slots
              </p>

              <p className="text-[14px] font-bold text-[#22C55E]">
                {availableSlots}/{totalSlots}
              </p>
            </div>

            <div className="text-right">
              <p className="text-[10px] uppercase text-gray-400">
                Price
              </p>

              <p className="text-[14px] font-bold text-[#111827]">
                ₹{pricePerUnit || 18}
                /kWh
              </p>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={handleNavigate}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-2xl py-3 bg-[#F3F4F6] hover:bg-[#E5E7EB] border border-gray-200 text-[12px] font-semibold text-[#111827] transition-all duration-200"
            >
              <Navigation size={14} />
              Navigate
            </button>

            <button
              onClick={handleBook}
              className="flex-[1.4] flex items-center justify-center gap-1.5 rounded-2xl py-3 bg-[#22C55E] hover:bg-[#16A34A] text-white text-[12px] font-bold shadow-[0_6px_24px_rgba(34,197,94,.25)] transition-all duration-200"
            >
              <Zap
                size={14}
                fill="currentColor"
              />
              Book Slot
            </button>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}