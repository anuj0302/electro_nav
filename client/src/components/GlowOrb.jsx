export default function GlowOrb() {
  return (
    <>
      {/* Top Right Glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          -right-28
          -top-24
          z-0
          h-[420px]
          w-[420px]
          rounded-full
        "
        style={{
          background:
            "radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Bottom Left Glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          -bottom-24
          -left-24
          z-0
          h-[320px]
          w-[320px]
          rounded-full
        "
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%)",
        }}
      />
    </>
  );
}

// export default function GlowOrb() {
//   return (
//     <div
//       className="pointer-events-none fixed -right-25 top-[-100px] h-[400px] w-[400px] rounded-full"
//       style={{
//         background:
//           "radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)",
//       }}
//     />
//   );
// }

// // export default function GlowOrb() {
// //   return (
// //     <>
// //       {/* Top-right orb */}
// //       <div
// //         aria-hidden="true"
// //         className="fixed pointer-events-none"
// //         style={{
// //           width: 420,
// //           height: 420,
// //           top: -100,
// //           right: -120,
// //           borderRadius: "50%",
// //           background:
// //             "radial-gradient(circle, rgba(34,197,94,0.09) 0%, transparent 70%)",
// //           zIndex: 0,
// //         }}
// //       />
// //       {/* Bottom-left orb */}
// //       <div
// //         aria-hidden="true"
// //         className="fixed pointer-events-none"
// //         style={{
// //           width: 300,
// //           height: 300,
// //           bottom: -80,
// //           left: -80,
// //           borderRadius: "50%",
// //           background:
// //             "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)",
// //           zIndex: 0,
// //         }}
// //       />
// //     </>
// //   );
// // }