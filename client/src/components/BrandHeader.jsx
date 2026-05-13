import { Zap } from "lucide-react";

export default function BrandHeader() {
  return (
    <div className="mb-10">
      {/* Logo + Brand */}
      <div className="flex items-center gap-4">
        <div
          className="
            flex h-14 w-14 shrink-0
            items-center justify-center
            rounded-2xl
            bg-gradient-to-br
            from-green-400 to-green-600
            shadow-lg shadow-green-500/20
          "
        >
          <Zap
            className="text-white"
            size={28}
            strokeWidth={2.5}
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Electro Navigators
          </h1>

          <p className="mt-1 text-sm text-gray-400">
            EV Charging Network · 2,400+ Stations
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="rounded-2xl border border-gray-800 bg-[#1F2937] p-4 text-center">
          <p className="text-xl font-bold text-green-400">
            2.4K+
          </p>

          <p className="mt-1 text-sm text-gray-400">
            Stations
          </p>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-[#1F2937] p-4 text-center">
          <p className="text-xl font-bold text-green-400">
            98%
          </p>

          <p className="mt-1 text-sm text-gray-400">
            Uptime
          </p>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-[#1F2937] p-4 text-center">
          <p className="text-xl font-bold text-green-400">
            150kW
          </p>

          <p className="mt-1 text-sm text-gray-400">
            Fast Charge
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-8 h-px w-full bg-gray-800" />
    </div>
  );
}

// import { Zap } from "lucide-react";

// export default function BrandHeader() {
//   return (
//     <div className="mb-8 flex items-center gap-4">
//       <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-green-600">
//         <Zap className="text-white" size={28} />
//       </div>

//       <div>
//         <h1 className="text-2xl font-bold text-white">
//           Electro Navigators
//         </h1>

//         <p className="text-sm text-gray-400">
//           EV Charging Network · 2,400+ Stations
//         </p>
//       </div>
//     </div>
//   );
// }

// // import { Zap } from "lucide-react";
// // import { useTheme } from "../context/ThemeContext";
// // import StatPill from "./StatPill";

// // const STATS = [
// //   { value: "2.4K+", label: "Stations" },
// //   { value: "98%",   label: "Uptime"   },
// //   { value: "150kW", label: "Max Speed"},
// // ];

// // export default function BrandHeader() {
// //   const { dark } = useTheme();

// //   return (
// //     <>
// //       {/* Logo row */}
// //       <div className="flex items-center gap-3 mb-5">
// //         <div
// //           className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
// //           style={{ background: "linear-gradient(135deg,#22C55E,#4ADE80)" }}
// //         >
// //           <Zap size={20} color="#fff" strokeWidth={2.5} />
// //         </div>
// //         <div>
// //           <h1
// //             className={`text-lg font-bold tracking-tight leading-tight ${
// //               dark ? "text-[#F9FAFB]" : "text-[#111827]"
// //             }`}
// //           >
// //             Electro Navigators
// //           </h1>
// //           <p className={`text-[11px] ${dark ? "text-[#9CA3AF]" : "text-[#6B7280]"}`}>
// //             EV Charging Network · 2,400+ Stations
// //           </p>
// //         </div>
// //       </div>

// //       {/* Stat pills */}
// //       <div className="grid grid-cols-3 gap-2 mb-5">
// //         {STATS.map((s) => (
// //           <StatPill key={s.label} value={s.value} label={s.label} />
// //         ))}
// //       </div>

// //       {/* Divider */}
// //       <div className={`h-px w-full mb-6 ${dark ? "bg-[#374151]" : "bg-[#E5E7EB]"}`} />
// //     </>
// //   );
// // }