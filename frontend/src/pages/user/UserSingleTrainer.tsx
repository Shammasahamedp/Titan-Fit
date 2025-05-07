// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css';
// import { getApprovedSingleTrainer } from "@/api/user-apicalls";
// import { showErrorToast } from "@/utils/toast";
// import { ToastContainer } from "react-toastify";

// // Types
// interface Trainer {
//   id: number;
//   name: string;
//   image: string;
//   phone: string;
//   bio: string;
//   rating: number;
// }

// type SlotMap = {
//   [date: string]: string[];
// };  

// // Dummy data
// const trainer: Trainer = {
//   id: 1,
//   name: "Alex Johnson",
//   image: "/trainer1.jpg",
//   phone: "+1 234 567 890",
//   bio: "Certified personal trainer with 5+ years of experience in strength and conditioning.",
//   rating: 4.8,
// };

// const availableSlots: SlotMap = {
//   "2025-05-01": ["10:00 AM", "11:30 AM", "2:00 PM"],
//   "2025-05-02": ["9:00 AM", "1:00 PM", "3:30 PM"],
// };

// const TrainerDetail = () => {
//     const {id} = useParams<{id:string}>()
//     useEffect(()=>{
//          const fetchSingleTrainer = async()=>{
//             try {
//                 const response = await getApprovedSingleTrainer(id as string)
//             console.log(response?.data.trainer,response?.data.availability)
//             } catch (error) {
//                 showErrorToast(error)
//             }
//          }
//          fetchSingleTrainer()
//     },[])
//   const [selectedDate, setSelectedDate] = useState<Date>(new Date());

//   const dateKey = selectedDate.toISOString().split("T")[0];
//   const slots = availableSlots[dateKey] || [];

//   return (
//     <div
//       className="min-h-screen py-12 px-4"
//       style={{ backgroundImage: "url('/white-bg.jpg')", backgroundSize: "cover" }}
//     >
//       <div className="max-w-6xl mx-auto bg-white bg-opacity-90 rounded-xl p-8 shadow-lg">
//         {/* Trainer Info */}
//         <div className="flex flex-col lg:flex-row gap-8">
//           <div className="w-full lg:w-1/2">
//             <img
//               src={trainer.image}
//               alt={trainer.name}
//               className="w-full h-[400px] object-cover rounded-xl shadow-md"
//             />
//           </div>
//           <div className="w-full lg:w-1/2 space-y-4">
//             <h2 className="text-3xl font-bold">{trainer.name}</h2>
//             <p className="text-gray-700"><strong>Phone:</strong> {trainer.phone}</p>
//             <p className="text-gray-600">{trainer.bio}</p>
//             <p className="text-yellow-500 font-medium">Rating: {trainer.rating} ⭐</p>
//           </div>
//         </div>

//         {/* Calendar & Slots */}
//         <div className="mt-12">
//           <h3 className="text-2xl font-semibold mb-4">Book a Slot</h3>
//           <Calendar
//             onChange={(value) => setSelectedDate(value as Date)}
//             value={selectedDate}
//             className="custom-calendar mb-6"
//           />
//           <div>
//             <h4 className="text-lg font-medium mb-2">Available Slots on {dateKey}:</h4>
//             {slots.length > 0 ? (
//               <div className="flex flex-wrap gap-3">
//                 {slots.map((slot, idx) => (
//                   <button
//                     key={idx}
//                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//                   >
//                     {slot}
//                   </button>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-red-500">No slots available on this day.</p>
//             )}
//           </div>
//         </div>
//       </div>
//       <ToastContainer/>
//     </div>
//   );
// };

// export default TrainerDetail;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { bookATrainingSession, getApprovedSingleTrainer } from "@/api/user-apicalls";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { ToastContainer } from "react-toastify";
import "../calendarCustom.css"; // custom styles
import { ITrainers } from "@/interfaces/trainer-interfaces";



interface Slot {
  startTime: string;
  isBooked: boolean;
}

interface Availability {
  date: string;
  timeSlots: Slot[];
}

const TrainerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [trainer, setTrainer] = useState<ITrainers | null>(null);
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const bookASession = async(trainerId:string,date:string,startTime:string)=>{
    console.log('clicked')
    try {
        const response = await bookATrainingSession(trainerId,date,startTime)
        if(response?.data.success){
                 
                fetchTrainerDetails()
                showSuccessToast(response.data.message)
        }
    } catch (error) {
        showErrorToast(error)
    }
  }
  const fetchTrainerDetails = async () => {
    try {
      const response = await getApprovedSingleTrainer(id as string);
      setTrainer(response?.data.trainer);
      setAvailability(response?.data.availability?.availability || []);
    } catch (error) {
      showErrorToast(error);
    }
  };
  useEffect(() => {
    
    fetchTrainerDetails();
  }, [id]);

  const dateKey = selectedDate.toISOString().split("T")[0];
  const selectedDayAvailability = availability.find(
    (item) => item.date.split("T")[0] === dateKey
  );

  const availableSlots =
    selectedDayAvailability?.timeSlots.filter((slot) => !slot.isBooked) || [];

  return (
    <div
      className="min-h-screen py-12 px-4"
      style={{ backgroundImage: "url('/white-bg.jpg')", backgroundSize: "cover" }}
    >
      <div className="max-w-6xl mx-auto bg-white bg-opacity-90 rounded-xl p-8 shadow-lg">
        {/* Trainer Info */}
        {trainer && (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/2">
              <img
                src={trainer.profilePicture}
                alt={trainer.name}
                className="w-full h-[400px] object-cover rounded-xl shadow-md"
              />
            </div>
            <div className="w-full lg:w-1/2 space-y-4">
              <h2 className="text-3xl font-bold">{trainer.name}</h2>
              <p className="text-gray-700">
                <strong>Phone:</strong> {trainer.phone}
              </p>
              <p className="text-gray-600">{trainer.bio}</p>
              <p className="text-yellow-500 font-medium">Rating: 4 ⭐</p>
            </div>
          </div>
        )}

        {/* Calendar & Slots */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-4">Book a Slot</h3>
          <Calendar
            onChange={(value) => setSelectedDate(value as Date)}
            value={selectedDate}
            className="custom-calendar mb-6"
            tileClassName={({ date }) => {
              const day = availability.find(
                (item) =>
                  new Date(item.date).toDateString() === date.toDateString()
              );

              if (day) {
                const hasAvailable = day.timeSlots.some((slot) => !slot.isBooked);
                const allBooked = day.timeSlots.every((slot) => slot.isBooked);

                if (allBooked) return "booked-date";
                if (hasAvailable) return "available-date";
              }
              return "";
            }}
          />
          <div>
            <h4 className="text-lg font-medium mb-2">
              Available Slots on {dateKey}:
            </h4>
            {availableSlots.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {availableSlots.map((slot, idx) => (
                  <button
                    key={idx}
                    onClick={()=>bookASession(id as string,dateKey,slot.startTime)}
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                  >
                    {slot.startTime}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-red-500">No slots available on this day.</p>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TrainerDetail;

