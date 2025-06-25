//import Logo from "../../assets/ngo-logo.jpg";
import { useLocation, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const navLinks = [
  { to: "/admin/dashboard", label: "Dashboard", icon: "fas fa-tachometer-alt" },
  { to: "/admin/projects", label: "Projects", icon: "fas fa-project-diagram" },
  { to: "/admin/donors", label: "Donors", icon: "fas fa-hand-holding-heart" },
  { to: "/admin/beneficiaries", label: "Beneficiaries", icon: "fas fa-users" },
  {
    to: "/admin/transactions",
    label: "Transactions",
    icon: "fas fa-exchange-alt",
  },
  { to: "/admin/reports", label: "Reports", icon: "fas fa-chart-bar" },
  { to: "/admin/settings", label: "Settings", icon: "fas fa-cog" },
  { to: "/admin/logout", label: "Logout", icon: "fas fa-sign-out-alt" },
];

function getTabName(pathname) {
  const found = navLinks.find((l) => pathname.startsWith(l.to));
  return found ? found.label : "Admin";
}

function AdminHeader({ onHamburger }) {
  const location = useLocation();
  const tabName = getTabName(location.pathname);

  // Dummy admin user data
  const user = {
    name: "Admin User",
    image: null, // Set to image url if available
    email: "admin@donect.org",
  };

  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    }
    if (accountOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [accountOpen]);

  const toggleAccount = () => setAccountOpen((prev) => !prev);

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 bg-gradient-to-r from-green-50 via-green-100 to-green-50 shadow-md z-30">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left: Hamburger + Tab Name */}
        <div className="flex items-center">
          <button
            type="button"
            className="mr-4 text-green-700 hover:text-green-900 focus:outline-none md:hidden cursor-pointer"
            onClick={onHamburger}
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
          <h1 className="text-green-800 font-bold text-xl md:text-2xl tracking-wide">
            <i
              className={`${
                navLinks.find((l) => l.to === location.pathname)?.icon
              } mr-1 md:mr-2`}
            ></i>
            {tabName}
          </h1>
        </div>
        {/* Right side: Notification & Account (always visible) */}
        <div className="flex items-center gap-2 ">
          <Link
            to="/admin/notifications"
            className="relative flex items-center justify-center text-green-700 hover:text-green-900 transition-colors px-2 py-2 rounded-full focus:outline-none"
            aria-label="Notifications"
          >
            <i className="fas fa-bell text-xl"></i>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </Link>
          <div className="relative" ref={accountRef}>
            <button
              onClick={toggleAccount}
              className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-green-100 transition-all focus:outline-none"
              aria-haspopup="true"
              aria-expanded={accountOpen}
            >
              {user.image ? (
                <img
                  src={user.image}
                  alt="User"
                  className="w-9 h-9 rounded-full border-2 border-green-400 object-cover"
                />
              ) : (
                <span className="w-9 h-9 rounded-full bg-green-200 flex items-center justify-center border-2 border-green-400">
                  <i className="fas fa-user text-green-700 text-xl"></i>
                </span>
              )}
              <span className="hidden md:inline font-semibold text-green-800">
                {user.name.split(" ")[0]}
              </span>
              <i
                className={`fas fa-chevron-down text-green-700 ml-1 transition-transform duration-200 ${
                  accountOpen ? "rotate-180" : ""
                }`}
              ></i>
            </button>
            {/* Dropdown */}
            {accountOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-green-100 z-50 py-2 animate-fade-in">
                <div className="px-4 py-3 border-b border-green-50 flex items-center gap-3">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt="User"
                      className="w-10 h-10 rounded-full border-2 border-green-400 object-cover"
                    />
                  ) : (
                    <span className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center border-2 border-green-400">
                      <i className="fas fa-user text-green-700 text-xl"></i>
                    </span>
                  )}
                  <div>
                    <div className="font-bold text-green-800">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                </div>
                <Link
                  to="/admin/settings"
                  className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all"
                >
                  <i className="fas fa-user-cog mr-2"></i>
                  Profile
                </Link>
                <Link
                  to="/admin/settings"
                  className="hidden px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all"
                >
                  <i className="fas fa-cog mr-2"></i>
                  Settings
                </Link>
                <div className="border-t border-green-100 my-1"></div>
                <button
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 transition-all flex items-center"
                  onClick={() => {
                    // handle logout here
                    setAccountOpen(false);
                  }}
                >
                  <i className="fas fa-sign-out-alt mr-2"></i>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

// export default AdminHeader;
export default AdminHeader;
