import { useState, useEffect } from "react";
import Logo from "../assets/ngo-logo.jpg";
import { Link } from "react-router-dom";

function Login() {
  const [showLogin, setShowLogin] = useState(false);
  const [role, setRole] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setShowLogin(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempted:", { ...loginData, role });

    // Empty login date
    setLoginData({
      email: "",
      password: "",
    });
  };

  const [passwordType, setPasswordType] = useState("password");

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

    useEffect(() => {
      document.title = "DoNect org | Login";
    }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50" data-aos="fade-up">
      {!showLogin ? (
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
                  <span className="text-green-700 font-bold text-2xl">DoNect</span>
                  <span className="text-green-500 text-sm font-medium ml-1.5">org</span>
                </div>
              </span>
              <h2 className="text-3xl font-bold text-gray-800 mt-4 mb-2">
                Welcome Back
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
                    Continue as Donor
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
                    Continue as Beneficiary
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Login Form
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <button
              onClick={() => setShowLogin(false)}
              className="mb-4 text-green-600 hover:text-green-700 transition-colors cursor-pointer flex items-center"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Selection
            </button>

            <div className="bg-white py-8 px-2 sm:px-4 rounded-2xl shadow-lg">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-600 mb-2 flex flex-col items-center justify-center">
                  <i className="fas fa-user text-5xl text-green-300"></i>
                  Login
                </h2>
                <p className="text-gray-600">Continuing as {role}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-inputs bg-gray-50 rounded-lg p-2 space-y-6">
                  <div className="relative">
                    <label className=" text-gray-700 mb-2 flex items-center gap-2">
                      <i className="fas fa-envelope text-green-600"></i>
                      <span className="font-semibold text-gray-600">Email</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 outline-none hover:shadow hover:border-green-500 text-gray-700 bg-white"
                        placeholder={`Enter ${role} email`}
                        value={loginData.email}
                        onChange={(e) =>
                          setLoginData({ ...loginData, email: e.target.value })
                        }
                      />
                      <i className="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    </div>
                  </div>

                  <div className="relative">
                    <label className=" text-gray-700 mb-2 flex items-center gap-2">
                      <i className="fas fa-lock text-green-600"></i>
                      <span className="font-semibold text-gray-600">
                        Password
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type={passwordType}
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 outline-none hover:shadow hover:border-green-500 text-gray-700 bg-white"
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                          })
                        }
                      />
                      <i className="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        onClick={togglePasswordVisibility}
                      >
                        <i
                          className={`fas ${
                            passwordType === "password"
                              ? "fa-eye"
                              : "fa-eye-slash"
                          } absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer`}
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between [@media(max-width:359px)]:text-xs [@media(max-width:370px)]:text-sm mx-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      className="h-3.5 w-4 border-gray-300 rounded cursor-pointer"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="ml-1 text-gray-500 cursor-pointer font-semibold"
                    >
                      Remember me
                    </label>
                  </div>

                  <div>
                    <Link
                      to="/forgot-password"
                      className="text-green-600 hover:text-green-700 transition-all"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 cursor-pointer font-semibold"
                >
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  Login
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
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
