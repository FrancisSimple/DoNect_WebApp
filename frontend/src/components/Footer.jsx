import { Link } from "react-router-dom";
import Logo from "../assets/ngo-logo.jpg";
import { useState } from "react";

function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-gray-400">
                Stay updated with our latest projects and impact stories.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="w-full md:w-auto">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full md:w-80 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 cursor-pointer"
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and About */}
          <div>
            <Link to="/" className="items-center gap-3 mb-4 group inline-flex">
              <img
                src={Logo}
                alt="NGO Logo"
                className="w-12 h-12 rounded-full ring-2 ring-green-500 transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-xl font-bold text-green-600">DoNect <span className="text-green-500 text-sm font-medium">org</span></span>
            </Link>
            <p className="text-gray-400 mb-4">
              Making a difference in Africa through sustainable development and
              community empowerment.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-green-500 transition-colors"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-green-500 transition-colors"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-green-500 transition-colors"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-green-500 transition-colors"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  to="/volunteer"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  Volunteer
                </Link>
              </li>
              <li>
                <Link
                  to="/donate"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/blog"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">
              Contact Us
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <i className="fas fa-map-marker-alt text-green-500"></i>
                <span>1 University Avenue, Berekuso, Ghana</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-phone text-green-500"></i>
                <span>+233 (0) 257 266 272</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-envelope text-green-500"></i>
                <span>info@donect.org</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} DoNect <span className="text-xs">org</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
