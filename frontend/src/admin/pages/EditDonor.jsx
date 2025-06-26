import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditDonor() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [donorData, setDonorData] = useState({
    name: "",
    email: "",
    type: "",
    status: "",
    totalDonated: "", // Changed from country to totalDonated
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const donorTypes = ["Individual", "Organization"];
  const donorStatuses = ["Active", "Pending", "Inactive"];

  // Fetch donor data based on ID
  useEffect(() => {
    document.title = "DoNect org | Edit Donor";

    // Simulate API call to get donor data
    setTimeout(() => {
      // This would normally be an API fetch
      // For demo purposes, let's use mock data
      const mockDonor = {
        id: id,
        name: "John Doe",
        email: "john.doe@example.com",
        type: "Individual",
        totalDonated: 5000,
        status: "Active",
        country: "Ghana",
        lastDonation: "2023-10-15",
        imageUrl: null, // No image for this donor
      };

      setDonorData({
        name: mockDonor.name,
        email: mockDonor.email,
        type: mockDonor.type,
        totalDonated: mockDonor.totalDonated,
        status: mockDonor.status,
      });

      // Set preview URL for image if it exists
      if (mockDonor.imageUrl) {
        setPreviewImage(mockDonor.imageUrl);
      }

      setIsLoading(false);
    }, 800);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonorData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!donorData.name.trim()) newErrors.name = "Donor name is required";
    if (!donorData.email.trim()) newErrors.email = "Email is required";
    if (!donorData.type) newErrors.type = "Please select donor type";
    if (!donorData.status) newErrors.status = "Please select a status";

    // Replace country validation with totalDonated validation
    if (!donorData.totalDonated) {
      newErrors.totalDonated = "Total donated amount is required";
    } else if (
      isNaN(Number(donorData.totalDonated)) ||
      Number(donorData.totalDonated) < 0
    ) {
      newErrors.totalDonated = "Please enter a valid amount";
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (donorData.email && !emailRegex.test(donorData.email)) {
      newErrors.email = "Please enter a valid email address";
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

    // Here you would typically send the data to your API to update the donor
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessAlert(true);

      // Navigate back after success
      setTimeout(() => {
        navigate("/admin/donors");
      }, 2000);
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64" data-aos="fade-up">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
        <span className="ml-4 text-lg text-gray-600">
          Loading donor data...
        </span>
      </div>
    );
  }

  return (
    <div className="py-4 sm:py-8 w-full max-w-full px-2 sm:px-4">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-700 mb-2">
            Edit Donor
          </h1>
          <p className="text-gray-600">Update donor information and settings</p>
        </div>
        <Link
          to="/admin/donors"
          className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all text-sm"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Back to Donors
        </Link>
      </div>

      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md fade-in-up">
          <div className="flex items-center">
            <i className="fas fa-check-circle mr-2 text-green-500"></i>
            <p>Donor updated successfully! Redirecting...</p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm overflow-hidden"
      >
        <div className="p-3 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {/* Donor Name */}
            <div className="col-span-1">
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Donor Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={donorData.name}
                onChange={handleChange}
                className={`w-full px-3 bg-gray-100 sm:px-4 py-2 rounded-lg border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none`}
                placeholder="Enter donor name"
                disabled
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Donor Email */}
            <div className="col-span-1">
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={donorData.email}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 bg-gray-100 py-2 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none`}
                placeholder="Enter donor email"
                disabled
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Donor Type */}
            <div className="col-span-1">
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Donor Type <span className="text-red-500">*</span>
              </label>
              <select
                name="type"
                value={donorData.type}
                onChange={handleChange}
                className={`w-full px-3 bg-gray-100 sm:px-4 py-2 rounded-lg border ${
                  errors.type ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none`}
                disabled
              >
                <option value="">Select Type</option>
                {donorTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.type && (
                <p className="text-red-500 text-sm mt-1">{errors.type}</p>
              )}
            </div>

            {/* Donor Status */}
            <div>
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={donorData.status}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 rounded-lg border ${
                  errors.status ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none bg-white`}
              >
                <option value="">Select Status</option>
                {donorStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm mt-1">{errors.status}</p>
              )}
            </div>

            {/* Total Donated */}
            <div>
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Total Donated (₵) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="totalDonated"
                value={donorData.totalDonated}
                onChange={handleChange}
                min="0"
                className={`w-full px-3 sm:px-4 py-2 rounded-lg border ${
                  errors.totalDonated ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none`}
                placeholder="Enter total donated amount"
              />
              {errors.totalDonated && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.totalDonated}
                </p>
              )}
            </div>

            {/* Donor Photo - Display Only */}
            <div className="col-span-1">
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Donor Photo
              </label>
              <div className="mt-2 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
                {previewImage ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={previewImage}
                      alt="Donor"
                      className="w-32 h-32 object-cover rounded-full border-2 border-green-500"
                    />
                    <p className="text-sm text-gray-600 mt-2">
                      Current donor photo
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-32">
                    <i className="fas fa-user-circle text-gray-400 text-4xl mb-2"></i>
                    <p className="text-gray-500">Image will be here</p>
                    <p className="text-xs text-gray-400 mt-1">
                      (Only donors can update their own photos)
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="bg-gray-50 px-3 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-3 border-t">
          <Link
            to="/admin/donors"
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
                <span>Update Donor</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditDonor;
