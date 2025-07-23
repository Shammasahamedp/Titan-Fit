import * as yup from 'yup'

export const trainerProfileEditSchema = yup.object().shape({
    name:yup.string().required('Name is required'),
    email:yup.string().required(),
    gender:yup.string().required('Gender is required'),
    age:yup.number()    .transform((value, originalValue) => originalValue === '' ? undefined : Number(value))
.typeError('Age must be a number')
    .min(20,'Age must be above 20')
.max(50,'Age must be below 50')
    .positive('Age must be a positive number')
    .integer('Age must be a whole number')
    .required('Age is required'),
    phone:yup.string().required('Phone number is required')
    .matches(
        /^(\+91)?\d{10}$/,
      "Phone number must be 10 digits (with optional +91)"
    ),
   yearsOfExperience:yup.number()    .transform((value, originalValue) => originalValue === '' ? undefined : Number(value))
.max(25,'Experience must be below 25 years')
     .positive("Must be a positive value")
     .required("Years of experience is required"),
    
     bio:yup.string().required("Bio is required")
     .test("minWords","Enter at least two words",(value:any)=>{
       if(!value){
         return false
       }
       return value?value.trim().split(/\s+/).length>=2:false
     })
    
})