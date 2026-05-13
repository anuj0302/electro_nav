import BookingCard from "./BookingCard";
import EmptyBookings from "./EmptyBookings";

export default function BookingsList({
  bookings = [],
  activeFilter = "All",
  onCardClick,
  onExplore,
}) {
  const filteredBookings =
    activeFilter === "All"
      ? bookings
      : bookings.filter((booking) => {
          const status =
            booking?.bookingStatus?.toLowerCase();

          if (activeFilter === "Upcoming") {
            return [
              "confirmed",
              "charging",
            ].includes(status);
          }

          return (
            status ===
            activeFilter.toLowerCase()
          );
        });

  if (!filteredBookings.length) {
    return (
      <EmptyBookings
        onExplore={onExplore}
      />
    );
  }

  return (
    <section className="pb-[120px] lg:pb-8">
      <div className="flex flex-col">
        {filteredBookings.map((booking) => (
          <BookingCard
            key={booking._id}
            booking={booking}
            onClick={() => onCardClick?.(booking)}
          />
        ))}
      </div>
    </section>
  );
}