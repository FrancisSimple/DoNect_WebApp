import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditProject() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [projectData, setProjectData] = useState({
    name: "",
    category: "",
    description: "",
    status: "",
    fund: "",
    featured: false,
    image: null,
    video: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  // Fetch project data based on ID
  useEffect(() => {
    document.title = "DoNect org | Edit Project";

    // Simulate API call to get project data
    setTimeout(() => {
      // This would normally be an API fetch
      // For demo purposes, I will use mock data
      const mockProject = {
        id: id,
        name: "Clean Water Initiative",
        category: "Water",
        description:
          "Providing clean and safe drinking water to rural communities in Eastern Africa through sustainable well construction.",
        status: "Active",
        fund: "12000",
        featured: true,
        imageUrl: null,
        videoUrl: null, // No video for this project
      };

      setProjectData({
        name: mockProject.name,
        category: mockProject.category,
        description: mockProject.description,
        status: mockProject.status,
        fund: mockProject.fund,
        featured: mockProject.featured,
        // The image and video will remain null since we can't convert URLs back to files
        // These would be handled differently in a real implementation
        image: null,
        video: null,
      });

      // Set preview URLs for image and video if they exist
      if (mockProject.imageUrl) {
        setPreviewImage(mockProject.imageUrl);
      }

      if (mockProject.videoUrl) {
        setPreviewVideo(mockProject.videoUrl);
      }

      setIsLoading(false);
    }, 800);
  }, [id]);

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

    // Image validation - only required if no preview image exists and no new image is selected
    if (!previewImage && !projectData.image) {
      newErrors.image = "Please upload a project image";
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

    // Here you would typically send the data to your API to update the project
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessAlert(true);

      // Navigate back after success
      setTimeout(() => {
        navigate("/admin/projects");
      }, 2000);
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64" data-aos="fade-up">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
        <span className="ml-4 text-lg text-gray-600">
          Loading project data...
        </span>
      </div>
    );
  }

  return (
    <div className="py-4 sm:py-8 w-full max-w-full px-2 sm:px-4">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-700 mb-2">
            Edit Project
          </h1>
          <p className="text-gray-600">Update project details and settings</p>
        </div>
        <Link
          to="/admin/projects"
          className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Back to Projects
        </Link>
      </div>

      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md fade-in-up">
          <div className="flex items-center">
            <i className="fas fa-check-circle mr-2 text-green-500"></i>
            <p>Project updated successfully! Redirecting...</p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm overflow-hidden"
      >
        <div className="p-3 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {/* Project Name */}
            <div className="col-span-1">
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Project Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={projectData.name}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 rounded-lg border ${
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
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={projectData.category}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 rounded-lg border ${
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
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={projectData.status}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none bg-white"
              >
                <option value="">Select Status</option>
                {projectStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm mt-1">{errors.status}</p>
              )}
            </div>

            {/* Fund Target */}
            <div>
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Fund Target (₵) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="fund"
                value={projectData.fund}
                onChange={handleChange}
                min="0"
                className={`w-full px-3 sm:px-4 py-2 rounded-lg border ${
                  errors.fund ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none`}
                placeholder="Enter target amount"
              />
              {errors.fund && (
                <p className="text-red-500 text-sm mt-1">{errors.fund}</p>
              )}
            </div>

            {/* Featured Checkbox */}
            <div className="flex items-start sm:items-center">
              <div className="flex items-center h-6">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={projectData.featured}
                  onChange={handleChange}
                  className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
                />
              </div>
              <div className="ml-2 text-sm">
                <label
                  htmlFor="featured"
                  className="text-gray-700 cursor-pointer font-medium"
                >
                  Featured Project
                </label>
                <p className="text-xs text-gray-500">
                  Featured projects appear prominently on the homepage
                </p>
              </div>
            </div>

            {/* Project Image */}
            <div className="col-span-1">
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Project Image <span className="text-red-500">*</span>
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
                      id="project-image"
                    />
                    <label
                      htmlFor="project-image"
                      className="cursor-pointer flex flex-col items-center justify-center py-2 sm:py-4"
                    >
                      <i className="fas fa-cloud-upload-alt text-2xl sm:text-3xl text-gray-400 mb-2 sm:mb-3"></i>
                      <span className="text-gray-600 text-sm sm:text-base">
                        Click to replace image
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

                {/* Image Preview */}
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
                        setProjectData((prev) => ({ ...prev, image: null }));
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-all"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                    <span className="block text-xs text-gray-500 mt-1 text-center">
                      Current project image
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Project Video */}
            <div className="col-span-1">
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Project Video{" "}
                <span className="text-gray-500 text-sm font-normal">
                  (optional)
                </span>
              </label>
              <div className="flex flex-col space-y-3">
                <div className="w-full">
                  <div className="border-2 border-dashed rounded-lg p-3 sm:p-4 text-center border-gray-300 hover:border-green-300 cursor-pointer hover:bg-gray-50 transition-all">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      className="hidden"
                      id="project-video"
                    />
                    <label
                      htmlFor="project-video"
                      className="cursor-pointer flex flex-col items-center justify-center py-2 sm:py-4"
                    >
                      <i className="fas fa-film text-2xl sm:text-3xl text-gray-400 mb-2 sm:mb-3"></i>
                      <span className="text-gray-600 text-sm sm:text-base">
                        Click to replace video
                      </span>
                      <span className="text-gray-400 text-xs sm:text-sm mt-1">
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
                  <div className="w-full sm:w-64 relative">
                    <video
                      src={previewVideo}
                      controls
                      className="w-full sm:w-64 max-h-36 rounded-lg border-2 border-green-500"
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
                      {projectData.video?.name || "Current project video"}
                    </span>
                  </div>
                )}
              </div>
              <p className="text-gray-500 text-xs sm:text-sm mt-2">
                <i className="fas fa-info-circle mr-1"></i>
                Adding a video can significantly increase engagement with your
                project.
              </p>
            </div>

            {/* Project Description */}
            <div className="col-span-1">
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium">
                Project Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={projectData.description}
                onChange={handleChange}
                rows="6"
                className={`w-full px-3 sm:px-4 py-2 rounded-lg border ${
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
        <div className="bg-gray-50 px-3 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-3 border-t">
          <Link
            to="/admin/projects"
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
                <span>Update Project</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProject;
