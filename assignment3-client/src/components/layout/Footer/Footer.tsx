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
              <a href="#home" className="hover:text-white transition">
                Home
              </a>
              <a href="#books" className="hover:text-white transition">
                Books
              </a>
              <a href="#about" className="hover:text-white transition">
                About
              </a>
              <a href="#contact" className="hover:text-white transition">
                Contact
              </a>
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
