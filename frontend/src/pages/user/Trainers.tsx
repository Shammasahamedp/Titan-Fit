// import { getApprovedTrainers } from "@/api/user-apicalls";
// import { ITrainers } from "@/interfaces/trainer-interfaces";
// import { showErrorToast } from "@/utils/toast";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { ToastContainer } from "react-toastify";

// const Trainers = () => {
//   const [approvedTrainers, setApprovedTrainers] = useState<ITrainers[]>([]);
//   const [page, setPage] = useState(1); // To manage pagination
//   const [hasMore, setHasMore] = useState(true); // To check if more trainers are available
//   const limit = 2; // Set a limit for trainers per page
//   const fetchApprovedTrainers = async () => {
//     try {
//       const response = await getApprovedTrainers(page, limit);
//       console.log(response?.data)
//       if (page === 1) {
//         setApprovedTrainers(response?.data.approvedTrainers); // Reset for the first page
//       } else {
//         setApprovedTrainers((prev) => [...prev, ...response?.data.approvedTrainers]); // Append for other pages
//       }
//       const totalTrainers = response?.data.totalTrainers
//       const currentOffset = (page - 1)*limit + response?.data.approvedTrainers.length 
//       console.log(currentOffset,totalTrainers)
//       // Check if there are more trainers to fetch
//       setHasMore((currentOffset)<totalTrainers);
//     } catch (error) {
//       showErrorToast(error);
//     }
//   };
//   useEffect(() => {
    

//     fetchApprovedTrainers();
//   }, [page]);

//   const nextPage = () => {
//     console.log('clicked')

//     if (hasMore) {
//       setPage((prev) => prev + 1);
//     }
//   };

//   const prevPage = () => {
//     console.log('clicked')
//     if (page > 1) {
//       console.log(page)
//       setPage((prev) => prev - 1);
//     }
//   };
//   console.log(hasMore)
//   return (
//     <section
//       className="w-full py-16 px-4 md:px-8"
//       style={{ backgroundImage: "url('/white-bg.jpg')" }}
//     >
//       <div className="max-w-4xl mx-auto text-center mb-12">
//         <h2 className="text-4xl font-bold text-black">Meet Our Professional Trainers</h2>
//         <p className="mt-2 text-lg text-gray-700">
//           Find the perfect trainer to help you reach your fitness goals.
//         </p>
//       </div>

//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {approvedTrainers.map((trainer) => (
//           <Link key={trainer._id} to={`/trainers/single-trainer/${trainer._id}`}>
//             <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition-transform hover:scale-105">
//               <img
//                 src={trainer.profilePicture}
//                 alt={trainer.name}
//                 className="w-full h-64 object-cover"
//                 loading="lazy"
//               />
//               <div className="p-6">
//                 <h3 className="text-xl font-bold text-gray-900">{trainer.name}</h3>
//                 <p className="text-gray-600 mt-2">{trainer.bio}</p>
//                 <p className="text-gray-600 mt-2">{trainer.yearsOfExperience} of experience</p>
//                 <div className="flex items-center mt-4 text-yellow-500">
//                   {Array.from({ length: 5 }).map((_, i) => (
//                     <svg
//                       key={i}
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.071 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.072 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.072-3.292a1 1 0 00-.364-1.118L2.02 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
//                     </svg>
//                   ))}
//                   <span className="ml-2 text-sm text-gray-700">4</span>
//                 </div>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>

//       <div className="pagination mt-8 flex justify-center">
//         <button onClick={()=>prevPage()} disabled={page === 1} className="px-4 py-2 bg-gray-500 text-white rounded-md">
//           Previous
//         </button>
//         <span className="mx-4">{`Page ${page}`}</span>
//         <button onClick={()=>nextPage()} disabled={!hasMore} className="px-4 py-2 bg-gray-500 text-white rounded-md">
//           Next
//         </button>
//       </div>

//       <ToastContainer />
//     </section>
//   );
// };

// export default Trainers;
import { getApprovedTrainers } from "@/api/user-apicalls";
import { ITrainers } from "@/interfaces/trainer-interfaces";
import { showErrorToast } from "@/utils/toast";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Trainers = () => {
  const [approvedTrainers, setApprovedTrainers] = useState<ITrainers[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const limit = 2;

  const fetchApprovedTrainers = async () => {
    try {
      console.log('fs')
      const response = await getApprovedTrainers(page, limit, search, date);

      if (page === 1) {
        setApprovedTrainers(response?.data.approvedTrainers);
      } else {
        setApprovedTrainers((prev) => [
          ...prev,
          ...response?.data.approvedTrainers,
        ]);
      }

      const totalTrainers = response?.data.totalTrainers;
      const currentOffset =
        (page - 1) * limit + response?.data.approvedTrainers.length;
      setHasMore(currentOffset < totalTrainers);
    } catch (error) {
      showErrorToast(error);
    }
  };

  useEffect(() => {
    fetchApprovedTrainers();
  }, [page]);

  useEffect(() => {
    setPage(1); // Reset to first page when search or date changes
    fetchApprovedTrainers();
  }, [search, date]);

  const nextPage = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <section
      className="w-full py-16 px-4 md:px-8"
      style={{ backgroundImage: "url('/white-bg.jpg')" }}
    >
      <div className="max-w-4xl mx-auto text-center mb-8">
  <h2 className="text-4xl font-bold text-black">Meet Our Professional Trainers</h2>
  <p className="mt-2 text-lg text-gray-700">
    Find the perfect trainer to help you reach your fitness goals.
  </p>

  {/* Search and Date Filters */}
  <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
    <input
      type="text"
      placeholder="Search by name..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border px-4 py-2 rounded-md w-full sm:w-64"
    />
    <input
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      className="border px-4 py-2 rounded-md w-full sm:w-48"
    />
    {/* <button
      onClick={()=>fetchApprovedTrainers()}
      className="bg-gray-500 text-black px-4 py-2 rounded-md w-full sm:w-32 mt-2 sm:mt-0"
    >
      Search
    </button> */}
  </div>
</div>


      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {approvedTrainers.map((trainer) => (
          <Link key={trainer._id} to={`/trainers/single-trainer/${trainer._id}`}>
            <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition-transform hover:scale-105">
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
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.071 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.072 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.072-3.292a1 1 0 00-.364-1.118L2.02 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-gray-700">4</span>
                </div>
               

              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="pagination mt-8 flex justify-center items-center gap-4">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-500 text-white rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-800 font-semibold">{`Page ${page}`}</span>
        <button
          onClick={nextPage}
          disabled={!hasMore}
          className="px-4 py-2 bg-gray-500 text-white rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <ToastContainer />
    </section>
  );
};

export default Trainers;
