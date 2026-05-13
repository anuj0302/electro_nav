import BookingPageHeader from "./BookingPageHeader";
import BookingStatsStrip from "./BookingStatsStrip";
import BookingFilterTabs from "./BookingFilterTabs";
import BookingsList from "./BookingsList";
import BottomNav from "../Layout/BottomNav";
import GridBackground from "../Common/GridBackground";
import GlowOrb from "../Common/GlowOrb";

import { useTheme } from "../../context/ThemeContext";

export default function BookingPageLayout({
  bookings,
  activeFilter,
  onFilterChange,
  onBookingClick,
  onExploreStations,
  loading,
}) {
  const { dark } = useTheme();

  return (
    <div
      className={`
        relative min-h-screen overflow-x-hidden transition-colors duration-300
        ${dark ? "bg-[#0B1220]" : "bg-[#F4F7FB]"}
      `}
    >
      {dark && (
        <>
          <GridBackground />

          <GlowOrb className="h-[420px] w-[420px] -left-[140px] -top-[180px]" />

          <GlowOrb className="h-[340px] w-[340px] -bottom-[80px] -right-[80px]" />
        </>
      )}

      <div className="relative z-10">
        <BookingPageHeader />

        <main className="mx-auto w-full max-w-[1100px] px-4 pt-4 pb-[120px] sm:px-5 lg:px-8">
          <section className="mb-6">
            <h1 className="mb-1 font-['Syne',sans-serif] text-[22px] font-extrabold text-[#111827] dark:text-[#F9FAFB] sm:text-[26px]">
              Charging Bookings
            </h1>

            <p className="text-[12.5px] text-gray-500 dark:text-[#9CA3AF]">
              Track and manage your EV charging sessions.
            </p>
          </section>

          <div className="mb-5">
            <BookingStatsStrip bookings={bookings} />
          </div>

          <div className="mb-5">
            <BookingFilterTabs
              activeFilter={activeFilter}
              onChange={onFilterChange}
            />
          </div>

          {loading && (
            <div className="py-20 text-center text-gray-500 dark:text-[#9CA3AF]">
              Loading bookings...
            </div>
          )}

          {!loading && (
            <BookingsList
              bookings={bookings}
              activeFilter={activeFilter}
              onCardClick={onBookingClick}
              onExplore={onExploreStations}
            />
          )}
        </main>

        <BottomNav />
      </div>
    </div>
  );
}