import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Footer from "./components/Footer";
import ChatRobot from "./components/ChatRobot";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import ProjectOverview from "./pages/ProjectOverview";
import OurServices from "./pages/OurServices";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminLayout from "./admin/layouts/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import AdminProjects from "./admin/pages/AdminProjects";
import Donors from "./admin/pages/Donors";
import Beneficiaries from "./admin/pages/Beneficiaries";
import Settings from "./admin/pages/Settings";
import Transactions from "./admin/pages/Transactions";

function App() {
  const location = useLocation();

  // Initialize AOS (Animate On Scroll) for animations
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
    // Refresh AOS on route/page change
    return () => {
      AOS.refresh();
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ScrollToTop />
      {/* Only show public Header on non-admin routes */}
      {!location.pathname.startsWith("/admin") && <Header />}
      <div
        className={
          location.pathname.startsWith("/admin") ? "" : "pt-[72px] flex-grow"
        }
      >
        <div>
          <Routes>
            {/* Public/User Routes */}
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/services" element={<OurServices />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/projects/:id" element={<ProjectOverview />} />
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="donors" element={<Donors />} />
              <Route path="beneficiaries" element={<Beneficiaries />} />
              <Route path="settings" element={<Settings />} />
              <Route path="transactions" element={<Transactions />} />
              {/* Add more admin routes here */}
            </Route>
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <ChatRobot />
      </div>
      {/* Only show Footer on non-admin routes */}
      {!location.pathname.startsWith("/admin") && (
        <Routes>
          <Route path="/login" element={null} />
          <Route path="/register" element={null} />
          <Route path="/verify-email" element={null} />
          <Route path="*" element={<Footer />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
