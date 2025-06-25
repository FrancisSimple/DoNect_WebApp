import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

// Sample blog images
import BlogImg1 from "../../assets/other-images/clean-water.png";
import BlogImg2 from "../../assets/other-images/solar.jpg";
import BlogImg3 from "../../assets/other-images/agriculture-project.jpg";

// Sample stats for doughnut chart
const blogStats = [
  {
    label: "Featured Blogs",
    value: 8,
    color: "#3b82f6", // blue
  },
  {
    label: "Standard Blogs",
    value: 15,
    color: "#22c55e", // green
  },
  {
    label: "Draft Blogs",
    value: 4,
    color: "#ef4444", // red
  },
];

// Stats cards data
const stats = [
  {
    icon: "fas fa-newspaper",
    label: "Total Blogs",
    value: 27,
    bg: "bg-green-100",
    border: "border-green-500",
    iconColor: "text-green-600",
  },
  {
    icon: "fas fa-star",
    label: "Featured Blogs",
    value: 8,
    bg: "bg-blue-100",
    border: "border-blue-500",
    iconColor: "text-blue-600",
  },
  {
    icon: "fas fa-file-alt",
    label: "Draft Blogs", // Changed from "Total Views"
    value: 4, // Updated value to match draft count
    bg: "bg-red-100", // Changed from yellow to red for drafts
    border: "border-red-500", // Changed from yellow to red
    iconColor: "text-red-600", // Changed from yellow to red
  },
];

// Sample blogs data
const allBlogs = [
  {
    id: 1,
    title: "Clean Water Initiative Progress",
    image: BlogImg1,
    category: "Project Updates",
    status: "Published",
    author: "John Doe",
    date: "2023-10-15",
    views: 1250,
    featured: true,
  },
  {
    id: 2,
    title: "Solar Power Solutions for Communities",
    image: BlogImg2,
    category: "Sustainability",
    status: "Published",
    author: "Jane Smith",
    date: "2023-10-10",
    views: 980,
    featured: true,
  },
  {
    id: 3,
    title: "Agricultural Training Success Stories",
    image: BlogImg3,
    category: "Success Stories",
    status: "Published",
    author: "Robert Johnson",
    date: "2023-10-05",
    views: 1540,
    featured: false,
  },
  {
    id: 4,
    title: "Empowering Rural Communities",
    image: BlogImg2,
    category: "Community",
    status: "Draft",
    author: "Emma Davis",
    date: "2023-09-30",
    views: 0,
    featured: false,
  },
  {
    id: 5,
    title: "Fundraising Goals Achieved",
    image: BlogImg1,
    category: "Fundraising",
    status: "Published",
    author: "Michael Brown",
    date: "2023-09-25",
    views: 2230,
    featured: true,
  },
  {
    id: 6,
    title: "Volunteer Spotlight: Meet Our Team",
    image: BlogImg3,
    category: "Volunteers",
    status: "Published",
    author: "Sarah Wilson",
    date: "2023-09-20",
    views: 1120,
    featured: false,
  },
  {
    id: 7,
    title: "Annual Impact Report 2023",
    image: BlogImg1,
    category: "Reports",
    status: "Draft",
    author: "John Doe",
    date: "2023-09-15",
    views: 0,
    featured: false,
  },
  {
    id: 8,
    title: "Partner Spotlight: Corporate Donors",
    image: BlogImg2,
    category: "Partners",
    status: "Published",
    author: "Lisa Johnson",
    date: "2023-09-10",
    views: 890,
    featured: true,
  },
  {
    id: 9,
    title: "Future Projects and Initiatives",
    image: BlogImg3,
    category: "Planning",
    status: "Draft",
    author: "Robert Johnson",
    date: "2023-09-05",
    views: 0,
    featured: false,
  },
];

function Reports() {
  useEffect(() => {
    document.title = "DoNect org | Blog Reports";
  }, []);

  // Chart reference - store the actual Chart instance, not just the DOM element
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // Search/filter state
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Get unique categories
  const categories = ["All", ...new Set(allBlogs.map((blog) => blog.category))];

  // Filtered blogs
  const blogs = allBlogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.author.toLowerCase().includes(search.toLowerCase()) ||
      blog.category.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "All"
        ? true
        : filter === "Featured"
        ? blog.featured
        : blog.status === filter;
    const matchesCategory =
      categoryFilter === "All" ? true : blog.category === categoryFilter;
    return matchesSearch && matchesFilter && matchesCategory;
  });

  // Initialize and render doughnut chart
  useEffect(() => {
    // Chart.js must be loaded globally (via CDN in index.html)
    const ChartGlobal =
      typeof window !== "undefined" ? window.Chart : undefined;
    if (!ChartGlobal) return;

    const chartId = "blogStatsChart";
    const chartEl = document.getElementById(chartId);
    if (!chartEl) return;

    // Get the 2D context for the canvas
    const ctx = chartEl.getContext("2d");

    // Destroy previous chart instance if exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }

    // Create a new chart instance
    chartInstanceRef.current = new ChartGlobal(ctx, {
      type: "doughnut",
      data: {
        labels: blogStats.map((s) => s.label),
        datasets: [
          {
            data: blogStats.map((s) => s.value),
            backgroundColor: blogStats.map((s) => s.color),
            borderColor: "white",
            borderWidth: 2,
            hoverOffset: 15,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              padding: 20,
              usePointStyle: true,
              pointStyle: "circle",
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.label || "";
                const value = context.raw || 0;
                const total = context.dataset.data.reduce(
                  (acc, data) => acc + data,
                  0
                );
                const percentage = Math.round((value / total) * 100);
                return `${label}: ${value} (${percentage}%)`;
              },
            },
          },
        },
        cutout: "65%",
        animation: {
          animateScale: true,
          animateRotate: true,
        },
      },
    });

    // Cleanup chart on component unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="py-8 w-full max-w-full overflow-hidden" data-aos="fade-up">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
        Blog Reports
      </h1>
      <p className="text-gray-600 mb-8 text-lg">
        Manage blog posts, analytics, and publishing schedule.
      </p>

      {/* Stats Cards - using exact same styling as AdminProjects */}
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

      {/* Doughnut Chart for Blog Stats */}
      <div className="bg-white rounded-2xl shadow p-6 mb-10" data-aos="fade-up">
        <h2 className="text-xl font-bold text-green-700 mb-4">
          Blog Distribution
        </h2>
        <div className="w-full h-80 flex items-center justify-center">
          <div className="w-full max-w-md">
            <canvas
              id="blogStatsChart"
              ref={chartRef}
              className="mx-auto"
              style={{ maxHeight: "300px" }}
            />
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4 md:mx-4 mx-1">
        <div className="flex-1 flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Search blogs..."
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
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
            <option value="Featured">Featured</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <Link
          to="/admin/reports/add-new-blog"
          className="inline-flex justify-center items-center px-4 py-2 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-all"
        >
          <i className="fas fa-plus mr-2"></i>
          Add New Blog
        </Link>
      </div>

      {/* Blogs Table - FIXED WIDTH APPROACH like Projects table */}
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
                        Image
                      </th>
                      <th className="w-[200px] px-4 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="w-[120px] px-4 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="w-[120px] px-4 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                        Author
                      </th>
                      <th className="w-[100px] px-4 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="w-[80px] px-4 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                        Views
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
                  {blogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-green-50 transition">
                      <td className="w-[80px] px-4 py-3">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-14 h-14 rounded-lg object-cover border-2 border-green-100"
                        />
                      </td>
                      <td className="w-[200px] px-4 py-3 font-semibold text-gray-800 truncate">
                        {blog.title}
                      </td>
                      <td className="w-[120px] px-4 py-3 text-gray-700 truncate">
                        {blog.category}
                      </td>
                      <td className="w-[120px] px-4 py-3 text-gray-700 truncate">
                        {blog.author}
                      </td>
                      <td className="w-[100px] px-4 py-3 text-gray-700 whitespace-nowrap">
                        {new Date(blog.date).toLocaleDateString()}
                      </td>
                      <td className="w-[80px] px-4 py-3 text-gray-700 font-semibold whitespace-nowrap">
                        {blog.status === "Published"
                          ? blog.views.toLocaleString()
                          : "-"}
                      </td>
                      <td className="w-[100px] px-4 py-3 whitespace-nowrap">
                        {blog.featured ? (
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
                            blog.status === "Published"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {blog.status}
                        </span>
                      </td>
                      <td className="w-[160px] md:px-0 px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          <button
                            className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition text-xs font-semibold"
                            title="Edit"
                          >
                            <i className="fas fa-edit mr-1"></i>
                            Edit
                          </button>
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
                  {blogs.length === 0 && (
                    <tr>
                      <td
                        colSpan={9}
                        className="text-center py-8 text-gray-400"
                      >
                        No blogs found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="hidden justify-end mt-4 md:mx-4 mx-1">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm">
          <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-green-50 text-sm font-medium text-green-600">
            1
          </button>
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            2
          </button>
          <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <i className="fas fa-chevron-right"></i>
          </button>
        </nav>
      </div>
    </div>
  );
}

export default Reports;
