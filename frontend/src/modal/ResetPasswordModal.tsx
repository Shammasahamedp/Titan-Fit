import { IResetPasswordModalProps } from "@/interfaces/IresetPasswordModalProps";
import { showErrorToast } from "@/utils/toast";
import { motion } from "framer-motion";
import { useState } from "react";

const ResetPasswordModal:React.FC<IResetPasswordModalProps> = ({onClose,onSubmit}) => {
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
 

      const handleSubmit = async ()=>{
       
         if(!/.{8,}/.test(password)){
            showErrorToast('Password must contain atleast 8 characters')
            return
         }
         if(password !== confirmPassword){
            showErrorToast('Entered password is not matching')
            return 
         }
        
         onSubmit(password)
       
        
         
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
          <h2 className="text-xl font-semibold">Reset Password</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        <p className="text-gray-600 mt-2">Password</p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-lg  text-lg tracking-widest"
          placeholder="enter password"
        />
                <p className="text-gray-600 mt-2">Confirm password</p>

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-lg  text-lg tracking-widest"
          placeholder="enter confirm password"
        />

        <button
          onClick={handleSubmit}
          className={`mt-4 w-full bg-black py-2 rounded-lg hover:bg-gray-600  `}
        >
            Reset Password
        </button>
       
      </motion.div>
    </div>
  )
}

export default ResetPasswordModal
