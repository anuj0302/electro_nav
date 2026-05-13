// src/routes/AppRoutes.jsx

import {
  Routes,
  Route,
} from "react-router-dom";

/* ---------------- MAIN PAGES ---------------- */

import Home from "../pages/Home";

import Login from "../pages/Login";

import Signup from "../pages/Signup";

import MapPage from "../pages/MapPage";
 
/* ---------------- STATION ---------------- */

import StationDetails from "../pages/StationDetails";

/* ---------------- BOOKING FLOW ---------------- */

import SlotSelector from "../pages/SlotSelector";

import VehicleDetails from "../pages/VehicleDetails";

import Booking from "../pages/Booking";

import BookingSuccess from "../pages/BookingSuccess";

/* ---------------- BOOKINGS ---------------- */

import BookingPage from "../pages/BookingPage";

import BookingDetailsPage from "../pages/BookingDetailsPage";

/* ---------------- PROTECTION ---------------- */

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* =========================================================
                            MAIN
      ========================================================= */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/map"
        element={<MapPage />}
      />

      {/* =========================================================
                            AUTH
      ========================================================= */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      {/* =========================================================
                          STATION DETAILS
      ========================================================= */}

      <Route
        path="/station/:id"
        element={
          <ProtectedRoute>
            <StationDetails />
          </ProtectedRoute>
        }
      />

      {/* =========================================================
                          BOOKING FLOW
      ========================================================= */}

      {/* STEP 1 → SLOT SELECTION */}
      <Route
        path="/booking/slot"
        element={
          <ProtectedRoute>
            <SlotSelector />
          </ProtectedRoute>
        }
      />

      {/* STEP 2 → VEHICLE DETAILS */}
      <Route
        path="/booking/vehicle"
        element={
          <ProtectedRoute>
            <VehicleDetails />
          </ProtectedRoute>
        }
      />

      {/* STEP 3 → REVIEW & CONFIRM */}
      <Route
        path="/booking/review"
        element={
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        }
      />

      {/* STEP 4 → SUCCESS */}
      <Route
        path="/booking-success"
        element={
          <ProtectedRoute>
            <BookingSuccess />
          </ProtectedRoute>
        }
      />

      {/* =========================================================
                            BOOKINGS
      ========================================================= */}

      {/* MY BOOKINGS */}
      <Route
        path="/bookings/my"
        element={
          <ProtectedRoute>
            <BookingPage />
          </ProtectedRoute>
        }
      />

      {/* BOOKING DETAILS */}
      <Route
        path="/bookings/:id"
        element={
          <ProtectedRoute>
            <BookingDetailsPage />
          </ProtectedRoute>
        }
      />

      {/* =========================================================
                              404
      ========================================================= */}

      <Route
        path="*"
        element={
          <div
            className="
              min-h-screen

              flex flex-col
              items-center justify-center

              gap-4

              px-6

              bg-[#0B1220]

              text-[#F9FAFB]
            "
          >
            {/* 404 */}
            <h1
              className="
                text-[64px]
                md:text-[80px]

                leading-none

                font-extrabold
                font-['Syne',sans-serif]

                text-[#22C55E]
              "
            >
              404
            </h1>

            {/* Title */}
            <h2
              className="
                text-[22px]
                md:text-[28px]

                font-bold
              "
            >
              Page Not Found
            </h2>

            {/* Description */}
            <p
              className="
                text-[14px]
                md:text-[15px]

                text-[#9CA3AF]

                text-center

                max-w-[360px]
              "
            >
              The page you are looking for
              does not exist or may have
              been moved.
            </p>

            {/* Home Button */}
            <a
              href="/"
              className="
                mt-3

                h-[48px]
                px-6

                rounded-2xl

                flex items-center justify-center

                bg-[#22C55E]

                text-white
                font-semibold

                hover:bg-[#16A34A]

                transition-all duration-200
              "
            >
              Go Back Home
            </a>
          </div>
        }
      />
    </Routes>
  );
}