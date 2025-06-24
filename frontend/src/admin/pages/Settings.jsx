import { useState, useEffect } from "react";
import JoshuaImg from "../../assets/team-members/joshua.jpg";

function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Admin",
    lastName: "User",
    email: "admin@donect.org",
    phone: "+233 20 123 4567",
    role: "System Administrator",
    bio: "Managing the DoNect platform and coordinating NGO activities.",
    profileImage:
      JoshuaImg ||
      "https://via.placeholder.com/150/0000FF/FFFFFF?text=Profile+Image",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    projectUpdates: true,
    donorActivity: true,
    systemAlerts: true,
    loginAlerts: true,
  });

  const [systemSettings, setSystemSettings] = useState({
    language: "en",
    theme: "light",
    autoLogout: "30",
    dataBackup: "daily",
    maintenance: false,
  });

  const [formStatus, setFormStatus] = useState({
    message: "",
    type: "", // 'success' or 'error'
  });

  const [showPhotoOptions, setShowPhotoOptions] = useState(false);

  useEffect(() => {
    document.title = "DoNect org | Admin Settings";
  }, []);

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to update the profile
    setFormStatus({
      message: "Profile updated successfully",
      type: "success",
    });

    // Disable edit mode after successful submission
    setIsEditMode(false);

    setTimeout(() => {
      setFormStatus({ message: "", type: "" });
    }, 3000);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setFormStatus({
        message: "New passwords do not match",
        type: "error",
      });
      return;
    }

    // Here you would typically make an API call to update the password
    setFormStatus({
      message: "Password updated successfully",
      type: "success",
    });

    // Reset form
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setTimeout(() => {
      setFormStatus({ message: "", type: "" });
    }, 3000);
  };

  const handleNotificationSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to update notification settings
    setFormStatus({
      message: "Notification preferences updated successfully",
      type: "success",
    });

    setTimeout(() => {
      setFormStatus({ message: "", type: "" });
    }, 3000);
  };

  const handleSystemSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to update system settings
    setFormStatus({
      message: "System settings updated successfully",
      type: "success",
    });

    setTimeout(() => {
      setFormStatus({ message: "", type: "" });
    }, 3000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({
          ...profileData,
          profileImage: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setProfileData({
      ...profileData,
      profileImage:
        "https://ui-avatars.com/api/?name=" +
        profileData.firstName +
        "+" +
        profileData.lastName +
        "&background=0D8ABC&color=fff",
    });
    setShowPhotoOptions(false);
  };

  return (
    <div className="py-6" data-aos="fade-up">
      <main className="flex-1 transition-all duration-300 max-w-7xl mx-auto w-full md:px-4">
        <div className="flex flex-col gap-8">
          {/* Heading and Tabs for md+ screens */}
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-2xl font-bold text-green-700 mb-4">Settings</h2>

            {/* Desktop tabs */}
            <div className="hidden md:flex border-b">
              <button
                onClick={() => setActiveTab("profile")}
                className={`px-6 cursor-pointer py-3 font-medium text-sm focus:outline-none ${
                  activeTab === "profile"
                    ? "border-b-2 border-green-500 text-green-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <i className="fas fa-user mr-2"></i>
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`px-6 cursor-pointer py-3 font-medium text-sm focus:outline-none ${
                  activeTab === "security"
                    ? "border-b-2 border-green-500 text-green-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <i className="fas fa-lock mr-2"></i>
                Security
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`px-6 cursor-pointer py-3 font-medium text-sm focus:outline-none ${
                  activeTab === "notifications"
                    ? "border-b-2 border-green-500 text-green-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <i className="fas fa-bell mr-2"></i>
                Notifications
              </button>
              <button
                onClick={() => setActiveTab("system")}
                className={`px-6 cursor-pointer py-3 font-medium text-sm focus:outline-none ${
                  activeTab === "system"
                    ? "border-b-2 border-green-500 text-green-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <i className="fas fa-cog mr-2"></i>
                System Settings
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Left side - Mobile Tabs (visible only on small screens) */}
            <div className="md:hidden mb-6">
              <div className="bg-white rounded-xl shadow py-4 px-2.5">
                <h2 className="text-xl font-bold text-green-700 mb-6 border-b pb-2">
                  Settings
                </h2>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setActiveTab("profile")}
                      className={`w-full cursor-pointer text-left px-4 py-2 rounded-lg flex items-center gap-3 ${
                        activeTab === "profile"
                          ? "bg-green-100 text-green-800 font-medium"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <i className="fas fa-user"></i>
                      <span>Profile Information</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("security")}
                      className={`w-full cursor-pointer text-left px-4 py-2 rounded-lg flex items-center gap-3 ${
                        activeTab === "security"
                          ? "bg-green-100 text-green-800 font-medium"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <i className="fas fa-lock"></i>
                      <span>Security</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("notifications")}
                      className={`w-full cursor-pointer text-left px-4 py-2 rounded-lg flex items-center gap-3 ${
                        activeTab === "notifications"
                          ? "bg-green-100 text-green-800 font-medium"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <i className="fas fa-bell"></i>
                      <span>Notifications</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("system")}
                      className={`w-full cursor-pointer text-left px-4 py-2 rounded-lg flex items-center gap-3 ${
                        activeTab === "system"
                          ? "bg-green-100 text-green-800 font-medium"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <i className="fas fa-cog"></i>
                      <span>System Settings</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="flex-1">
              <div className="bg-white rounded-xl shadow p-6">
                {/* Status message */}
                {formStatus.message && (
                  <div
                    className={`mb-4 p-3 rounded-lg ${
                      formStatus.type === "success"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    <div className="flex items-center">
                      <i
                        className={`mr-2 ${
                          formStatus.type === "success"
                            ? "fas fa-check-circle text-green-500"
                            : "fas fa-exclamation-circle text-red-500"
                        }`}
                      ></i>
                      <p>{formStatus.message}</p>
                    </div>
                  </div>
                )}

                {/* Profile Tab */}
                {activeTab === "profile" && (
                  <div>
                    <div className="flex justify-between items-center mb-6 pb-2 border-b">
                      <h3 className="text-xl font-bold text-gray-800">
                        Profile Information
                      </h3>
                      <button
                        type="button"
                        onClick={() => setIsEditMode(!isEditMode)}
                        className={`px-4 cursor-pointer py-1.5 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                          isEditMode
                            ? "bg-gray-200 text-gray-800"
                            : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                        }`}
                      >
                        <i
                          className={`fas fa-${isEditMode ? "times" : "edit"}`}
                        ></i>
                        <span>{isEditMode ? "Cancel" : "Edit"}</span>
                      </button>
                    </div>
                    <form onSubmit={handleProfileSubmit}>
                      <div className="flex flex-col md:flex-row md:items-start gap-8 mb-6">
                        {/* Profile Picture */}
                        <div className="flex flex-col items-center">
                          <div className="relative rounded-full mb-2">
                            <img
                              src={profileData.profileImage}
                              alt="Profile"
                              className="w-32 h-32 object-cover rounded-full border-4 border-gray-200"
                            />
                            {isEditMode && (
                              <button
                                type="button"
                                onClick={() =>
                                  setShowPhotoOptions(!showPhotoOptions)
                                }
                                className="absolute right-0 bottom-0 bg-green-500 text-white rounded-full p-2 shadow-lg hover:bg-green-600 transition-colors"
                              >
                                <i className="fas fa-camera"></i>
                              </button>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">Profile Photo</p>

                          {/* Overlay and Menu */}
                          {showPhotoOptions && (
                            <>
                              {/* Full screen overlay */}
                              <div
                                className="fixed inset-0 bg-gray-700 opacity-70 z-20"
                                onClick={() => setShowPhotoOptions(false)}
                              ></div>

                              {/* Menu */}
                              <div className="absolute bg-white rounded-lg shadow-xl z-30 w-48 mt-80 md:mt-2">
                                <ul className="divide-y divide-gray-100">
                                  <li>
                                    <label className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                                      <i className="fas fa-upload mr-2 text-blue-500"></i>
                                      <span>Choose New Photo</span>
                                      <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => {
                                          handleImageChange(e);
                                          setShowPhotoOptions(false);
                                        }}
                                      />
                                    </label>
                                  </li>
                                  <li>
                                    <button
                                      type="button"
                                      onClick={handleRemovePhoto}
                                      className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-gray-100"
                                    >
                                      <i className="fas fa-trash-alt mr-2"></i>
                                      <span>Remove Photo</span>
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      type="button"
                                      onClick={() => setShowPhotoOptions(false)}
                                      className="w-full flex items-center px-4 py-3 text-sm text-gray-500 hover:bg-gray-100"
                                    >
                                      <i className="fas fa-times mr-2"></i>
                                      <span>Cancel</span>
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="bg-blue-50 border-l-4 border-blue-500 mt:p-4 rounded py-4 px-2 mb-6">
                            <div className="flex items-center">
                              <i className="fas fa-info-circle text-blue-500 mr-2"></i>
                              <div>
                                <p className="text-sm font-medium text-blue-800">
                                  System Role:{" "}
                                  <span className="font-semibold">
                                    {profileData.role}
                                  </span>
                                </p>
                                <p className="text-xs text-blue-600">
                                  Your role determines your access level
                                  throughout the system
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-group">
                              <label className="block text-gray-700 text-sm font-medium mb-1">
                                First Name
                              </label>
                              <input
                                type="text"
                                className={`w-full rounded-lg border px-3 py-2 focus:outline-none ${
                                  isEditMode
                                    ? "border-gray-300 focus:ring-2 focus:ring-green-400"
                                    : "border-gray-200 bg-gray-50 text-gray-700"
                                }`}
                                value={profileData.firstName}
                                onChange={(e) =>
                                  setProfileData({
                                    ...profileData,
                                    firstName: e.target.value,
                                  })
                                }
                                disabled={!isEditMode}
                              />
                            </div>
                            <div className="form-group">
                              <label className="block text-gray-700 text-sm font-medium mb-1">
                                Last Name
                              </label>
                              <input
                                type="text"
                                className={`w-full rounded-lg border px-3 py-2 focus:outline-none ${
                                  isEditMode
                                    ? "border-gray-300 focus:ring-2 focus:ring-green-400"
                                    : "border-gray-200 bg-gray-50 text-gray-700"
                                }`}
                                value={profileData.lastName}
                                onChange={(e) =>
                                  setProfileData({
                                    ...profileData,
                                    lastName: e.target.value,
                                  })
                                }
                                disabled={!isEditMode}
                              />
                            </div>
                            <div className="form-group">
                              <label className="block text-gray-700 text-sm font-medium mb-1">
                                Email
                              </label>
                              <input
                                type="email"
                                className={`w-full rounded-lg border px-3 py-2 focus:outline-none ${
                                  isEditMode
                                    ? "border-gray-300 focus:ring-2 focus:ring-green-400"
                                    : "border-gray-200 bg-gray-50 text-gray-700"
                                }`}
                                value={profileData.email}
                                onChange={(e) =>
                                  setProfileData({
                                    ...profileData,
                                    email: e.target.value,
                                  })
                                }
                                disabled={!isEditMode}
                              />
                            </div>
                            <div className="form-group">
                              <label className="block text-gray-700 text-sm font-medium mb-1">
                                Phone
                              </label>
                              <input
                                type="tel"
                                className={`w-full rounded-lg border px-3 py-2 focus:outline-none ${
                                  isEditMode
                                    ? "border-gray-300 focus:ring-2 focus:ring-green-400"
                                    : "border-gray-200 bg-gray-50 text-gray-700"
                                }`}
                                value={profileData.phone}
                                onChange={(e) =>
                                  setProfileData({
                                    ...profileData,
                                    phone: e.target.value,
                                  })
                                }
                                disabled={!isEditMode}
                              />
                            </div>
                            <div className="form-group md:col-span-2">
                              <label className="block text-gray-700 text-sm font-medium mb-1">
                                Bio
                              </label>
                              <textarea
                                className={`w-full rounded-lg border px-3 py-2 focus:outline-none ${
                                  isEditMode
                                    ? "border-gray-300 focus:ring-2 focus:ring-green-400"
                                    : "border-gray-200 bg-gray-50 text-gray-700"
                                }`}
                                rows="3"
                                value={profileData.bio}
                                onChange={(e) =>
                                  setProfileData({
                                    ...profileData,
                                    bio: e.target.value,
                                  })
                                }
                                disabled={!isEditMode}
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end mt-4">
                        {isEditMode && (
                          <button
                            type="submit"
                            className="bg-green-600 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center gap-2"
                          >
                            <i className="fas fa-save"></i>
                            <span>Save Profile</span>
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === "security" && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b">
                      Security Settings
                    </h3>
                    <form onSubmit={handlePasswordSubmit}>
                      <div className="max-w-lg mx-auto">
                        <div className="mb-6">
                          <label className="block text-gray-700 text-sm font-medium mb-1">
                            Current Password
                          </label>
                          <input
                            type="password"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                            value={passwordData.currentPassword}
                            onChange={(e) =>
                              setPasswordData({
                                ...passwordData,
                                currentPassword: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="mb-6">
                          <label className="block text-gray-700 text-sm font-medium mb-1">
                            New Password
                          </label>
                          <input
                            type="password"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                            value={passwordData.newPassword}
                            onChange={(e) =>
                              setPasswordData({
                                ...passwordData,
                                newPassword: e.target.value,
                              })
                            }
                            required
                          />
                          <div className="mt-2 text-xs text-gray-500">
                            Password must be at least 8 characters long, include
                            an uppercase letter, a number, and a special
                            character.
                          </div>
                        </div>
                        <div className="mb-6">
                          <label className="block text-gray-700 text-sm font-medium mb-1">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                            value={passwordData.confirmPassword}
                            onChange={(e) =>
                              setPasswordData({
                                ...passwordData,
                                confirmPassword: e.target.value,
                              })
                            }
                            required
                          />
                        </div>

                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mb-6">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <i className="fas fa-shield-alt text-yellow-600"></i>
                            </div>
                            <div className="ml-3">
                              <h3 className="text-sm font-medium text-yellow-800">
                                Security Notice
                              </h3>
                              <div className="text-xs text-yellow-700 mt-1">
                                <p>
                                  After changing your password, you'll be logged
                                  out and required to login with your new
                                  password.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
                          <h4 className="font-medium text-gray-800 mb-2">
                            Two-Factor Authentication
                          </h4>
                          <p className="text-sm text-gray-600 mb-3">
                            Add an extra layer of security to your account by
                            enabling two-factor authentication.
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-red-500">
                              Not Enabled
                            </span>
                            <button
                              type="button"
                              className="bg-blue-100 cursor-pointer text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                            >
                              Enable 2FA
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="bg-green-600 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center gap-2"
                          >
                            <i className="fas fa-lock"></i>
                            <span>Update Password</span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === "notifications" && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b">
                      Notification Preferences
                    </h3>
                    <form onSubmit={handleNotificationSubmit}>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-800">
                              Email Notifications
                            </h4>
                            <p className="text-sm text-gray-600">
                              Receive emails for important updates
                            </p>
                          </div>
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={notificationSettings.emailNotifications}
                              onChange={() =>
                                setNotificationSettings({
                                  ...notificationSettings,
                                  emailNotifications:
                                    !notificationSettings.emailNotifications,
                                })
                              }
                            />
                            <span className="slider round"></span>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-800">
                              Project Updates
                            </h4>
                            <p className="text-sm text-gray-600">
                              Get notified when projects are created or updated
                            </p>
                          </div>
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={notificationSettings.projectUpdates}
                              onChange={() =>
                                setNotificationSettings({
                                  ...notificationSettings,
                                  projectUpdates:
                                    !notificationSettings.projectUpdates,
                                })
                              }
                            />
                            <span className="slider round"></span>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-800">
                              Donor Activity
                            </h4>
                            <p className="text-sm text-gray-600">
                              Notifications about donations and donor
                              registrations
                            </p>
                          </div>
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={notificationSettings.donorActivity}
                              onChange={() =>
                                setNotificationSettings({
                                  ...notificationSettings,
                                  donorActivity:
                                    !notificationSettings.donorActivity,
                                })
                              }
                            />
                            <span className="slider round"></span>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-800">
                              System Alerts
                            </h4>
                            <p className="text-sm text-gray-600">
                              Important system alerts and maintenance
                              notifications
                            </p>
                          </div>
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={notificationSettings.systemAlerts}
                              onChange={() =>
                                setNotificationSettings({
                                  ...notificationSettings,
                                  systemAlerts:
                                    !notificationSettings.systemAlerts,
                                })
                              }
                            />
                            <span className="slider round"></span>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-800">
                              Login Alerts
                            </h4>
                            <p className="text-sm text-gray-600">
                              Get notified when someone logs into your account
                            </p>
                          </div>
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={notificationSettings.loginAlerts}
                              onChange={() =>
                                setNotificationSettings({
                                  ...notificationSettings,
                                  loginAlerts:
                                    !notificationSettings.loginAlerts,
                                })
                              }
                            />
                            <span className="slider round"></span>
                          </label>
                        </div>
                      </div>

                      <div className="flex justify-end mt-6">
                        <button
                          type="submit"
                          className="bg-green-600 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center gap-2"
                        >
                          <i className="fas fa-bell"></i>
                          <span>Save Preferences</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* System Settings Tab */}
                {activeTab === "system" && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b">
                      System Settings
                    </h3>
                    <form onSubmit={handleSystemSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-group">
                          <label className="block text-gray-700 text-sm font-medium mb-1">
                            Language
                          </label>
                          <select
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                            value={systemSettings.language}
                            onChange={(e) =>
                              setSystemSettings({
                                ...systemSettings,
                                language: e.target.value,
                              })
                            }
                          >
                            <option value="en">English</option>
                            <option value="fr">French</option>
                            <option value="es">Spanish</option>
                            <option value="ar">Arabic</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label className="block text-gray-700 text-sm font-medium mb-1">
                            Theme
                          </label>
                          <select
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                            value={systemSettings.theme}
                            onChange={(e) =>
                              setSystemSettings({
                                ...systemSettings,
                                theme: e.target.value,
                              })
                            }
                          >
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                            <option value="system">System Default</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label className="block text-gray-700 text-sm font-medium mb-1">
                            Auto Logout (minutes)
                          </label>
                          <select
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                            value={systemSettings.autoLogout}
                            onChange={(e) =>
                              setSystemSettings({
                                ...systemSettings,
                                autoLogout: e.target.value,
                              })
                            }
                          >
                            <option value="15">15 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="60">1 hour</option>
                            <option value="120">2 hours</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label className="block text-gray-700 text-sm font-medium mb-1">
                            Database Backup
                          </label>
                          <select
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                            value={systemSettings.dataBackup}
                            onChange={(e) =>
                              setSystemSettings({
                                ...systemSettings,
                                dataBackup: e.target.value,
                              })
                            }
                          >
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="manual">Manual Only</option>
                          </select>
                        </div>

                        <div className="form-group md:col-span-2">
                          <div className="hidden items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div>
                              <h4 className="font-medium text-gray-800">
                                Maintenance Mode
                              </h4>
                              <p className="text-sm text-gray-600">
                                Enable to make the site inaccessible to regular
                                users during updates
                              </p>
                            </div>
                            <label className="switch">
                              <input
                                type="checkbox"
                                checked={systemSettings.maintenance}
                                onChange={() =>
                                  setSystemSettings({
                                    ...systemSettings,
                                    maintenance: !systemSettings.maintenance,
                                  })
                                }
                              />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between mt-6">
                        <button
                          type="button"
                          className="bg-red-100 cursor-pointer text-red-700 px-6 py-2 rounded-lg hover:bg-red-200 transition-colors duration-300 flex items-center gap-2"
                        >
                          <i className="fas fa-trash-alt"></i>
                          <span>Clear Cache</span>
                        </button>
                        <button
                          type="submit"
                          className="bg-green-600 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center gap-2"
                        >
                          <i className="fas fa-cog"></i>
                          <span>Save Settings</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 24px;
          min-width: 50px; /* Add minimum width to prevent shrinking */
          flex-shrink: 0; /* Prevent shrinking on small screens */
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: 0.4s;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: 0.4s;
        }

        input:checked + .slider {
          background-color: #4caf50;
        }

        input:focus + .slider {
          box-shadow: 0 0 1px #4caf50;
        }

        input:checked + .slider:before {
          transform: translateX(26px);
        }

        .slider.round {
          border-radius: 24px;
        }

        .slider.round:before {
          border-radius: 50%;
        }

        /* Media query for small screens */
        @media (max-width: 640px) {
          .switch {
            width: 46px; /* Slightly smaller but still consistent */
            height: 22px;
          }

          .slider:before {
            height: 14px;
            width: 14px;
          }

          input:checked + .slider:before {
            transform: translateX(24px);
          }
        }
      `}</style>
    </div>
  );
}

export default Settings;
