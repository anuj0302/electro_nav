import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import BottomNav from "../components/Layout/BottomNav";

import GridBackground from "../components/Common/GridBackground";
import GlowOrb from "../components/Common/GlowOrb";

import MapHeader from "../components/Map/MapHeader";

import MapContainer from "../components/Map/MapContainer";

import RouteInfoCard from "../components/Map/RouteInfoCard";

import { useTheme } from "../context/ThemeContext";

import { getAllStations } from "../services/stationApi";

export default function MapPage() {
  const { dark } = useTheme();

  /* ---------------- STATES ---------------- */

  const [stations, setStations] = 
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [userLocation, setUserLocation] =
    useState(null);

  const [selectedStation, setSelectedStation] =
    useState(null);

  const [routeInfo, setRouteInfo] =
    useState(null);

  const [isNavigating, setIsNavigating] =
    useState(false);

  /* ---------------- FETCH DATA ---------------- */

  useEffect(() => {
    fetchStations();

    getUserLocation();
  }, []);

  /* ---------------- FETCH STATIONS ---------------- */

  const fetchStations =
    async () => {
      try {
        setLoading(true);

        const res =
          await getAllStations();

        console.log(
          "MAP STATIONS",
          res
        );

        const stationsData =
          Array.isArray(res?.data)
            ? res.data
            : Array.isArray(res)
            ? res
            : [];

        setStations(stationsData);
      } catch (error) {
        console.error(
          "MAP FETCH ERROR",
          error
        );

        toast.error(
          "Failed to load stations"
        );
      } finally {
        setLoading(false);
      }
    };

  /* ---------------- USER LOCATION ---------------- */

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      toast.error(
        "Geolocation not supported"
      );

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat:
            position.coords.latitude,

          lng:
            position.coords.longitude,
        };

        console.log(
          "USER LOCATION",
          coords
        );

        setUserLocation(coords);
      },

      (error) => {
        console.error(
          "LOCATION ERROR",
          error
        );

        toast.error(
          "Unable to fetch location"
        );
      },

      {
        enableHighAccuracy: true,

        timeout: 10000,
      }
    );
  };

  /* ---------------- SELECT STATION ---------------- */

  const handleNavigate = (
    station
  ) => {
    console.log(
      "NAVIGATE TO",
      station
    );

    setSelectedStation(station);

    setRouteInfo(null);
  };

  /* ---------------- START NAVIGATION ---------------- */

  const handleStartNavigation =
    () => {
      setIsNavigating(true);
    };

  /* ---------------- CANCEL NAVIGATION ---------------- */

  const handleCancelNavigation =
    () => {
      setIsNavigating(false);

      setSelectedStation(null);

      setRouteInfo(null);

      toast.success(
        "Navigation cancelled"
      );
    };

  /* ---------------- RECENTER ---------------- */

  const handleRecenter =
    () => {
      window.location.reload();
    };

  /* ---------------- CLEAR ROUTE ---------------- */

  const handleClearRoute = () => {
    setSelectedStation(null);

    setRouteInfo(null);

    setIsNavigating(false);
  };

  /* ---------------- RENDER ---------------- */

  return (
    <div
      className={`
        relative
        h-screen
        w-screen
        overflow-hidden

        transition-colors duration-300

        ${
          dark
            ? "bg-[#0B1220]"
            : "bg-[#F4F7FB]"
        }
      `}
    >
      {/* ---------------- BACKGROUND ---------------- */}

      {dark && (
        <>
          <GridBackground />

          <GlowOrb
            className="
              w-[420px]
              h-[420px]

              -top-[180px]
              -left-[140px]
            "
          />

          <GlowOrb
            className="
              w-[340px]
              h-[340px]

              -bottom-[80px]
              -right-[80px]
            "
          />
        </>
      )}

      {/* ---------------- HEADER ---------------- */}

      <div className="relative z-[1000]">
        <MapHeader
          onRecenter={
            handleRecenter
          }
          isNavigating={
            isNavigating
          }
        />
      </div>

      {/* ---------------- MAP ---------------- */}

      <div
        className="
          absolute inset-0
          z-[1]
        "
      >
        <MapContainer
          stations={stations}
          userLocation={
            userLocation
          }
          selectedStation={
            selectedStation
          }
          onNavigate={
            handleNavigate
          }
          onRouteFound={
            setRouteInfo
          }
          loading={loading}
          isNavigating={
            isNavigating
          }
        />
      </div>

      {/* ---------------- ROUTE CARD ---------------- */}

      <RouteInfoCard
        visible={
          !!selectedStation
        }
        selectedStation={
          selectedStation
        }
        routeInfo={routeInfo}
        isNavigating={
          isNavigating
        }
        onClose={
          handleClearRoute
        }
        onStartNavigation={
          handleStartNavigation
        }
        onCancelNavigation={
          handleCancelNavigation
        }
      />

      {/* ---------------- BOTTOM NAV ---------------- */}

      <div className="relative z-[1000]">
        <BottomNav />
      </div>
    </div>
  );
}