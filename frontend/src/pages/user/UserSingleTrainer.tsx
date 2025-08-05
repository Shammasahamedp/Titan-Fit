import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  bookATrainingSession,
  getApprovedSingleTrainer,
  cancelTheBooking
} from "@/api/user-apicalls";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { ToastContainer } from "react-toastify";
import "../calendarCustom.css"; // custom styles
import { ITrainers } from "@/interfaces/trainer-interfaces";
import { useSelector } from "react-redux";
import { RootState } from "@/reduxStore/store";
import Navbar from "@/components/userComponents/Navbar";
import { logoutUser } from "@/api/auth";
import { ArrowLeft } from "lucide-react";
import ConfirmModal from "@/modal/ConfirmationModal";
interface Slot {
  startTime: string;
  isBooked: boolean;
  userId?: string;
}

interface Availability {
  date: string;
  timeSlots: Slot[];
}

interface SlotBookArg {
  id: string;
  date: string | undefined;
  startTime: string;
}

const TrainerDetail = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const { id } = useParams<{ id: string }>();
  const [trainer, setTrainer] = useState<ITrainers | null>(null);
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCancelModalOpen,setCancelModal] = useState(false)
  const [slot, setSlot] = useState<SlotBookArg | null>(null);
  const bookASession = async (
    trainerId: string,
    date: string,
    startTime: string
  ) => {
    try {
      const response = await bookATrainingSession(trainerId, date, startTime);
      if (response?.data.success) {
        fetchTrainerDetails();
        showSuccessToast(response.data.message);
        setModalOpen(false);
      }
    } catch (error) {
      showErrorToast(error);
    }
  };

   const cancelBooking = async(trainerId:string,date:string,startTime:string)=>{
    try {
       const response = await cancelTheBooking(trainerId,date,startTime)
       if(response?.data.success){
        fetchTrainerDetails();
        showSuccessToast(response.data.message)
        setCancelModal(false)
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

  const isTomorrow = (date: string) => {
    const today = new Date();
    const targetDate = new Date(date);
    const diff = targetDate.getTime() - today.getTime();
    return diff <= 86400000 
    // && diff > 0;
  };

 
  
  const dateKey = selectedDate.toISOString().split("T")[0];
  const selectedDayAvailability = availability.find(
    (item) => item.date.split("T")[0] === dateKey
  );

  const bookedSlotByUser = selectedDayAvailability?.timeSlots.find(
    (slot) => slot.userId === user?._id
  );

  const availableSlots =
    selectedDayAvailability?.timeSlots.filter((slot) => !slot.isBooked) || [];

  return (
    <>
      <Navbar role="user" logout={logoutUser} />
      <div
        className="mt-10 min-h-screen py-12 px-4"
        style={{
          backgroundImage: "url('/white-bg.jpg')",
          backgroundSize: "cover",
        }}
      >
        <div className="max-w-6xl mx-auto bg-white bg-opacity-90 rounded-xl p-8 shadow-lg">
          <button onClick={() => navigate("/trainers")}>
            <ArrowLeft />
          </button>
          {/* Trainer Info */}
          {trainer && (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left: Profile Image */}
              <div className="w-full lg:w-1/2">
                <img
                  src={trainer.profilePicture}
                  alt={trainer.name}
                  className="w-full h-[400px] object-cover rounded-xl shadow-md"
                />
              </div>

              {/* Right: Trainer Info + Certificates */}
              <div className="w-full lg:w-1/2 space-y-4">
                <h2 className="text-3xl font-bold">{trainer.name}</h2>
                <p className="text-gray-700">
                  <strong>Phone:</strong> {trainer.phone}
                </p>
                <p className="text-gray-600">{trainer.bio}</p>
                <p className="text-yellow-500 font-medium">Rating: 4 ⭐</p>

                {/* Certificates Section */}
                {trainer.trainerCertificate &&
                  trainer.trainerCertificate.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">
                        Certificates:
                      </h4>
                      <div className="flex space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300">
                        {trainer.trainerCertificate.map((certUrl, index) => (
                          <a
                            key={index}
                            href={certUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="min-w-[120px] bg-gray-100 p-2 rounded-lg text-sm text-blue-600 hover:underline hover:bg-gray-200 flex-shrink-0"
                          >
                            Certificate {index + 1}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          )}

          <div className="mt-12">
            <h3 className="text-2xl font-semibold mb-4">Book a Slot</h3>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-1/2">
                <Calendar
                  onChange={(value) => setSelectedDate(value as Date)}
                  value={selectedDate}
                  className="custom-calendar mb-6"
                  tileDisabled={({ date }) =>
                    date < new Date(new Date().setHours(24, 0, 0, 0))
                  }
                  tileClassName={({ date }) => {
                    const day = availability.find(
                      (item) =>
                        new Date(item.date).toDateString() ===
                        date.toDateString()
                    );

                    if (day) {
                      console.log(user);
                      const hasAvailable = day.timeSlots.some(
                        (slot) => !slot.isBooked
                      );
                      const allBooked = day.timeSlots.every(
                        (slot) => slot.isBooked
                      );
                      const BookedByUser = day.timeSlots.some(
                        (slot) => slot.userId === user?._id
                      );
                      console.log("sdaf", BookedByUser);
                      if (BookedByUser) return "booked-date";
                      if (allBooked) return "all-booked";

                      if (hasAvailable) return "available-date";
                    }
                    return "";
                  }}
                />
              </div>

              <div className="w-full lg:w-1/2">
                <h4 className="text-lg font-medium mb-2">
                  {bookedSlotByUser
                    ? `Your Booked Slot on ${dateKey}:`
                    : `Available Slots on ${dateKey}:`}
                </h4>

                {/* {bookedSlotByUser ? (
                  <div className="flex flex-wrap gap-3">
                    <div className="bg-blue-600 text-white px-4 py-2 rounded">
                      {bookedSlotByUser.startTime}
                    </div>
                  </div>
                ) : */}


                {bookedSlotByUser && (
                  <div className="text-sm text-blue-700 mb-2">
                    You have already booked a slot on this day.
                    {isTomorrow(dateKey) ? (
                      <div className="text-red-500 text-sm">
                        You cannot change your slot for tomorrow.
                      </div>
                    ) : (
                      <div className="text-gray-600 text-sm">
                        You can change to another available slot.
                      </div>
                    )}
                  </div>
                )}

                {availableSlots.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {bookedSlotByUser && (
                      <>
                      <div className="bg-blue-600 text-white px-4 py-2 rounded">
                        {bookedSlotByUser.startTime}
                      </div> 
                      
                      </>
                      

                      
                    )}
                    {availableSlots.map((slot, idx) => (
                  
                      <>
                         <button
                        key={idx}
                        onClick={() => {
                          if (bookedSlotByUser && isTomorrow(dateKey)) {
                            showErrorToast(
                              "You cannot change your slot for tomorrow."
                            );
                            return;
                          }

                          setSlot({
                            id: id as string,
                            date: dateKey,
                            startTime: slot.startTime,
                          });
                          setModalOpen(true);
                        }}
                        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                      >
                        {slot.startTime}
                      </button>
                      {
                        bookedSlotByUser && (
                          <button className="bg-red-500 text-black px-4 py-2 rounded hover:bg-red-900 transition" onClick={() => {
                          if (bookedSlotByUser && isTomorrow(dateKey)) {
                            showErrorToast(
                              "You cannot cancel slot for tomorrow."
                            );
                            return;
                          }

                          setSlot({
                            id: id as string,
                            date: dateKey,
                            startTime: slot.startTime,
                          });
                          setCancelModal(true);
                        }}>
                            cancel booking
                     </button>
                        )
                      }
                      </>
                      
                    ))}

                  </div>
                ) : (
                  <p className="text-red-500">
                    No slots available on this day.
                  </p>
                )}
                      
              </div>

                     

              <div className="flex flex-wrap gap-4 items-center mb-4 mt-2">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-green-400 rounded-sm"></span>
                  <span className="text-sm text-gray-700">Available Date</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-red-400 rounded-sm"></span>
                  <span className="text-sm text-gray-700">Fully Booked</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-black rounded-sm"></span>
                  <span className="text-sm text-gray-700">Available Slots</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-blue-400 rounded-sm"></span>
                  <span className="text-sm text-gray-700">
                    Your Booked Slot
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
        {isModalOpen && (
          <ConfirmModal
            needTextField={false}
            confirmToProceed={() => {
              bookASession(
                slot?.id as string,
                slot?.date as string,
                slot?.startTime as string
              );
            }}
            onClose={() => setModalOpen(false)}
          />
        )}
        {isCancelModalOpen && (
          <ConfirmModal
            needTextField={false}
            confirmToProceed={()=>{
              cancelBooking(slot?.id as string,slot?.date as string,slot?.startTime as string)
            }}
            onClose={()=>setCancelModal(false)}
          />
        )

        }
      </div>
    </>
  );
};

export default TrainerDetail;
