import { Zap, MapPin } from "lucide-react";

export default function BookingHeroCard({
  booking,
}) {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-5 border border-gray-200 dark:border-white/[0.06]">
      <div className="flex gap-4">
        <div className="w-[60px] h-[60px] rounded-2xl bg-[#22C55E]/10 flex items-center justify-center">
          <Zap
            className="text-[#22C55E]"
            size={28}
          />
        </div>

        <div>
          <h2 className="text-[22px] font-bold">
            {booking.stationId?.name}
          </h2>

          <p className="flex items-center gap-1 text-gray-500 mt-1">
            <MapPin size={14} />
            {booking.stationId?.address}
          </p>
        </div>
      </div>
    </div>
  );
}