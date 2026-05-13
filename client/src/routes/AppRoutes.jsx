import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/Login";
import Signup from "../pages/Signup";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Redirect root to login */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Fallback route */}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
}

// import { Navigate, Route, Routes } from "react-router-dom";

// import Login from "../pages/Login";
// import Signup from "../pages/Signup";

// export default function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/" element={<Navigate to="/login" />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//     </Routes>
//   );
// }

// // import { Routes, Route, Navigate } from "react-router-dom";
// // import Login from "../pages/Login";
// // import Signup from "../pages/Signup";

// // export default function AppRoutes() {
// //   return (
// //     <Routes>
// //       <Route path="/" element={<Navigate to="/login" replace />} />
// //       <Route path="/login" element={<Login />} />
// //       <Route path="/signup" element={<Signup />} />
// //     </Routes>
// //   );
// // }

// // // import { Routes, Route, Navigate } from "react-router-dom";

// // // import Login from "../pages/Login";
// // // // import Home from "../pages/Home";
// // // // import StationDetails from "../pages/StationDetails";
// // // // import Booking from "../pages/Booking";
// // // // import BookingSuccess from "../pages/BookingSuccess";

// // // export default function AppRoutes() {
// // //   return (
// // //     <Routes>
// // //       <Route path="/" element={<Navigate to="/login" />} />

// // //       <Route path="/login" element={<Login />} />
// // //       {/* <Route path="/home" element={<Home />} />
// // //       <Route path="/station/:id" element={<StationDetails />} />
// // //       <Route path="/booking/:id" element={<Booking />} />
// // //       <Route path="/booking-success" element={<BookingSuccess />} /> */}
// // //     </Routes>
// // //   );
// // // }