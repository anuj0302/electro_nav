import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <div
      className="
        min-h-screen
        bg-[#F9FAFB]
        dark:bg-[#0B1220]
        text-[#111827]
        dark:text-[#F9FAFB]
        transition-colors duration-300
      "
    >
      <AppRoutes />
    </div>
  );
} 