import { useParams, Link, useNavigate } from "react-router-dom";
import CleanWaterImg from "../assets/other-images/clean-water.png";
import SolarImg from "../assets/other-images/solar.jpg";
import AgrigImg from "../assets/other-images/agriculture-project.jpg";
import BasicSchools from "../assets/other-images/basic-schools.jpg";
import { useEffect } from "react";
import ProjectCard from "../components/ProjectCard"; // Import the card component
import "aos/dist/aos.css";

const projects = [
  {
    id: "clean-water-initiative",
    name: "Clean Water Initiative",
    image: CleanWaterImg,
    description:
      "Providing clean and safe drinking water to rural communities in Eastern Africa through sustainable well construction.",
    overview: `Our Clean Water Initiative is dedicated to providing clean and safe drinking water to rural communities in Eastern Africa through sustainable well construction.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin nec turpis nec urna cursus faucibus. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam nisl nisi euismod nisi. Vivamus euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.

Morbi dictum, enim nec cursus dictum, enim enim dictum enim, nec dictum enim enim nec enim. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

Aliquam erat volutpat. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam nisl nisi euismod nisi. Vivamus euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.

Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin nec turpis nec urna cursus faucibus. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam nisl nisi euismod nisi. Vivamus euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.

Curabitur ac leo nunc. Vestibulum et mauris vel ante finibus maximus nec ut leo. Integer consectetur luctus nulla, nec laoreet urna dictum nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam nisl nisi euismod nisi.

Vivamus euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

Proin nec turpis nec urna cursus faucibus. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam nisl nisi euismod nisi. Vivamus euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.`,
    status: "Ongoing",
    progress: 75,
    target: 2000,
  },
  {
    id: "solar-power-for-schools",
    name: "Solar Power for Schools",
    image: SolarImg,
    description:
      "Installing solar panels in underprivileged schools to provide reliable electricity for better education.",
    overview: `Solar Power for Schools is focused on installing solar panels in underprivileged schools to provide reliable electricity for better education.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin nec turpis nec urna cursus faucibus. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam nisl nisi euismod nisi.

Vivamus euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

Aliquam erat volutpat. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam nisl nisi euismod nisi. Vivamus euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.

Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin nec turpis nec urna cursus faucibus. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam nisl nisi euismod nisi.`,
    status: "Upcoming",
    progress: 0,
    target: 3500,
  },
  {
    id: "agricultural-training-program",
    name: "Agricultural Training Program",
    image: AgrigImg,
    description:
      "Teaching sustainable farming techniques to local farmers to improve food security and income.",
    overview: `The Agricultural Training Program teaches sustainable farming techniques to local farmers to improve food security and income.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin nec turpis nec urna cursus faucibus. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam nisl nisi euismod nisi.

Vivamus euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

Aliquam erat volutpat. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam nisl nisi euismod nisi. Vivamus euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.

Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin nec turpis nec urna cursus faucibus. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam nisl nisi euismod nisi.`,
    status: "Completed",
    progress: 100,
    target: 10000,
  },
  {
    id: "empowering-education",
    name: "Empowering Education",
    image: BasicSchools,
    description:
      "Supporting basic schools with resources and infrastructure for better education.",
    overview: `Empowering Education is focused on supporting basic schools with resources and infrastructure for better education.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin nec turpis nec urna cursus faucibus. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam nisl nisi euismod nisi.

Vivamus euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

Aliquam erat volutpat. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam nisl nisi euismod nisi. Vivamus euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.

Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin nec turpis nec urna cursus faucibus. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam nisl nisi euismod nisi.`,
    status: "Upcoming",
    progress: 0,
    target: 6500,
  },
];

function ProjectOverview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const project =
    projects.find(
      (p) =>
        p.id === id ||
        p.id === id?.toLowerCase().replace(/\s+/g, "-") ||
        p.name.toLowerCase().replace(/\s+/g, "-") === id?.toLowerCase()
    ) || null;

  useEffect(() => {
    if (id && !project) {
      navigate("/not-found", { replace: true });
    }
  }, [project, navigate, id]);

    useEffect(() => {
      document.title = "DoNect org | Project Overview";
    }, []);


  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section with Project Image */}
      <section className="relative min-h-[40vh] md:min-h-[60vh] flex items-end" data-aos="fade-up">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 pb-12 z-10 w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-2">
            {project.name}
          </h1>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-white/80 hover:bg-white text-green-700 font-semibold px-4 py-2 rounded-full shadow transition-all flex items-center cursor-pointer z-20 group"
        >
          <i className="fas fa-arrow-left mr-2 animate-pulse group-hover:-translate-x-1 transition"></i>{" "}
          Back
        </button>
      </section>

      {/* Overview Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-green-50 rounded-2xl p-4 md:p-8 text-justify" data-aos="fade-up">
          <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-6">
            Project Overview
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
            {project.overview}
          </p>
        </div>
        {/* Invest Now Button Only */}
        <div className="mt-8 flex justify-end" data-aos="fade-up">
          <Link
            to={`/invest-now/${project.name}`}
            className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-full font-bold text-base md:text-lg shadow-lg hover:from-green-700 hover:to-green-600 transition-all duration-300 border-2 border-green-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400"
            style={{
              minWidth: 120,
              maxWidth: 220,
              letterSpacing: "0.03em",
            }}
          >
            <i className="fas fa-hand-holding-heart text-lg md:text-xl"></i>
            <span className="tracking-wide">Invest Now</span>
          </Link>
        </div>
      </section>

      {/* Other Projects Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-8 text-center">
          Other Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up">
          {projects
            .filter((p) => p.id !== project.id)
            .map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
        </div>
      </section>
    </main>
  );
}

export default ProjectOverview;
//export default ProjectOverview;
