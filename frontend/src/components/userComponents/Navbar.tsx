import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";


import { INavebarProps } from "@/interfaces/InavbarProps";
const Navbar:React.FC<INavebarProps> = ({logout,role}) => {
  const [isOpen, setIsOpen] = useState(false);
 console.log('this is role',role)
 const location = useLocation()
 const currentPath=location.pathname

  return (
    <nav className="bg-black text-white h-16 p-4 fixed w-full top-0 z-50 border-b border-yellow-500">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-1">
        <Link to="/" className=" items-center  ">
          <img src="/titan-fit.png" alt="Logo" className="h-9" />
        </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/home" className="hover:text-[#FFC436] transition">
            Home
          </Link>

          {!role || role ==='admin' ? (
            <Link to="/login">
              <Button className="bg-[#FFC436] text-black hover:bg-black hover:text-[#FFC436]">
                Get Started
              </Button>
            </Link>
          ) : (
            <>
             {
              role&&currentPath !== '/user/profile'&&(
                <Link to="/user/profile" className="hover:text-[#FFC436] transition">
                My Profile
              </Link>
              )
             }
              <Button
                onClick={logout}
                className="bg-[#FFC436] text-black hover:bg-black hover:text-[#FFC436]"
              >
                Logout
              </Button>
            </>
          )}
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
     {/* Mobile Menu */}
<div
  className={`md:hidden absolute left-0 w-full bg-black transition-all duration-300 ${
    isOpen ? "block opacity-100 top-16" : "hidden opacity-0"
  }`}
>
  <>
    <Link
      to="/home"
      className="block py-2 px-6 hover:bg-[#FFC436] transition"
      onClick={() => setIsOpen(false)}
    >
      Home
    </Link>

    {role && currentPath !== "/user/profile" && (
      <Link
        to="/user/profile"
        className="block py-2 px-6 hover:bg-[#FFC436] transition"
        onClick={() => setIsOpen(false)}
      >
        My Profile
      </Link>
    )}
  </>

  {/* Show "Get Started" or "Logout" based on user state */}
  <div className="p-4">
    {!role ? (
      <Link to="/login">
        <Button className="bg-[#FFC436] text-black w-full hover:bg-black hover:text-[#FFC436]">
          Get Started
        </Button>
      </Link>
    ) : (
      <Button
        onClick={() => {
          logout?.();
          setIsOpen(false);
        }}
        className="bg-[#FFC436] text-black w-full hover:bg-black hover:text-[#FFC436]"
      >
        Logout
      </Button>
    )}
  </div>
</div>

    </nav>
  );
};

export default Navbar;
