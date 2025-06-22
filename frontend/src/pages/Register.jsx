import { useState, useEffect } from "react";
import Logo from "../assets/ngo-logo.jpg";
import { Link } from "react-router-dom";

// Add country code data
const countryOptions = [
  { code: "+233", name: "Ghana", flag: "🇬🇭" },
  { code: "+234", name: "Nigeria", flag: "🇳🇬" },
  { code: "+254", name: "Kenya", flag: "🇰🇪" },
  { code: "+256", name: "Uganda", flag: "🇺🇬" },
  { code: "+250", name: "Rwanda", flag: "🇷🇼" },
  { code: "+255", name: "Tanzania", flag: "🇹🇿" },
  { code: "+27", name: "South Africa", flag: "🇿🇦" },
  { code: "+225", name: "Ivory Coast", flag: "🇨🇮" },
  { code: "+237", name: "Cameroon", flag: "🇨🇲" },
  { code: "+20", name: "Egypt", flag: "🇪🇬" },
];

function Register() {
  const [showRegister, setShowRegister] = useState(false);
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: countryOptions[0].code,
    password: "",
    confirmPassword: "",
    residentialAddress: "",
    postalAddress: "",
    userType: "",
  });
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setShowRegister(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    setFormData({
      name: "",
      email: "",
      phone: "",
      countryCode: countryOptions[0].code,
      password: "",
      confirmPassword: "",
      residentialAddress: "",
      postalAddress: "",
      userType: "",
    });
  };

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordType(
      confirmPasswordType === "password" ? "text" : "password"
    );
  };

    useEffect(() => {
      document.title = "DoNect org | Register";
    }, []);
  

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50"
      data-aos="fade-up"
    >
      {!showRegister ? (
        // Role Selection Screen
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 mb-4">
                <img
                  src={Logo}
                  alt="Logo"
                  className="w-16 h-16 mx-auto rounded-full border-2 border-green-500"
                />
                <div className="">
                  <span className="text-green-700 font-bold text-2xl">
                    DoNect
                  </span>
                  <span className="text-green-500 text-sm font-medium ml-1.5">
                    org
                  </span>
                </div>
              </span>
              <h2 className="text-3xl font-bold text-gray-800 mt-4 mb-2">
                Create Your Account
              </h2>
              <p className="text-gray-600">
                Please select how you want to continue
              </p>
            </div>
            <div className="space-y-4">
              <button
                onClick={() => handleRoleSelect("donor")}
                className="w-full p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-2 border-green-500 group cursor-pointer"
              >
                <div className="flex items-center justify-center">
                  <i className="fas fa-hand-holding-heart text-2xl text-green-600 group-hover:scale-110 transition-transform duration-300 mr-3"></i>
                  <span className="text-lg font-semibold text-gray-800">
                    Register as Donor
                  </span>
                </div>
              </button>
              <button
                onClick={() => handleRoleSelect("beneficiary")}
                className="w-full p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-2 border-green-500 group cursor-pointer"
              >
                <div className="flex items-center justify-center">
                  <i className="fas fa-users text-2xl text-green-600 group-hover:scale-110 transition-transform duration-300 mr-3"></i>
                  <span className="text-lg font-semibold text-gray-800">
                    Register as Beneficiary
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Register Form
        <div className="min-h-screen flex items-center justify-center p-4 register-form-container">
          <div className="max-w-md w-full">
            <button
              onClick={() => setShowRegister(false)}
              className="mb-4 text-green-600 hover:text-green-700 transition-colors cursor-pointer flex items-center"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Selection
            </button>
            <div className="bg-white py-8 px-2.5 sm:px-4 rounded-2xl shadow-lg">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-600 mb-2 flex flex-col items-center justify-center">
                  <i className="fas fa-user-plus text-5xl text-green-300"></i>
                  Register
                </h2>
                <p className="text-gray-600">Registering as {role}</p>
              </div>
              <p className="text-sm text-gray-500 mb-4 text-left">
                Fields marked with
                <span className="text-red-500 ml-1">*</span> are required.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Scrollable Inputs Container */}
                <div className="max-h-96 overflow-y-auto custom-scrollbar bg-gray-50 rounded-xl p-2 register-form-inputs">
                  <div className="relative mb-4">
                    <label className="text-gray-700 mb-2 flex items-center gap-2">
                      <i className="fas fa-user text-green-600"></i>
                      <span className="font-semibold text-gray-600">
                        {role.charAt(0).toUpperCase() + role.slice(1)} Name
                        <span className="text-red-500 ml-1">*</span>
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 outline-none hover:shadow hover:border-green-500 text-gray-700 bg-white"
                        placeholder={`Enter ${role} name`}
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                      <i className="fas fa-user absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    </div>
                  </div>
                  <div className="relative mb-4">
                    <label className="text-gray-700 mb-2 flex items-center gap-2">
                      <i className="fas fa-envelope text-green-600"></i>
                      <span className="font-semibold text-gray-600">
                        Email <span className="text-red-500 ml-1">*</span>
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 outline-none hover:shadow hover:border-green-500 text-gray-700 bg-white"
                        placeholder={`Enter ${role} email`}
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                      <i className="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    </div>
                  </div>
                  {/* Phone with Country Code */}
                  <div className="relative mb-4">
                    <label className="text-gray-700 mb-2 flex items-center gap-2">
                      <i className="fas fa-phone-alt text-green-600"></i>
                      <span className="font-semibold text-gray-600">
                        Phone <span className="text-red-500 ml-1">*</span>
                      </span>
                    </label>
                    <div className="flex gap-2">
                      <div className="relative">
                        <select
                          required
                          className="w-full px-2 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 outline-none hover:shadow hover:border-green-500 text-gray-700 appearance-none"
                          value={formData.countryCode || countryOptions[0].code}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              countryCode: e.target.value,
                            })
                          }
                        >
                          {countryOptions.map((country) => (
                            <option key={country.code} value={country.code}>
                              {country.flag} {/*country.name*/} ({country.code})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="relative flex-1">
                        <input
                          type="tel"
                          required
                          pattern="[0-9]{7,15}"
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 outline-none hover:shadow hover:border-green-500 text-gray-700 bg-white"
                          placeholder="Phone number"
                          value={formData.phone || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                        />
                        <i className="fas fa-phone-alt absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                      </div>
                    </div>
                  </div>
                  <div className="relative mb-4">
                    <label className="text-gray-700 mb-2 flex items-center gap-2">
                      <i className="fas fa-map-marker-alt text-green-600"></i>
                      <span className="font-semibold text-gray-600">
                        Residential Address{" "}
                        <span className="text-red-500 ml-1">*</span>
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 outline-none hover:shadow hover:border-green-500 text-gray-700 bg-white"
                        placeholder="Enter your residential address"
                        value={formData.residentialAddress}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            residentialAddress: e.target.value,
                          })
                        }
                      />
                      <i className="fas fa-map-marker-alt absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    </div>
                  </div>
                  <div className="relative mb-4">
                    <label className="text-gray-700 mb-2 flex items-center gap-2">
                      <i className="fas fa-mail-bulk text-green-600"></i>
                      <span className="font-semibold text-gray-600">
                        Postal Address{" "}
                        <span className="text-red-500 ml-1">*</span>
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 outline-none hover:shadow hover:border-green-500 text-gray-700 bg-white"
                        placeholder="Enter your postal address"
                        value={formData.postalAddress}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            postalAddress: e.target.value,
                          })
                        }
                      />
                      <i className="fas fa-mail-bulk absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    </div>
                  </div>
                  <div className="relative mb-4">
                    <label className="text-gray-700 mb-2 flex items-center gap-2">
                      <i className="fas fa-users-cog text-green-600"></i>
                      <span className="font-semibold text-gray-600">
                        Account Type{" "}
                        <span className="text-red-500 ml-1">*</span>
                      </span>
                    </label>
                    <div className="relative">
                      <select
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 outline-none hover:shadow hover:border-green-500 text-gray-700 appearance-none"
                        value={formData.userType}
                        onChange={(e) =>
                          setFormData({ ...formData, userType: e.target.value })
                        }
                      >
                        <option value="" disabled>
                          Select account type
                        </option>
                        <option value="individual" className="bg-green-50">
                          Individual
                        </option>
                        <option value="organization" className="bg-green-50">
                          Organization
                        </option>
                      </select>
                      <i className="fas fa-users-cog absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    </div>
                  </div>
                  <div className="relative mb-4">
                    <label className="text-gray-700 mb-2 flex items-center gap-2">
                      <i className="fas fa-lock text-green-600"></i>
                      <span className="font-semibold text-gray-600">
                        Password <span className="text-red-500 ml-1">*</span>
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type={passwordType}
                        required
                        className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 outline-none hover:shadow hover:border-green-500 text-gray-700 bg-white"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                      />
                      <i className="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        onClick={togglePasswordVisibility}
                        tabIndex={-1}
                      >
                        <i
                          className={`fas ${
                            passwordType === "password"
                              ? "fa-eye"
                              : "fa-eye-slash"
                          } text-gray-400 cursor-pointer`}
                        ></i>
                      </button>
                    </div>
                    {/* Password requirements */}
                    <div className="mt-2 bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-sm text-gray-700">
                      <div className="font-semibold text-green-700 mb-1 flex items-center gap-2">
                        <i className="fas fa-info-circle"></i>
                        Password Requirements
                      </div>
                      <ul className="list-disc list-inside ml-2 text-gray-600 space-y-1">
                        <li>
                          At least{" "}
                          <span className="font-semibold">8 characters</span>{" "}
                          long
                        </li>
                        <li>
                          At least{" "}
                          <span className="font-semibold">one uppercase</span>{" "}
                          letter
                        </li>
                        <li>
                          At least{" "}
                          <span className="font-semibold">one lowercase</span>{" "}
                          letter
                        </li>
                        <li>
                          At least{" "}
                          <span className="font-semibold">one number</span>
                        </li>
                        <li>
                          At least{" "}
                          <span className="font-semibold">
                            one special character
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="relative mb-4">
                    <label className="text-gray-700 mb-2 flex items-center gap-2">
                      <i className="fas fa-lock text-green-600"></i>
                      <span className="font-semibold text-gray-600">
                        Confirm Password{" "}
                        <span className="text-red-500 ml-1">*</span>
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type={confirmPasswordType}
                        required
                        className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 outline-none hover:shadow hover:border-green-500 text-gray-700 bg-white"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                      />
                      <i className="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        onClick={toggleConfirmPasswordVisibility}
                        tabIndex={-1}
                      >
                        <i
                          className={`fas ${
                            confirmPasswordType === "password"
                              ? "fa-eye"
                              : "fa-eye-slash"
                          } text-gray-400 cursor-pointer`}
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 cursor-pointer font-semibold"
                >
                  <i className="fas fa-user-plus mr-2"></i>
                  Register
                </button>
                <div className="relative flex items-center justify-center">
                  <div className="border-t border-gray-300 w-full"></div>
                  <span className="bg-white px-4 text-sm text-gray-500 whitespace-nowrap">
                    Or continue with
                  </span>
                  <div className="border-t border-gray-300 w-full"></div>
                </div>
                <button
                  type="button"
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center cursor-pointer text-gray-700 hover:text-green-600"
                >
                  <img
                    src="https://www.google.com/favicon.ico"
                    alt="Google"
                    className="w-5 h-5 mr-2"
                  />
                  Google
                </button>
              </form>
              <p className="mt-6 text-center text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/verify-email"
                  className="text-gray-200 hover:text-gray-300 ml-2 text-xs"
                >
                  verify email
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
