import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditBeneficiary() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [beneficiaryData, setBeneficiaryData] = useState({
    name: "",
    type: "",
    location: "",
    status: "",
    projectsReceived: 0,
    contactPerson: "",
    contactEmail: "",
  });

  const [previewImage, setPreviewImage] = useState(null); // Still need this to display existing image
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const beneficiaryTypes = [
    "School",
    "Community Group",
    "Youth Organization",
    "Orphanage",
    "Farmers Group",
    "Women's Group",
    "Health Facility",
  ];

  const beneficiaryStatuses = ["Active", "Pending"];

  // Fetch beneficiary data based on ID
  useEffect(() => {
    document.title = "DoNect org | Edit Beneficiary";

    // Simulate API call to get beneficiary data
    setTimeout(() => {
      // This would normally be an API fetch
      // For demo purposes, let's use mock data
      const mockBeneficiary = {
        id: id,
        name: "Akuapem Basic School",
        type: "School",
        location: "Eastern Region, Ghana",
        status: "Active",
        projectsReceived: 2,
        contactPerson: "Emmanuel Owusu",
        contactEmail: "e.owusu@akuapembasic.edu.gh",
        imageUrl: null, // No image for this beneficiary
      };

      setBeneficiaryData({
        name: mockBeneficiary.name,
        type: mockBeneficiary.type,
        location: mockBeneficiary.location,
        status: mockBeneficiary.status,
        projectsReceived: mockBeneficiary.projectsReceived,
        contactPerson: mockBeneficiary.contactPerson,
        contactEmail: mockBeneficiary.contactEmail,
      });

      // Set preview URL for image if it exists
      if (mockBeneficiary.imageUrl) {
        setPreviewImage(mockBeneficiary.imageUrl);
      }

      setIsLoading(false);
    }, 800);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special handling for projects received (numeric field)
    if (name === "projectsReceived") {
      setBeneficiaryData((prev) => ({
        ...prev,
        [name]: value === "" ? "" : parseInt(value, 10) || 0,
      }));
    } else {
      setBeneficiaryData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!beneficiaryData.name.trim())
      newErrors.name = "Beneficiary name is required";
    if (!beneficiaryData.type) newErrors.type = "Please select a type";
    if (!beneficiaryData.location.trim())
      newErrors.location = "Location is required";
    if (!beneficiaryData.status) newErrors.status = "Please select a status";
    if (!beneficiaryData.contactPerson.trim())
      newErrors.contactPerson = "Contact person is required";

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!beneficiaryData.contactEmail.trim()) {
      newErrors.contactEmail = "Email is required";
    } else if (!emailRegex.test(beneficiaryData.contactEmail)) {
      newErrors.contactEmail = "Please enter a valid email address";
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

    // Here you would typically send the data to your API to update the beneficiary
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessAlert(true);

      // Navigate back after success
      setTimeout(() => {
        navigate("/admin/beneficiaries");
      }, 2000);
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
        <span className="ml-4 text-lg text-gray-600">
          Loading beneficiary data...
        </span>
      </div>
    );
  }

  return (
    <div className="py-4 sm:py-8 w-full max-w-full px-2 sm:px-4">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-700 mb-2">
            Edit Beneficiary
          </h1>
          <p className="text-gray-600">
            Update beneficiary information and settings
          </p>
        </div>
        <Link
          to="/admin/beneficiaries"
          className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Back to Beneficiaries
        </Link>
      </div>

      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md fade-in-up">
          <div className="flex items-center">
            <i className="fas fa-check-circle mr-2 text-green-500"></i>
            <p>Beneficiary updated successfully! Redirecting...</p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm overflow-hidden"
      >
        <div className="p-3 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Beneficiary Name */}
            <div className="col-span-1">
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Beneficiary Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={beneficiaryData.name}
                onChange={handleChange}
                className={`w-full px-3 bg-gray-100 sm:px-4 py-2 rounded-lg border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none`}
                placeholder="Enter beneficiary name"
                disabled
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Beneficiary Type */}
            <div className="col-span-1">
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Type <span className="text-red-500">*</span>
              </label>
              <select
                name="type"
                value={beneficiaryData.type}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 bg-gray-100 py-2 rounded-lg border ${
                  errors.type ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none`}
                disabled
              >
                <option value="">Select Type</option>
                {beneficiaryTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.type && (
                <p className="text-red-500 text-sm mt-1">{errors.type}</p>
              )}
            </div>

            {/* Location */}
            <div className="col-span-1">
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={beneficiaryData.location}
                onChange={handleChange}
                className={`w-full bg-gray-100 px-3 sm:px-4 py-2 rounded-lg border ${
                  errors.location ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none`}
                placeholder="Enter location (Region, Country)"
                disabled
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location}</p>
              )}
            </div>

            {/* Projects Received */}
            <div className="col-span-1">
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Projects Received
              </label>
              <input
                type="number"
                name="projectsReceived"
                value={beneficiaryData.projectsReceived}
                onChange={handleChange}
                min="0"
                className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="Number of projects received"
              />
              <p className="text-gray-500 text-xs mt-1">
                Number of projects this beneficiary has received
              </p>
            </div>

            {/* Contact Person */}
            <div className="col-span-1">
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Contact Person <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="contactPerson"
                value={beneficiaryData.contactPerson}
                onChange={handleChange}
                className={`w-full px-3 bg-gray-100 sm:px-4 py-2 rounded-lg border ${
                  errors.contactPerson ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none`}
                placeholder="Enter contact person name"
                disabled
              />
              {errors.contactPerson && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.contactPerson}
                </p>
              )}
            </div>

            {/* Contact Email */}
            <div className="col-span-1">
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Contact Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="contactEmail"
                value={beneficiaryData.contactEmail}
                onChange={handleChange}
                className={`w-full px-3 bg-gray-100 sm:px-4 py-2 rounded-lg border ${
                  errors.contactEmail ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none`}
                placeholder="Enter contact email"
                disabled
              />
              {errors.contactEmail && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.contactEmail}
                </p>
              )}
            </div>

            {/* Beneficiary Status */}
            <div className="col-span-1">
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={beneficiaryData.status}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 rounded-lg border ${
                  errors.status ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none bg-white`}
              >
                <option value="">Select Status</option>
                {beneficiaryStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm mt-1">{errors.status}</p>
              )}
            </div>

            {/* Beneficiary Photo */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Beneficiary Photo
              </label>
              <div className="mt-2 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
                {previewImage ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={previewImage}
                      alt="Beneficiary"
                      className="w-32 h-32 object-cover rounded-lg border-2 border-green-500"
                    />
                    <p className="text-sm text-gray-600 mt-2">
                      Current beneficiary photo
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-32">
                    <i className="fas fa-image text-gray-400 text-4xl mb-2"></i>
                    <p className="text-gray-500">Image will be here</p>
                    <p className="text-xs text-gray-400 mt-1">
                      (Only beneficiaries can update their own photos)
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
            to="/admin/beneficiaries"
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
                <span>Update Beneficiary</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBeneficiary;
