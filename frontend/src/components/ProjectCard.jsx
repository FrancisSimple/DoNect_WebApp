import { Link } from "react-router-dom";

function ProjectCard({ project }) {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "ongoing":
        return "bg-yellow-500";
      case "completed":
        return "bg-green-500";
      case "upcoming":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-48 object-cover"
        />
        <span
          className={`absolute top-3 right-3 ${getStatusColor(
            project.status
          )} text-white text-sm px-3 py-1 rounded-full font-medium`}
        >
          {project.status}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{project.name}</h3>
        <p className="text-gray-600 mb-4">
          {project.description}
          <Link
            to={`/projects/${project.name}`}
            className="ml-4 text-blue-500 text-sm hover:text-blue-600 transition-all group"
          >
            <span>read more</span>
            <i className="fas fa-arrow-right ml-1 animate-pulse transform group-hover:translate-x-1 transition-all"></i>
          </Link>
        </p>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 rounded-full h-2 transition-all duration-300"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        <div
          className={`justify-between items-center ${
            project.progress === 100 ? "hidden" : "flex"
          }`}
        >
          <div className="text-green-700">
            <span className="text-sm">Target:</span>
            <span className="font-bold ml-1">
              ${project.target.toLocaleString()}
            </span>
          </div>
          <Link
            to={`/invest-now/${project.name}`}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-full hover:bg-green-700 transition duration-300 shadow-md hover:shadow-lg"
          >
            <i className="fas fa-hand-holding-heart mr-2"></i>
            Invest Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
