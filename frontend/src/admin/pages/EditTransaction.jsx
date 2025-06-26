import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditTransaction() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [transactionData, setTransactionData] = useState({
    id: "",
    date: "",
    donor: "",
    project: "",
    amount: "",
    currency: "GHS",
    type: "",
    status: "",
    notes: "",
    receipt: null, // Added receipt field
  });

  const [previewReceipt, setPreviewReceipt] = useState(null); // State to store receipt preview
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Options for select inputs
  const transactionTypes = ["donation", "expense", "refund"];
  const transactionStatuses = ["completed", "pending", "failed"];
  const projects = [
    "Clean Water Initiative",
    "Solar Power for Schools",
    "Education for All",
    "Community Healthcare",
    "Food Security Program",
    "Agricultural Training Program",
  ];

  // Format date to YYYY-MM-DD for input
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    document.title = "DoNect org | Edit Transaction";

    // Simulate API call to get transaction data
    setTimeout(() => {
      // For demo purposes, use mock data
      const mockTransaction = {
        id: id,
        date: "2023-10-15",
        donor: "John Doe",
        project: "Clean Water Initiative",
        amount: 1000,
        currency: "GHS",
        type: "donation",
        status: "completed",
        notes: "Regular monthly donation for water project",
        receiptUrl: "https://via.placeholder.com/400x600?text=Receipt", // Mock receipt image URL
      };

      setTransactionData({
        ...mockTransaction,
        date: formatDate(mockTransaction.date),
        receipt: null, // The file object will remain null initially
      });

      // Set preview for existing receipt if available
      if (mockTransaction.receiptUrl) {
        setPreviewReceipt(mockTransaction.receiptUrl);
      }

      setIsLoading(false);
    }, 800);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount") {
      // Ensure amount is a valid number or empty string
      const numValue = value === "" ? "" : Number(value);
      if (!isNaN(numValue)) {
        setTransactionData((prev) => ({ ...prev, [name]: numValue }));
      }
    } else {
      setTransactionData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Add receipt file handling
  const handleReceiptChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is a valid image or PDF
      if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
        setErrors((prev) => ({
          ...prev,
          receipt: "Please select a valid image or PDF file",
        }));
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          receipt: "File size should be less than 5MB",
        }));
        return;
      }

      setTransactionData((prev) => ({ ...prev, receipt: file }));

      // Create preview URL for the selected file
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewReceipt(reader.result);
      };
      reader.readAsDataURL(file);

      // Clear any previous errors
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.receipt;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!transactionData.date) newErrors.date = "Date is required";
    if (!transactionData.project) newErrors.project = "Project is required";
    if (transactionData.amount === "" || isNaN(transactionData.amount)) {
      newErrors.amount = "Amount is required and must be a number";
    } else if (Number(transactionData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than zero";
    }
    if (!transactionData.type) newErrors.type = "Transaction type is required";
    if (!transactionData.status) newErrors.status = "Status is required";

    // If it's a donation, donor is required
    if (transactionData.type === "donation" && !transactionData.donor) {
      newErrors.donor = "Donor name is required for donations";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call to update transaction
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessAlert(true);

      // Navigate back after success
      setTimeout(() => {
        navigate("/admin/transactions");
      }, 2000);
    }, 1500);
  };

  // Format status for display
  const formatStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Get appropriate color class based on transaction type
  const getTypeColor = (type) => {
    switch (type) {
      case "donation":
        return "text-green-600";
      case "expense":
        return "text-red-600";
      case "refund":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  // Get appropriate icon class based on transaction type
  const getTypeIcon = (type) => {
    switch (type) {
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
        <span className="ml-4 text-lg text-gray-600">
          Loading transaction data...
        </span>
      </div>
    );
  }

  return (
    <div className="py-4 sm:py-8 w-full max-w-full px-2 sm:px-4">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-700 mb-2">
            Edit Transaction
          </h1>
          <p className="text-gray-600">Update transaction information</p>
        </div>
        <Link
          to="/admin/transactions"
          className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all text-sm"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Back to Transactions
        </Link>
      </div>

      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md fade-in-up">
          <div className="flex items-center">
            <i className="fas fa-check-circle mr-2 text-green-500"></i>
            <p>Transaction updated successfully! Redirecting...</p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm overflow-hidden"
      >
        <div className="p-3 sm:p-6">
          {/* Transaction ID Banner */}
          <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center justify-between">
            <div className="flex items-center">
              <i
                className={`${getTypeIcon(
                  transactionData.type
                )} text-2xl ${getTypeColor(transactionData.type)} mr-3`}
              ></i>
              <div>
                <span className="text-gray-500 text-sm">Transaction ID:</span>
                <h3 className="font-bold text-gray-800">
                  {transactionData.id}
                </h3>
              </div>
            </div>
            <div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  transactionData.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : transactionData.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {formatStatus(transactionData.status)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Transaction Date */}
            <div>
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={transactionData.date}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 rounded-lg border ${
                  errors.date ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none`}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date}</p>
              )}
            </div>

            {/* Transaction Type */}
            <div>
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Transaction Type <span className="text-red-500">*</span>
              </label>
              <select
                name="type"
                value={transactionData.type}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 rounded-lg border ${
                  errors.type ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none bg-white`}
              >
                <option value="">Select Type</option>
                {transactionTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
              {errors.type && (
                <p className="text-red-500 text-sm mt-1">{errors.type}</p>
              )}
            </div>

            {/* Donor/Source - Only shown for donations and refunds */}
            {(transactionData.type === "donation" ||
              transactionData.type === "refund") && (
              <div>
                <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                  Donor Name{" "}
                  {transactionData.type === "donation" && (
                    <span className="text-red-500">*</span>
                  )}
                </label>
                <input
                  type="text"
                  name="donor"
                  value={transactionData.donor}
                  onChange={handleChange}
                  className={`w-full px-3 sm:px-4 py-2 rounded-lg border ${
                    errors.donor ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none`}
                  placeholder="Enter donor name"
                />
                {errors.donor && (
                  <p className="text-red-500 text-sm mt-1">{errors.donor}</p>
                )}
              </div>
            )}

            {/* Project */}
            <div>
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Project <span className="text-red-500">*</span>
              </label>
              <select
                name="project"
                value={transactionData.project}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 rounded-lg border ${
                  errors.project ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none bg-white`}
              >
                <option value="">Select Project</option>
                {projects.map((project) => (
                  <option key={project} value={project}>
                    {project}
                  </option>
                ))}
              </select>
              {errors.project && (
                <p className="text-red-500 text-sm mt-1">{errors.project}</p>
              )}
            </div>

            {/* Amount */}
            <div>
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Amount <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">GH₵</span>
                </div>
                <input
                  type="number"
                  name="amount"
                  value={transactionData.amount}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className={`w-full pl-12 pr-4 py-2 rounded-lg border ${
                    errors.amount ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none`}
                  placeholder="0.00"
                />
              </div>
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={transactionData.status}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 rounded-lg border ${
                  errors.status ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none bg-white`}
              >
                <option value="">Select Status</option>
                {transactionStatuses.map((status) => (
                  <option key={status} value={status}>
                    {formatStatus(status)}
                  </option>
                ))}
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm mt-1">{errors.status}</p>
              )}
            </div>

            {/* Notes */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Notes
              </label>
              <textarea
                name="notes"
                value={transactionData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="Optional notes about this transaction"
              />
            </div>

            {/* Receipt Upload Section - Add this after Notes */}
            <div className="md:col-span-2 mt-4">
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Receipt
              </label>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                  <div
                    className={`border-2 border-dashed rounded-lg p-4 text-center ${
                      errors.receipt ? "border-red-500" : "border-gray-300"
                    } cursor-pointer hover:bg-gray-50 transition-all`}
                  >
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={handleReceiptChange}
                      className="hidden"
                      id="transaction-receipt"
                    />
                    <label
                      htmlFor="transaction-receipt"
                      className="cursor-pointer flex flex-col items-center justify-center py-4"
                    >
                      <i className="fas fa-receipt text-2xl text-gray-400 mb-2"></i>
                      <span className="text-gray-600">
                        {previewReceipt ? "Change receipt" : "Upload receipt"}
                      </span>
                      <span className="text-gray-400 text-xs mt-1">
                        PNG, JPG, PDF up to 5MB
                      </span>
                    </label>
                  </div>
                  {errors.receipt && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.receipt}
                    </p>
                  )}
                </div>

                {/* Receipt Preview */}
                {previewReceipt && (
                  <div className="w-full md:w-1/2 border rounded-lg p-2 relative">
                    <div className="font-medium text-sm mb-2 text-gray-700">
                      Current Receipt
                    </div>
                    {previewReceipt.includes("data:application/pdf") ? (
                      <div className="h-48 flex items-center justify-center bg-gray-100 rounded">
                        <i className="fas fa-file-pdf text-4xl text-red-500"></i>
                        <span className="ml-2 text-gray-700">PDF Receipt</span>
                      </div>
                    ) : (
                      <img
                        src={previewReceipt}
                        alt="Receipt Preview"
                        className="max-h-48 mx-auto object-contain rounded border border-gray-200"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewReceipt(null);
                        setTransactionData((prev) => ({
                          ...prev,
                          receipt: null,
                        }));
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-all"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="bg-gray-50 px-3 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-3 border-t">
          <Link
            to="/admin/transactions"
            className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-center"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                <span>Updating...</span>
              </>
            ) : (
              <>
                <i className="fas fa-save"></i>
                <span>Update Transaction</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTransaction;
