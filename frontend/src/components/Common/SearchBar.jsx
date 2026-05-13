import { useEffect, useState } from "react";

import { Search, Mic, X } from "lucide-react";

export default function SearchBar({
  placeholder = "Search stations, cities, chargers...",
  onSearch,
}) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch?.(value.trim().toLowerCase());
    }, 300);

    return () => clearTimeout(timer);
  }, [value, onSearch]);

  const clearSearch = () => {
    setValue("");

    onSearch?.("");
  };

  return (
    <div className="w-full">
      <div className="relative w-full bg-white dark:bg-[#111827] border border-gray-200 dark:border-white/[0.06] rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] dark:shadow-none transition-all duration-200 focus-within:border-[#22C55E]/40 focus-within:ring-4 focus-within:ring-[#22C55E]/10">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#9CA3AF]">
          <Search
            size={18}
            strokeWidth={2.2}
          />
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent pl-12 pr-20 py-3.5 sm:py-4 text-[14px] sm:text-[15px] text-[#111827] dark:text-[#F9FAFB] placeholder:text-gray-400 dark:placeholder:text-[#9CA3AF]/70 outline-none rounded-2xl"
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {value && (
            <button
              type="button"
              onClick={clearSearch}
              className="text-gray-400 hover:text-[#EF4444] transition-colors"
            >
              <X size={16} />
            </button>
          )}

          <button
            type="button"
            className="text-gray-400 dark:text-[#9CA3AF] hover:text-[#22C55E] transition-colors"
          >
            <Mic size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}