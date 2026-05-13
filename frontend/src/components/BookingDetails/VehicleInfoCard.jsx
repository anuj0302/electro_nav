export default function VehicleInfoCard({
  booking,
}) {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-5 border border-gray-200 dark:border-white/[0.06]">
      <h3 className="text-[18px] font-bold mb-4">
        Vehicle Info
      </h3>

      <div className="space-y-3">
        <div>
          <p className="text-gray-500 text-sm">
            Vehicle ID
          </p>

          <p className="font-semibold">
            {booking.vehicleId}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Connector
          </p>

          <p className="font-semibold">
            CCS2
          </p>
        </div>
      </div>
    </div>
  );
}