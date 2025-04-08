
import { useRoutes } from "react-router-dom";
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
import InstructorCourses from "@/pages/instructor/Courses";
import CourseDetail from "@/pages/instructor/CourseDetail";
import InstructorSubjects from "@/pages/instructor/Subjects";

// Candidate pages
import CandidateDashboard from "@/pages/candidate/Dashboard";
import CandidateCourses from "@/pages/candidate/Courses";

const AppRouter = () => {
  const routes = useRoutes([
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
    {
      path: ROUTES.INSTRUCTOR_COURSES,
      element: <InstructorCourses />,
    },
    {
      path: `${ROUTES.INSTRUCTOR_COURSES}/:id`,
      element: <CourseDetail />,
    },
    {
      path: ROUTES.INSTRUCTOR_SUBJECTS,
      element: <InstructorSubjects />,
    },
    
    // Candidate routes
    {
      path: ROUTES.CANDIDATE_DASHBOARD,
      element: <CandidateDashboard />,
    },
    {
      path: ROUTES.CANDIDATE_COURSES,
      element: <CandidateCourses />,
    },
    
    // Default route - redirect to home or 404
    {
      path: "*",
      element: <Home />, // Replace with NotFound component when created
    },
  ]);

  return routes;
};

export default AppRouter;
