import React from 'react'
// import { Button } from '../ui/button'
const ServiceSecondPart = () => {
  return (
    <section className="w-full py-16 px-4 md:px-8" style={{backgroundImage:"url('/black-bg (3).jpg')"}}>
         <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-white">Take Your Fitness to the Next Level</h2>
        <p className="mt-2 text-lg text-gray-500">Join our exclusive training programs and meal plans designed for you.</p>
        {/* <Button className="mt-4 bg-[#FFC436] text-black px-6 py-3 rounded-lg hover:bg-[#0f0f0f] hover:text-[#FFC436]" >
          Go Pro
        </Button> */}
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Personal Trainer Section */}
        <div 
          className="relative group h-80 rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
        >
          <img 
            src="/competition-bg.jpg" 
            alt="Personal Trainer" 
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-300"></div>
          <div className="relative flex flex-col justify-center items-center h-full text-white text-center">
            <h2 className="text-3xl font-bold">Enter the Arena</h2>
            <p className="mt-2 text-lg">Comete and win - Register now!</p>
          </div>
        </div>

        {/* Meal Plan Section */}
        <div 
          className="relative group h-80 rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
        >
          <img 
            src="/mealplan-bg.jpg" 
            alt="Meal Plan" 
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-75"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-300"></div>
          <div className="relative flex flex-col justify-center items-center h-full text-white text-center">
            <h2 className="text-3xl font-bold">Meal Plan</h2>
            <p className="mt-2 text-lg">Customized diet plans for you</p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default ServiceSecondPart
