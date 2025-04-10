import * as yup from 'yup'

export const trainerProfileEditSchema = yup.object().shape({
    name:yup.string().required('Name is required'),
    email:yup.string().required(),
    gender:yup.string().required('Gender is required'),
    age:yup.number().typeError('Age must be a number')
    .min(20,'You must be at least 20 year old to become a trainer')
    .positive('Age must be a positive number')
    .integer('Age must be a whole number')
    .required('Age is required'),
    phone:yup.string().required('Phone number is required')
    .matches(
        /^(\+91)?\d{10}$/,
      "Phone number must be 10 digits (with optional +91)"
    ),
   yearsOfExperience:yup.number()
     .positive("Must be a positive value")
     .required("Years of experience is required"),
    //  trainerCertificate:yup.mixed<FileList>()
    //  .required('PDF File is required')
    //  .test("FileListType","Only pdf FileLists are allowed",(value)=>{
    //    if(!value){
    //      return false
         
    //    }
    //    return value instanceof  FileList &&value.length === 1 && value[0].type==="application/pdf"
       
    //  }).test("FileListSize","FileList size must be less than 5MB",(value)=>{
    //    if(!value[0]){
    //      return false
    //    }
    //    return value instanceof FileList&&value[0].size <= 5*1024*1024
       
    //  }),
     bio:yup.string().required("Bio is required")
     .test("minWords","Enter at least two words",(value:any)=>{
       if(!value){
         return false
       }
       console.log(value)
       return value?value.trim().split(/\s+/).length>=2:false
     })
    
})