import { Link } from "react-router-dom";
import JoshuaImg from "../assets/team-members/joshua.jpg";
import HeroImage from "../assets/other-images/hero-image.jpg";
import "aos/dist/aos.css";
import { useEffect } from "react";

function AboutUs() {
  const team = [
    {
      name: "Francis Sewor",
      role: "Executive Director",
      image: null,
      bio: "20+ years in community development",
    },
    {
      name: "Chika Amanna",
      role: "Executive Assistant",
      image: null,
      bio: "Expert in sustainable agriculture",
    },
    {
      name: "Samuel. K. A. Antwi",
      role: "Operations Manager",
      image: null,
      bio: "Specialist in project management",
    },
    {
      name: "Courage Surname",
      role: "Operations Manager",
      image: null,
      bio: "Specialist in project management",
    },
    {
      name: "Gilbert. E. Kukah",
      role: "Operations Manager",
      image: null,
      bio: "Specialist in project management",
    },
    {
      name: "Joshua Adjei",
      role: "Operations Manager",
      image: JoshuaImg,
      bio: "Specialist in project management",
    },
  ];

  useEffect(() => {
    document.title = "DoNect org | About Us";
  }, []);

  return (
    <main className="bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative min-h-[60vh] flex items-center"
        data-aos="fade-up"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HeroImage})` }}
        />

        {/* Translucent Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-800/80" />

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 transform transition-all duration-700 ease-in-out hover:scale-105">
            About Our Organization
          </h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
            Building sustainable futures across Africa through innovation and
            community empowerment.
          </p>
        </div>
      </section>

      {/* Mission & Impact */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div
              className="bg-white p-8 rounded-2xl shadow-sm"
              data-aos="fade-up"
            >
              <h2 className="text-3xl font-bold text-gray-700 mb-6">
                Our Journey
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Founded in 2025, our NGO has been at the forefront of
                sustainable development in Africa. We believe in empowering
                local communities through education, technology, and sustainable
                practices.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-600">
                  <i className="fas fa-check-circle text-green-500 mr-3"></i>
                  Empowered over 1,000 individuals
                </li>
                <li className="flex items-center text-gray-600">
                  <i className="fas fa-check-circle text-green-500 mr-3"></i>
                  Completed 20+ community projects
                </li>
                <li className="flex items-center text-gray-600">
                  <i className="fas fa-check-circle text-green-500 mr-3"></i>
                  Active in 2 African countries
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-6" data-aos="fade-up">
              {/* Stats Cards */}
              <div className="bg-green-50 p-6 rounded-xl text-center border border-green-300">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  92%
                </div>
                <p className="text-gray-600">Project Success Rate</p>
              </div>
              <div className="bg-green-50 p-6 rounded-xl text-center border border-green-300">
                <div className="text-4xl font-bold text-green-600 mb-2">5</div>
                <p className="text-gray-600">Local Partners</p>
              </div>
              <div className="bg-green-50 p-6 rounded-xl text-center border border-green-300">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  1K+
                </div>
                <p className="text-gray-600">Lives Impacted</p>
              </div>
              <div className="bg-green-50 p-6 rounded-xl text-center border border-green-300">
                <div className="text-4xl font-bold text-green-600 mb-2">3</div>
                <p className="text-gray-600">Awards Won</p>
              </div>
            </div>
          </div>

          {/* Vision, Pitch, Problem, Opportunity - Responsive Styled Container */}
          <div className="mt-12 md:mt-16 flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0 items-stretch justify-center">
            {/* Vision Section */}
            <div
              className="flex-1 bg-green-50 rounded-2xl p-8 shadow-sm border border-green-100 flex flex-col"
              data-aos="zoom-in"
            >
              <h2 className="text-2xl font-bold text-green-800 mb-4">
                Our Vision
              </h2>
              <p className="text-gray-700 text-justify flex-1">
                Af world where generosity flows directly from heart to need,
                accountability deepens trust, and every act of giving sparks a
                new story of hope and progress.
              </p>
              <h2 className="text-2xl font-bold text-green-800 my-4">
                Our Mission
              </h2>
              <p className="text-gray-700 text-justify flex-1">
                Empower every under‑resourced school and community to tell its
                story, find the help it needs, and showcase the difference made;
                so no child’s education or local initiative goes unnoticed.
              </p>
              <h2 className="text-lg font-bold text-green-800 mt-4">Summary</h2>
              <p className="text-gray-700 text-justify flex-1 mt-1 font-semibold">
                We see a future where under-resourced schools and communities
                not only survive but thrive; empowered by their ability to tell
                their stories, track their progress, and connect with those who
                can help. Together, we’ll create a more equitable and
                compassionate world where every child’s education and every
                local initiative finds the support it needs.
              </p>
            </div>

            {/* Pitch Section */}
            <div
              className="flex-1 bg-white rounded-2xl p-8 shadow-sm border border-green-100 flex flex-col"
              data-aos="zoom-in"
            >
              <h2 className="text-2xl font-bold text-green-800 mb-4">
                Our Pitch
              </h2>
              <p className="text-gray-700 text-justify flex-1">
                Imagine a world where every school, every community, no matter
                how remote or under-resourced, has a voice that’s heard and a
                need that’s seen. Our platform empowers these communities to
                share their stories, document their challenges, and highlight
                the incredible impact of every act of giving. We connect these
                communities with passionate donors who want to make a difference
                but don’t know where to start.
                <br />
                <br />
                Through real-time updates, visual progress tracking, and direct
                communication between donors and recipients, we eliminate the
                guesswork and create a transparent, accountable system where
                support is targeted, and progress is measurable. No more
                forgotten communities or undelivered promises; just clear,
                tangible change.
                <br />
                <br />
                By turning every donation into a visible, lasting impact, we
                transform the way we think about giving. Our platform is where
                generosity meets opportunity, where stories become actions, and
                where every child’s education and every local initiative gets
                the attention it deserves.
                <br />
                <br />
                Together, we are creating a movement of hope and progress, one
                story at a time.
              </p>
            </div>
          </div>

          <div
            className="mt-8 flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0 items-stretch justify-center"
            data-aos="zoom-in"
          >
            {/* Problem Statement Section */}
            <div className="flex-1 bg-green-50 rounded-2xl p-8 shadow-sm border border-green-100 flex flex-col">
              <h2 className="text-2xl font-bold text-green-800 mb-4">
                Problem Statement
              </h2>
              <p className="text-gray-700 text-justify flex-1">
                Many needy institutions are marginalized in the communities and
                struggle to get the support they need due to the lack of proper
                documentation, visibility, and publicity, and as a matter of
                fact, NGOs and donors often do not notice them, which leaves
                their critical needs unprovided. As a result, some needs remain
                unmet and receive little attention from donors. Without proper
                tracking and reporting, it becomes difficult to measure the
                impact of funding and understand whether it is truly addressing
                community-based needs. Improving this will help ensure that
                resources are fairly distributed and that the most urgent
                challenges in our communities are effectively addressed.
              </p>
            </div>

            {/* Opportunity Section */}
            <div
              className="flex-1 bg-white rounded-2xl p-8 shadow-sm border border-green-100 flex flex-col"
              data-aos="zoom-in"
            >
              <h2 className="text-2xl font-bold text-green-800 mb-4">
                Opportunity
              </h2>
              <p className="text-gray-700 text-justify flex-1">
                There is a strong opportunity to create a centralized system or
                platform that tracks and reports the progress of community-based
                projects. Such a solution would increase transparency, give
                visibility to unmet needs, and help donors make more informed
                decisions. By clearly showing where help is still needed and
                what has already been done, foundations and donor groups can
                better coordinate efforts, avoid duplication, and maximize
                impact. This can lead to more balanced development across
                communities and stronger trust between donors and the
                communities they support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-gray-700 mb-12 text-center">
            Our Leadership Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8" data-aos="fade-up">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ease-in-out hover:-translate-y-2"
              >
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-green-100 object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-green-100 bg-green-50 flex items-center justify-center">
                    <i className="fas fa-user text-5xl text-green-300"></i>
                  </div>
                )}
                <h3 className="text-xl font-semibold text-gray-600 text-center">
                  {member.name}
                </h3>
                <p className="text-green-600 text-center mb-3">{member.role}</p>
                <p className="text-gray-600 text-center">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto text-center " data-aos="fade-down">
          <h2 className="text-3xl font-bold text-gray-700 mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Be part of our journey to create lasting change in communities
            across Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/volunteer"
              className="inline-flex items-center px-8 py-3 text-lg font-semibold text-white bg-green-600 rounded-full hover:bg-green-700 transition duration-300 justify-center shadow-md hover:shadow-lg"
            >
              <i className="fas fa-hands-helping mr-2"></i>
              Volunteer With Us
            </Link>
            <Link
              to="/donate"
              className="inline-flex items-center px-8 py-3 text-lg font-semibold text-green-700 bg-white rounded-full hover:bg-green-50 transition duration-300 border-2 border-green-600 justify-center shadow-md hover:shadow-lg"
            >
              <i className="fas fa-heart mr-2"></i>
              Support Our Cause
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutUs;
