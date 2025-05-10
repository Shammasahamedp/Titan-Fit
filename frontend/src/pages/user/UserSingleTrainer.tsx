import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  bookATrainingSession,
  getApprovedSingleTrainer,
} from "@/api/user-apicalls";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { ToastContainer } from "react-toastify";
import "../calendarCustom.css"; // custom styles
import { ITrainers } from "@/interfaces/trainer-interfaces";
import { useSelector } from "react-redux";
import { RootState } from "@/reduxStore/store";
import Navbar from "@/components/userComponents/Navbar";
import { logoutUser } from "@/api/auth";

interface Slot {
  startTime: string;
  isBooked: boolean;
  userId?: string;
}

interface Availability {
  date: string;
  timeSlots: Slot[];
}

const TrainerDetail = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const { id } = useParams<{ id: string }>();
  const [trainer, setTrainer] = useState<ITrainers | null>(null);
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const bookASession = async (
    trainerId: string,
    date: string,
    startTime: string
  ) => {
    console.log("clicked");
    try {
      const response = await bookATrainingSession(trainerId, date, startTime);
      if (response?.data.success) {
        fetchTrainerDetails();
        showSuccessToast(response.data.message);
      }
    } catch (error) {
      showErrorToast(error);
    }
  };
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
    <>
      <Navbar role="user" logout={logoutUser} />
      <div
        className="min-h-screen py-12 px-4"
        style={{
          backgroundImage: "url('/white-bg.jpg')",
          backgroundSize: "cover",
        }}
      >
        <div className="max-w-6xl mx-auto bg-white bg-opacity-90 rounded-xl p-8 shadow-lg">
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
                  Available Slots on {dateKey}:
                </h4>
                {availableSlots.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {availableSlots.map((slot, idx) => (
                      <button
                        key={idx}
                        onClick={() =>
                          bookASession(id as string, dateKey, slot.startTime)
                        }
                        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                      >
                        {slot.startTime}
                      </button>
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
      </div>
    </>
  );
};

export default TrainerDetail;
