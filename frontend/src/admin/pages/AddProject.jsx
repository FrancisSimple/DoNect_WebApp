import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddProject() {
  const navigate = useNavigate();

  const [projectData, setProjectData] = useState({
    name: "",
    category: "",
    description: "",
    status: "Upcoming", // Default status
    fund: "",
    featured: false,
    image: null,
    video: null, // Add video field
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null); // Add video preview state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const projectCategories = [
    "Water",
    "Energy",
    "Agriculture",
    "Education",
    "Health",
    "Environment",
    "Technology",
    "Infrastructure",
  ];

  const projectStatuses = ["Upcoming", "Active", "Completed"];

  useEffect(() => {
    document.title = "DoNect org | Add New Project";
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProjectData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProjectData((prev) => ({ ...prev, image: file }));

      // Create preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add video change handler
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is a video
      if (!file.type.startsWith("video/")) {
        setErrors((prev) => ({
          ...prev,
          video: "Please select a valid video file",
        }));
        return;
      }

      // Check file size (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          video: "Video size should be less than 50MB",
        }));
        return;
      }

      setProjectData((prev) => ({ ...prev, video: file }));

      // Create preview URL for the selected video
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewVideo(reader.result);
      };
      reader.readAsDataURL(file);

      // Clear any previous errors
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.video;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!projectData.name.trim()) newErrors.name = "Project name is required";
    if (!projectData.category) newErrors.category = "Please select a category";
    if (!projectData.description.trim())
      newErrors.description = "Project description is required";
    if (!projectData.status) newErrors.status = "Please select a status";

    // Fund validation (must be a number and greater than 0)
    if (!projectData.fund) {
      newErrors.fund = "Target fund amount is required";
    } else if (
      isNaN(Number(projectData.fund)) ||
      Number(projectData.fund) <= 0
    ) {
      newErrors.fund = "Fund must be a positive number";
    }

    // Image validation
    if (!projectData.image) newErrors.image = "Please upload a project image";

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
        navigate("/admin/projects");
      }, 2000);
    }, 1500);
  };

  return (
    <div className="py-8 w-full max-w-full" data-aos="fade-up">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-700 mb-2">
            Add New Project
          </h1>
          <p className="text-gray-600">
            Create a new project to showcase on the platform
          </p>
        </div>
        <Link
          to="/admin/projects"
          className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all text-sm"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Back
        </Link>
      </div>

      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md">
          <div className="flex items-center">
            <i className="fas fa-check-circle mr-2 text-green-500"></i>
            <p>Project added successfully! Redirecting...</p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm overflow-hidden"
      >
        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Project Name */}
            <div className="col-span-1">
              <label className="block text-gray-700 mb-2 font-medium">
                Project Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={projectData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none`}
                placeholder="Enter project name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Project Category */}
            <div className="col-span-1">
              <label className="block text-gray-700 mb-2 font-medium">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={projectData.category}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.category ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none bg-white`}
              >
                <option value="">Select Category</option>
                {projectCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            {/* Project Status */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={projectData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none bg-white"
              >
                {projectStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Fund Target */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Fund Target (₵) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="fund"
                value={projectData.fund}
                onChange={handleChange}
                min="0"
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.fund ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none`}
                placeholder="Enter target amount"
              />
              {errors.fund && (
                <p className="text-red-500 text-sm mt-1">{errors.fund}</p>
              )}
            </div>

            {/* Featured Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={projectData.featured}
                onChange={handleChange}
                className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
              />
              <label
                htmlFor="featured"
                className="ml-2 text-gray-700 cursor-pointer"
              >
                Featured Project
              </label>
            </div>

            {/* Project Image */}
            <div className="col-span-1">
              <label className="block text-gray-700 mb-2 font-medium">
                Project Image <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div
                    className={`border-2 border-dashed rounded-lg p-4 text-center ${
                      errors.image ? "border-red-500" : "border-gray-300"
                    } cursor-pointer hover:bg-gray-50 transition-all`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="project-image"
                    />
                    <label
                      htmlFor="project-image"
                      className="cursor-pointer flex flex-col items-center justify-center py-4"
                    >
                      <i className="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-3"></i>
                      <span className="text-gray-600">
                        Click to upload image
                      </span>
                      <span className="text-gray-400 text-sm mt-1">
                        PNG, JPG, GIF up to 5MB
                      </span>
                    </label>
                  </div>
                  {errors.image && (
                    <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                  )}
                </div>

                {/* Image Preview */}
                {previewImage && (
                  <div className="w-32 h-32 relative">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border-2 border-green-500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewImage(null);
                        setProjectData((prev) => ({ ...prev, image: null }));
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-all"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Project Video - New Section */}
            <div className="col-span-1">
              <label className="block text-gray-700 mb-2 font-medium">
                Project Video{" "}
                <span className="text-gray-500 text-sm font-normal">
                  (optional)
                </span>
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="border-2 border-dashed rounded-lg p-4 text-center border-gray-300 hover:border-green-300 cursor-pointer hover:bg-gray-50 transition-all">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      className="hidden"
                      id="project-video"
                    />
                    <label
                      htmlFor="project-video"
                      className="cursor-pointer flex flex-col items-center justify-center py-4"
                    >
                      <i className="fas fa-film text-3xl text-gray-400 mb-3"></i>
                      <span className="text-gray-600">
                        Click to upload video
                      </span>
                      <span className="text-gray-400 text-sm mt-1">
                        MP4 and WebM up to 50MB
                      </span>
                    </label>
                  </div>
                  {errors.video && (
                    <p className="text-red-500 text-sm mt-1">{errors.video}</p>
                  )}
                </div>

                {/* Video Preview */}
                {previewVideo && (
                  <div className="w-40 relative">
                    <video
                      src={previewVideo}
                      controls
                      className="w-full rounded-lg border-2 border-green-500 max-h-36"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewVideo(null);
                        setProjectData((prev) => ({ ...prev, video: null }));
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-all"
                      title="Remove video"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                    <span className="block text-xs text-gray-500 mt-1 text-center">
                      {projectData.video?.name.length > 20
                        ? projectData.video?.name.substring(0, 20) + "..."
                        : projectData.video?.name}
                    </span>
                  </div>
                )}
              </div>
              <p className="text-gray-500 text-sm mt-2">
                <i className="fas fa-info-circle mr-1"></i>
                Adding a video can significantly increase engagement with your
                project.
              </p>
            </div>

            {/* Project Description */}
            <div className="col-span-1">
              <label className="block text-gray-700 mb-2 font-medium">
                Project Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={projectData.description}
                onChange={handleChange}
                rows="6"
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none`}
                placeholder="Provide a detailed description of the project"
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="bg-gray-50 px-4 md:px-6 py-4 flex flex-col md:flex-row md:justify-end gap-3 border-t">
          <Link
            to="/admin/projects"
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
                <span>Adding...</span>
              </>
            ) : (
              <>
                <i className="fas fa-plus-circle"></i>
                <span>Add Project</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProject;
