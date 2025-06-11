// import React, { useEffect, useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import "../calendarCustom.css";
// import { uploadAvailability } from "@/api/trainer-apicalls";
// import { getAvailability,getBookedSessionDetails  } from "@/api/availability-apicalls";
// import { showErrorToast, showSuccessToast } from "@/utils/toast";
// import { IAvailability } from "@/interfaces/trainer-interfaces";
// import { format } from "date-fns";
// import { useNavigate } from "react-router-dom";

// const timeSlots = [
//   "08:00", "09:00", "10:00", "11:00", "12:00",
//   "13:00", "14:00", "15:00", "16:00", "17:00",
// ];

// const TrainerAvailability: React.FC = () => {
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
//   const [availabilityData, setAvailabilityData] = useState<IAvailability[]>([]);
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate()
//   const fetchAvailability = async () => {
//     try {
//       const response = await getAvailability();
//       console.log('this is availability',response?.data.availability.availability)
//       setAvailabilityData(response?.data.availability.availability || []);
//     } catch (error) {
//       showErrorToast(error);
//     }
//   };

//   useEffect(() => {
//     fetchAvailability();
//   }, []);

//   const handleDateClick = (date: Date) => {
//     setSelectedDate(date);

//     const matched = availabilityData.find(
//       (item) => new Date(item.date).toDateString() === date.toDateString()
//     );

//     if (matched) {
//       const slots = matched.timeSlots.map((slot) => slot.startTime);
//       setSelectedSlots(slots);
//     } else {
//       setSelectedSlots([]);
//     }

//     setShowModal(true);
//   };

//   const toggleSlot = (slot: string) => {
//     setSelectedSlots((prev) =>
//       prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
//     );
//   };

//   const handleSubmit = async () => {
//     if (!selectedDate) return;

//     if (selectedSlots.length === 0) {
//       showErrorToast("Please select at least one time slot");
//       return;
//     }
//       const existing = availabilityData.find(
//     (item) => new Date(item.date).toDateString() === selectedDate.toDateString()
//   );

//   const existingSlots = existing?.timeSlots.map((s) => s.startTime).sort() || [];
//   const currentSlots = [...selectedSlots].sort();

//   const isSame =
//     existingSlots.length === currentSlots.length &&
//     existingSlots.every((val, index) => val === currentSlots[index]);

//   if (isSame) {
//     showErrorToast("No changes made to availability");
//     return;
//   }
//     try {
//       const response = await uploadAvailability({
//         date: selectedDate,
//         slots: selectedSlots,
//       });
//       showSuccessToast(response?.data.message);
//       setSelectedDate(null);
//       setSelectedSlots([]);
//       setShowModal(false);
//       fetchAvailability();
//     } catch (err) {
//       showErrorToast(err);
//     }
//   };


//   return (
//     <div className="max-w-4xl mx-auto p-8">
//       <div className="bg-black/30 backdrop-blur-sm rounded-2xl shadow-xl p-8">
//         <h2 className="text-3xl font-bold text-[#FFC436] mb-6 text-center">Set Your Training Availability</h2>
//         <Calendar
//           onClickDay={handleDateClick}
//           value={selectedDate}
//           tileDisabled={({ date }) => date < new Date(new Date().setHours(24, 0, 0, 0))}
//           tileClassName={({ date }) => {
//             const hasSlots = availabilityData.some(
//               (item) => new Date(item.date).toDateString() === date.toDateString()
//             );
//             return hasSlots ? "highlight-available" : "";
//           }}
//           className="custom-calendar"
//         />
//       </div>
    
//       {showModal && selectedDate && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
//           <div className="bg-black/30 rounded-2xl p-6 w-full max-w-xl shadow-xl">
//             <h3 className="text-xl font-bold text-[#FFC436] mb-4 text-center">
//               {format(selectedDate, "MMMM d, yyyy")}
//             </h3>

//             <div className="space-y-3 max-h-96 overflow-y-auto">
//               {timeSlots.map((slot) => {
//                 const isSelected = selectedSlots.includes(slot);
//                 const isBooked = selectedSlots.map((slot)=>{console.log('this is slot',slot)})
//                 return (
//                   <div
//                     key={slot}
//                     onClick={() => toggleSlot(slot)}
//                     className={`
//                       px-4 py-3 rounded-xl cursor-pointer transition-all
//                       ${isSelected
//                         ? "bg-[#FFC436] text-black font-semibold hover:bg-[#ffc436cc]"
//                         : "bg-black/80 text-white hover:bg-black/60"}
//                     `}
//                   >
//                     {slot} — {isSelected ? "Selected" : "Available"}
//                   </div>
//                 );
//               })}
//             </div>
                 
//             <div className="flex justify-end gap-4 mt-6">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 className="bg-[#FFC436] text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-400"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       <div className="flex justify-end space-x-4">
//             <button
//               onClick={() =>navigate('/trainer/bookedsessions')}
//               className="mt-2 bg-[#FFC436]  text-black font-semibold px-4 py-2 rounded hover:bg-black hover:text-[#FFC436]"
//             >
//               My booked sessions
//             </button>
            
//           </div>

//     </div>
//   );
// };

// export default TrainerAvailability;

import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../calendarCustom.css";
import { uploadAvailability } from "@/api/trainer-apicalls";
import { getAvailability } from "@/api/availability-apicalls";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { IAvailability, ISlot } from "@/interfaces/trainer-interfaces";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00",
];

const TrainerAvailability: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlots, setSelectedSlots] = useState<ISlot[]>([]);
  const [availabilityData, setAvailabilityData] = useState<IAvailability[]>([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const fetchAvailability = async () => {
    try {
      const response = await getAvailability();
      setAvailabilityData(response?.data.availability.availability || []);
    } catch (error) {
      showErrorToast(error);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);

    const matched = availabilityData.find(
      (item) => new Date(item.date).toDateString() === date.toDateString()
    );

    if (matched) {
      setSelectedSlots(matched.timeSlots);
    } else {
      setSelectedSlots([]);
    }

    setShowModal(true);
  };

  const toggleSlot = (slotTime: string) => {
    const exists = selectedSlots.find((slot) => slot.startTime === slotTime);
    if (exists) {
      setSelectedSlots((prev) => prev.filter((s) => s.startTime !== slotTime));
    } else {
      setSelectedSlots((prev) => [
        ...prev,
        { startTime: slotTime, isBooked: false },
      ]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedDate) return;

    if (selectedSlots.length === 0) {
      showErrorToast("Please select at least one time slot");
      return;
    }

    const existing = availabilityData.find(
      (item) => new Date(item.date).toDateString() === selectedDate.toDateString()
    );

    const existingSlots = existing?.timeSlots.map((s) => s.startTime).sort() || [];
    const currentSlots = [...selectedSlots.map((s) => s.startTime)].sort();

    const isSame =
      existingSlots.length === currentSlots.length &&
      existingSlots.every((val, index) => val === currentSlots[index]);

    if (isSame) {
      showErrorToast("No changes made to availability");
      return;
    }

    try {
      const response = await uploadAvailability({
        date: selectedDate,
        slots: selectedSlots.map((slot)=>slot.startTime),
      });
      showSuccessToast(response?.data.message);
      setSelectedDate(null);
      setSelectedSlots([]);
      setShowModal(false);
      fetchAvailability();
    } catch (err) {
      showErrorToast(err);
    }
  };

  const isSlotSelected = (time: string) => {
    return selectedSlots.some((slot) => slot.startTime === time);
  };

  const isSlotBooked = (time: string) => {
    const slot = selectedSlots.find((slot) => slot.startTime === time);
    return slot?.isBooked || false;
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-black/30 backdrop-blur-sm rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-[#FFC436] mb-6 text-center">
          Set Your Training Availability
        </h2>
        <Calendar
          onClickDay={handleDateClick}
          value={selectedDate}
          tileDisabled={({ date }) =>
            date < new Date(new Date().setHours(24, 0, 0, 0))
          }
          tileClassName={({ date }) => {
            const hasSlots = availabilityData.some(
              (item) =>
                new Date(item.date).toDateString() === date.toDateString()
            );
            return hasSlots ? "highlight-available" : "";
          }}
          className="custom-calendar"
        />
      </div>

      {showModal && selectedDate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-black/30 rounded-2xl p-6 w-full max-w-xl shadow-xl">
            <h3 className="text-xl font-bold text-[#FFC436] mb-4 text-center">
              {format(selectedDate, "MMMM d, yyyy")}
            </h3>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {timeSlots.map((slot) => {
                const selected = isSlotSelected(slot);
                const booked = isSlotBooked(slot);
                return (
                  <div
                    key={slot}
                    onClick={() => {
                      if (!booked) toggleSlot(slot);
                    }}
                    className={`
                      px-4 py-3 rounded-xl cursor-pointer transition-all
                      ${booked
                        ? "bg-gray-500 text-white cursor-not-allowed"
                        : selected
                        ? "bg-[#FFC436] text-black font-semibold hover:bg-[#ffc436cc]"
                        : "bg-black/80 text-white hover:bg-black/60"}
                    `}
                  >
                    {slot} —{" "}
                    {booked ? "Booked" : selected ? "Selected" : "Available"}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-[#FFC436] text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-400"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <button
          onClick={() => navigate("/trainer/bookedsessions")}
          className="mt-2 bg-[#FFC436] text-black font-semibold px-4 py-2 rounded hover:bg-black hover:text-[#FFC436]"
        >
          My booked sessions
        </button>
      </div>
    </div>
  );
};

export default TrainerAvailability;
