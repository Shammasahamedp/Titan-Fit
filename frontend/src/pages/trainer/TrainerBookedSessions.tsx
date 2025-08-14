

import { useEffect, useState } from "react";
import BackendTable from "@/components/common/BackendTable";
import { getSessionDetails } from "@/api/availability-apicalls";
import { showErrorToast } from "@/utils/toast";
import { sendSessionNotification } from "@/utils/socket-service/notification-handler";
import { useSelector } from "react-redux";
import { RootState } from "@/reduxStore/store";

interface BookedSession {
  date: string;
  email: string;
  status: string;
fitnessLevel:string;
time:string;
user:string;
userId:string
}

const TrainerBookedSession = () => {
  const [data, setData] = useState<BookedSession[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string | undefined>();
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    fetchBookedSessions();
  }, [page, search, sortKey, sortAsc]);

  const fetchBookedSessions = async () => {
    try {
      const response = await getSessionDetails(
        page,
        search,
        sortKey || '',
        sortAsc
      );
      console.log('respo',response?.data.bookedData)

      setData(response?.data.bookedData || []);
      setTotalPages(response?.data.totalPages || 1);
    } catch (error) {
      showErrorToast(error);
    }
  };

  const trainer = useSelector((state:RootState)=>state.trainer.trainer)

  const isWithin12Hours = (date: string, time: string) => {
    const sessionDateTime = new Date(`${date} ${time}`);
    const now = new Date();
    const diffHours = (sessionDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);
    return diffHours <= 1200 && diffHours > 0; 
  };

  const sendNotificationToUser = async (userId:string,date:string,time:string,trainerId:string)=>{
    try {
       console.log('clickked')
       let sessionData = {
        userId,
        trainerId,
        date,
        time
       }

       console.log('sessionData',sessionData)

       sendSessionNotification(sessionData)
    } catch (error) {
      showErrorToast(error)
    }
  }



  return (
    
    <div className="max-w-4xl mx-auto px-4 py-8  ">
      <h2 className="text-3xl font-bold text-warm-yellow">
          Booked Sessions
        </h2>
        <BackendTable
      columns={[["date",'date'], ["status",'status'], ["time",'time'], ["user",'name'],['email','email'],['fitnessLevel','fitness level']]}
      tableDatas={data}
      currentPage={page}
      rederActions={(item)=>{
        if(isWithin12Hours(item.date,item.time)){
           return (
            <>
            <button
               onClick={()=>sendNotificationToUser(item.userId,item.date,item.time,trainer?._id as string)}
                 className=" space-x-2 bg-[#FFC436] text-black px-4 font-semibold py-1 rounded hover:bg-black hover:text-[#FFC436] transition-colors"
               >
                Send notification
               </button>
            </>
           )
        }
      }}
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
  );
};

export default TrainerBookedSession;

