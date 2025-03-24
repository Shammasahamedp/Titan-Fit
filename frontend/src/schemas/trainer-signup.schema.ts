import * as yup from "yup";

export const trainerSignupSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password:yup
  .string()
  .min(8,'Password must be at least 8 characters')
  .required("Password is required"),
  confirmPassword:yup
  .string()
  .oneOf([yup.ref("password")],"password must match")
  .required("Confirm password is required"),
  gender:yup.string().required("Gender is required"),
  age:yup.number()
  .positive("Age must be a positive number")
  .integer("Age must be a whole number")
  .required("Age is required"),
  yearsOfExperience:yup.number()
  .positive("Must be a positive value")
  .required("Years of experience is required"),
  trainerCertificate:yup.mixed<FileList>()
  .required('PDF File is required')
  .test("FileListType","Only pdf FileLists are allowed",(value)=>{
    if(!value){
      return false
      
    }
    return value instanceof  FileList &&value.length === 1 && value[0].type==="application/pdf"
    
  }).test("FileListSize","FileList size must be less than 5MB",(value)=>{
    if(!value[0]){
      return false
    }
    return value instanceof FileList&&value[0].size <= 5*1024*1024
    
  }),
  bio:yup.string().required("Bio is required")
  .test("minWords","Enter at least two words",(value:any)=>{
    if(!value){
      return false
    }
    console.log(value)
    return value?value.trim().split(/\s+/).length>=2:false
  }
)

});
