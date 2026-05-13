export default function ChargingProgressCard({
  booking,
}) {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-5 border border-gray-200 dark:border-white/[0.06]">
      <div className="flex justify-between mb-3">
        <span className="font-semibold">
          Battery Target
        </span>

        <span className="text-[#22C55E] font-bold">
          {booking.batteryTarget}%
        </span>
      </div>

      <div className="h-3 rounded-full bg-gray-200 dark:bg-[#1F2937] overflow-hidden">
        <div
          className="h-full bg-[#22C55E]"
          style={{
            width: `${booking.batteryTarget}%`,
          }}
        />
      </div>
    </div>
  );
}