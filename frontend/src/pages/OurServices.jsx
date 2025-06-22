import OurServicesImg from "../assets/other-images/our-services.jpg";
import "aos/dist/aos.css";
import { useEffect } from "react";

const services = [
  {
    title: "Clean Water Projects",
    icon: "fas fa-tint",
    description:
      "Providing access to clean and safe drinking water through well construction and water purification initiatives.",
  },
  {
    title: "Renewable Energy Solutions",
    icon: "fas fa-solar-panel",
    description:
      "Installing solar panels and promoting sustainable energy for schools and communities.",
  },
  {
    title: "Agricultural Training",
    icon: "fas fa-seedling",
    description:
      "Empowering farmers with modern, sustainable farming techniques to improve food security and income.",
  },
  {
    title: "Educational Support",
    icon: "fas fa-school",
    description:
      "Supporting basic schools with resources, infrastructure, and scholarships for better education.",
  },
  {
    title: "Community Development",
    icon: "fas fa-users",
    description:
      "Facilitating community-driven projects that foster growth, unity, and self-reliance.",
  },
  {
    title: "Health & Sanitation",
    icon: "fas fa-hand-holding-medical",
    description:
      "Promoting hygiene, sanitation, and access to basic healthcare in underserved areas.",
  },
  {
    title: "Women & Youth Empowerment",
    icon: "fas fa-female",
    description:
      "Providing training, mentorship, and opportunities for women and youth to thrive.",
  },
  {
    title: "Environmental Sustainability",
    icon: "fas fa-leaf",
    description:
      "Implementing eco-friendly practices and raising awareness about environmental conservation.",
  },
  {
    title: "Disaster Relief",
    icon: "fas fa-hands-helping",
    description:
      "Offering immediate assistance and long-term recovery support in disaster-affected regions.",
  },
];

function OurServices() {
  useEffect(() => {
    document.title = "DoNect org | Our Services";
  }, []);

  return (
    <main className="bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative min-h-[50vh] flex items-center"
        data-aos="fade-up"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${OurServicesImg})` }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-800/80" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
            Discover the range of impactful services we provide to empower
            communities and foster sustainable development across Africa.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What We Offer
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our services are designed to address the most pressing needs of
              our communities, ensuring lasting impact and sustainable growth.
            </p>
          </div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            data-aos="fade-up"
          >
            {services.map((service, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-8 flex flex-col items-center text-center border border-green-100"
                data-aos="fade-up"
              >
                <div className="mb-4 text-green-600">
                  <i className={`${service.icon} text-4xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default OurServices;
