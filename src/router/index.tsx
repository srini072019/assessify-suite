
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

// Public pages
import Home from "@/pages/Home";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";

// Admin pages
import AdminDashboard from "@/pages/admin/Dashboard";

// Instructor pages
import InstructorDashboard from "@/pages/instructor/Dashboard";

// Candidate pages
import CandidateDashboard from "@/pages/candidate/Dashboard";

// Create router with all routes
const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.REGISTER,
    element: <Register />,
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: <ForgotPassword />,
  },
  
  // Admin routes
  {
    path: ROUTES.ADMIN_DASHBOARD,
    element: <AdminDashboard />,
  },
  
  // Instructor routes
  {
    path: ROUTES.INSTRUCTOR_DASHBOARD,
    element: <InstructorDashboard />,
  },
  
  // Candidate routes
  {
    path: ROUTES.CANDIDATE_DASHBOARD,
    element: <CandidateDashboard />,
  },
  
  // Default route - redirect to home or 404
  {
    path: "*",
    element: <Home />, // Replace with NotFound component when created
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
