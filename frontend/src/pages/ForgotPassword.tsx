import { verifyLinkAndSetPassword } from "@/api/reset-password";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const ForgotPassword = () => {

    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const {token} = useParams<{token:string}>()
    const handleSubmit = async ()=>{
        try {
            if(password !== confirmPassword){
                showErrorToast('password doesnt match')
                return
            }
            if(password.length<8){
                showErrorToast('password must contain 8 letters')
                return 
            }
        const response = await verifyLinkAndSetPassword(password,token as string)
       if(response.data){
        showSuccessToast(response.data.message)
       }
       
        } catch (error:any) {
          showErrorToast(error)
            console.log(error)
        }
    }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="bg-white p-6 rounded-2xl shadow-xl w-96"
    >
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold">Enter New Password</h2>
        <Link to='/login'  className="text-gray-500 hover:text-gray-700 hover:underline hover:cursor-pointer">
          login or Home
        </Link>
      </div>
       <label className="text-black mt-3">Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg  text-lg tracking-widest"
        placeholder="enter new password"
      />
      <label className="text-black mt-2">Confirm Password</label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg  text-lg tracking-widest"
        placeholder="confirm password"
      />

      <button
        onClick={handleSubmit}
        className={`mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-600  `}
      >
        Submit
      </button>
     
    </motion.div>
    <ToastContainer/>
  </div>
  )
}

export default ForgotPassword
