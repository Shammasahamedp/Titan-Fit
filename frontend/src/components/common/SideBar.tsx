import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ISidebarProps } from "@/interfaces/IsidebarProps";
import { Menu, X } from "lucide-react"; // Icons for menu and close

const SideBar: React.FC<ISidebarProps> = ({ items }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger Button (Only Visible on Small Screens) */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden bg-[#FFC436] text-black p-2 rounded"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar with Solid Background (for Mobile) */}
      {isOpen && <div className="fixed inset-0 bg-black md:hidden"></div>}

      {/* Sidebar */}
      <div
  className={`fixed top-0 left-0 pt-16 h-full  w-64 bg-black border-r border-[#FFC436] p-4 transition-transform z-50 ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  }   md:translate-x-0`}
>
        {/* Close Button for Mobile */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-[#FFC436] md:hidden"
        >
          <X size={24} />
        </button>
  <h2 className="text-3xl text-center font-bold mb-4 ">My Panel</h2>
        <nav className="space-y-4 mt-8">
        
          {items.map((item, index) => (
            <button
              onClick={() => {
                navigate(`/user/${item}`);
                setIsOpen(false); // Close sidebar after navigation
              }}
              key={index}
              className="block w-full text-center p-2 hover:bg-[#FFC436] hover:text-black transition rounded"
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default SideBar;
