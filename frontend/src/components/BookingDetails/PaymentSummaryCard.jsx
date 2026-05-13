export default function PaymentSummaryCard({
  booking,
}) {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-5 border border-gray-200 dark:border-white/[0.06]">
      <h3 className="text-[18px] font-bold mb-4">
        Payment Summary
      </h3>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>
            Charging Cost
          </span>

          <span>
            ₹{booking.totalCost || 120}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Platform Fee</span>

          <span>₹10</span>
        </div>

        <div className="border-t pt-3 flex justify-between font-bold">
          <span>Total</span>

          <span>
            ₹{(booking.totalCost || 120) + 10}
          </span>
        </div>
      </div>
    </div>
  );
}