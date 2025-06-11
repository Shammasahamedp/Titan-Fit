import { getSingleTrainerDetails } from "@/api/admin-apicalls";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { ITrainers, IAvailability } from "@/interfaces/trainer-interfaces";
import { showErrorToast } from "@/utils/toast";
import BackendTable from "@/components/common/BackendTable";
import { toggleTrainer } from "@/api/admin-apicalls";
import ConfirmModal from "@/modal/ConfirmationModal";
import { getBookedSessionDetails } from "@/api/availability-apicalls";

interface BookedSession {
  date: string;
  email: string;
  status: string;
fitnessLevel:string;
time:string;
user:string
}

const AdminSingleTrainer = () => {
  const { trainerId } = useParams();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState<ITrainers | null>(null);
  const [availability, setAvailability] = useState<IAvailability[]>([]);
  const [isModalOpen,setModalOpen] = useState(false)

  const [data, setData] = useState<BookedSession[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [sortKey, setSortKey] = useState<string | undefined>();
    const [sortAsc, setSortAsc] = useState(true);


  const fetchSingleTrainer = async () => {
    try {
      const response = await getSingleTrainerDetails(trainerId as string);
      setTrainer(response?.data.trainer);
      setAvailability(response?.data.availability.availability);
      console.log("sdf", response?.data.availability);
    } catch (error) {
      showErrorToast(error);
    }
  };

  const handleToggleApprove = async (trainerId: string, approved: boolean,reason:string) => {
    try {

        const response = await toggleTrainer(trainerId, approved,reason);
      if (response?.data.success) {
        console.log(response.data)
        setTrainer(response.data.trainer)
        setModalOpen(false)
      }
    } catch (error) { 
      showErrorToast(error);
    }
  };
  const fetchBookedSessions = async () => {
    try {
        const response = await getBookedSessionDetails(
        trainer?._id as string,
        page,
        search,
        sortKey || '',
        sortAsc
      );

      setData(response?.data.bookedData || []);
      console.log('dataaa',response?.data)
      setTotalPages(response?.data.totalPages || 1);
      
    } catch (error) {
      showErrorToast(error);
    }
  };

 useEffect(() => {
      fetchSingleTrainer();

  
}, [trainerId]);

useEffect(() => {
  if(trainer){
      fetchBookedSessions();

  }
}, [page, search, sortKey, sortAsc,trainer]);

  return (
    <div className="w-full flex justify-center ">
      <div className="max-w-4xl md:ml-94 w-full mx-auto  overflow-x-auto pt-16  bg-black/30  rounded-xl p-8 shadow-lg">
        <button onClick={() => navigate("/admin/trainermanagement")}>
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
                // className="w-full h-[400px] object-cover rounded-xl shadow-md"
                // className="w-[300px] h-[250px] object-cover rounded-xl shadow-md"
                className="w-full max-w-[300px] h-[300px] object-cover rounded-xl shadow-md"


              />
            </div>

            {/* Right: Trainer Info + Certificates */}
            <div className="w-full lg:w-1/2 space-y-4">
              <h2 className="text-3xl font-bold">{trainer.name} - ({!trainer.approved? ('non approved'):'approved'})</h2>
              <p className="text-white">
                <strong>Phone:</strong> {trainer.phone}
              </p>
              <p className="text-white">{trainer.bio}</p>
              
              <p className="text-yellow-500 font-medium">Rating: 4 ⭐</p>

              {/* Certificates Section */}
              {trainer.trainerCertificate &&
                trainer.trainerCertificate.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-2">
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
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold">Trainer sessions</h3>
            <button
              onClick={() =>
                setModalOpen(true)
              }
      className='px-3 py-1 rounded bg-[#FFC436] text-black hover:text-[#FFC436] hover:bg-black'
            >
              {trainer?.approved ? "Reject" : "Approve"}
            </button>
          </div>
          <BackendTable
      columns={[["date",'date'], ["status",'status'], ["time",'time'], ["user",'name'],['email','email'],['fitnessLevel','fitness level']]}
      tableDatas={data}
      currentPage={page}
      totalPages={totalPages}
      onPageChange={setPage}
      onSearchChange={(value) => {
        setPage(1);
        setSearch(value);
      }}
      onSortChange={(key, asc) => {
        setSortKey(key as string);
        setSortAsc(asc);
      }}
      search={search}
      sortKey={sortKey as string}
      sortAsc={sortAsc}
      // filterKeys={["clientName", "status"]}
    />
        </div>
      </div>
      {isModalOpen &&
        <ConfirmModal onClose={()=>setModalOpen(false)} confrimToProceed={(reason?:string)=>{handleToggleApprove(trainerId as string,trainer?.approved as boolean,reason as string)}}/>
      }
    </div> 
  );
};

export default AdminSingleTrainer;
