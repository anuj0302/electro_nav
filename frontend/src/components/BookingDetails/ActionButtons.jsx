import toast from "react-hot-toast";

export default function ActionButtons() {
  return (
    <div className="flex gap-3 pb-10">
      <button
        onClick={() =>
          toast.success("Invoice downloaded")
        }
        className="flex-1 h-[54px] rounded-2xl bg-gray-200 dark:bg-[#1F2937] font-semibold"
      >
        Download Invoice
      </button>

      <button className="flex-1 h-[54px] rounded-2xl bg-[#22C55E] text-white font-bold">
        Start Navigation
      </button>
    </div>
  );
} 