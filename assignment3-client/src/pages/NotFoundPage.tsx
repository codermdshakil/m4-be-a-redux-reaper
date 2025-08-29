import { Link } from "react-router";

const NotFoundPage = () => {
  return (
   <div className="flex flex-col items-center justify-center h-screen px-4 text-center">
      <h1 className="text-9xl font-extrabold text-gray-300 animate-pulse">404</h1>
      <h2 className="text-3xl font-bold text-gray-700 mt-4">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-500 mt-2 mb-6">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/books"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;