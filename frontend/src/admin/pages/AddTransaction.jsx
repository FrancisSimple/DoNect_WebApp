import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddTransaction() {
  const navigate = useNavigate();

  const [transactionData, setTransactionData] = useState({
    transactionId: generateTransactionId(),
    amount: "",
    type: "donation", // Default type
    status: "completed", // Default status
    date: getCurrentDate(),
    category: "",
    project: "",
    donor: "",
    beneficiary: "",
    description: "",
    paymentMethod: "",
    referenceNumber: "",
    receipt: null, // Add receipt field for image upload
  });

  // Add state for receipt preview
  const [receiptPreview, setReceiptPreview] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Sample data for dropdown selections
  const transactionTypes = ["donation", "expense", "grant", "transfer"];
  const transactionStatus = ["pending", "completed", "failed", "refunded"];
  const paymentMethods = [
    "bank transfer",
    "credit card",
    "mobile money",
    "cash",
    "check",
  ];
  const categories = [
    "project funding",
    "administrative",
    "operational",
    "emergency relief",
  ];

  // Sample projects, donors and beneficiaries (in a real app, these would come from API)
  const projects = [
    { id: 1, name: "Clean Water Initiative" },
    { id: 2, name: "Solar Power for Schools" },
    { id: 3, name: "Agricultural Training Program" },
    { id: 4, name: "Empowering Education" },
  ];

  const donors = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "TechCorp Inc." },
    { id: 4, name: "Green Future Foundation" },
  ];

  const beneficiaries = [
    { id: 1, name: "Akuapem Basic School" },
    { id: 2, name: "Tema Community Farm Cooperative" },
    { id: 3, name: "Kumasi Youth Development Center" },
    { id: 4, name: "Hope Children's Home" },
  ];

  useEffect(() => {
    document.title = "DoNect org | Add New Transaction";
  }, []);

  // Generate a unique transaction ID
  function generateTransactionId() {
    return `TX-${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}-${new Date().getFullYear()}`;
  }

  // Get current date in YYYY-MM-DD format
  function getCurrentDate() {
    const today = new Date();
    return today.toISOString().split("T")[0];
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransactionData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!transactionData.amount) {
      newErrors.amount = "Amount is required";
    } else if (
      isNaN(Number(transactionData.amount)) ||
      Number(transactionData.amount) <= 0
    ) {
      newErrors.amount = "Amount must be a positive number";
    }

    if (!transactionData.category) newErrors.category = "Category is required";
    if (!transactionData.date) newErrors.date = "Date is required";

    if (transactionData.type === "donation" && !transactionData.donor) {
      newErrors.donor = "Donor is required for donation transactions";
    }

    if (transactionData.type === "expense" && !transactionData.beneficiary) {
      newErrors.beneficiary =
        "Beneficiary is required for expense transactions";
    }

    if (!transactionData.paymentMethod) {
      newErrors.paymentMethod = "Payment method is required";
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

    // Here you would typically send the data to your API
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessAlert(true);

      // Reset form after success
      setTimeout(() => {
        navigate("/admin/transactions");
      }, 2000);
    }, 1500);
  };

  // Dynamically show/hide fields based on transaction type
  const showDonorField =
    transactionData.type === "donation" || transactionData.type === "grant";
  const showBeneficiaryField =
    transactionData.type === "expense" || transactionData.type === "transfer";

  // Add handler for receipt image upload
  const handleReceiptChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          receipt: "Please select a valid image file",
        }));
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          receipt: "Image size should be less than 5MB",
        }));
        return;
      }

      setTransactionData((prev) => ({ ...prev, receipt: file }));

      // Create preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptPreview(reader.result);
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

  return (
    <div className="py-8 w-full max-w-full" data-aos="fade-up">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-700 mb-2">
            Add New Transaction
          </h1>
          <p className="text-gray-600">
            Record a new financial transaction in the system
          </p>
        </div>
        <Link
          to="/admin/transactions"
          className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all text-sm"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Back
        </Link>
      </div>

      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md fade-in-up">
          <div className="flex items-center">
            <i className="fas fa-check-circle mr-2 text-green-500"></i>
            <p>Transaction added successfully! Redirecting...</p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm overflow-hidden admin-form-container"
      >
        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Transaction ID */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Transaction ID
              </label>
              <input
                type="text"
                name="transactionId"
                value={transactionData.transactionId}
                readOnly
                className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Auto-generated unique ID
              </p>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Amount (₵) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="amount"
                value={transactionData.amount}
                onChange={handleChange}
                min="0"
                step="0.01"
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.amount ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none`}
                placeholder="Enter amount"
              />
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
              )}
            </div>

            {/* Transaction Type */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Transaction Type <span className="text-red-500">*</span>
              </label>
              <select
                name="type"
                value={transactionData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none bg-white"
              >
                {transactionTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={transactionData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none bg-white"
              >
                {transactionStatus.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Transaction Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={transactionData.date}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.date ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none`}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={transactionData.category}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.category ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none bg-white`}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            {/* Project (Optional) */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Related Project
              </label>
              <select
                name="project"
                value={transactionData.project}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none bg-white"
              >
                <option value="">Select a project (optional)</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Payment Method <span className="text-red-500">*</span>
              </label>
              <select
                name="paymentMethod"
                value={transactionData.paymentMethod}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.paymentMethod ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none bg-white`}
              >
                <option value="">Select payment method</option>
                {paymentMethods.map((method) => (
                  <option key={method} value={method}>
                    {method
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </option>
                ))}
              </select>
              {errors.paymentMethod && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.paymentMethod}
                </p>
              )}
            </div>

            {/* Reference Number */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Reference Number
              </label>
              <input
                type="text"
                name="referenceNumber"
                value={transactionData.referenceNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="Enter reference number"
              />
            </div>

            {/* Donor (Conditional) */}
            {showDonorField && (
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Donor{" "}
                  {transactionData.type === "donation" && (
                    <span className="text-red-500">*</span>
                  )}
                </label>
                <select
                  name="donor"
                  value={transactionData.donor}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.donor ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none bg-white`}
                >
                  <option value="">Select a donor</option>
                  {donors.map((donor) => (
                    <option key={donor.id} value={donor.id}>
                      {donor.name}
                    </option>
                  ))}
                </select>
                {errors.donor && (
                  <p className="text-red-500 text-sm mt-1">{errors.donor}</p>
                )}
              </div>
            )}

            {/* Beneficiary (Conditional) */}
            {showBeneficiaryField && (
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Beneficiary{" "}
                  {transactionData.type === "expense" && (
                    <span className="text-red-500">*</span>
                  )}
                </label>
                <select
                  name="beneficiary"
                  value={transactionData.beneficiary}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.beneficiary ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none bg-white`}
                >
                  <option value="">Select a beneficiary</option>
                  {beneficiaries.map((beneficiary) => (
                    <option key={beneficiary.id} value={beneficiary.id}>
                      {beneficiary.name}
                    </option>
                  ))}
                </select>
                {errors.beneficiary && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.beneficiary}
                  </p>
                )}
              </div>
            )}

            {/* Receipt Image Upload - Add this new field */}
            <div className="col-span-1">
              <label className="block text-gray-700 mb-2 font-medium">
                Receipt Image 
                <span className="text-red-500"> *</span>
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="border-2 border-dashed rounded-lg p-4 text-center border-gray-300 hover:border-green-300 cursor-pointer hover:bg-gray-50 transition-all">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleReceiptChange}
                      className="hidden"
                      id="receipt-image"
                    />
                    <label
                      htmlFor="receipt-image"
                      className="cursor-pointer flex flex-col items-center justify-center py-4"
                    >
                      <i className="fas fa-receipt text-3xl text-gray-400 mb-3"></i>
                      <span className="text-gray-600">
                        Click to upload receipt
                      </span>
                      <span className="text-gray-400 text-sm mt-1">
                        JPG, PNG, PDF up to 5MB
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
                {receiptPreview && (
                  <div className="w-32 relative">
                    <img
                      src={receiptPreview}
                      alt="Receipt Preview"
                      className="w-full rounded-lg border-2 border-green-500 max-h-32 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setReceiptPreview(null);
                        setTransactionData((prev) => ({
                          ...prev,
                          receipt: null,
                        }));
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-all"
                      title="Remove receipt"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                    <span className="block text-xs text-gray-500 mt-1 text-center">
                      {transactionData.receipt?.name.length > 20
                        ? transactionData.receipt?.name.substring(0, 20) + "..."
                        : transactionData.receipt?.name}
                    </span>
                  </div>
                )}
              </div>
              <p className="text-gray-500 text-sm mt-2">
                <i className="fas fa-info-circle mr-1"></i>
                Upload an image of the receipt or payment confirmation if
                available.
              </p>
            </div>

            {/* Description */}
            <div className="col-span-1">
              <label className="block text-gray-700 mb-2 font-medium">
                Description
              </label>
              <textarea
                name="description"
                value={transactionData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="Enter transaction details"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="bg-gray-50 px-4 md:px-6 py-4 flex flex-col md:flex-row md:justify-end gap-3 border-t">
          <Link
            to="/admin/transactions"
            className="w-full md:w-auto px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-center"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <i className="fas fa-plus-circle"></i>
                <span>Add Transaction</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTransaction;
