import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-400 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            Oops! The page you're looking for doesn't exist. It might still be
            under operation.
          </p>
          <span className="text-red-600">Try again Later</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-green-600 rounded-full hover:bg-green-700 transition duration-300 shadow-md hover:shadow-lg"
          >
            <i className="fas fa-home mr-2"></i>
            Back to Home
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 text-lg font-semibold text-green-700 bg-white rounded-full hover:bg-green-50 transition duration-300 shadow-md hover:shadow-lg border-2 border-green-600"
          >
            <i className="fas fa-envelope mr-2"></i>
            Contact Support
          </Link>
        </div>

        <div className="mt-12">
          <p className="text-gray-600">
            Need immediate assistance? Try our chatbot below.
          </p>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
