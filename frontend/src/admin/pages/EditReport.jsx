import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditReport() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [reportData, setReportData] = useState({
    title: "",
    category: "",
    author: "",
    status: "",
    featured: false,
    publishDate: "",
    content: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Options for select inputs
  const categories = [
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

  const statuses = ["Published", "Draft"];

  // Format date to YYYY-MM-DD for input
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    document.title = "DoNect org | Edit Blog Post";

    // Simulate API call to get blog post data
    setTimeout(() => {
      // This would normally be an API fetch
      // For demo purposes, let's use mock data based on the reports table
      const mockBlog = {
        id: id,
        title: "Clean Water Initiative Progress",
        category: "Project Updates",
        author: "John Doe",
        status: "Published",
        date: "2023-10-15",
        featured: true,
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae urna euismod, lacinia neque ut, fermentum magna. Nullam vel feugiat elit. Pellentesque condimentum vel arcu ut tempus. Fusce quis leo non eros pellentesque dignissim. 

Cras id malesuada eros. Praesent pellentesque risus sit amet justo dignissim, at efficitur diam tristique. In pulvinar velit quis massa viverra, vitae venenatis nisl sagittis. Maecenas ac odio a mauris lobortis volutpat.

Donec accumsan ante vitae ante tincidunt mollis. Donec faucibus ante sed libero aliquet rutrum. Proin commodo dolor at pellentesque vestibulum. Integer sed tempor nunc. Mauris venenatis ligula vel tellus vulputate, vel ullamcorper massa porta.`,
        imageUrl: null, // Link to blog image
      };

      setReportData({
        title: mockBlog.title,
        category: mockBlog.category,
        author: mockBlog.author,
        status: mockBlog.status,
        featured: mockBlog.featured,
        publishDate: formatDate(mockBlog.date),
        content: mockBlog.content,
        image: null,
      });

      // Set preview URL for image if it exists
      if (mockBlog.imageUrl) {
        setPreviewImage(mockBlog.imageUrl);
      }

      setIsLoading(false);
    }, 800);
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setReportData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setReportData((prev) => ({ ...prev, [name]: value }));
    }
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

      setReportData((prev) => ({ ...prev, image: file }));

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

    if (!reportData.title.trim()) newErrors.title = "Blog title is required";
    if (!reportData.category) newErrors.category = "Category is required";
    if (!reportData.author.trim()) newErrors.author = "Author name is required";
    if (!reportData.status) newErrors.status = "Status is required";
    if (!reportData.publishDate)
      newErrors.publishDate = "Publish date is required";
    if (!reportData.content.trim()) newErrors.content = "Content is required";

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

    // Simulate API call to update blog post
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessAlert(true);

      // Navigate back after success
      setTimeout(() => {
        navigate("/admin/reports");
      }, 2000);
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
        <span className="ml-4 text-lg text-gray-600">
          Loading blog post data...
        </span>
      </div>
    );
  }

  return (
    <div className="py-4 sm:py-8 w-full max-w-full px-2 sm:px-4">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-700 mb-2">
            Edit Blog Post
          </h1>
          <p className="text-gray-600">
            Update blog post information and content
          </p>
        </div>
        <Link
          to="/admin/reports"
          className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all text-sm"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Back to Reports
        </Link>
      </div>

      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md fade-in-up">
          <div className="flex items-center">
            <i className="fas fa-check-circle mr-2 text-green-500"></i>
            <p>Blog post updated successfully! Redirecting...</p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm overflow-hidden"
      >
        <div className="p-3 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Blog Title */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Blog Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={reportData.title}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 rounded-lg border ${
                  errors.title ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none`}
                placeholder="Enter blog title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={reportData.category}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 rounded-lg border ${
                  errors.category ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none bg-white`}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            {/* Author */}
            <div>
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Author <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="author"
                value={reportData.author}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 rounded-lg border ${
                  errors.author ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none`}
                placeholder="Enter author name"
              />
              {errors.author && (
                <p className="text-red-500 text-sm mt-1">{errors.author}</p>
              )}
            </div>

            {/* Publish Date */}
            <div>
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Publish Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="publishDate"
                value={reportData.publishDate}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 rounded-lg border ${
                  errors.publishDate ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none`}
              />
              {errors.publishDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.publishDate}
                </p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={reportData.status}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 rounded-lg border ${
                  errors.status ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none bg-white`}
              >
                <option value="">Select Status</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm mt-1">{errors.status}</p>
              )}
            </div>

            {/* Featured Checkbox */}
            <div className="flex items-center h-full">
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={reportData.featured}
                  onChange={handleChange}
                  className="h-5 w-5 text-green-600 rounded border-gray-300 focus:ring-green-500"
                />
                <label
                  htmlFor="featured"
                  className="ml-2 text-gray-700 font-medium"
                >
                  Featured Post
                </label>
              </div>
            </div>

            {/* Blog Image */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Blog Image{" "}
                <span className="text-gray-500 text-sm font-normal">
                  (optional)
                </span>
              </label>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
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
                      className="cursor-pointer flex flex-col items-center justify-center py-4"
                    >
                      <i className="fas fa-image text-2xl sm:text-3xl text-gray-400 mb-2 sm:mb-3"></i>
                      <span className="text-gray-600 text-sm sm:text-base">
                        {previewImage ? "Change image" : "Upload image"}
                      </span>
                      <span className="text-gray-400 text-xs sm:text-sm mt-1">
                        PNG, JPG up to 5MB
                      </span>
                    </label>
                  </div>
                  {errors.image && (
                    <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                  )}
                </div>

                {/* Image Preview */}
                {previewImage && (
                  <div className="w-full sm:w-1/3 relative">
                    <img
                      src={previewImage}
                      alt="Blog Preview"
                      className="w-full h-40 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewImage(null);
                        setReportData((prev) => ({ ...prev, image: null }));
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
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Blog Content <span className="text-red-500">*</span>
              </label>
              <textarea
                name="content"
                value={reportData.content}
                onChange={handleChange}
                rows={10}
                className={`w-full px-3 sm:px-4 py-2 rounded-lg border ${
                  errors.content ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none font-mono`}
                placeholder="Write your blog content here..."
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">{errors.content}</p>
              )}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="bg-gray-50 px-3 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-3 border-t">
          <Link
            to="/admin/reports"
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
                <span>Update Blog Post</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditReport;
