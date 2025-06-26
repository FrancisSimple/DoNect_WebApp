import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SchoolImg from "../../assets/other-images/basic-schools.jpg";
import ProfileImg from "../../assets/team-members/joshua.jpg";

// Stats metadata for beneficiaries
const beneficiaryStatsMeta = [
  {
    label: "Total Beneficiaries",
    value: 42,
    color: "#22c55e",
    bg: "rgba(34,197,94,0.2)",
    border: "#22c55e",
    icon: "fas fa-users",
    iconColor: "text-green-600",
    bgClass: "bg-green-100",
    borderClass: "border-green-500",
  },
  {
    label: "Pending Beneficiaries",
    value: 15,
    color: "#f59e42",
    bg: "rgba(245,158,66,0.2)",
    border: "#f59e42",
    icon: "fas fa-hourglass-half",
    iconColor: "text-yellow-600",
    bgClass: "bg-yellow-100",
    borderClass: "border-yellow-500",
  },
  {
    label: "Active Beneficiaries",
    value: 8,
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.2)",
    border: "#3b82f6",
    icon: "fas fa-project-diagram",
    iconColor: "text-blue-600",
    bgClass: "bg-blue-100",
    borderClass: "border-blue-500",
  },
];

// Dummy beneficiaries data
const allBeneficiaries = [
  {
    id: 1,
    name: "Akuapem Basic School",
    image: SchoolImg,
    type: "School",
    location: "Eastern Region, Ghana",
    status: "Active",
    projectsReceived: 2,
    contactPerson: "Emmanuel Owusu",
    contactEmail: "e.owusu@akuapembasic.edu.gh",
  },
  {
    id: 2,
    name: "Tema Community Farm Cooperative",
    image: null,
    type: "Community Group",
    location: "Greater Accra, Ghana",
    status: "Active",
    projectsReceived: 1,
    contactPerson: "Grace Mensah",
    contactEmail: "grace@temafarming.org",
  },
  {
    id: 3,
    name: "Kumasi Youth Development Center",
    image: null,
    type: "Youth Organization",
    location: "Ashanti Region, Ghana",
    status: "Pending",
    projectsReceived: 0,
    contactPerson: "Kofi Adu",
    contactEmail: "kadu@kydc.org",
  },
  {
    id: 4,
    name: "Hope Children's Home",
    image: null,
    type: "Orphanage",
    location: "Central Region, Ghana",
    status: "Active",
    projectsReceived: 3,
    contactPerson: "Sarah Tetteh",
    contactEmail: "stetteh@hopechildren.org",
  },
  {
    id: 5,
    name: "Northern Ghana Farmers Association",
    image: null,
    type: "Farmers Group",
    location: "Northern Region, Ghana",
    status: "Pending",
    projectsReceived: 0,
    contactPerson: "Ibrahim Mohammed",
    contactEmail: "imohammed@ngfa.org",
  },
  {
    id: 6,
    name: "Ada Women's Empowerment Collective",
    image: null,
    type: "Women's Group",
    location: "Greater Accra, Ghana",
    status: "Active",
    projectsReceived: 1,
    contactPerson: "Felicia Addo",
    contactEmail: "felicia@adawomen.org",
  },
  {
    id: 7,
    name: "Cape Coast Technical School",
    image: SchoolImg,
    type: "School",
    location: "Central Region, Ghana",
    status: "Active",
    projectsReceived: 1,
    contactPerson: "Patrick Quaye",
    contactEmail: "pquaye@capetechnical.edu.gh",
  },
  {
    id: 8,
    name: "Volta Youth Innovation Hub",
    image: null,
    type: "Youth Organization",
    location: "Volta Region, Ghana",
    status: "Pending",
    projectsReceived: 0,
    contactPerson: "Edem Kpodo",
    contactEmail: "edem@voltayouth.org",
  },
  {
    id: 9,
    name: "Tamale Community Health Center",
    image: null,
    type: "Health Facility",
    location: "Northern Region, Ghana",
    status: "Active",
    projectsReceived: 2,
    contactPerson: "Amina Salifu",
    contactEmail: "asalifu@talamehealth.org",
  },
];

function Beneficiaries() {
  useEffect(() => {
    document.title = "DoNect org | Admin Beneficiaries";
  }, []);

  // Search/filter state
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  // Filtered beneficiaries
  const beneficiaries = allBeneficiaries.filter((beneficiary) => {
    const matchesSearch =
      beneficiary.name.toLowerCase().includes(search.toLowerCase()) ||
      beneficiary.location.toLowerCase().includes(search.toLowerCase()) ||
      beneficiary.contactPerson.toLowerCase().includes(search.toLowerCase());

    const matchesStatusFilter =
      filter === "All" ? true : beneficiary.status === filter;
    const matchesTypeFilter =
      typeFilter === "All" ? true : beneficiary.type === typeFilter;

    return matchesSearch && matchesStatusFilter && matchesTypeFilter;
  });

  // Get unique beneficiary types for filter dropdown
  const uniqueTypes = [...new Set(allBeneficiaries.map((b) => b.type))];

  // Render chart for beneficiary stats
  useEffect(() => {
    // Chart.js must be loaded globally (via CDN in index.html)
    const ChartGlobal =
      typeof window !== "undefined" ? window.Chart : undefined;
    if (!ChartGlobal) return;

    const chartId = "beneficiaryStatsChart";
    const chartEl = document.getElementById(chartId);
    if (!chartEl) return;

    // Destroy previous chart instance if exists
    if (chartEl._chartInstance) {
      chartEl._chartInstance.destroy();
    }

    chartEl._chartInstance = new ChartGlobal(chartEl.getContext("2d"), {
      type: "bar",
      data: {
        labels: beneficiaryStatsMeta.map((s) => s.label),
        datasets: [
          {
            label: "Count",
            data: beneficiaryStatsMeta.map((s) => s.value),
            backgroundColor: beneficiaryStatsMeta.map((s) => s.bg),
            borderColor: beneficiaryStatsMeta.map((s) => s.color),
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
        Beneficiaries Overview
      </h1>
      <p className="text-gray-600 mb-8 text-lg">
        Manage beneficiaries, view statistics, and track project impact.
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {beneficiaryStatsMeta.map((stat) => (
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

      {/* Bar Chart for Beneficiary Stats */}
      <div className="bg-white rounded-2xl shadow p-6 mb-10" data-aos="fade-up">
        <h2 className="text-xl font-bold text-green-700 mb-4">
          Beneficiary Statistics
        </h2>
        <div className="w-full h-72">
          <canvas
            id="beneficiaryStatsChart"
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
            placeholder="Search by name, location or contact person..."
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
            {uniqueTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        {/* <Link
          to="/admin/beneficiaries/add-new"
          className="inline-flex justify-center items-center px-4 py-2 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-all mx-4"
        >
          <i className="fas fa-plus mr-2"></i>
          Add Beneficiary
        </Link> */}
      </div>

      {/* Beneficiaries Table with Fixed Header */}
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
                      <th className="w-[120px] px-4 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="w-[180px] px-4 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="w-[100px] px-4 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                        Projects
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
                  {beneficiaries.map((beneficiary) => (
                    <tr
                      key={beneficiary.id}
                      className="hover:bg-green-50 transition"
                    >
                      <td className="w-[80px] px-4 py-3">
                        {beneficiary.image ? (
                          <img
                            src={beneficiary.image}
                            alt={beneficiary.name}
                            className="w-10 h-10 rounded-lg object-cover border-2 border-green-100"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center border-2 border-green-200">
                            <i className="fas fa-users text-green-600"></i>
                          </div>
                        )}
                      </td>
                      <td className="w-[180px] px-4 py-3 font-semibold text-gray-800 truncate">
                        {beneficiary.name}
                      </td>
                      <td className="w-[120px] px-4 py-3 text-gray-700 whitespace-nowrap">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                          {beneficiary.type}
                        </span>
                      </td>
                      <td className="w-[180px] px-6 py-3 text-gray-700 truncate">
                        {beneficiary.location}
                      </td>
                      <td className="w-[100px] px-4 py-3 text-gray-700 font-semibold text-center">
                        {beneficiary.projectsReceived}
                      </td>
                      <td className="w-[100px] px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            beneficiary.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {beneficiary.status}
                        </span>
                      </td>
                      <td className="w-[160px] px-4 md:px-0 py-3">
                        <div className="flex flex-wrap gap-2">
                          <Link
                            to={`/admin/beneficiaries/${beneficiary.id}`}
                            className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition text-xs font-semibold whitespace-nowrap"
                            title="View Details"
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
                  {beneficiaries.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center py-8 text-gray-400"
                      >
                        No beneficiaries found.
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

export default Beneficiaries;
