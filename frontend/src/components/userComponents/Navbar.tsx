import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/reduxStore/store";
import { clearToken } from "@/api/localStorage";
import { authLogout } from "@/api/auth";
import { logout } from "@/reduxStore/slices/user-slice";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const userLogout = async() => {
   try {
   await authLogout()
    clearToken();
    dispatch(logout());
   } catch (error) {
    
   }
  };

  return (
    <nav className="bg-black text-white h-16 p-4 fixed w-full top-0 z-50 border-b border-yellow-500">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-1">
        <Link to="/" className=" items-center  ">
          <img src="/titan-fit.png" alt="Logo" className="h-10" />
        </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/about" className="hover:text-[#FFC436] transition">
            About
          </Link>

          {!user ? (
            <Link to="/login">
              <Button className="bg-[#FFC436] text-black hover:bg-black hover:text-[#FFC436]">
                Get Started
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/user/profile" className="hover:text-[#FFC436] transition">
                My Profile
              </Link>
              <Button
                onClick={userLogout}
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
      <div
        className={`md:hidden absolute left-0 w-full bg-black transition-all duration-300 ${
          isOpen ? "block opacity-100 top-16" : "hidden opacity-0"
        }`}
      >
       
        {
          !user?(
            <Link to="/about" className="block py-2 px-6 hover:bg-[#FFC436]">
          About
        </Link>
          ):(
            <Link to="/user/profile" className="block py-2 px-6 hover:bg-[#FFC436]">
            My profile
          </Link>
          )
        }
       

        {/* Show "Get Started" or "Logout" based on user state */}
        <div className="p-4">
          {!user ? (
            <Link to="/login">
              <Button className="bg-[#FFC436] text-black w-full hover:bg-black hover:text-[#FFC436]">
                Get Started
              </Button>
            </Link>
          ) : (
            
            <Button
              onClick={() => {
                userLogout();
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
