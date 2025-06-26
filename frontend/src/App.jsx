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
import Reports from "./admin/pages/Reports";
import AdminNotifications from "./admin/pages/AdminNotifications";
import AddProject from "./admin/pages/AddProject";
import AddTransaction from "./admin/pages/AddTransaction";
import AddReport from "./admin/pages/AddReport";
import EditProject from "./admin/pages/EditProject";
import EditDonor from "./admin/pages/EditDonor";
import EditBeneficiary from "./admin/pages/EditBeneficiary";
import EditTransaction from "./admin/pages/EditTransaction";
import EditReport from "./admin/pages/EditReport";

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
              <Route path="projects/add-new-project" element={<AddProject />} />
              <Route path="projects/edit/:id" element={<EditProject />} />
              <Route path="donors" element={<Donors />} />
              <Route path="donors/edit/:id" element={<EditDonor />} />
              <Route path="beneficiaries" element={<Beneficiaries />} />
              <Route path="beneficiaries/:id" element={<EditBeneficiary />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="transactions/:id" element={<EditTransaction />} />
              <Route
                path="transactions/add-transaction"
                element={<AddTransaction />}
              />
              <Route path="settings" element={<Settings />} />
              <Route path="reports" element={<Reports />} />
              <Route path="reports/edit-blog/:id" element={<EditReport />} />
              <Route path="reports/add-new-blog" element={<AddReport />} />
              <Route path="notifications" element={<AdminNotifications />} />
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
