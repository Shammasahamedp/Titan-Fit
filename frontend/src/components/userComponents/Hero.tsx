import React from 'react';
import { Button } from '../ui/button';

const Hero = () => {
  return (
    <section
      className="relative w-full h-screen bg-cover bg-center flex items-center justify-center px-4 md:px-8"
    >
      {/* Background Images for Desktop & Mobile */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-300" 
        style={{ 
          backgroundImage: "url('/landing-bg-desktop.jpg')"
        }}
      ></div>
      
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-300 md:hidden" 
        style={{ 
          backgroundImage: "url('/landing-bg-mobile.jpg')" 
        }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative text-center text-white max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Where fitness <br className="hidden md:block"/> meets community
        </h1>
        <p className="mt-4 text-base md:text-lg">
          Your fitness journey starts here.
        </p>
        <Button className="mt-6 bg-[#FFC436] text-black px-6 py-3 rounded-lg  hover:bg-black hover:text-[#FFC436]">
          Join Community
        </Button>
      </div>
    </section>
  );
};

export default Hero;
