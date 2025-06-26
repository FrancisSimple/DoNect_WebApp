import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddReport() {
  const navigate = useNavigate();

  const [blogData, setBlogData] = useState({
    title: "",
    category: "",
    content: "",
    //status: "Draft", // Default status
    featured: false,
    image: null,
    author: "John Doe", // Default author (would be replaced with logged-in user)
    date: getCurrentDate(),
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Sample categories
  const blogCategories = [
    "Project Updates",
    "Sustainability",
    "Success Stories",
    "Community",
    "Fundraising",
    "Volunteers",
    "Reports",
    "Partners",
    "Planning",
  ];

  //const blogStatuses = ["Draft", "Published"];

  useEffect(() => {
    document.title = "DoNect org | Add New Blog";
  }, []);

  // Get current date in YYYY-MM-DD format
  function getCurrentDate() {
    const today = new Date();
    return today.toISOString().split("T")[0];
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBlogData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          image: "Please select a valid image file",
        }));
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "Image size should be less than 5MB",
        }));
        return;
      }

      setBlogData((prev) => ({ ...prev, image: file }));

      // Create preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);

      // Clear any previous errors
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.image;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!blogData.title.trim()) newErrors.title = "Blog title is required";
    if (!blogData.category) newErrors.category = "Please select a category";
    if (!blogData.content.trim() || blogData.content.length < 50) {
      newErrors.content = "Blog content is required (minimum 50 characters)";
    }
    if (!blogData.status) newErrors.status = "Please select a status";

    // Image validation - image is required
    if (!blogData.image) newErrors.image = "Please upload a featured image";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    // Here you would typically send the data to your API
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessAlert(true);

      // Reset form after success
      setTimeout(() => {
        navigate("/admin/reports");
      }, 2000);
    }, 1500);
  };

  return (
    <div className="py-4 sm:py-8 w-full max-w-full px-2 sm:px-4" data-aos="fade-up">
      {/* Header section with better responsive spacing */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-700 mb-1 sm:mb-2">
            Add New Blog
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Create a new blog post to share updates and insights
          </p>
        </div>
        <Link
          to="/admin/reports"
          className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all self-start sm:self-auto"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Back to Blogs
        </Link>
      </div>

      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md fade-in-up">
          <div className="flex items-center">
            <i className="fas fa-check-circle mr-2 text-green-500"></i>
            <p>Blog post added successfully! Redirecting...</p>
          </div>
        </div>
      )}

      {/* Error Summary (if any) */}
      {Object.keys(errors).length > 0 && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md">
          <div className="flex items-start">
            <i className="fas fa-exclamation-circle mr-2 text-red-500 mt-0.5"></i>
            <div>
              <p className="font-semibold">Please fix the following errors:</p>
              <ul className="list-disc list-inside mt-1 ml-2">
                {Object.values(errors).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm overflow-hidden"
      >
        <div className="p-3 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {/* Blog Title - full width on mobile */}
            <div className="col-span-1">
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Blog Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={blogData.title}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 rounded-lg border ${
                  errors.title ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none`}
                placeholder="Enter an engaging title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Blog Category - full width on mobile */}
            <div className="col-span-1">
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={blogData.category}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 rounded-lg border ${
                  errors.category ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none bg-white`}
              >
                <option value="">Select Category</option>
                {blogCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            {/* Publication Date */}
            <div>
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Publication Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={blogData.date}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Author */}
            <div>
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Author <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="author"
                value={blogData.author}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-gray-50"
                readOnly
              />
              <p className="text-xs text-gray-500 mt-1">
                Auto-filled with your account
              </p>
            </div>

            {/* Status */}
            {/* <div>
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={blogData.status}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none bg-white"
              >
                {blogStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Draft: Save without publishing, Published: Make live immediately
              </p>
            </div> */}

            {/* Featured Checkbox - improved spacing and alignment for mobile */}
            <div className="flex items-start sm:items-center">
              <div className="flex items-center h-6">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={blogData.featured}
                  onChange={handleChange}
                  className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
                />
              </div>
              <div className="ml-2 text-sm">
                <label htmlFor="featured" className="text-gray-700 cursor-pointer font-medium">
                  Featured Blog Post
                </label>
                <p className="text-xs text-gray-500">
                  (Featured posts appear prominently on the blog page)
                </p>
              </div>
            </div>

            {/* Featured Image - better mobile layout */}
            <div className="col-span-1">
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Featured Image <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col space-y-3">
                <div className="w-full">
                  <div
                    className={`border-2 border-dashed rounded-lg p-3 sm:p-4 text-center ${
                      errors.image ? "border-red-500" : "border-gray-300"
                    } cursor-pointer hover:bg-gray-50 transition-all`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="blog-image"
                    />
                    <label
                      htmlFor="blog-image"
                      className="cursor-pointer flex flex-col items-center justify-center py-2 sm:py-4"
                    >
                      <i className="fas fa-cloud-upload-alt text-2xl sm:text-3xl text-gray-400 mb-2 sm:mb-3"></i>
                      <span className="text-gray-600 text-sm sm:text-base">
                        Click to upload image
                      </span>
                      <span className="text-gray-400 text-xs sm:text-sm mt-1">
                        PNG, JPG, GIF up to 5MB
                      </span>
                    </label>
                  </div>
                  {errors.image && (
                    <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                  )}
                </div>

                {/* Image Preview - Responsive sizing */}
                {previewImage && (
                  <div className="w-full sm:w-64 relative">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full sm:w-64 h-40 object-cover rounded-lg border-2 border-green-500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewImage(null);
                        setBlogData((prev) => ({ ...prev, image: null }));
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-all"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Blog Content */}
            <div className="col-span-1">
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Blog Content <span className="text-red-500">*</span>
              </label>
              <textarea
                name="content"
                value={blogData.content}
                onChange={handleChange}
                rows="8"
                className={`w-full px-3 sm:px-4 py-2 rounded-lg border ${
                  errors.content ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none`}
                placeholder="Write your blog content here..."
              ></textarea>
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">{errors.content}</p>
              )}
              <div className="mt-2 flex items-start sm:items-center text-sm text-gray-500">
                <i className="fas fa-info-circle mt-0.5 sm:mt-0 mr-2 text-green-500"></i>
                <span className="text-xs sm:text-sm">Kindly ensure all required fields are filled</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions - Stacked on mobile, side by side on larger screens */}
        <div className="bg-gray-50 px-3 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-3 border-t">
          <Link
            to="/admin/reports"
            className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-center"
          >
            Cancel
          </Link>

          <button
            type="button"
            onClick={() => {
              setBlogData((prev) => ({ ...prev, status: "Draft" }));
              handleSubmit(new Event("submit"));
            }}
            disabled={isSubmitting}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all flex items-center justify-center space-x-2"
          >
            {isSubmitting && blogData.status === "Draft" ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <i className="fas fa-save"></i>
                <span>Save as Draft</span>
              </>
            )}
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center justify-center space-x-2"
          >
            {isSubmitting && blogData.status === "Published" ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane"></i>
                <span>Publish Now</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddReport;
