import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TransactionCharts from "../components/TransactionCharts"; // Update import to use new component

// Function to get Font Awesome icon class based on transaction type
const getReceiptIcon = (transactionType) => {
  switch (transactionType) {
    case "donation":
      return "fas fa-hand-holding-heart";
    case "expense":
      return "fas fa-file-invoice-dollar";
    case "refund":
      return "fas fa-undo-alt";
    default:
      return "fas fa-receipt";
  }
};

function Transactions() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStat, setSelectedStat] = useState("totalRaised");
  const [viewMode, setViewMode] = useState("table");

  // Add pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Show 6 cards per page in grid view

  // Filter states
  const [filters, setFilters] = useState({
    dateRange: "all",
    status: "all",
    type: "all",
    amount: "all",
  });

  // Sample transaction data
  const [transactions, setTransactions] = useState([
    {
      id: "TRX12345",
      date: "2023-10-15",
      donor: "John Doe",
      project: "Clean Water Initiative",
      amount: 1000,
      currency: "GHS",
      type: "donation",
      status: "completed",
    },
    {
      id: "TRX12346",
      date: "2023-10-10",
      donor: "Jane Aseidu",
      project: "Education for All",
      amount: 5000,
      currency: "GHS",
      type: "donation",
      status: "completed",
    },
    {
      id: "TRX12347",
      date: "2023-10-05",
      donor: "Alex Brown",
      project: "Community Healthcare",
      amount: 2500,
      currency: "GHS",
      type: "donation",
      status: "completed",
    },
    {
      id: "TRX12348",
      date: "2023-09-28",
      donor: "Lisa Johnson",
      project: "Solar Power for Schools",
      amount: 7500,
      currency: "GHS",
      type: "donation",
      status: "completed",
    },
    {
      id: "TRX12349",
      date: "2023-09-22",
      donor: "Robert Williams",
      project: "Clean Water Initiative",
      amount: 1200,
      currency: "GHS",
      type: "donation",
      status: "completed",
    },
    {
      id: "TRX12350",
      date: "2023-09-15",
      donor: "Emma Davis",
      project: "Food Security Program",
      amount: 3000,
      currency: "GHS",
      type: "donation",
      status: "completed",
    },
    {
      id: "EXP10001",
      date: "2023-10-12",
      donor: null,
      project: "Clean Water Initiative",
      amount: 800,
      currency: "GHS",
      type: "expense",
      status: "completed",
    },
    {
      id: "EXP10002",
      date: "2023-10-08",
      donor: null,
      project: "Education for All",
      amount: 1200,
      currency: "GHS",
      type: "expense",
      status: "completed",
    },
    {
      id: "REF10001",
      date: "2023-10-01",
      donor: "John Doe",
      project: "Solar Power for Schools",
      amount: 500,
      currency: "GHS",
      type: "refund",
      status: "completed",
    },
  ]);

 
  const refreshTransactions = () => {
    setIsLoading(true);

    // Later, I would fetch fresh data from an API here
    // For now, I'll just simulate a refresh by setting the same data after a delay
    setTimeout(() => {
      setTransactions([...transactions]); // Create a new array reference to trigger re-render
      setIsLoading(false);
    }, 800);
  };

  // Calculate financial statistics
  const stats = {
    totalRaised: {
      value: transactions
        .filter((t) => t.type === "donation")
        .reduce((sum, t) => sum + t.amount, 0),
      label: "Total Funds Raised",
      icon: "fas fa-money-bill-wave",
      bg: "bg-green-100",
      border: "border-green-500",
      iconColor: "text-green-600",
      chartType: "totalRaised",
    },
    totalExpenses: {
      value: transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0),
      label: "Total Expenses",
      icon: "fas fa-file-invoice",
      bg: "bg-red-100",
      border: "border-red-500",
      iconColor: "text-red-600",
      chartType: "expenses",
    },
    netBalance: {
      value:
        transactions
          .filter((t) => t.type === "donation")
          .reduce((sum, t) => sum + t.amount, 0) -
        transactions
          .filter((t) => t.type === "expense")
          .reduce((sum, t) => sum + t.amount, 0),
      label: "Net Balance",
      icon: "fas fa-balance-scale",
      bg: "bg-blue-100",
      border: "border-blue-500",
      iconColor: "text-blue-600",
      chartType: "netBalance",
    },
  };

  useEffect(() => {
    document.title = "DoNect org | Transactions";

    // Simulate loading data from an API
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Here we would typically fetch and set transactions
        // For now, we already have the data in the initial state
      } catch (error) {
        console.error("Error loading transaction data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter transactions based on search term and filters
  const filteredTransactions = transactions.filter((transaction) => {
    // Search term filtering
    const searchMatch =
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (transaction.donor &&
        transaction.donor.toLowerCase().includes(searchTerm.toLowerCase())) ||
      transaction.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.amount.toString().includes(searchTerm);

    // Filter by date range
    let dateMatch = true;
    const txDate = new Date(transaction.date);
    const today = new Date();

    if (filters.dateRange === "week") {
      const weekAgo = new Date();
      weekAgo.setDate(today.getDate() - 7);
      dateMatch = txDate >= weekAgo;
    } else if (filters.dateRange === "month") {
      const monthAgo = new Date();
      monthAgo.setMonth(today.getMonth() - 1);
      dateMatch = txDate >= monthAgo;
    } else if (filters.dateRange === "quarter") {
      const quarterAgo = new Date();
      quarterAgo.setMonth(today.getMonth() - 3);
      dateMatch = txDate >= quarterAgo;
    }

    // Filter by status
    const statusMatch =
      filters.status === "all" || transaction.status === filters.status;

    // Filter by type
    const typeMatch =
      filters.type === "all" || transaction.type === filters.type;

    // Filter by amount
    let amountMatch = true;
    if (filters.amount === "under1000") {
      amountMatch = transaction.amount < 1000;
    } else if (filters.amount === "1000to5000") {
      amountMatch = transaction.amount >= 1000 && transaction.amount <= 5000;
    } else if (filters.amount === "over5000") {
      amountMatch = transaction.amount > 5000;
    }

    return searchMatch && dateMatch && statusMatch && typeMatch && amountMatch;
  });

  // Pagination logic - only applied for card view
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  // Change page handler
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const resetFilters = () => {
    setFilters({
      dateRange: "all",
      status: "all",
      type: "all",
      amount: "all",
    });
    setSearchTerm("");
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleStatCardClick = (statKey) => {
    setIsLoading(true); // Show loading when changing stats
    setSelectedStat(statKey);

    // Simulate chart data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="py-8 w-full max-w-full overflow-hidden" data-aos="fade-up">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
        Financial Transactions
      </h1>
      <p className="text-gray-600 mb-8 text-lg flex justify-between items-center">
        <span>
          Monitor and manage all financial activities across the platform.
        </span>
        <button
          onClick={refreshTransactions}
          className="text-sm bg-green-50 text-green-600 px-3 py-1 rounded-lg hover:bg-green-100 transition-colors flex items-center gap-1"
        >
          <i className="fas fa-sync-alt"></i>
          <span>Refresh</span>
        </button>
      </p>

      {/* Stats Cards - using exact same styling as AdminProjects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {Object.keys(stats).map((key) => (
          <div
            key={key}
            className={`rounded-xl shadow p-6 flex flex-col items-center border-t-4 ${stats[key].bg} ${stats[key].border} relative cursor-pointer`}
            onClick={() => handleStatCardClick(key)}
          >
            <i
              className={`${stats[key].icon} text-3xl ${stats[key].iconColor} mb-3`}
            ></i>
            <div className="text-2xl font-bold text-gray-800">
              {key === "totalRaised" ||
              key === "totalExpenses" ||
              key === "netBalance"
                ? `GH₵ ${stats[key].value.toLocaleString()}`
                : stats[key].value}
            </div>
            <div className="text-gray-600 text-center mb-4">
              {stats[key].label}
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section - Updated to use TransactionCharts */}
      <div className="bg-white rounded-2xl shadow p-6 mb-10" data-aos="fade-up">
        <h2 className="text-xl font-bold text-green-700 mb-4">
          {stats[selectedStat].label} Overview
        </h2>
        <div className="h-80">
          <TransactionCharts chartType={stats[selectedStat].chartType} />
        </div>
      </div>

      {/* Filter and Search section - update to include view toggle */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4 md:mx-4 mx-1">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-72 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
          />
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
          >
            <option value="all">All Types</option>
            <option value="donation">Donations</option>
            <option value="expense">Expenses</option>
            <option value="refund">Refunds</option>
          </select>
        </div>

        <div className="flex items-center gap-3 justify-between">
          {/* View toggle buttons */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-2 flex items-center gap-1 text-sm font-medium transition-colors ${
                viewMode === "table"
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              title="Table View"
            >
              <i className="fas fa-table"></i>
              <span className="hidden sm:inline">Table</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-2 flex items-center gap-1 text-sm font-medium transition-colors ${
                viewMode === "grid"
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              title="Card View"
            >
              <i className="fas fa-th-large"></i>
              <span className="hidden sm:inline">Cards</span>
            </button>
          </div>

          <button
            className="inline-flex justify-center items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
            onClick={() =>
              document
                .getElementById("filterDropdown")
                .classList.toggle("hidden")
            }
          >
            <i className="fas fa-filter mr-2"></i>
            <span className="hidden sm:inline">Advanced Filter</span>
            <span className="sm:hidden">Filter</span>
          </button>

          {/* Add Transaction Link Button */}
          <Link
            to="/admin/transactions/add-transaction"
            className="inline-flex justify-center items-center px-4 py-1 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-all"
          >
            <i className="fas fa-plus mr-2"></i>
            <span className="inline">Add</span>
          </Link>
        </div>
      </div>

      {/* Filter dropdown - keep existing functionality */}
      <div
        id="filterDropdown"
        className="hidden bg-white border border-gray-200 rounded-lg shadow-lg p-4 mb-4 md:mx-4 mx-1"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Range
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              value={filters.dateRange}
              onChange={(e) =>
                setFilters({ ...filters, dateRange: e.target.value })
              }
            >
              <option value="all">All Time</option>
              <option value="week">Last 7 days</option>
              <option value="month">Last 30 days</option>
              <option value="quarter">Last 90 days</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="all">All Types</option>
              <option value="donation">Donations</option>
              <option value="expense">Expenses</option>
              <option value="refund">Refunds</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              value={filters.amount}
              onChange={(e) =>
                setFilters({ ...filters, amount: e.target.value })
              }
            >
              <option value="all">All Amounts</option>
              <option value="under1000">Under GH₵1,000</option>
              <option value="1000to5000">GH₵1,000 - GH₵5,000</option>
              <option value="over5000">Over GH₵5,000</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-4 pt-3 border-t border-gray-100">
          <button
            onClick={resetFilters}
            className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-1 px-3 rounded-lg mr-2"
          >
            Reset Filters
          </button>
          <button
            onClick={() =>
              document.getElementById("filterDropdown").classList.add("hidden")
            }
            className="text-sm bg-green-600 hover:bg-green-700 text-white font-medium py-1 px-3 rounded-lg"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Results info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-gray-600 text-sm">
        <p>
          Showing{" "}
          <span className="font-medium">
            {viewMode === "table"
              ? filteredTransactions.length
              : `${indexOfFirstItem + 1}-${Math.min(
                  indexOfLastItem,
                  filteredTransactions.length
                )} of ${filteredTransactions.length}`}
          </span>{" "}
          {viewMode === "table" ? "of " : ""}
          {viewMode === "table" && (
            <span className="font-medium">{transactions.length}</span>
          )}{" "}
          transactions
        </p>
        {Object.values(filters).some((value) => value !== "all") && (
          <button
            onClick={resetFilters}
            className="flex items-center mt-2 md:mt-0 text-green-600 hover:text-green-800"
          >
            <i className="fas fa-times-circle mr-1"></i>
            Clear all filters
          </button>
        )}
      </div>

      {/* Transactions display - table or card view */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : filteredTransactions.length === 0 ? (
        <div className="flex flex-col justify-center items-center py-16">
          <div className="text-gray-400 mb-2">
            <i className="fas fa-search text-5xl"></i>
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-1">
            No transactions found
          </h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      ) : viewMode === "table" ? (
        <div className="bg-white rounded-2xl shadow p-2 w-full max-w-full">
          <div className="w-full max-w-full overflow-hidden">
            <div className="border border-green-200 rounded-lg overflow-hidden">
              {/* Table header - fixed */}
              <div className="w-full bg-green-100 sticky top-0 z-10 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full divide-y divide-green-100 table-fixed">
                    <thead>
                      <tr>
                        <th className="w-[120px] px-4 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                          Transaction ID
                        </th>
                        <th className="w-[100px] px-4 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="w-[100px] px-4 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="w-[150px] px-4 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                          From/To
                        </th>
                        <th className="w-[180px] px-4 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                          Project
                        </th>
                        <th className="w-[110px] px-4 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="w-[100px] px-4 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="w-[80px] px-4 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                          Receipt
                        </th>
                        <th className="w-[120px] px-4 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                          Actions
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
                    {filteredTransactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="hover:bg-green-50 transition"
                      >
                        <td className="w-[120px] px-4 py-3 font-semibold text-gray-800">
                          {transaction.id}
                        </td>
                        <td className="w-[100px] px-4 py-3 text-gray-700">
                          {new Date(transaction.date).toLocaleDateString()}
                        </td>
                        <td className="w-[100px] px-4 py-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              transaction.type === "donation"
                                ? "bg-green-100 text-green-700"
                                : transaction.type === "expense"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {transaction.type.charAt(0).toUpperCase() +
                              transaction.type.slice(1)}
                          </span>
                        </td>
                        <td className="w-[150px] px-4 py-3 text-gray-700 truncate">
                          {transaction.donor || "Organization Expense"}
                        </td>
                        <td className="w-[180px] px-4 py-3 text-gray-700 truncate">
                          {transaction.project}
                        </td>
                        <td className="w-[110px] px-4 py-3 whitespace-nowrap font-semibold">
                          <span
                            className={
                              transaction.type === "donation"
                                ? "text-green-600"
                                : transaction.type === "expense"
                                ? "text-red-600"
                                : "text-yellow-600"
                            }
                          >
                            {transaction.type === "donation"
                              ? "+"
                              : transaction.type === "expense"
                              ? "-"
                              : "±"}
                            {transaction.currency}{" "}
                            {transaction.amount.toLocaleString()}
                          </span>
                        </td>
                        <td className="w-[100px] px-4 py-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              transaction.status === "completed"
                                ? "bg-green-100 text-green-700"
                                : transaction.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {transaction.status.charAt(0).toUpperCase() +
                              transaction.status.slice(1)}
                          </span>
                        </td>
                        <td className="w-[80px] px-4 py-3">
                          <div className="w-14 h-14 rounded-lg flex items-center justify-center border-2 border-green-100 bg-gray-50 hover:bg-green-50 cursor-pointer transition-all">
                            <i
                              className={`${getReceiptIcon(
                                transaction.type
                              )} text-2xl ${
                                transaction.type === "donation"
                                  ? "text-green-600"
                                  : transaction.type === "expense"
                                  ? "text-red-500"
                                  : "text-yellow-600"
                              }`}
                              onClick={() =>
                                alert(
                                  `View receipt for transaction ${transaction.id}`
                                )
                              }
                              title="Click to view receipt"
                            ></i>
                          </div>
                        </td>
                        <td className="w-[160px] px-4 py-3 md:px-0">
                          <div className="flex flex-wrap gap-2">
                            <Link
                              to={`/admin/transactions/${transaction.id}`}
                              className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition text-xs font-semibold"
                            >
                              <i className="fas fa-eye mr-1"></i>
                              View
                            </Link>
                            <button className="inline-flex items-center px-3 py-1.5 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition text-xs font-semibold">
                              <i className="fas fa-edit mr-1"></i>
                              Edit
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredTransactions.length === 0 && (
                      <tr>
                        <td
                          colSpan={9}
                          className="text-center py-8 text-gray-400"
                        >
                          No transactions found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Card view - updated with better styling to match the table
        <div className="bg-white rounded-2xl shadow p-4 w-full max-w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentItems.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-white border border-gray-200 hover:border-green-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
              >
                <div className="border-b border-gray-100 bg-gray-50 px-4 py-2 flex justify-between items-center">
                  <span className="font-semibold text-gray-700">
                    {transaction.id}
                  </span>
                  <span
                    className={`px-2.5 py-1 text-xs font-medium rounded-full 
                    ${
                      transaction.type === "donation"
                        ? "bg-green-100 text-green-700"
                        : transaction.type === "expense"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {transaction.type.charAt(0).toUpperCase() +
                      transaction.type.slice(1)}
                  </span>
                </div>

                <div className="p-4">
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Date</p>
                      <p className="text-sm text-gray-800">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Status
                      </p>
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                          transaction.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : transaction.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {transaction.status.charAt(0).toUpperCase() +
                          transaction.status.slice(1)}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Project
                      </p>
                      <p
                        className="text-sm text-gray-800 truncate"
                        title={transaction.project}
                      >
                        {transaction.project}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        {transaction.type === "expense"
                          ? "Expense Type"
                          : "Donor"}
                      </p>
                      <p className="text-sm text-gray-800 truncate">
                        {transaction.donor || "Organization"}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Amount
                      </p>
                      <p
                        className={`text-lg font-bold
                        ${
                          transaction.type === "donation"
                            ? "text-green-600"
                            : transaction.type === "expense"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {transaction.type === "donation"
                          ? "+"
                          : transaction.type === "expense"
                          ? "-"
                          : "±"}
                        {transaction.currency}{" "}
                        {transaction.amount.toLocaleString()}
                      </p>
                    </div>

                    <div
                      className="h-14 w-14 rounded-lg flex items-center justify-center border-2 border-gray-100 hover:border-green-100 cursor-pointer hover:bg-gray-50 transition-all"
                      onClick={() =>
                        alert(`View receipt for transaction ${transaction.id}`)
                      }
                      title="Click to view receipt"
                    >
                      <i
                        className={`${getReceiptIcon(
                          transaction.type
                        )} text-2xl ${
                          transaction.type === "donation"
                            ? "text-green-600"
                            : transaction.type === "expense"
                            ? "text-red-500"
                            : "text-yellow-600"
                        }`}
                      ></i>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="text-xs text-gray-500">
                      <i className="fas fa-calendar-alt mr-1"></i>
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>

                    <div className="flex gap-2">
                      <Link
                        to={`/admin/transactions/${transaction.id}`}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition text-xs font-semibold"
                      >
                        <i className="fas fa-eye mr-1"></i>
                        View
                      </Link>
                      <button className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition text-xs font-semibold">
                        <i className="fas fa-edit mr-1"></i>
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pagination - updated to be functional and only shown in grid mode */}
      {viewMode === "grid" && filteredTransactions.length > itemsPerPage && (
        <div className="flex justify-end mt-4 md:mx-4 mx-1">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm">
            <button
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-500 hover:bg-gray-50 cursor-pointer"
              }`}
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <i className="fas fa-chevron-left"></i>
            </button>

            {[...Array(Math.min(5, totalPages)).keys()].map((_, idx) => {
              // Show 5 page numbers at most, centered around current page
              let pageNumber;
              if (totalPages <= 5) {
                // If 5 or fewer pages, show all pages
                pageNumber = idx + 1;
              } else if (currentPage <= 3) {
                // If near start, show first 5 pages
                pageNumber = idx + 1;
              } else if (currentPage >= totalPages - 2) {
                // If near end, show last 5 pages
                pageNumber = totalPages - 4 + idx;
              } else {
                // Otherwise show current page and 2 pages before/after
                pageNumber = currentPage - 2 + idx;
              }

              return (
                <button
                  key={pageNumber}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 ${
                    currentPage === pageNumber
                      ? "bg-green-50 text-green-600 font-medium"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  } text-sm`}
                  onClick={() => paginate(pageNumber)}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                currentPage === totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-500 hover:bg-gray-50 cursor-pointer"
              }`}
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}

export default Transactions;
