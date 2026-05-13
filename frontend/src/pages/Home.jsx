import { useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  Zap,
  Gauge,
  MapPinned,
  SlidersHorizontal,
  Bolt,
  BatteryCharging,
  Star,
} from "lucide-react";

import Header from "../components/Layout/Header";

import BottomNav from "../components/Layout/BottomNav";

import SearchBar from "../components/Common/SearchBar";

import StationList from "../components/Station/StationList";

import { getAllStations } from "../services/stationApi";

import { getUserLocation } from "../utils/locationHelpers";

/* ─────────────────────────────────────────
   FILTER CHIPS
───────────────────────────────────────── */

const FILTER_CHIPS = [
  {
    id: "all",
    label: "All Stations",
    icon: MapPinned,
  },
  {
    id: "top-rated",
    label: "Top Rated",
    icon: Star,
  },
  {
    id: "available",
    label: "Available Now",
    icon: Zap,
  },
  {
    id: "fast",
    label: "Fast Charge",
    icon: Gauge,
  },
  {
    id: "dc-fast",
    label: "DC Fast",
    icon: Bolt,
  },
  {
    id: "ac-22",
    label: "AC 22kW",
    icon: BatteryCharging,
  },
];

/* ─────────────────────────────────────────
   HEADINGS
───────────────────────────────────────── */

const HEADING = {
  all: "All Stations",
  "top-rated": "Top Rated Stations",
  available: "Available Stations",
  fast: "Fast Charging",
  "dc-fast": "DC Fast Chargers",
  "ac-22": "AC 22kW Chargers",
};

/* ─────────────────────────────────────────
   FILTER LOGIC
───────────────────────────────────────── */

function applyFilter(stations, activeId) {
  switch (activeId) {
    case "top-rated":
      return stations.filter(
        (station) => (station.rating || 0) >= 4
      );

    case "available":
      return stations.filter(
        (station) =>
          station.status?.toLowerCase() === "available"
      );

    case "fast":
      return stations.filter((station) =>
        station.chargerTypes?.some((type) =>
          type?.toLowerCase().includes("dc")
        )
      );

    case "dc-fast":
      return stations.filter((station) =>
        station.chargerTypes?.includes("DC Fast")
      );

    case "ac-22":
      return stations.filter((station) =>
        station.chargerTypes?.includes("AC 22kW")
      );

    default:
      return stations;
  }
}

/* ─────────────────────────────────────────
   SORT BY RATING
───────────────────────────────────────── */

function sortByRating(stations) {
  return [...stations].sort(
    (a, b) => (b.rating || 0) - (a.rating || 0)
  );
}

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */

export default function Home() {
  const navigate = useNavigate();

  const userLocation = getUserLocation();

  /* STATES */

  const [stations, setStations] = useState([]);

  const [loading, setLoading] = useState(true);

  const [activeChip, setActiveChip] = useState("all");

  const [searchQuery, setSearchQuery] = useState("");

  /* FETCH STATIONS */

  useEffect(() => {
    const loadStations = async () => {
      try {
        setLoading(true);

        const data = await getAllStations();

        setStations(data || []);
      } catch (error) {
        console.error("FETCH STATIONS ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStations();
  }, []);

  /* LOCATION FILTER */

  const locationFiltered = useMemo(() => {
    if (!userLocation?.city) {
      return stations;
    }

    return stations.filter((station) =>
      station.city?.toLowerCase().includes(userLocation.city.toLowerCase())
    );
  }, [stations, userLocation]);

  /* SEARCH FILTER */

  const searchFiltered = useMemo(() => {
    if (!searchQuery.trim()) {
      return locationFiltered;
    }

    const query = searchQuery.toLowerCase();

    return locationFiltered.filter(
      (station) =>
        station.name?.toLowerCase().includes(query) ||
        station.city?.toLowerCase().includes(query) ||
        station.state?.toLowerCase().includes(query) ||
        station.address?.toLowerCase().includes(query) ||
        station.status?.toLowerCase().includes(query) ||
        station.chargerTypes?.some((type) =>
          type?.toLowerCase().includes(query)
        ) ||
        station.chargers?.some(
          (charger) =>
            charger.type?.toLowerCase().includes(query) ||
            charger.connector?.toLowerCase().includes(query)
        )
    );
  }, [searchQuery, locationFiltered]);

  /* CHIP FILTER */

  const filteredStations = useMemo(() => {
    const chipFiltered = applyFilter(searchFiltered, activeChip);
    return sortByRating(chipFiltered);
  }, [searchFiltered, activeChip]);

  /* HANDLERS */

  const handleNavigate = (station) => {
    const query =
      station.lat && station.lng
        ? `${station.lat},${station.lng}`
        : encodeURIComponent(station.address || station.name);

    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${query}`,
      "_blank"
    );
  };

  const handleBook = (station) => {
    navigate(`/station/${station._id}`);
  };

  /* STATS */

  const stats = [
    {
      label: "Nearby",
      value: locationFiltered.length,
    },
    {
      label: "Available",
      value: locationFiltered.filter(
        (station) => station.status?.toLowerCase() === "available"
      ).length,
    },
    {
      label: "Top Rated",
      value:
        locationFiltered.length > 0
          ? `${Math.max(
              ...locationFiltered.map((s) => s.rating || 0)
            ).toFixed(1)} ★`
          : "--",
    },
  ];

  return (
    <div
      className="
        min-h-screen

        bg-[#F4F6FA]
        dark:bg-[#0B1220]

        transition-colors duration-300
      "
    >
      {/* Grid Background */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed inset-0

          opacity-0
          dark:opacity-100

          transition-opacity duration-300
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",

          backgroundSize: "40px 40px",
        }}
      />

      {/* Light Glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed

          -top-32
          -right-32

          w-[500px]
          h-[500px]

          rounded-full

          dark:opacity-0

          transition-opacity duration-300
        "
        style={{
          background:
            "radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 65%)",
        }}
      />

      <div
        className="
          relative z-10

          pb-[100px]
          lg:pb-14
        "
      >
        {/* HEADER */}
        <Header />

        <main
          className="
            w-full
            max-w-[1300px]

            mx-auto

            px-4
            sm:px-6
            lg:px-10
          "
        >
          {/* SEARCH */}
          <div className="mb-4">
            <SearchBar onSearch={setSearchQuery} />
          </div>

          {/* FILTERS */}
          <div
            className="
              flex gap-2 mb-6

              overflow-x-auto

              lg:overflow-visible
              lg:flex-wrap
              lg:items-center

              [&::-webkit-scrollbar]:hidden
              [-ms-overflow-style:none]
              [scrollbar-width:none]
            "
          >
            {FILTER_CHIPS.map(({ id, label, icon: Icon }) => {
              const active = activeChip === id;

              return (
                <button
                  key={id}
                  onClick={() => setActiveChip(id)}
                  className={`
                    flex-shrink-0

                    inline-flex
                    items-center
                    gap-1.5

                    px-4
                    py-2.5

                    rounded-full

                    text-[12.5px]
                    font-semibold

                    border

                    transition-all duration-200

                    ${
                      active
                        ? `
                          bg-[#22C55E]
                          border-[#22C55E]

                          text-white

                          shadow-[0_4px_16px_rgba(34,197,94,0.30)]
                        `
                        : `
                          bg-white
                          dark:bg-[#111827]

                          border-gray-200
                          dark:border-white/[0.07]

                          text-gray-600
                          dark:text-[#9CA3AF]

                          hover:border-[#22C55E]/50
                          hover:text-[#22C55E]
                        `
                    }
                  `}
                >
                  <Icon size={13} strokeWidth={2.3} />

                  {label}
                </button>
              );
            })}

            {/* FILTER BTN */}
            <button
              className="
                hidden lg:inline-flex

                items-center gap-1.5

                ml-auto

                px-4 py-2.5

                rounded-full

                text-[12.5px]
                font-semibold

                border

                bg-white
                dark:bg-[#111827]

                border-gray-200
                dark:border-white/[0.07]

                text-gray-600
                dark:text-[#9CA3AF]

                hover:border-[#22C55E]/50
                hover:text-[#22C55E]

                transition-all duration-200
              "
            >
              <SlidersHorizontal size={13} strokeWidth={2.3} />

              Filters
            </button>
          </div>

          {/* STATS */}
          <div
            className="
              grid grid-cols-3
              gap-3 mb-7
            "
          >
            {stats.map(({ label, value }) => (
              <div
                key={label}
                className="
                  bg-white
                  dark:bg-[#111827]

                  border
                  border-gray-100
                  dark:border-white/[0.06]

                  rounded-2xl

                  py-4 px-3

                  text-center

                  shadow-sm
                "
              >
                <p
                  className="
                    text-[22px]
                    font-bold

                    text-[#22C55E]

                    leading-none
                  "
                >
                  {value}
                </p>

                <p
                  className="
                    mt-1.5

                    text-[10px]
                    uppercase

                    tracking-[0.65px]

                    text-gray-400
                    dark:text-[#6B7280]

                    font-semibold
                  "
                >
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* STATION LIST */}
          <div>
            {/* HEADING */}
            <div
              className="
                flex items-end
                justify-between

                mb-4
              "
            >
              <div>
                <h2
                  className="
                    text-[17px]
                    font-bold

                    text-[#111827]
                    dark:text-white

                    leading-none
                  "
                >
                  {HEADING[activeChip]}
                </h2>

                {!loading && (
                  <p
                    className="
                      mt-1

                      text-[12px]

                      text-gray-400
                      dark:text-[#6B7280]
                    "
                  >
                    {filteredStations.length} station
                    {filteredStations.length !== 1 ? "s" : ""} found
                  </p>
                )}
              </div>
            </div>

            <StationList
              stations={filteredStations}
              loading={loading}
              onNavigate={handleNavigate}
              onBook={handleBook}
            />
          </div>
        </main>
      </div>

      {/* BOTTOM NAV */}
      <BottomNav />
    </div>
  );
}