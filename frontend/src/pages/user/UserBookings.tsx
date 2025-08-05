import { getUsersBookedSession } from "@/api/availability-apicalls"
import { useEffect, useState } from "react"
import BackendTable from "@/components/common/BackendTable"
import { showErrorToast } from "@/utils/toast";

export interface IUserBookedSessionDetails{
  trainer:string;
  email:string;
  date:Date;
  time:string;
  status:'upcoming'|'completed'|'attended'
}
const UserBookings = () => {
  const [tableData,setTableData]  = useState<IUserBookedSessionDetails[]>([])
   const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string | undefined>();
  const [sortAsc, setSortAsc] = useState(true);
    useEffect(()=>{
       const fetch = async()=>{
       try {
        const response= await getUsersBookedSession( page,
        search,
        sortKey || '',
        sortAsc)
        setTableData(response?.data.userBookedSessions)
        setTotalPages(response?.data.totalPages || 1)
       } catch (error) {
        showErrorToast(error)
       }
       }
       fetch()
    },[page,search,sortKey,sortAsc])
  return (
   <div className="max-w-4xl mx-auto px-4 py-8  ">
      <h2 className="text-3xl font-bold text-warm-yellow">
          Booked Sessions
        </h2>
        <BackendTable
      columns={[["date",'date'], ["time",'time'], ["trainer",'name'],['email','email'],['status','status']]}
      tableDatas={tableData}
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
      // filterKeys={["trainer", "status"]}
    />
    
    </div>
  )
}

export default UserBookings
