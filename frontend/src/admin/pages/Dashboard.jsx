import { useEffect } from "react";
import { Link } from "react-router-dom";
import Charts from "../components/Charts";

function Dashboard() {
  // Dummy stats (replace with real data as needed)
  const stats = [
    {
      icon: "fas fa-project-diagram",
      label: "Active Projects",
      value: 12,
      bg: "bg-green-100",
      border: "border-green-500",
      iconColor: "text-green-600",
      link: "/admin/projects",
      linkLabel: "View Projects",
      linkBColor: "bg-green-200 border-green-400",
    },
    {
      icon: "fas fa-check-circle",
      label: "Completed Projects",
      value: 8,
      bg: "bg-blue-100",
      border: "border-blue-500",
      iconColor: "text-blue-600",
      link: "/admin/projects?status=completed",
      linkLabel: "View Completed",
      linkBColor: "bg-blue-200 border-blue-400",
    },
    {
      icon: "fas fa-hourglass-half",
      label: "Upcoming Projects",
      value: 5,
      bg: "bg-yellow-100",
      border: "border-yellow-500",
      iconColor: "text-yellow-600",
      link: "/admin/projects?status=upcoming",
      linkLabel: "View Upcoming",
      linkBColor: "bg-yellow-200 border-yellow-400",
    },
    {
      icon: "fas fa-hand-holding-heart",
      label: "Total Donors",
      value: 10,
      bg: "bg-pink-100",
      border: "border-pink-500",
      iconColor: "text-pink-600",
      link: "/admin/donors",
      linkLabel: "View Donors",
      linkBColor: "bg-pink-200 border-pink-400",
    },
    {
      icon: "fas fa-users",
      label: "Total Beneficiaries",
      value: 32,
      bg: "bg-purple-100",
      border: "border-purple-500",
      iconColor: "text-purple-600",
      link: "/admin/beneficiaries",
      linkLabel: "View Beneficiaries",
      linkBColor: "bg-purple-200 border-purple-400",
    },
    {
      icon: "fas fa-user-clock",
      label: "Pending Users",
      value: 14,
      bg: "bg-orange-100",
      border: "border-orange-500",
      iconColor: "text-orange-600",
      link: "/admin/beneficiaries?status=pending",
      linkLabel: "View Pending",
      linkBColor: "bg-orange-200 border-orange-400",
    },
  ];

  useEffect(() => {
    document.title = "DoNect org | Admin Dashboard";
    // Do NOT import("../js/chart") here, let Charts.jsx handle chart rendering
  }, []);

  return (
    <div className="" data-aos="fade-down">
      <main className="flex-1 py-6 transition-all duration-300 max-w-7xl mx-auto w-full">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
            Welcome, Admin
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Here’s a quick overview of your platform’s performance and recent
            activity.
          </p>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`rounded-xl shadow p-6 flex flex-col items-center border-t-4 ${stat.bg} ${stat.border} relative`}
              >
                <i
                  className={`${stat.icon} text-3xl ${stat.iconColor} mb-3`}
                ></i>
                <div className="text-2xl font-bold text-gray-800">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-center mb-4">
                  {stat.label}
                </div>
                <Link
                  to={stat.link}
                  className={`absolute bottom-0 right-0 ${stat.iconColor} border hover:opacity-80 ${stat.linkBColor} left-0 text-xs rounded-b-xl flex items-center py-1 justify-center transition-all duration-200 group`}
                  style={{ marginTop: "auto" }}
                >
                  <span>{stat.linkLabel}</span>
                  <i className="fas fa-arrow-right text-xs ml-1 animate-pulse group-hover:translate-x-1"></i>
                </Link>
              </div>
            ))}
          </div>
          {/* Modern Charts Section using Charts.jsx */}
          <div className="bg-white rounded-2xl shadow p-6 mb-10">
            <h2 className="text-xl font-bold text-green-700 mb-4">
              Platform Analytics
            </h2>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-72">
                <Charts chartType="overview" />
              </div>
              <div className="h-72">
                <Charts chartType="engagement" />
              </div>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="h-72">
                <Charts chartType="category" />
              </div>
              <div className="h-72">
                <Charts chartType="traffic" />
              </div>
            </div>
          </div>
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow p-6" data-aos="fade-up">
            <h2 className="text-xl font-bold text-green-700 mb-4">
              Recent Activity
            </h2>
            <ul className="divide-y divide-green-100">
              <li className="py-3 flex items-center gap-3">
                <i className="fas fa-user-plus text-green-500"></i>
                <span className="text-gray-700">
                  New donor <span className="font-semibold">John Doe</span>{" "}
                  registered.
                </span>
                <span className="ml-auto text-xs text-gray-400">
                  2 mins ago
                </span>
              </li>
              <li className="py-3 flex items-center gap-3">
                <i className="fas fa-donate text-green-500"></i>
                <span className="text-gray-700">
                  <span className="font-semibold">₵5,000</span> donated to{" "}
                  <span className="font-semibold">Clean Water Initiative</span>.
                </span>
                <span className="ml-auto text-xs text-gray-400">
                  10 mins ago
                </span>
              </li>
              <li className="py-3 flex items-center gap-3">
                <i className="fas fa-project-diagram text-green-500"></i>
                <span className="text-gray-700">
                  Project{" "}
                  <span className="font-semibold">Solar Power for Schools</span>{" "}
                  marked as completed.
                </span>
                <span className="ml-auto text-xs text-gray-400">
                  1 hour ago
                </span>
              </li>
              <li className="py-3 flex items-center gap-3">
                <i className="fas fa-user-check text-green-500"></i>
                <span className="text-gray-700">
                  Beneficiary,{" "}
                  <span className="font-semibold">Example Basic School</span>{" "}
                  verified.
                </span>
                <span className="ml-auto text-xs text-gray-400">
                  2 hours ago
                </span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
