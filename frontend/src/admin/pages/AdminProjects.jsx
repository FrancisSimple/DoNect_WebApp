import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CleanWaterImg from "../../assets/other-images/clean-water.png";
import SolarImg from "../../assets/other-images/solar.jpg";
import AgrigImg from "../../assets/other-images/agriculture-project.jpg";

// Only project stats for the bar chart
const projectStats = [
  {
    label: "Active Projects",
    value: 12,
    color: "#22c55e",
    bg: "rgba(34,197,94,0.2)",
    border: "#22c55e",
  },
  {
    label: "Completed Projects",
    value: 8,
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.2)",
    border: "#3b82f6",
  },
  {
    label: "Upcoming Projects",
    value: 5,
    color: "#f59e42",
    bg: "rgba(245,158,66,0.2)",
    border: "#f59e42",
  },
];

const stats = [
  {
    icon: "fas fa-project-diagram",
    label: "Active Projects",
    value: 12,
    bg: "bg-green-100",
    border: "border-green-500",
    iconColor: "text-green-600",
  },
  {
    icon: "fas fa-check-circle",
    label: "Completed Projects",
    value: 8,
    bg: "bg-blue-100",
    border: "border-blue-500",
    iconColor: "text-blue-600",
  },
  {
    icon: "fas fa-hourglass-half",
    label: "Upcoming Projects",
    value: 5,
    bg: "bg-yellow-100",
    border: "border-yellow-500",
    iconColor: "text-yellow-600",
  },
];

// Dummy projects data
const allProjects = [
  {
    id: 1,
    name: "Clean Water Initiative",
    image: CleanWaterImg,
    category: "Water",
    status: "Active",
    fund: 12000,
    featured: true,
  },
  {
    id: 2,
    name: "Solar Power for Schools",
    image: SolarImg,
    category: "Energy",
    status: "Upcoming",
    fund: 8000,
    featured: false,
  },
  {
    id: 3,
    name: "Agricultural Training Program",
    image: AgrigImg,
    category: "Agriculture",
    status: "Completed",
    fund: 15000,
    featured: true,
  },
  {
    id: 4,
    name: "Solar Power for Schools",
    image: SolarImg,
    category: "Energy",
    status: "Upcoming",
    fund: 8000,
    featured: false,
  },
  {
    id: 5,
    name: "Agricultural Training Program",
    image: AgrigImg,
    category: "Agriculture",
    status: "Completed",
    fund: 15000,
    featured: true,
  },
  {
    id: 6,
    name: "Solar Power for Schools",
    image: SolarImg,
    category: "Energy",
    status: "Upcoming",
    fund: 8000,
    featured: false,
  },
  {
    id: 7,
    name: "Agricultural Training Program",
    image: AgrigImg,
    category: "Agriculture",
    status: "Completed",
    fund: 15000,
    featured: true,
  },
  {
    id: 8,
    name: "Solar Power for Schools",
    image: SolarImg,
    category: "Energy",
    status: "Upcoming",
    fund: 8000,
    featured: false,
  },
  {
    id: 9,
    name: "Agricultural Training Program",
    image: AgrigImg,
    category: "Agriculture",
    status: "Completed",
    fund: 15000,
    featured: true,
  },
];

function AdminProjects() {
  useEffect(() => {
    document.title = "DoNect org | Admin Projects";
  }, []);

  // Search/filter state
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Filtered projects
  const projects = allProjects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.category.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" ? true : project.status === filter;
    return matchesSearch && matchesFilter;
  });

  // Render bar chart for project stats only
  useEffect(() => {
    // Chart.js must be loaded globally (via CDN in index.html)
    const ChartGlobal =
      typeof window !== "undefined" ? window.Chart : undefined;
    if (!ChartGlobal) return;

    const chartId = "projectStatsBarChart";
    const chartEl = document.getElementById(chartId);
    if (!chartEl) return;

    // Destroy previous chart instance if exists
    if (chartEl._chartInstance) {
      chartEl._chartInstance.destroy();
    }

    chartEl._chartInstance = new ChartGlobal(chartEl.getContext("2d"), {
      type: "line",
      data: {
        labels: projectStats.map((s) => s.label),
        datasets: [
          {
            label: "Projects",
            data: projectStats.map((s) => s.value),
            backgroundColor: projectStats.map((s) => s.bg),
            borderColor: projectStats.map((s) => s.color),
            borderWidth: 2,
            borderRadius: 10,
            maxBarThickness: 120,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { mode: "index", intersect: false },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: "#374151", font: { weight: "bold" } },
          },
          y: {
            beginAtZero: true,
            grid: { color: "rgba(0,0,0,0.05)" },
            ticks: { color: "#374151" },
          },
        },
      },
    });
  }, []);

  return (
    <div className="py-8 w-full max-w-full overflow-hidden" data-aos="fade-up">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
        Projects Overview
      </h1>
      <p className="text-gray-600 mb-8 text-lg">
        Manage all projects, view stats, and perform actions.
      </p>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-xl shadow p-6 flex flex-col items-center border-t-4 ${stat.bg} ${stat.border} relative`}
          >
            <i className={`${stat.icon} text-3xl ${stat.iconColor} mb-3`}></i>
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            <div className="text-gray-600 text-center mb-4">{stat.label}</div>
          </div>
        ))}
      </div>
      {/* Bar Chart for Project Stats */}
      <div className="bg-white rounded-2xl shadow p-6 mb-10" data-aos="fade-up">
        <h2 className="text-xl font-bold text-green-700 mb-4">
          Project Statistics
        </h2>
        <div className="w-full h-72">
          <canvas
            id="projectStatsBarChart"
            className="w-full h-full"
            style={{ minHeight: 200 }}
          />
        </div>
      </div>
      {/* Search & Filter Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4 md:mx-4 mx-1">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            placeholder="Search by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-72 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Upcoming">Upcoming</option>
          </select>
        </div>
        <Link
          to="/admin/projects/add-new-project"
          className="inline-flex justify-center items-center px-4 py-2 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-all mx-4 "
        >
          <i className="fas fa-plus mr-2"></i>
          Add Project
        </Link>
      </div>
      {/* Projects Table - FIXED WIDTH APPROACH */}
      <div className="bg-white rounded-2xl shadow p-2 w-full max-w-full">
        {/* Container with fixed width constraint */}
        <div className="w-full max-w-full overflow-hidden">
          <div className="border border-green-200 rounded-lg overflow-hidden">
            {/* Table header - fixed */}
            <div className="w-full bg-green-100 sticky top-0 z-10 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full divide-y divide-green-100 table-fixed">
                  <thead>
                    <tr>
                      <th className="w-[80px] px-4 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                        Picture
                      </th>
                      <th className="w-[200px] px-4 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="w-[120px] px-4 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="w-[100px] px-4 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                        Fund (₵)
                      </th>
                      <th className="w-[100px] px-4 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                        Featured
                      </th>
                      <th className="w-[100px] px-4 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="w-[160px] px-4 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>

            {/* Table body - scrollable */}
            <div className="w-full overflow-x-auto overflow-y-auto max-h-[500px] admin-projects-table-scroll">
              <table className="w-full divide-y divide-green-100 table-fixed">
                <tbody
                  className="divide-y divide-green-50 bg-white"
                  data-aos="fade-up"
                >
                  {projects.map((project) => (
                    <tr
                      key={project.id}
                      className="hover:bg-green-50 transition"
                    >
                      <td className="w-[80px] px-4 py-3">
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-14 h-14 rounded-lg object-cover border-2 border-green-100"
                        />
                      </td>
                      <td className="w-[200px] px-4 py-3 font-semibold text-gray-800 truncate">
                        {project.name}
                      </td>
                      <td className="w-[120px] px-4 py-3 text-gray-700 truncate">
                        {project.category}
                      </td>
                      <td className="w-[100px] px-4 py-3 text-gray-700 font-semibold whitespace-nowrap">
                        ₵{project.fund.toLocaleString()}
                      </td>
                      <td className="w-[100px] px-4 py-3 whitespace-nowrap">
                        {project.featured ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">
                            <i className="fas fa-star text-yellow-500"></i>{" "}
                            Featured
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold">
                            <i className="far fa-star"></i> No
                          </span>
                        )}
                      </td>
                      <td className="w-[100px] px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            project.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : project.status === "Upcoming"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {project.status}
                        </span>
                      </td>
                      <td className="w-[160px] px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          <Link
                            to={`/admin/projects/edit/${project.id}`}
                            className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition text-xs font-semibold"
                            title="Edit"
                          >
                            <i className="fas fa-edit mr-1"></i>
                            Edit
                          </Link>
                          <button
                            className="inline-flex items-center px-3 py-1.5 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition text-xs font-semibold"
                            title="Delete"
                          >
                            <i className="fas fa-trash-alt mr-1"></i>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {projects.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center py-8 text-gray-400"
                      >
                        No projects found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//export default AdminProjects;
//}

export default AdminProjects;
