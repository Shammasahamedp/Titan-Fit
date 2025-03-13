import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react"; // Icons for mobile menu

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white p-4 fixed w-full top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Side: Logo */}
        <div className="flex items-center">
          <img src="/titan-fit.png" alt="Logo" className="h-10" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/about" className="hover:text-[#FFC436] transition">
            About
          </Link>
          <Link to="/services" className="hover:text-[#FFC436] transition">
            Services
          </Link>
          <Link to="/login">
            <Button className="bg-[#FFC436] text-black  hover:bg-black hover:text-[#FFC436]">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute left-0 w-full bg-black transition-all duration-300 ${
          isOpen ? "top-16 opacity-100" : "top-[-300px] opacity-0"
        }`}
      >
        <Link to="/about" className="block py-2 px-6 hover:bg-[#FFC436]">
          About
        </Link>
        <Link to="/services" className="block py-2 px-6 hover:bg-[#FFC436]">
          Services
        </Link>
        <div className="p-4">
          <Button className="bg-[#FFC436] text-black w-full hover:bg-black hover:text-[#FFC436]">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
