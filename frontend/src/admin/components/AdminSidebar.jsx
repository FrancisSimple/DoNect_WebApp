import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/ngo-logo.jpg";

const navLinks = [
  {
    to: "/admin/dashboard",
    icon: "fas fa-tachometer-alt",
    label: "Dashboard",
  },
  {
    to: "/admin/projects",
    icon: "fas fa-project-diagram",
    label: "Projects",
  },
  { to: "/admin/donors", icon: "fas fa-hand-holding-heart", label: "Donors" },
  {
    to: "/admin/beneficiaries",
    icon: "fas fa-users",
    label: "Beneficiaries",
  },
  {
    to: "/admin/transactions",
    icon: "fas fa-exchange-alt",
    label: "Transactions",
  },
  { to: "/admin/reports", icon: "fas fa-chart-bar", label: "Reports" },
  { to: "/admin/settings", icon: "fas fa-cog", label: "Settings" },
  { to: "/admin/logout", icon: "fas fa-sign-out-alt", label: "Logout" },
];

function AdminSidebar({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      {/* Overlay for mobile only */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? "block opacity-100" : "hidden opacity-0"
        }`}
        onClick={onClose}
      />
      {/* Sidebar: always visible on md+, toggled on mobile */}
      <aside
        className={`admin-sidebar
          fixed bottom-0 top-0 left-0 z-50 w-80 md:w-64 bg-gradient-to-b from-green-700 to-green-900 text-white shadow-xl flex flex-col transition-transform duration-300
          px-2 py-4
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Close button for mobile only */}
        <button
          type="button"
          className="absolute top-4 right-4 text-green-200 hover:text-white bg-opacity-60 rounded-full p-2 md:hidden transition-all"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <i className="fas fa-times text-2xl"></i>
        </button>
        <div className="flex items-center gap-3 px-6 py-6 border-b border-green-800">
          <img
            src={Logo}
            alt="NGO Logo"
            className="w-10 h-10 rounded-full border-2 border-green-300"
          />
          <span className="font-bold text-2xl tracking-wide">
            DoNect{" "}
            <span className="text-green-300 text-sm font-medium">org</span>
          </span>
        </div>
        <nav className="flex-1 py-6 overflow-y-auto custom-scrollbar">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-200 font-medium ${
                    location.pathname === link.to
                      ? "bg-green-600 text-white shadow"
                      : "hover:bg-green-800 hover:text-green-100"
                  }`}
                  onClick={onClose}
                >
                  <i className={`${link.icon} text-lg`}></i>
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-6 py-4 border-t border-green-800 text-xs text-green-200">
          &copy; {new Date().getFullYear()} DoNect org. Admin Panel
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
