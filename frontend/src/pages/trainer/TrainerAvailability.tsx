import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../calendarCustom.css"; // custom styles
import { uploadAvailability } from "@/api/trainer-apicalls";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { getAvailability } from "@/api/availability-apicalls";
import { IAvailability } from "@/interfaces/trainer-interfaces";
const timeSlots: string[] = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

const TrainerAvailability: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [availabilityData,setAvailabilityData] = useState<IAvailability[]>([])
  const fetchAvailability = async()=>{
    try {
      const response = await getAvailability()
      console.log(response?.data.availability.availability)
      setAvailabilityData(response?.data.availability.availability)
    } catch (error) {
      showErrorToast(error)
    }
 }
  useEffect(()=>{
     
     fetchAvailability()
  },[fetchAvailability])

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  
    const matched = availabilityData.find(item =>
      new Date(item.date).toDateString() === date.toDateString()
    );
  
    if (matched) {
      const slots = matched.timeSlots
        // .filter(slot => slot.isBooked)
        .map(slot => slot.startTime);
      setSelectedSlots(slots);
    } else {
      setSelectedSlots([]);
    }
  };
  

  const toggleSlot = (slot: string) => {
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const handleSubmit = async () => {
    if (!selectedDate) return;
    if(selectedSlots.length === 0){
      showErrorToast('Please select at least one time slot')
      return 
    }
    try {
     const response = await uploadAvailability({date:selectedDate,slots:selectedSlots  })
     showSuccessToast(response?.data.message)
      console.log(selectedDate, selectedSlots);
      
      setSelectedDate(null);
      setSelectedSlots([]);
      fetchAvailability()
    } catch (err) {
        showErrorToast(err)
    }
  };
//   const bookedDates= ['2025-05-01', '2025-05-03']
  return (
    <div className="p-4 bg-[#000] min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-6 text-[#FFC436] text-center">
        Trainer Calendar
      </h2>
      <div className="flex flex-col md:flex-row gap-6 justify-center items-start">
        {/* Left Column - Calendar */}
        <div className="bg-white p-4 rounded shadow-xl w-full md:w-auto">
          <Calendar
            onClickDay={handleDateClick}
            className="react-calendar-custom"
            tileDisabled={({ date }) =>
              date < new Date(new Date().setHours(0, 0, 0, 0))
            }
            tileClassName={({ date }) => {
              const match = availabilityData.find(item =>
                new Date(item?.date).toDateString() === date.toDateString()
              );
              return match ? 'booked-date' : null;
            }}
            
          />
        </div>

        {/* Right Column - Time Slots (only shown if a date is selected) */}
        {selectedDate && (
          <div className="bg-white p-6 rounded-xl shadow-lg text-black w-full md:w-[400px]">
            <h3 className="text-xl font-semibold mb-4 text-[#FFC436]">
              {selectedDate.toDateString()}
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {timeSlots.map((slot) => (
                <label key={slot} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedSlots.includes(slot)}
                    onChange={() => toggleSlot(slot)}
                    className="accent-[#FFC436]"
                  />
                  {slot}
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => {
                  setSelectedDate(null);
                  setSelectedSlots([]);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-[#FFC436] px-4 py-2 rounded text-black font-semibold hover:bg-yellow-400"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainerAvailability;
