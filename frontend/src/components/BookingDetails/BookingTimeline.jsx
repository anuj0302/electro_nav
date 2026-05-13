export default function BookingTimeline() {
  const steps = [
    "Booking Created",
    "Payment Confirmed",
    "Slot Reserved",
    "Charging Pending",
  ];

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-5 border border-gray-200 dark:border-white/[0.06]">
      <h3 className="text-[18px] font-bold mb-5">
        Timeline
      </h3>

      <div className="space-y-5">
        {steps.map((step, index) => (
          <div
            key={step}
            className="flex items-center gap-3"
          >
            <div className="w-3 h-3 rounded-full bg-[#22C55E]" />

            <p>{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}