import { IForgotPasswordModalProps } from "@/interfaces/IforgotpasswordModal"
import { showErrorToast } from "@/utils/toast";
import { motion } from "framer-motion";
import { useState } from "react";

const ConfirmPasswordModal:React.FC<IForgotPasswordModalProps> = ({onClose,onSubmit}) => {
    const [password,setPassword] = useState('')
    const [canResend,setCanSend] = useState(true)
 

      const handleSubmit = async ()=>{
       
         if(!/.{8,}/.test(password)){
            showErrorToast('Password must contain 8 characters')
            return
         }
         setCanSend(false)
        onSubmit(password)
        
        setTimeout(() => {
          setCanSend(true)
        }, 30000);
        
         
      }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-white p-6 rounded-2xl shadow-xl w-96"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Enter Your Current Password</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-lg  text-lg tracking-widest"
          placeholder="enter your current password"
        />

        <button
          onClick={handleSubmit}
          className={`mt-4 w-full bg-black py-2 rounded-lg hover:bg-gray-600 ${!canResend ? 'text-gray-500' : 'text-white'} `}
          disabled={!canResend}
        >
         {canResend ? 'Submit':'Loading..'}
        </button>
       
      </motion.div>
    </div>
  )
}

export default ConfirmPasswordModal
