
import React, { useState }  from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { trainerRejectionEmailSchema } from '@/schemas/trainer-rejection-mail.schema';

interface IConfirmPasswordModalProps {
    onClose:()=>void;
    confirmToProceed: (reason?:string)=>void;
    needTextField?:boolean
}
interface TrainerRejectionReason{
  reason?:string
}

const ConfirmModal: React.FC<IConfirmPasswordModalProps> = ({ onClose ,confirmToProceed ,needTextField=true}) => {

  const handleSubmitYes = async () => {
    console.log('clicked this is handle yes')
    confirmToProceed(reason)
  };

  const [reason,setReason] = useState('')
  const {register,handleSubmit,formState:{errors}} = useForm<TrainerRejectionReason>({resolver:yupResolver(trainerRejectionEmailSchema),context:{needTextField}})
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-white/10 rounded-lg shadow-xl max-w-md w-full animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-white/10">
          <h3 className="text-lg font-semibold text-[#FFC436]">
            Confirm 
          </h3>
          <button 
            onClick={onClose}
            className="rounded-full p-1 hover:bg-white/10 transition-colors text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p>Mail</p>
        {needTextField&&
          <textarea  id="" {...register('reason')} onChange={(e)=>{setReason(e.target.value)}} className='border w-full h-20'>

          </textarea>}
          {errors.reason?.message&& (
            <p className='text-red-600'>{errors.reason?.message}</p>
          )}
          <p className="text-white/70 mb-4">
Are you sure to proceed ?...          </p>
          
         
        </div>

        {/* Footer */}
        <div className="p-2 border-t border-white/10 flex justify-evenly space-x-3">
          <button
            onClick={onClose}
            className="mt-4 mx-4 bg-[#FFC436]  text-black px-4 py-2 rounded hover:bg-black hover:text-[#FFC436]"
          >
            No
          </button>
          <button
            onClick={handleSubmit(handleSubmitYes)}
            className="mt-4 mx-4 bg-[#FFC436]  text-black px-4 py-2 rounded hover:bg-black hover:text-[#FFC436]"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;