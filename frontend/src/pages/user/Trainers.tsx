import { getApprovedTrainers } from "@/api/user-apicalls";
import { ITrainers } from "@/interfaces/trainer-interfaces";
import { showErrorToast } from "@/utils/toast";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const Trainers = () => {
    const [approvedTrainers,setApprovedTrainers] = useState<ITrainers[]>([])
   

      useEffect(()=>{
        const fetchApprovedTrainers = async()=>{
            try {
                const response = await getApprovedTrainers()
                setApprovedTrainers(response?.data.approvedTrainers)
            } catch (error) {
                showErrorToast(error)
            }

        }
        fetchApprovedTrainers()
      },[])
      
    return (
      <section
        className="w-full py-16 px-4 md:px-8"
        style={{ backgroundImage: "url('/white-bg.jpg')" }}
      >
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-black">
            Meet Our Professional Trainers
          </h2>
          <p className="mt-2 text-lg text-gray-700">
            Find the perfect trainer to help you reach your fitness goals.
          </p>
        </div>
  
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {approvedTrainers.map((trainer) => (
            <div
              key={trainer._id}
              className="bg-white rounded-xl shadow-md overflow-hidden transform transition-transform hover:scale-105"
            >
              <img
                src={trainer.profilePicture}
                alt={trainer.name}
                className="w-full h-64 object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{trainer.name}</h3>
                <p className="text-gray-600 mt-2">{trainer.bio}</p>
                <p className="text-gray-600 mt-2">{trainer.yearsOfExperience} of experience</p>
                <div className="flex items-center mt-4 text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                    //   className={`h-5 w-5 ${i < Math.floor(trainer.rating) ? '' : 'text-gray-300'}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.071 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.072 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.072-3.292a1 1 0 00-.364-1.118L2.02 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-gray-700">4</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ToastContainer/>
      </section>
    );
  };
  
  export default Trainers;
  