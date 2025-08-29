import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full  bg-gray-900 shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto  px-6 md:px-0">
        <div className="flex justify-between h-16 items-center">
          <div className="flex  items-center text-2xl font-bold ">
            <Link to="/books" className="text-white">
              LibraryMS
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link
              className="text-gray-200 hover:text-white transition"
              to={"/books"}>
              All Books
            </Link>
            <Link
              className="text-gray-200 hover:text-white transition"
              to={"/create-book"}>
              Add Book
            </Link>
            <Link
              className="text-gray-200 hover:text-white transition"
              to={"/borrow-summary"}>
              {" "}
              Borrow Summary
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-white  focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden  bg-gray-900 shadow-md">
          <div className="space-y-2 px-4 py-4">
            <Link  className="block text-gray-200 hover:text-white transition" to={"/books"}> All Books</Link>
            <Link  className="block text-gray-200 hover:text-white transition"  to={"/create-book"}> Add Book</Link>
            <Link  className="block text-gray-200 hover:text-white transition"   to={"/borrow-summary"}> Borrow Summary</Link>
           
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
