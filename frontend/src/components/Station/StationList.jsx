import StationCard from "./StationCard";

/* Skeleton Loader */
function SkeletonCard() {
  return (
    <div
      className="
        bg-white
        dark:bg-[#111827]

        border
        border-gray-100
        dark:border-white/[0.06]

        rounded-[20px]
        p-4

        animate-pulse
      "
    >
      {/* Top */}
      <div className="flex gap-3 mb-3">
        <div 
          className="
            w-[46px]
            h-[46px]
            rounded-[14px]

            bg-gray-100
            dark:bg-white/[0.06]

            flex-shrink-0
          "
        />

        <div className="flex-1 space-y-2">
          <div
            className="
              h-3.5
              rounded-full
              w-3/4

              bg-gray-100
              dark:bg-white/[0.06]
            "
          />

          <div
            className="
              h-2.5
              rounded-full
              w-1/2

              bg-gray-100
              dark:bg-white/[0.04]
            "
          />

          <div
            className="
              h-2.5
              rounded-full
              w-2/5

              bg-gray-100
              dark:bg-white/[0.04]
            "
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="
              h-[52px]
              rounded-[12px]

              bg-gray-50
              dark:bg-[#1F2937]
            "
          />
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <div
          className="
            flex-1
            h-10
            rounded-[13px]

            bg-gray-50
            dark:bg-[#1F2937]
          "
        />

        <div
          className="
            flex-[2]
            h-10
            rounded-[13px]

            bg-gray-100
            dark:bg-white/[0.06]
          "
        />
      </div>
    </div>
  );
}

export default function StationList({
  stations = [],
  loading = false,
  onNavigate,
  onBook,
}) {
  /* Loading State */
  if (loading) {
    return (
      <div
        className="
          grid grid-cols-1
          lg:grid-cols-2
          gap-3
        "
      >
        {[0, 1, 2].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  /* Empty State */
  if (!stations.length) {
    return (
      <div className="py-16 text-center">
        <p
          className="
            text-[15px]
            font-semibold

            text-gray-500
            dark:text-[#9CA3AF]
          "
        >
          No stations found
        </p>

        <p
          className="
            mt-1
            text-[12px]

            text-gray-400
            dark:text-[#6B7280]
          "
        >
          Try a different filter or
          location
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid grid-cols-1
        lg:grid-cols-2
        gap-3
      "
    >
      {stations.map((station) => (
        <StationCard
          key={station._id}
          station={station}
          onNavigate={onNavigate}
          onBook={onBook}
        />
      ))}
    </div>
  );
}