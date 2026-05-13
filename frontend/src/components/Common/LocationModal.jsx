import { useState } from "react";
import { MapPin, Navigation } from "lucide-react";

import toast from "react-hot-toast";

import { saveUserLocation } from "../../utils/locationHelpers";

export default function LocationModal({ open, onClose }) {
  const [manualLocation, setManualLocation] = useState("");

  if (!open) return null;

  const handleLiveLocation = () => {
    if (!navigator.geolocation) {
      return toast.error("Geolocation is not supported");
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;

          const lng = position.coords.longitude;

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
          );

          const data = await response.json();

          const address = data.address || {};

          const location = {
            type: "live",
            city: address.city || address.town || address.village || "",
            state: address.state || "",
            country: address.country || "",
            full: data.display_name || "",
            lat,
            lng,
          };

          saveUserLocation(location);

          toast.success("Location detected");

          onClose();
        } catch (error) {
          console.error(error);

          toast.error("Failed to fetch location");
        }
      },

      (error) => {
        console.error(error);

        toast.error("Unable to access location");
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  const handleManualLocation = () => {
    if (!manualLocation.trim()) {
      return toast.error("Enter a location");
    }

    const formattedLocation = manualLocation.trim();

    saveUserLocation({
      type: "manual",
      city: formattedLocation,
      full: formattedLocation,
    });

    toast.success("Location saved");

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div className="w-full max-w-[380px] rounded-3xl bg-[#111827] border border-white/[0.08] p-6">
        <div className="text-center mb-5">
          <div className="w-14 h-14 rounded-2xl bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center mx-auto mb-3">
            <MapPin size={26} className="text-[#22C55E]" />
          </div>

          <h2 className="text-[20px] font-bold text-[#F9FAFB]">
            Choose Location
          </h2>

          <p className="text-[13px] text-[#9CA3AF] mt-1">
            Find nearby EV stations faster
          </p>
        </div>

        <button
          onClick={handleLiveLocation}
          className="w-full mb-4 flex items-center justify-center gap-2 bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-2xl py-3.5 font-semibold transition-all duration-200"
        >
          <Navigation size={17} />
          Use Live Location
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-white/[0.07]" />

          <span className="text-[11px] text-[#9CA3AF]">
            OR
          </span>

          <div className="flex-1 h-px bg-white/[0.07]" />
        </div>

        <input
          value={manualLocation}
          onChange={(e) => setManualLocation(e.target.value)}
          placeholder="Enter city or area"
          className="w-full mb-4 bg-[#1F2937] border border-white/[0.07] rounded-2xl px-4 py-3 text-[#F9FAFB] outline-none focus:border-[#22C55E]/40"
        />

        <button
          onClick={handleManualLocation}
          className="w-full bg-[#1F2937] hover:bg-[#283548] border border-white/[0.07] text-[#F9FAFB] rounded-2xl py-3 font-medium transition-all duration-200"
        >
          Save Manual Location
        </button>
      </div>
    </div>
  );
}