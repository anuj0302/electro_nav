import { Calendar, Clock3, Battery, IndianRupee } from "lucide-react";

export default function BookingMetaGrid({
  booking,
}) {
  const items = [
    {
      icon: Calendar,
      label: "Date",
      value: booking.slotDate,
    },

    {
      icon: Clock3,
      label: "Time",
      value: booking.slotTime,
    },

    {
      icon: Battery,
      label: "Charger",
      value: booking.chargerType,
    },

    {
      icon: IndianRupee,
      label: "Cost",
      value: `₹${booking.totalCost || 120}`,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map(({
        icon: Icon,
        label,
        value,
      }) => (
        <div
          key={label}
          className="bg-white dark:bg-[#111827] rounded-2xl p-4 border border-gray-200 dark:border-white/[0.06]"
        >
          <Icon
            size={18}
            className="text-[#22C55E] mb-3"
          />

          <p className="text-[12px] text-gray-500">
            {label}
          </p>

          <p className="font-bold mt-1">
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}