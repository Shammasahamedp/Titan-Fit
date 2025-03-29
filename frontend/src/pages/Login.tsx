import { Link, useNavigate } from "react-router-dom";
import InputField from "@/components/common/InputField";
import { CredentialResponse,GoogleLogin } from "@react-oauth/google";
import { LoginFormInput } from "@/interfaces/IloginFormInput";
import { loginSchema } from "@/schemas/login-schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { googleLogin, login } from "@/api/auth";
import { ToastContainer } from "react-toastify";
import { showSuccessToast, showErrorToast } from "@/utils/toast";
import SelectField from "@/components/common/SelectField";
import { useDispatch, useSelector } from "react-redux";
import { logingStart, loginSuccess,loginFailure } from "@/reduxStore/slices/user-slice";
import { trainerLoginFailure, trainerLoginStart,trainerLoginSuccess } from "@/reduxStore/slices/trainer-slice";
import { RootState } from "@/reduxStore/store";
import { commonErrors } from "@/messages/common-error";
export default function Login() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { userLoading } = useSelector((state: RootState) => state.user);
  const { trainerLoading } = useSelector((state: RootState) => state.trainer);
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<LoginFormInput>({ resolver: yupResolver(loginSchema) });
  const onSubmit = async (data: LoginFormInput) => {
    try {
      if(data.role === 'user'){
       
        dispatch(logingStart());
        console.log("clicked", userLoading);
        const response = await login(data);
        console.log("clicked", userLoading);
        console.log(response);
        if (response?.data.success) {
          const {_id,name,email} = response.data.data.user
          dispatch(
            loginSuccess({
              user: {_id,name,email,role:'user'},
              token: response.data.data.accessToken,
            })
          );
  
          showSuccessToast(response.data.message);
          navigate('/user/home')
        }
      }else if(data.role === 'trainer'){
        
        dispatch(trainerLoginStart());
        console.log("clicked", trainerLoading);
        const response = await login(data);
        console.log("clicked", trainerLoading);
        console.log(response);
        if (response?.data.success) {
          const {_id,name,email} = response.data.data.trainer
          dispatch(
            trainerLoginSuccess({
              trainer: {_id,name,email,role:'trainer'},
              token: response.data.data.accessToken,
            })
          );
  
          showSuccessToast(response.data.message);
        }
      }
     
    } catch (error: any) {
     
      if(data.role === 'user'){
        if(!error.response){
          dispatch(loginFailure(commonErrors.NETWORK_ISSUE))
          showErrorToast(commonErrors.NETWORK_ISSUE)
        }
        console.log('this is error',error)
        dispatch(loginFailure(error?.response.data.message))
      }else if(data.role === 'trainer'){
        if(!error.response){
          dispatch(trainerLoginFailure(commonErrors.NETWORK_ISSUE))
          showErrorToast(commonErrors.NETWORK_ISSUE)
        }
        dispatch(trainerLoginFailure(error?.response.data.message))
      }
      showErrorToast(error?.response.data.message);
    }
  };
  const handleGoogleSignin = async (response:CredentialResponse)=>{
    const role=watch('role')
    try {

      const idToken = response.credential
      console.log('this is token',idToken)
      
      if(!role){
        setError('role',{type:'manual',message:'you should select the role to proceed'})
        return 
      }
      console.log(role)
   if(idToken){
    const tokenResponse= await googleLogin(idToken,role)
    console.log(tokenResponse)
    if(role === 'user'){
      dispatch(logingStart())
      if(tokenResponse?.data.success){
        const {_id,name,email} = tokenResponse.data.data.user
        dispatch(loginSuccess({
            user:{_id,name,email,role:'user'},
            token:tokenResponse.data.data.accessToken
        }))
        showSuccessToast(tokenResponse.data.data.message)
        navigate('/user/home')
        
     }
    }else if(role === 'trainer'){
      dispatch(trainerLoginStart())
      if(tokenResponse?.data.success){
        const {_id,name,email} = tokenResponse.data.data.trainer
        dispatch(trainerLoginSuccess({
          trainer:{_id,name,email,role:'trainer'},
          token:tokenResponse.data.data.accessToken
        }))

        showSuccessToast(tokenResponse.data.data.message)
        navigate('/trainer/dashboard')
      }
    }
    
   }
    

    } catch (error:any) {
       if(role==='user'){
        if(!error.response){
          dispatch(loginFailure(commonErrors.NETWORK_ISSUE))
          showErrorToast(commonErrors.NETWORK_ISSUE)
         }
         dispatch(loginFailure(error?.response.data.message))
       }else if(role === 'trainer'){
        if(!error.response){
          dispatch(trainerLoginFailure(commonErrors.NETWORK_ISSUE))
          showErrorToast(commonErrors.NETWORK_ISSUE)
         }
         dispatch(trainerLoginFailure(error?.response.data.data.message))
       }
       showErrorToast(error?.response.data.data.message)
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
          register={register("password")}
          error={errors.password?.message}
        />
        {/* Role input */}
        <SelectField
          label="Role"
          options={[
            { value: "user", label: "I am a user" },
            { value: "trainer", label: "I am a trainer" },
          ]}
          register={register("role")}
          error={errors.role?.message}
        />
        {/* Forgot Password */}
        <div className="flex justify-center items-center mt-4 text-sm">
          <Link to="/forgotpassword" className="text-black hover:underline">
            Forgot password?
          </Link>
        </div>
       
        <button
          disabled={userLoading||trainerLoading}
          onClick={handleSubmit(onSubmit)}
          className="w-full bg-black text-white py-2 mt-6 rounded-lg hover:bg-gray-700 transition"
        >
          {userLoading||trainerLoading? "Logging in..." : "Sign In"}
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Google Login */}

        <GoogleLogin  onSuccess={handleGoogleSignin} onError={()=>console.log('error ocuured')} />

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-black hover:underline">
            Sign up
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}
