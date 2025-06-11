

import { useEffect, useState } from "react";
import BackendTable from "@/components/common/BackendTable";
import { getSessionDetails } from "@/api/availability-apicalls";
import { showErrorToast } from "@/utils/toast";

interface BookedSession {
  date: string;
  email: string;
  status: string;
fitnessLevel:string;
time:string;
user:string
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

      setData(response?.data.bookedData || []);
      console.log('dataaa',response?.data.bookedData)
      setTotalPages(response?.data.totalPages || 1);
    } catch (error) {
      showErrorToast(error);
    }
  };

  const checkTrainerApproved = async ()=>{
    try {
       
    } catch (error) {
       
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

