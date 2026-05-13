import { useEffect } from "react";

import {
  MapContainer as LeafletMap,
  TileLayer,
  ZoomControl,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import StationMarker from "./StationMarker";

import UserLocationMarker from "./UserLocationMarker";

import RouteMachine from "./RouteMachine";

import { useTheme } from "../../context/ThemeContext";

function FlyToStation({ selectedStation }) {
  const map = useMap();

  useEffect(() => {
    if (!selectedStation) return;

    const lat = Number(selectedStation.lat);

    const lng = Number(selectedStation.lng);

    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      return;
    }

    map.flyTo([lat, lng], 15, {
      duration: 1.8,
      easeLinearity: 0.25,
    });
  }, [selectedStation, map]);

  return null;
}

export default function MapContainer({
  stations = [],
  userLocation,
  selectedStation,
  onNavigate,
  onRouteFound,
  loading,
}) {
  const { dark } = useTheme();

  const defaultCenter = userLocation
    ? [userLocation.lat, userLocation.lng]
    : [23.2599, 77.4126];

  if (loading) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center ${
          dark ? "bg-[#111827]" : "bg-white"
        }`}
      >
        <p
          className={`text-[14px] font-medium ${
            dark ? "text-[#9CA3AF]" : "text-gray-500"
          }`}
        >
          Loading map...
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      <LeafletMap
        center={defaultCenter}
        zoom={13}
        scrollWheelZoom={true}
        zoomControl={false}
        className="h-full w-full z-[1]"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url={
            dark
              ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
        />

        <ZoomControl position="bottomright" />

        <FlyToStation selectedStation={selectedStation} />

        {userLocation && (
          <UserLocationMarker position={[userLocation.lat, userLocation.lng]} />
        )}

        {stations.map((station) => {
          const lat = Number(station?.lat);

          const lng = Number(station?.lng);

          if (Number.isNaN(lat) || Number.isNaN(lng)) {
            console.warn("INVALID STATION LOCATION", station);

            return null;
          }

          return (
            <StationMarker
              key={station._id}
              station={station}
              position={[lat, lng]}
              onNavigate={onNavigate}
              selected={selectedStation?._id === station._id}
            />
          );
        })}

        {userLocation && selectedStation && (
          <RouteMachine
            userLocation={{
              lat: Number(userLocation.lat),
              lng: Number(userLocation.lng),
            }}
            stationLocation={{
              lat: Number(selectedStation.lat),
              lng: Number(selectedStation.lng),
            }}
            onRouteFound={onRouteFound}
          />
        )}
      </LeafletMap>
    </div>
  );
}