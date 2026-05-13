// src/components/Map/UserLocationMarker.jsx

import { Marker, Popup, Circle } from "react-leaflet";

import L from "leaflet";
import { Navigation } from "lucide-react";

const userIcon = new L.DivIcon({
  className: "custom-user-marker",
  html: `
    <div
      style="
        width:22px;
        height:22px;
        border-radius:999px;
        background:#3B82F6;
        border:4px solid white;
        box-shadow:0 0 0 6px rgba(59,130,246,0.18);
      "
    ></div>
  `,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

export default function UserLocationMarker({ position }) {
  if (!position) return null;

  return (
    <>
      <Circle
        center={position}
        radius={120}
        pathOptions={{
          color: "#3B82F6",
          fillColor: "#3B82F6",
          fillOpacity: 0.12,
          weight: 1.5,
        }}
      />

      <Marker position={position} icon={userIcon}>
        <Popup closeButton={false}>
          <div
            className="
              flex items-center gap-3
              py-1
            "
          >
            <div
              className="
                w-[38px]
                h-[38px]
                rounded-2xl
                flex items-center justify-center
                bg-[#3B82F6]/10
                border border-[#3B82F6]/20
                text-[#3B82F6]
              "
            >
              <Navigation size={18} fill="currentColor" />
            </div>

            <div>
              <h3
                className="
                  text-[14px]
                  font-bold
                  text-[#111827]
                "
              >
                Your Location
              </h3>

              <p
                className="
                  text-[11px]
                  text-gray-500
                  mt-[2px]
                "
              >
                Live location detected
              </p>
            </div>
          </div>
        </Popup>
      </Marker>
    </>
  );
}
