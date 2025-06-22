import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "../assets/ngo-logo.jpg";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 w-full bg-gradient-to-r from-green-50 via-green-100 to-green-50 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <img
                src={Logo}
                alt="NGO Logo"
                className="w-12 h-12 rounded-full border-2 border-green-500 transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-green-700 font-bold lg:text-xl md:text-md text-xl tracking-wide group-hover:text-green-600">
                DoNect <span className="text-green-500 text-sm font-medium">org</span>
              </span>
            </Link>
          </div>
          <nav className="hidden md:block">
            <ul className="flex md:text-xs md:space-x-2 lg:text-sm space-x-4 items-center">
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-2 text-gray-700 hover:text-green-600 font-medium px-3 py-2 rounded-md hover:bg-green-50 transition duration-300"
                >
                  <i className="fas fa-home"></i>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="flex items-center gap-2 text-gray-700 hover:text-green-600 font-medium px-3 py-2 rounded-md hover:bg-green-50 transition duration-300"
                >
                  <i className="fas fa-users"></i>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="flex items-center gap-2 text-gray-700 hover:text-green-600 font-medium px-3 py-2 rounded-md hover:bg-green-50 transition duration-300"
                >
                  <i className="fas fa-concierge-bell"></i>
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="flex items-center gap-2 text-gray-700 hover:text-green-600 font-medium px-3 py-2 rounded-md hover:bg-green-50 transition duration-300"
                >
                  <i className="fas fa-envelope"></i>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-white bg-green-600 hover:bg-green-700 font-medium px-6 py-2 rounded-full transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <i className="fas fa-sign-in-alt"></i>
                  Get Started
                </Link>
              </li>
            </ul>
          </nav>

          <button
            type="button"
            onClick={toggleMenu}
            className="md:hidden text-gray-700 hover:text-green-600 focus:outline-none cursor-pointer"
          >
            <i
              className={`fas ${
                isOpen ? "fa-times" : "fa-bars"
              } text-2xl transition-all`}
            ></i>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute left-0 w-full bg-white px-4 py-2 shadow-lg transition-all duration-300 ease-in-out ${
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <ul className="space-y-2 pb-3 pt-2">
            <li>
              <Link
                to="/"
                className="flex items-center gap-2 text-gray-700 hover:text-green-600 font-medium px-3 py-2 rounded-md hover:bg-green-50 transition duration-300"
                onClick={toggleMenu}
              >
                <i className="fas fa-home"></i>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="flex items-center gap-2 text-gray-700 hover:text-green-600 font-medium px-3 py-2 rounded-md hover:bg-green-50 transition duration-300"
                onClick={toggleMenu}
              >
                <i className="fas fa-users"></i>
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="flex items-center gap-2 text-gray-700 hover:text-green-600 font-medium px-3 py-2 rounded-md hover:bg-green-50 transition duration-300"
                onClick={toggleMenu}
              >
                <i className="fas fa-concierge-bell"></i>
                Our Services
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="flex items-center gap-2 text-gray-700 hover:text-green-600 font-medium px-3 py-2 rounded-md hover:bg-green-50 transition duration-300"
                onClick={toggleMenu}
              >
                <i className="fas fa-envelope"></i>
                Contact Us
              </Link>
            </li>
            <li className="flex justify-center pt-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-white bg-green-600 hover:bg-green-700 font-medium md:px-6 lg:px-8 px-8 py-2.5 rounded-full transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 w-4/5 text-center justify-center"
                onClick={toggleMenu}
              >
                <i className="fas fa-sign-in-alt"></i>
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
