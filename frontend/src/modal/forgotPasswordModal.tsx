// import { IForgotPasswordModalProps } from "@/interfaces/IforgotpasswordModal"
// import { showErrorToast } from "@/utils/toast";
// import { motion } from "framer-motion";
// import { useState } from "react";

// const ForgotPasswordModal:React.FC<IForgotPasswordModalProps> = ({onClose,onSubmit}) => {
//     const [email,setEmail] = useState('')
//     const [canResend,setCanSend] = useState(true)
 

//       const handleSubmit = async ()=>{
       
//          if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
//             showErrorToast('Please enter a valid registered email')
//             return
//          }
//         //  setEmail(email)
//          setCanSend(false)
//         onSubmit(email)
        
//         setTimeout(() => {
//           // removeEmail()
//           setCanSend(true)
//         }, 30000);
        
         
//       }
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/30 bg-opacity-50 z-50">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.8 }}
//         className="bg-white p-6 rounded-2xl shadow-xl w-96"
//       >
//         <div className="flex justify-between items-center">
//           <h2 className="text-xl font-semibold">Enter Your Email</h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             ✕
//           </button>
//         </div>
//         <p className="text-gray-600 mt-2">We will sent a link to your email.</p>

//         <input
//           type="text"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-lg  text-lg tracking-widest"
//           placeholder="enter email"
//         />

//         <button
//           onClick={handleSubmit}
//           className={`mt-4 w-full bg-black py-2 rounded-lg hover:bg-gray-600 ${!canResend ? 'text-gray-500' : 'text-white'} `}
//           disabled={!canResend}
//         >
//          {canResend ? 'Send link':'Loading..'}
//         </button>
       
//       </motion.div>
//     </div>
//   )
// }

// export default ForgotPasswordModal

import { IForgotPasswordModalProps } from "@/interfaces/IforgotpasswordModal";
import { showErrorToast } from "@/utils/toast";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

const ForgotPasswordModal: React.FC<IForgotPasswordModalProps> = ({ onClose, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [canResend, setCanSend] = useState(true);

  const handleSubmit = async () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showErrorToast('Please enter a valid registered email');
      return;
    }

    setCanSend(false);
    onSubmit(email);

    setTimeout(() => {
      setCanSend(true);
    }, 30000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-black border border-white/10 rounded-lg shadow-xl max-w-md w-full"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-white/10">
          <h3 className="text-lg font-semibold text-[#FFC436]">
            Forgot Password
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
          <p className="text-white/70 mb-4">
            Please enter your registered email. We will send a reset link.
          </p>

          <div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-black/30 border rounded-lg 
                border-white/10 text-white placeholder-white/30
                focus:outline-none focus:border-warm-yellow
                transition-colors duration-200"
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-2 border-t border-white/10 flex justify-evenly space-x-3">
          <button
            onClick={onClose}
            className="mt-4 mx-4 bg-[#FFC436] text-black px-4 py-2 rounded hover:bg-black hover:text-[#FFC436]"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!canResend}
            className={`mt-4 mx-4 bg-[#FFC436] px-4 py-2 rounded 
              ${canResend ? 'text-black hover:bg-black hover:text-[#FFC436]' : 'text-gray-500 cursor-not-allowed'}
            `}
          >
            {canResend ? 'Send Link' : 'Loading...'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordModal;

