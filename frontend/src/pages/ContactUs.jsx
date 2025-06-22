import { useState, useEffect } from "react";
import GetIntouch from "../assets/other-images/get-intouch.jpg";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission

    // Reset form data
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

    useEffect(() => {
    document.title = "DoNect org | Contact Us";
  }, []);


  return (
    <main className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center" data-aos="fade-up">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${GetIntouch})` }}
        />

        {/* Translucent Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-800/70" />

        <div className="relative max-w-7xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 transform transition-all duration-700 ease-in-out">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto" data-aos="fade-up">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Contact Information - Modified Layout */}
            <div className="lg:col-span-4">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow" data-aos="fade-up">
                  <div className="text-green-600 mb-4">
                    <i className="fas fa-map-marker-alt text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
                  <p className="text-gray-600">
                    1 University Avenue, Berekuso, Ghana
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow" data-aos="fade-up">
                  <div className="text-green-600 mb-4">
                    <i className="fas fa-phone text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                  <p className="text-gray-600">+233 (0) 257 266 272</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow" data-aos="fade-up">
                  <div className="text-green-600 mb-4">
                    <i className="fas fa-envelope text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                  <p className="text-gray-600">info@donect.org</p>
                </div>

                {/* Chatbot Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center md:col-span-3 lg:col-span-1" data-aos="fade-up">
                  <div className="text-green-600 mb-4">
                    <i className="fas fa-robot text-4xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    Need Quick Help?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Get instant answers to your questions with our AI chatbot
                    available 24/7.
                  </p>
                  
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-8" data-aos="fade-up">
              <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-sm"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-2">Message</label>
                    <textarea
                      required
                      rows="6"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    ></textarea>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full md:w-auto px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300 flex items-center justify-center cursor-pointer"
                  >
                    <i className="fas fa-paper-plane mr-2"></i>
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ContactUs;
