import { Menu, X } from "lucide-react";
import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto  px-6 md:px-0">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center text-2xl font-bold ">
            <a href="/">LibraryMS</a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a
              href="#home"
              className="text-gray-700 hover:text-blue-400 transition">
              All Books
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-blue-400 transition">
              Add Book
            </a>
            <a
              href="#services"
              className="text-gray-700 hover:text-blue-400 transition">
              Borrow Summary
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-400 focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="space-y-2 px-4 py-4">
            <a
              href="#home"
              className="block text-gray-700 hover:text-blue-400 transition">
             All Books
            </a>
            <a
              href="#about"
              className="block text-gray-700 hover:text-blue-400 transition">
              Add Book
            </a>
            <a
              href="#services"
              className="block text-gray-700 hover:text-blue-400 transition">
              Borrow Summary
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
