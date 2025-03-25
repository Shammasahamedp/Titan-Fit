// import { Link } from "react-router-dom";
import InputField from "@/components/userComponents/InputField";
import { AdminLoginFormInput } from "@/interfaces/admin/ILoginFormInput";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { adminLoginSchema } from "@/schemas/admin-login-schema";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/reduxStore/store";
import { adminLoginStart,adminLoginFailure,adminLoginSuccess } from "@/reduxStore/slices/admin-slice";
import { adminLogin } from "@/api/auth";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { ClipLoader } from "react-spinners";
export default function AdminLogin() {
  const dispatch = useDispatch()
  const {adminLoading} = useSelector((state:RootState)=>state.admin)
   const {
    register,handleSubmit,formState:{errors},

   } = useForm<AdminLoginFormInput>({resolver:yupResolver(adminLoginSchema)})

   const onSubmit = async (data:AdminLoginFormInput)=>{
     try {
        dispatch(adminLoginStart())
        const response = await adminLogin(data)
        if(response?.data.success){
          console.log(response)
          dispatch(
            adminLoginSuccess({
              admin:response.data.data.admin,
              token:response.data.data.accessToken
            })
          )
          showSuccessToast(response?.data.message)
        }
     } catch (error:any) {
        dispatch(adminLoginFailure(error?.response.data.message))
        showErrorToast(error?.response.data.message)
     }
   }
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[url('/black-bg.jpg')] bg-cover bg-center bg-black/60">
      <img
        src="/titan-fit.png"
        alt="asdf"
        className="absolute top-6 left-6 w-24 h-auto z-10"
      />
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="bg-white z-10 shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign in
        </h2>

        {/* Email Input */}

        <InputField
          label="Email"
          type="email"
          placeholder="Enter Your Email"
         register={register("email")}
         error={errors.email?.message}
        />

        {/* Password Input */}
        <InputField
          label="Password"
          type="password"
          placeholder="Enter Your Password"
          register={register('password')}
          error={errors.password?.message}
        />
        
     
       
        <button
          className="w-full bg-black text-white py-2 mt-6 rounded-lg hover:bg-gray-700 transition"
            onClick={handleSubmit(onSubmit)}
        >
          Sign in
        </button>

        {/* Divider */}
        {/* <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div> */}

        {
          adminLoading&&(
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <ClipLoader color="#ffffff" size={50} />
      </div>
          )
        }

      </div>
      <ToastContainer />
    </div>
  );
}
