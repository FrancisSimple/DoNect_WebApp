import HeroImage from "../assets/other-images/hero-image.jpg";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import CleanWaterImg from "../assets/other-images/clean-water.png";
import AgrigImg from "../assets/other-images/agriculture-project.jpg";
import SolarImg from "../assets/other-images/solar.jpg";
import { useState, useEffect } from "react";
import BasicSchools from "../assets/other-images/basic-schools.jpg";
import "aos/dist/aos.css";

function Homepage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: HeroImage,
      title: "Join Us in Making a Change",
      subtitle: "Across Africa",
      description:
        "Together, we can create sustainable solutions and empower communities for a brighter future in Africa.",
    },
    {
      image: CleanWaterImg,
      title: "Clean Water Initiative",
      subtitle: "Access to Clean Water",
      description:
        "Providing sustainable water solutions to communities across Africa.",
    },
    {
      image: SolarImg,
      title: "Solar Power for Schools",
      subtitle: "Renewable Energy",
      description: "Bringing reliable electricity to underprivileged schools.",
    },
    {
      image: AgrigImg,
      title: "Agricultural Training",
      subtitle: "Food Security",
      description: "Empowering farmers with sustainable farming techniques.",
    },
    {
      image: BasicSchools,
      title: "Empowering Education",
      subtitle: "Building Futures",
      description:
        "Supporting basic schools with resources and infrastructure for better education.",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const projects = [
    {
      id: crypto.randomUUID(),
      name: "Clean Water Initiative",
      description:
        "Providing clean and safe drinking water to rural communities in Eastern Africa through sustainable well construction.",
      status: "Ongoing",
      progress: 75,
      target: 2000,
      image: CleanWaterImg,
    },
    {
      id: crypto.randomUUID(),
      name: "Solar Power for Schools",
      description:
        "Installing solar panels in underprivileged schools to provide reliable electricity for better education.",
      status: "Upcoming",
      progress: 0,
      target: 3500,
      image: SolarImg,
    },
    {
      id: crypto.randomUUID(),
      name: "Agricultural Training Program",
      description:
        "Teaching sustainable farming techniques to local farmers to improve food security and income.",
      status: "Completed",
      progress: 100,
      target: 10000,
      image: AgrigImg,
    },
    {
      id: crypto.randomUUID(),
      name: "Empowering Education",
      description:
        "Supporting basic schools with resources and infrastructure for better education.",
      status: "Upcoming",
      progress: 0,
      target: 6500,
      image: BasicSchools,
    },
  ];

  // Pitch text and expand/collapse logic
  const [showFullPitch, setShowFullPitch] = useState(false);
  const pitchPreview = `Imagine a world where every school, every community, no matter how remote or under-resourced, has a voice that’s heard and a need that’s seen. Our platform empowers these communities to share their stories, document their challenges, and highlight the incredible impact of every act of giving.`;
  const pitchRest = ` We connect these communities with passionate donors who want to make a difference but don’t know where to start.
Through real-time updates, visual progress tracking, and direct communication between donors and recipients, we eliminate the guesswork and create a transparent, accountable system where support is targeted, and progress is measurable. No more forgotten communities or undelivered promises; just clear, tangible change.
By turning every donation into a visible, lasting impact, we transform the way we think about giving. Our platform is where generosity meets opportunity, where stories become actions, and where every child’s education and every local initiative gets the attention it deserves.
Together, we are creating a movement of hope and progress, one story at a time.`;

  useEffect(() => {
    document.title = "DoNect org | Homepage";
  }, []);

  return (
    <main>
      {/* Hero Section with Carousel */}
      <section className="relative min-h-screen" data-aos="fade-up">
        {/* Carousel */}
        <div className="relative h-screen overflow-hidden" data-aos="fade-up">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-[2000ms]"
                style={{ backgroundImage: `url(${slide.image})` }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-green-800/40" />

              {/* Content */}
              <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                <div className="text-center w-full">
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg transform transition-all duration-700">
                    {slide.title}
                    <span className="block text-green-300">
                      {slide.subtitle}
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                    {slide.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                      to="/donate"
                      className="inline-flex items-center px-8 py-3 text-lg font-semibold text-white bg-green-600 rounded-full hover:bg-green-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <i className="fas fa-heart mr-2"></i>
                      Donate Now
                    </Link>
                    <Link
                      to="/volunteer"
                      className="inline-flex items-center px-8 py-3 text-lg font-semibold text-green-700 bg-white rounded-full hover:bg-green-50 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <i className="fas fa-hands-helping mr-2"></i>
                      Volunteer
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-3 transition-all duration-300 cursor-pointer"
          >
            <i className="fas fa-chevron-left text-2xl"></i>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-3 transition-all duration-300 cursor-pointer"
          >
            <i className="fas fa-chevron-right text-2xl"></i>
          </button>

          {/* Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer 
                  ${
                    currentSlide === index
                      ? "bg-white scale-125"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pitch Section */}
      <div
        className="bg-green-50 py-12 px-4 border border-green-300 rounded-xl mx-2 md:mx-auto max-w-4xl shadow-sm mt-8"
        data-aos="fade-up"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
            Empowering Africa, One Community at a Time
          </h2>
          <p className="text-lg text-gray-700 mb-6 text-justify">
            {pitchPreview}
            {!showFullPitch && (
              <span className="inline">
                ...{" "}
                <button
                  className="text-blue-600 hover:text-blue-700 focus:outline-none cursor-pointer text-sm group"
                  onClick={() => setShowFullPitch(true)}
                  aria-label="Read more about our pitch"
                >
                  read more
                  <i className="fas fa-arrow-down ml-1 animate-pulse transform group-hover:translate-y-1 transition-all"></i>
                </button>
              </span>
            )}
            {showFullPitch && (
              <span className="inline">
                {pitchRest}
                <button
                  className="ml-2 text-blue-600 hover:text-blue-700 focus:outline-none cursor-pointer text-sm transition group"
                  onClick={() => setShowFullPitch(false)}
                  aria-label="Show less"
                >
                  show less
                  <i className="fas fa-arrow-up ml-1 animate-pulse transform group-hover:-translate-y-1 transition-all"></i>
                </button>
              </span>
            )}
          </p>
          <Link
            to="/about"
            className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-green-600 rounded-full hover:bg-green-700 transition duration-300 shadow-md hover:shadow-lg group"
          >
            Learn More
            <i className="fas fa-arrow-right ml-2 animate-pulse transform group-hover:translate-x-1 transition-all"></i>
          </Link>
        </div>
      </div>

      <div></div>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Projects
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join us in making a difference. Your support helps us create
              lasting change in communities across Africa.
            </p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            data-aos="fade-up"
          >
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 px-4" data-aos="fade-up">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Through the support of our donors and partners, we've made
              significant strides in creating lasting change across Africa.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <i className="fas fa-dollar-sign text-3xl text-green-600 mb-4"></i>
              <div className="text-3xl font-bold text-gray-800 mb-2">
                ₵1.5M+
              </div>
              <p className="text-sm text-gray-600">Total Investments</p>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-xl">
              <i className="fas fa-chart-line text-3xl text-green-600 mb-4"></i>
              <div className="text-3xl font-bold text-gray-800 mb-2">92%</div>
              <p className="text-sm text-gray-600">Project Success Rate</p>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-xl">
              <i className="fas fa-handshake text-3xl text-green-600 mb-4"></i>
              <div className="text-3xl font-bold text-gray-800 mb-2">5</div>
              <p className="text-sm text-gray-600">Partner Organizations</p>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-xl">
              <i className="fas fa-map-marker-alt text-3xl text-green-600 mb-4"></i>
              <div className="text-3xl font-bold text-gray-800 mb-2">2</div>
              <p className="text-sm text-gray-600">African Countries</p>
            </div>
          </div>

          <div
            className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
            data-aos="fade-up"
          >
            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                <i className="fas fa-award text-green-600 mr-2"></i>
                Recognition & Awards
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  Best NGO Impact Award 2025
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  Environmental Sustainability Excellence
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  Community Development Champion
                </li>
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                <i className="fas fa-bullseye text-green-600 mr-2"></i>
                Key Achievements
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  100+ Water Wells Constructed
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  1,000+ Lives Impacted Directly
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  20+ Local Jobs Created
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Homepage;
