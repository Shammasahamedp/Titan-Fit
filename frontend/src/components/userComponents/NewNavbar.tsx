import React, { useState } from 'react';
import { Menu, X, User, LogOut, Bell,MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  logout?: () => void;
  role: 'user' | 'trainer' | 'admin' | '';
}

const NewNavbar: React.FC<NavbarProps> = ({ logout, role }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    
    <nav className="bg-black/95 border-b border-white/10 fixed top-0 left-0 w-full z-50  shadow">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
    <div className="flex items-center justify-between h-16">

      {/* === Left: Logo === */}
      <div className="flex items-center">
        <Link to="/" className="items-center">
          <img src="/titan-fit.png" alt="Logo" className="h-9" />
        </Link>
      </div>

      {/* === Center: Desktop navigation (optional buttons, user) === */}
      <div className="hidden md:flex items-center space-x-4">
        {/* Add other items here if needed */}
        <button className="text-white/70 hover:text-warm-yellow p-2 rounded-full transition-colors">
          {/* <Bell className="h-5 w-5" /> */}
        </button>
           
        <div className="relative group">
          <button className="flex items-center space-x-2 text-white hover:text-warm-yellow transition-colors">
            {/* <User className="h-5 w-5" /> */}
            {/* <span className="capitalize">{role}</span> */}
          </button>
          
        </div>
      </div>

      {/* === Right: Logout button === */}
      {/* {logout && (
        <div className="hidden md:block">
          <button
            onClick={logout}
            className="flex items-center space-x-2 bg-[#FFC436] text-black px-4 font-semibold py-2 rounded hover:bg-black hover:text-[#FFC436] transition-colors"
          >
            <span>Logout</span>
          </button>
        </div>
      )} */}
      <div className="hidden md:flex items-center space-x-4">
  {/* Chat Icon - right side */}
  <Link to="/chat">
    <MessageCircle className="h-6 w-6" style={{ color: '#f1c40f' }} />
  </Link>

  {/* Logout Button */}
  {logout && (
    <button
      onClick={logout}
      className="flex items-center space-x-2 bg-[#FFC436] text-black px-4 font-semibold py-2 rounded hover:bg-black hover:text-[#FFC436] transition-colors"
    >
      <span>Logout</span>
    </button>
  )}
</div>

      {/* === Mobile menu button === */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white hover:text-warm-yellow"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
    </div>

    {/* === Mobile Navigation === */}
    {isMenuOpen && (
      <div className="md:hidden py-4">
        <div className="flex flex-col space-y-4">
          <button className="flex items-center space-x-2 text-white/70 hover:text-warm-yellow px-3 py-2">
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
          </button>
          <div className="flex items-center space-x-2 text-white px-3 py-2">
            <User className="h-5 w-5" />
            <span className="capitalize">{role}</span>
          </div>
          {logout && (
            <button
              onClick={logout}
              className="flex items-center space-x-2 text-white/70 hover:text-warm-yellow px-3 py-2"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    )}
  </div>
</nav>

  );
};

export default NewNavbar;