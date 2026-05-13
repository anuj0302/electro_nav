import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Wifi, Car, Coffee, ShieldCheck, Zap } from "lucide-react";

import Loader from "../components/Common/Loader";
import GridBackground from "../components/Common/GridBackground";
import GlowOrb from "../components/Common/GlowOrb";

import StationHeader from "../components/Layout/SlotHeader";

import StationHero from "../components/Station/StationHero";
import ChargerCard from "../components/Station/ChargerCard";
import SlotSelector from "./SlotSelector";
import PricingCard from "../components/Station/PricingCard";
import FeaturePills from "../components/Station/FeaturePills";

import StationMapPreview from "../components/Map/StationMapPreview";

import { getStationById } from "../services/stationApi"; 
import { useTheme } from "../context/ThemeContext";

import { saveBookingFlow } from "../utils/bookingFlowStorage";

const TEMP_FEATURES = [
  {
    label: "Cafe Nearby",
    Icon: Coffee,
  },

  {
    label: "Parking",
    Icon: Car,
  },

  {
    label: "WiFi",
    Icon: Wifi,
  },

  {
    label: "24x7",
    Icon: ShieldCheck,
  },
];

const TEMP_SLOTS = {
  dates: [
    { day: "Mon", num: "8" },
    { day: "Tue", num: "9" },
    { day: "Wed", num: "10" },
    { day: "Thu", num: "11" },
  ],

  times: [
    { time: "09:00 AM", available: true },
    { time: "10:00 AM", available: true },
    { time: "11:00 AM", available: false },
    { time: "12:00 PM", available: true },
    { time: "01:00 PM", available: true },
    { time: "02:00 PM", available: false },
  ],
};

export default function StationDetails() {
  const navigate = useNavigate();
  const { dark } = useTheme();
  const { id } = useParams();

  const [station, setStation] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [selectedDate, setSelectedDate] = useState("8");

  const [selectedTime, setSelectedTime] = useState("10:00 AM");

  const [selectedCharger, setSelectedCharger] = useState(null);

  const formattedDate = `2026-05-${selectedDate}`;

  useEffect(() => {
    const loadStation = async () => {
      setLoading(true);

      try {
        const data = await getStationById(id);

        setStation(data);

        if (data?.chargers?.length > 0) {
          const firstAvailable = data.chargers.find((c) => c.slotsAvail > 0);

          setSelectedCharger(firstAvailable || null);
        }

        // await new Promise((r) => setTimeout(r, 400));
      } catch (err) {
        setError(err?.message || "Failed to load station");
      } finally {
        setLoading(false);
      }
    };

    loadStation();
  }, [id]);

  const handleBook = () => {
    if (!selectedCharger || !selectedTime) return;

    const bookingData = {
      station,

      charger: selectedCharger,

      slot: {
        date: formattedDate,
        time: selectedTime,
      },
    };

    saveBookingFlow(bookingData);

    navigate("/booking/vehicle", {
      state: bookingData,
    });
  };

  return (
    <div
      className={`
    relative min-h-screen overflow-hidden
    transition-colors duration-300

    ${dark ? "bg-[#020817]" : "bg-[#F4F7FB]"}
  `}
    >
      {/* Background */}
      {dark && (
        <>
          <GridBackground />

          <GlowOrb
            className="
        top-[-140px]
        left-[-120px]
      "
            color="green"
          />

          <GlowOrb
            className="
        bottom-[-160px]
        right-[-120px]
      "
            color="blue"
          />
        </>
      )}

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <StationHeader station={station} />

        {/* Content */}
        <div
          className="
            overflow-y-auto
            pb-36 lg:pb-10
          "
          style={{
            scrollbarWidth: "none",
          }}
        >
          {loading && <Loader />}

          {error && <p className="text-center text-[#EF4444] py-20">{error}</p>}

          {station && (
            <div
              className="
                max-w-[1400px]
                mx-auto
                px-4 sm:px-6 lg:px-8
                pt-2
                pb-4

                grid
                grid-cols-1
                lg:grid-cols-[1.15fr_.85fr]
                gap-5 lg:gap-8
              "
            >
              {/* LEFT */}
              <div>
                <StationHero station={station} />



                {/* Chargers */}
                <div className="mb-6">
                  {/* Heading */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3
                        className={`
          text-[17px]
          font-extrabold
          font-['Syne',sans-serif]

          ${dark ? "text-[#F9FAFB]" : "text-[#111827]"}
        `}
                      >
                        Chargers Available
                      </h3>

                      <p
                        className={`
          text-[12px]
          mt-0.5

          ${dark ? "text-[#9CA3AF]" : "text-gray-500"}
        `}
                      >
                        Select your preferred charger
                      </p>
                    </div>

                    {/* Count */}
                    <div
                      className={`
        px-3 py-1.5
        rounded-full
        text-[11px]
        font-bold

        ${
          dark
            ? `
              bg-[#111827]
              border border-white/[0.06]
              text-[#22C55E]
            `
            : `
              bg-white
              border border-gray-200
              text-[#22C55E]
            `
        }
      `}
                    >
                      {station?.chargers?.length || 0} Chargers
                    </div>
                  </div>

                  {/* Grid */}
                  {station?.chargers?.length > 0 ? (
                    <div
                      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-3
        gap-3
      "
                    >
                      {station.chargers.map((charger, index) => (
                        <ChargerCard
                          key={index}
                          charger={charger}
                          selected={selectedCharger === charger}
                          onSelect={setSelectedCharger}
                        />
                      ))}
                    </div>
                  ) : (
                    <div
                      className={`
        rounded-[22px]
        p-6
        text-center
        border

        ${
          dark
            ? `
              bg-[#091225]
              border-white/[0.06]
            `
            : `
              bg-white
              border-gray-200
            `
        }
      `}
                    >
                      <div
                        className="
          w-[54px]
          h-[54px]
          mx-auto
          mb-3
          rounded-2xl
          bg-[#22C55E]/10
          flex items-center justify-center
          text-[#22C55E]
        "
                      >
                        <Zap size={24} fill="currentColor" />
                      </div>

                      <p
                        className={`
          text-[14px]
          font-bold
          mb-1

          ${dark ? "text-white" : "text-[#111827]"}
        `}
                      >
                        No chargers available
                      </p>

                      <p
                        className={`
          text-[12px]

          ${dark ? "text-[#9CA3AF]" : "text-gray-500"}
        `}
                      >
                        Please try another station
                      </p>
                    </div>
                  )}
                </div>

                {/* Slots */}
                <SlotSelector
                  slots={TEMP_SLOTS}
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}
                  selectedTime={selectedTime}
                  onTimeSelect={setSelectedTime}
                />

                {/* Features */}
                <FeaturePills features={TEMP_FEATURES} />
              </div>

              {/* RIGHT */}
              <div>
                <PricingCard station={station} charger={selectedCharger} />

                {/* Desktop CTA */}
                <div className="hidden lg:block mb-4">
                  <button
                    disabled={!selectedCharger}
                    onClick={handleBook}
                    className={`
  w-full
  rounded-2xl
  py-[15px]

  flex items-center justify-center gap-2

  text-[16px]
  font-bold
  font-['Syne',sans-serif]

  transition-all duration-300

  ${
    !selectedCharger
      ? `
        cursor-not-allowed
        bg-[#22C55E]/50
        text-white/80
        shadow-none
      `
      : `
        bg-[#22C55E]
        text-white
        shadow-[0_6px_24px_rgba(34,197,94,.35)]

        hover:bg-[#16A34A]
        hover:shadow-[0_8px_32px_rgba(34,197,94,.5)]
        active:scale-[0.98]
      `
  }
`}
                  >
                    <Zap size={18} fill="currentColor" />
                    Book Charging Slot
                  </button>

                  <p className="text-center text-[11px] text-[#9CA3AF] mt-2">
                    Selected:
                    <span className="text-[#22C55E] font-semibold ml-1">
                      {selectedTime} · {selectedDate} May
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* MOBILE BOOKING BAR */}
        {station && (
          <div
            className="
              lg:hidden
              fixed bottom-[84px]
              left-0 right-0
              z-40

              px-4
            "
          >
            <button
              disabled={!selectedCharger}
              onClick={handleBook}
              className={`
  w-full
  rounded-2xl
  py-4

  text-[16px]
  font-bold
  font-['Syne',sans-serif]

  shadow-[0_6px_24px_rgba(34,197,94,.35)]

  flex items-center justify-center gap-2

  transition-all duration-300

  ${
    !selectedCharger
      ? `
        bg-[#22C55E]/50
        text-white/80
        cursor-not-allowed
      `
      : `
        bg-[#22C55E]
        text-white
      `
  }
`}
            >
              <Zap size={18} fill="currentColor" />
              Book Charging Slot
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
