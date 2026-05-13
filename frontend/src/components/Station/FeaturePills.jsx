import { useTheme } from "../../context/ThemeContext";

export default function FeaturePills({ features = [] }) {
  const { dark } = useTheme();

  const safeFeatures = Array.isArray(features) ? features : [];

  if (!safeFeatures.length) {
    return null;
  }

  return (
    <div className="mb-5">
      <h3
        className={`
          text-[15px]
          font-bold
          font-['Syne',sans-serif]

          mb-3

          ${dark ? "text-[#F9FAFB]" : "text-[#111827]"}
        `}
      >
        Amenities & Features
      </h3>

      <div className="flex flex-wrap gap-2">
        {safeFeatures.map(({ label, Icon }, index) => (
          <div
            key={`${label}-${index}`}
            className={`
                flex items-center
                gap-1.5

                px-[14px]
                py-2

                rounded-full

                border

                text-[12px]
                font-medium

                transition-all duration-200

                ${
                  dark
                    ? `
                      bg-[#111827]
                      border-white/[0.07]

                      text-[#9CA3AF]

                      hover:border-[#22C55E]/30
                      hover:text-[#22C55E]
                    `
                    : `
                      bg-white
                      border-gray-200

                      text-gray-600

                      hover:border-[#22C55E]/30
                      hover:text-[#16A34A]
                    `
                }
              `}
          >
            {Icon && <Icon size={14} />}

            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
