import { Link } from "react-router";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Left Side - Logo & Name */}
            <div className="mb-4 md:mb-0">
              <h2 className="text-lg font-semibold text-white">
                📚 Library Management System
              </h2>
              <p className="text-sm text-gray-400">
                Empowering knowledge, one book at a time.
              </p>
            </div>

            {/* Middle - Nav Links */}
            <div className="flex space-x-6 mb-4 md:mb-0">
              

               
               <Link
                className="hover:text-white transition"
                to={"/books"}>
                {" "}
              All Books
              </Link>
               <Link
                className="hover:text-white transition"
                to={"/create-book"}>
                {" "}
               Add Book 
              </Link>
               <Link
                className="hover:text-white transition"
                to={"/borrow-summary"}>
                {" "}
                Borrow Summary
              </Link>

             
            </div>

            {/* Right Side - Copyright */}
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} Library Management System. All rights
              reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
