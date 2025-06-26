import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileImg from "../../assets/team-members/joshua.jpg";

// Stats metadata for donors
const donorStatsMeta = [
  {
    label: "Individual Donors",
    value: 35,
    color: "#22c55e",
    bg: "rgba(34,197,94,0.2)",
    border: "#22c55e",
    icon: "fas fa-user",
    iconColor: "text-green-600",
    bgClass: "bg-green-100",
    borderClass: "border-green-500",
  },
  {
    label: "Organization Donors",
    value: 12,
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.2)",
    border: "#3b82f6",
    icon: "fas fa-building",
    iconColor: "text-blue-600",
    bgClass: "bg-blue-100",
    borderClass: "border-blue-500",
  },
  {
    label: "Pending Donors",
    value: 8,
    color: "#f59e42",
    bg: "rgba(245,158,66,0.2)",
    border: "#f59e42",
    icon: "fas fa-clock",
    iconColor: "text-yellow-600",
    bgClass: "bg-yellow-100",
    borderClass: "border-yellow-500",
  },
];

// Dummy donors data
const allDonors = [
  {
    id: 1,
    name: "John Doe",
    image: ProfileImg,
    email: "john.doe@example.com",
    type: "Individual",
    totalDonated: 5000,
    status: "Active",
    country: "Ghana",
    lastDonation: "2023-10-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    image: ProfileImg,
    email: "jane.smith@example.com",
    type: "Individual",
    totalDonated: 2500,
    status: "Active",
    country: "Nigeria",
    lastDonation: "2023-11-05",
  },
  {
    id: 3,
    name: "TechCorp Inc.",
    image: null,
    email: "donations@techcorp.com",
    type: "Organization",
    totalDonated: 15000,
    status: "Active",
    country: "South Africa",
    lastDonation: "2023-09-28",
  },
  {
    id: 4,
    name: "Green Future Foundation",
    image: null,
    email: "contact@greenfuture.org",
    type: "Organization",
    totalDonated: 25000,
    status: "Active",
    country: "Kenya",
    lastDonation: "2023-08-15",
  },
  {
    id: 5,
    name: "Michael Johnson",
    image: ProfileImg,
    email: "michael.j@example.com",
    type: "Individual",
    totalDonated: 0,
    status: "Pending",
    country: "Ghana",
    lastDonation: null,
  },
  {
    id: 6,
    name: "Community Aid Group",
    image: null,
    email: "info@communityaid.org",
    type: "Organization",
    totalDonated: 0,
    status: "Pending",
    country: "Tanzania",
    lastDonation: null,
  },
  {
    id: 7,
    name: "Sarah Williams",
    image: ProfileImg,
    email: "sarah.w@example.com",
    type: "Individual",
    totalDonated: 7500,
    status: "Active",
    country: "Ghana",
    lastDonation: "2023-11-20",
  },
  {
    id: 8,
    name: "Education First",
    image: null,
    email: "contact@educationfirst.org",
    type: "Organization",
    totalDonated: 35000,
    status: "Active",
    country: "Kenya",
    lastDonation: "2023-10-30",
  },
  {
    id: 9,
    name: "Robert Johnson",
    image: ProfileImg,
    email: "robert.j@example.com",
    type: "Individual",
    totalDonated: 0,
    status: "Pending",
    country: "Nigeria",
    lastDonation: null,
  },
];

function Donors() {
  useEffect(() => {
    document.title = "DoNect org | Admin Donors";
  }, []);

  // Search/filter state
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  // Filtered donors
  const donors = allDonors.filter((donor) => {
    const matchesSearch =
      donor.name.toLowerCase().includes(search.toLowerCase()) ||
      donor.email.toLowerCase().includes(search.toLowerCase()) ||
      donor.country.toLowerCase().includes(search.toLowerCase());

    const matchesStatusFilter =
      filter === "All" ? true : donor.status === filter;
    const matchesTypeFilter =
      typeFilter === "All" ? true : donor.type === typeFilter;

    return matchesSearch && matchesStatusFilter && matchesTypeFilter;
  });

  // Render bar chart for donor stats
  useEffect(() => {
    // Chart.js must be loaded globally (via CDN in index.html)
    const ChartGlobal =
      typeof window !== "undefined" ? window.Chart : undefined;
    if (!ChartGlobal) return;

    const chartId = "donorStatsBarChart";
    const chartEl = document.getElementById(chartId);
    if (!chartEl) return;

    // Destroy previous chart instance if exists
    if (chartEl._chartInstance) {
      chartEl._chartInstance.destroy();
    }

    chartEl._chartInstance = new ChartGlobal(chartEl.getContext("2d"), {
      type: "bar",
      data: {
        labels: donorStatsMeta.map((s) => s.label),
        datasets: [
          {
            label: "Donors",
            data: donorStatsMeta.map((s) => s.value),
            backgroundColor: donorStatsMeta.map((s) => s.bg),
            borderColor: donorStatsMeta.map((s) => s.color),
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
        Donors Overview
      </h1>
      <p className="text-gray-600 mb-8 text-lg">
        Manage donors, view statistics, and track donations.
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {donorStatsMeta.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-xl shadow p-6 flex flex-col items-center border-t-4 ${stat.bgClass} ${stat.borderClass} relative`}
          >
            <i className={`${stat.icon} text-3xl ${stat.iconColor} mb-3`}></i>
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            <div className="text-gray-600 text-center mb-4">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Bar Chart for Donor Stats */}
      <div className="bg-white rounded-2xl shadow p-6 mb-10" data-aos="fade-up">
        <h2 className="text-xl font-bold text-green-700 mb-4">
          Donor Statistics
        </h2>
        <div className="w-full h-72">
          <canvas
            id="donorStatsBarChart"
            className="w-full h-full"
            style={{ minHeight: 200 }}
          />
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col mx-2 md:flex-row md:items-center gap-4 mb-4">
        <div className="flex-1 flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Search by name, email or country..."
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
            <option value="Pending">Pending</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
          >
            <option value="All">All Types</option>
            <option value="Individual">Individual</option>
            <option value="Organization">Organization</option>
          </select>
        </div>
        {/* <Link
          to="/admin/donors/add-new-donor"
          className="inline-flex justify-center items-center px-4 py-2 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-all mx-4"
        >
          <i className="fas fa-plus mr-2"></i>
          Add Donor
        </Link> */}
      </div>

      {/* Donors Table with Fixed Header */}
      <div className="bg-white rounded-2xl shadow p-2 w-full">
        <div className="w-full overflow-hidden">
          <div className="border border-green-200 rounded-lg overflow-hidden">
            {/* Table header - fixed */}
            <div className="w-full bg-green-100 sticky top-0 z-10 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full divide-y divide-green-100 table-fixed">
                  <thead>
                    <tr>
                      <th className="w-[80px] px-4 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                        Photo
                      </th>
                      <th className="w-[180px] px-4 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="w-[220px] px-4 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="w-[100px] px-4 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="w-[120px] px-4 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                        Total Donated (₵)
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
                  {donors.map((donor) => (
                    <tr key={donor.id} className="hover:bg-green-50 transition">
                      <td className="w-[80px] px-4 py-3">
                        {donor.image ? (
                          <img
                            src={donor.image}
                            alt={donor.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-green-100"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center border-2 border-green-200">
                            <i className="fas fa-building text-green-600"></i>
                          </div>
                        )}
                      </td>
                      <td className="w-[180px] px-4 py-3 font-semibold text-gray-800 truncate">
                        {donor.name}
                      </td>
                      <td className="w-[220px] px-4 py-3 text-gray-700 truncate">
                        {donor.email}
                      </td>
                      <td className="w-[100px] px-4 py-3 text-gray-700 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            donor.type === "Individual"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-indigo-100 text-indigo-700"
                          }`}
                        >
                          {donor.type}
                        </span>
                      </td>
                      <td className="w-[120px] px-4 py-3 text-gray-700 font-semibold whitespace-nowrap">
                        {donor.totalDonated
                          ? `₵${donor.totalDonated.toLocaleString()}`
                          : "-"}
                      </td>
                      <td className="w-[100px] px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            donor.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {donor.status}
                        </span>
                      </td>
                      <td className="w-[160px] px-4 md:px-0 py-3">
                        <div className="flex flex-wrap gap-2">
                          <Link
                            to={`/admin/donors/edit/${donor.id}`}
                            className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition text-xs font-semibold whitespace-nowrap"
                            title="Edit Donor"
                          >
                            <i className="fas fa-edit mr-1"></i>
                            Edit
                          </Link>
                          <button
                            className="inline-flex items-center px-3 py-1.5 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition text-xs font-semibold whitespace-nowrap"
                            title="Remove"
                          >
                            <i className="fas fa-trash-alt mr-1"></i>
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {donors.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center py-8 text-gray-400"
                      >
                        No donors found.
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

export default Donors;
