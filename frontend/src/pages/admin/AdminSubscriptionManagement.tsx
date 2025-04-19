// import Navbar from "@/components/userComponents/Navbar"
// import SideBar from "@/components/common/SideBar"
// import { logoutAdmin } from "@/api/auth"
// const AdminSubscriptionManagement = () => {
//   return (
//     <div className="flex flex-col bg-[url('/userdashboard.jpg')] bg-cover bg-fixed bg-center bg-no-repeat min-h-screen w-full">
//     <Navbar logout={logoutAdmin} role="trainer"/>
//     <div className="flex flex-1 text-white">
//       <SideBar role="admin"  items={[
//         ['User management','usermanagement'],
//         ['Trainer management','trainermanagement'],
//         ['Subscription management','subscriptionmanagement']
//       ]}/>
//        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {certificates?.map(
//                 (certificate: string, index: number) => (
//                   <div
//                     key={index}
//                     className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center"
//                   >
//                     <iframe
//                       src={certificate}
//                       className="w-full h-[300px] border rounded-lg"
//                       title={`Trainer Certificate ${index + 1}`}
//                     />
                   
//                   </div>
//                 )
//               )}
//             </div>
//     </div>
//  </div>
//   )
// }

// export default AdminSubscriptionManagement

// import { useState, useEffect } from "react";
// import Navbar from "@/components/userComponents/Navbar";
// import SideBar from "@/components/common/SideBar";
// import { logoutAdmin } from "@/api/auth";
// import { ISubscription } from "@/interfaces/subscription-interface";
// import Modal from "@/components/common/Modal"; // Assuming you have a generic Modal component

// const AdminSubscriptionManagement = () => {
//   const [subscriptions, setSubscriptions] = useState<ISubscription[]>([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editingSub, setEditingSub] = useState<ISubscription | null>(null);

//   const [formData, setFormData] = useState({
//     planName: "",
//     price: 0,
//     description: "",
//     durationInMonth: 1,
//     credits: 0,
//     isActive: true,
//   });

//   useEffect(() => {
//     // fetchSubscriptions(); <-- You'll handle this part
//   }, []);

//   const openAddModal = () => {
//     setEditingSub(null);
//     setFormData({
//       planName: "",
//       price: 0,
//       description: "",
//       durationInMonth: 1,
//       credits: 0,
//       isActive: true,
//     });
//     setShowModal(true);
//   };

//   const openEditModal = (subscription: ISubscription) => {
//     setEditingSub(subscription);
//     setFormData(subscription);
//     setShowModal(true);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = () => {
//     if (editingSub) {
//       // updateSubscription(editingSub._id, formData); // You'll handle API
//     } else {
//       // addSubscription(formData); // You'll handle API
//     }
//     setShowModal(false);
//   };

//   return (
//     <div className="flex flex-col bg-[url('/userdashboard.jpg')] bg-cover bg-fixed bg-center bg-no-repeat min-h-screen w-full">
//       <Navbar logout={logoutAdmin} role="trainer" />
//       <div className="flex flex-1 text-white">
//         <SideBar
//           role="admin"
//           items={[
//             ["User management", "usermanagement"],
//             ["Trainer management", "trainermanagement"],
//             ["Subscription management", "subscriptionmanagement"],
//           ]}
//         />

//         <div className="flex-1 p-6 pt-16 md:ml-64">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-3xl font-bold">Subscription Management</h2>
//             <button
//               className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600"
//               onClick={openAddModal}
//             >
//               Add Subscription
//             </button>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {subscriptions.map((sub, index) => (
//               <div
//                 key={index}
//                 className="bg-white text-black rounded-lg shadow-lg p-4 flex flex-col justify-between"
//               >
//                 <div>
//                   <h3 className="text-xl font-bold mb-2">{sub.planName}</h3>
//                   <p><strong>Price:</strong> ₹{sub.price}</p>
//                   <p><strong>Description:</strong> {sub.description}</p>
//                   <p><strong>Duration:</strong> {sub.durationInMonth} month(s)</p>
//                   <p><strong>Credits:</strong> {sub.credits}</p>
//                   <p><strong>Status:</strong> {sub.isActive ? "Active" : "Inactive"}</p>
//                 </div>
//                 <button
//                   className="mt-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                   onClick={() => openEditModal(sub)}
//                 >
//                   Edit
//                 </button>
//               </div>
//             ))}
//           </div>

//           {showModal && (
//             <Modal onClose={() => setShowModal(false)} title={editingSub ? "Edit Subscription" : "Add Subscription"}>
//               <div className="flex flex-col gap-3">
//                 <input
//                   name="planName"
//                   placeholder="Plan Name"
//                   value={formData.planName}
//                   onChange={handleChange}
//                   className="p-2 border rounded"
//                 />
//                 <input
//                   name="price"
//                   type="number"
//                   placeholder="Price"
//                   value={formData.price}
//                   onChange={handleChange}
//                   className="p-2 border rounded"
//                 />
//                 <textarea
//                   name="description"
//                   placeholder="Description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   className="p-2 border rounded"
//                 />
//                 <input
//                   name="durationInMonth"
//                   type="number"
//                   placeholder="Duration (months)"
//                   value={formData.durationInMonth}
//                   onChange={handleChange}
//                   className="p-2 border rounded"
//                 />
//                 <input
//                   name="credits"
//                   type="number"
//                   placeholder="Credits"
//                   value={formData.credits}
//                   onChange={handleChange}
//                   className="p-2 border rounded"
//                 />
//                 <label className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     name="isActive"
//                     checked={formData.isActive}
//                     onChange={handleChange}
//                   />
//                   Active
//                 </label>
//                 <button
//                   className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                   onClick={handleSubmit}
//                 >
//                   {editingSub ? "Update" : "Add"} Subscription
//                 </button>
//               </div>
//             </Modal>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminSubscriptionManagement;

