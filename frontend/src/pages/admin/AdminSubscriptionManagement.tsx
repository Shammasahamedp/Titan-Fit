
import { useState, useEffect } from "react";
import { ISubscriptionInput } from "@/interfaces/IsubscriptionInputs";
import InputField from "@/components/common/InputField";
import { useForm } from "react-hook-form";
import SelectField from "@/components/common/SelectField";
import { yupResolver } from "@hookform/resolvers/yup";
import { subscriptionSchema } from "@/schemas/subcription-schema";
import { addSubscriptionPlan, getAllSubscriptions,editSubscriptionPlan } from "@/api/subscription-apicalls";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { Button } from "@/components/ui/button";
import { ToastContainer } from "react-toastify";
const AdminSubscriptionManagement = () => {
  const [subscriptions, setSubscriptions] = useState<(ISubscriptionInput&{_id:string})[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editSubscription,setEditSubscription] = useState<ISubscriptionInput&{_id:string}|null>(null)
  const {
register,
formState:{errors},
handleSubmit,
reset
  } = useForm<ISubscriptionInput>({resolver:yupResolver(subscriptionSchema)})
  const [currentPage, setCurrentPage] = useState(1);
  const subscriptionPerPage = 3;
  const indexOfLastSubscription = currentPage * subscriptionPerPage;
  const indexOfFirstSubscription = indexOfLastSubscription - subscriptionPerPage;
  const currentSubscription = subscriptions.slice(indexOfFirstSubscription, indexOfLastSubscription);

  const totalPages = Math.ceil(subscriptions.length / subscriptionPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const fetchSubscriptions = async()=>{
    try {
        const response = await getAllSubscriptions()
    if(response?.data){
        setSubscriptions(response.data.subscriptions)
    }
    } catch (error) {
        showErrorToast(error)
    }
  }
  useEffect(() => {
    fetchSubscriptions()
  }, []);





 const onSubmit = async (data:ISubscriptionInput)=>{
    try {
      if(editSubscription){
              const response = await editSubscriptionPlan(data,editSubscription._id)
              if(response?.data.success){
                setEditSubscription(null)
                setShowModal(false)
                showSuccessToast(response.data.message)
                reset()
              }
      }else{
        const response = await addSubscriptionPlan(data)
        if(response?.data.success){
            setShowModal(false)
            showSuccessToast(response.data.message)
            
        }
      }
      fetchSubscriptions()
      
        
    } catch (error) {
        console.log(error)
        showErrorToast(error)
    }
 }

  

  return (
    <>
   

        <div className="flex-1 p-6 pt-16 md:ml-64">
          <div className="flex justify-between items-center mb-6">
            <h2 onClick={()=>setShowModal(false)} className="text-3xl font-bold">Subscription Management</h2>
            <button
              className="bg-[#FFC436] text-black px-4 py-2 mt-3  rounded hover:bg-black hover:text-[#FFC436]"
              onClick={()=>setShowModal(true)}
            >
              Add Subscription
            </button>
          </div>
          {showModal && (
             <>
             <div className="flex justify-center mb-6">
               <div className="bg-black/30 z-10 shadow-lg rounded-2xl p-8 w-full max-w-2xl">
               <button
        onClick={() => {
          setEditSubscription(null)
          reset()
          setShowModal(false)}}
        className=" top-3 right-3 text-gray-500 hover:text-black text-2xl font-bold"
      >
        &times;
      </button>
                 <h2 className="text-2xl font-bold text-center text-white">
                   Subscription
                 </h2>
                 <p className="text-center text-sm text-black mt-4"></p>
                 <div className="grid grid-cols-2 gap-4 ">
                   <InputField
                     label="Name"
                     register={register("planName")}
                     placeholder="Enter the plan name"
                     error={errors.planName?.message}
                     type="text"
                   />
                   <InputField
                     label="Price"
                     register={register("price")}
                     placeholder="Enter the price"
                     error={errors.price?.message}
                   />

                   <InputField
                     label="Description"
                     register={register("description")}
                     placeholder="Enter description"
                     error={errors.description?.message}
                     type="textarea"
                   />

                   <InputField
                     label="Duration "
                     register={register("durationInMonth")}
                     placeholder="Enter the duration in month"
                     error={errors.durationInMonth?.message}
                     type="number"
                   />
                   <InputField
                     label="Credits"
                     register={register("credits")}
                     placeholder="Enter the credits"
                     error={errors.credits?.message}
                     type="number"
                   />
                   <SelectField
                   label="Status"
                   options={
                    [
                        {label:'Active', value:true},
                        {label:'Inactive',value:false}
                    ]
                   }
                   register={register('isActive')}
                   
                   error={errors.isActive?.message}
                   />
                 </div>

                 <div className="flex justify-center">
                   <button
                     onClick={handleSubmit(onSubmit)}
                     className="w-1/3   text-black py-2 mt-6 rounded-lg bg-[#FFC436] hover:text-[#FFC436] hover:bg-black transition"
                   >
                    { editSubscription ? 'Edit':'Add'}
                   </button>
                 </div>
               </div>
             </div>
           </>
          )}
          {!showModal &&
          <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentSubscription.map((sub, index) => (
              <div
                key={index}
                className="bg-black/50 text-white rounded-lg border border-gray-700 shadow-lg p-4 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold mb-2">{sub.planName}</h3>
                  <p><strong>Price:</strong> ₹{sub.price}</p>
                  <p><strong>Description:</strong> {sub.description}</p>
                  <p><strong>Duration:</strong> {sub.durationInMonth} month(s)</p>
                  <p><strong>Credits:</strong> {sub.credits}</p>
                  <p><strong>Status:</strong> {sub.isActive ? "Active" : "Inactive"}</p>
                </div>
                <div className="flex justify-center">
                  <Button
                  className="mt-4 w-1/4 bg-[#FFC436] text-black hover:bg-black hover:text-[#FFC436]"
                  onClick={() =>
                    {
                      setEditSubscription(sub)
                      reset(sub)
                      setShowModal(true)}}
                >
                  Edit
                </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
        <button
          onClick={prevPage}
          className="px-4 py-2 bg-[#FFC436] hover:bg-black hover:text-[#FFC436] text-black rounded mr-2"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-[#FFC436] hover:bg-black hover:text-[#FFC436] text-black rounded">
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          className="px-4 py-2 bg-[#FFC436] hover:bg-black hover:text-[#FFC436] text-black rounded ml-2"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
          </>
          }

         
        </div>
   
    <ToastContainer/>
     </>
  );
};

export default AdminSubscriptionManagement;

