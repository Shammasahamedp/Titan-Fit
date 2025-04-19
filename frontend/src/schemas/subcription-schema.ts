import * as yup from 'yup'

export const subscriptionSchema = yup.object().shape({
    planName:yup.string().required('Name is required'),
    price:yup.number().positive('Price must be a positive value').integer('Must be a whole number').required('Price is required'),
    description:yup.string().required("Bio is required")
    .test("minWords","Enter at least five words",(value:any)=>{
      if(!value){
        return false
      }
      console.log(value)
      return value?value.trim().split(/\s+/).length>=5:false
    }
  ),
    durationInMonth:yup.number().positive('Must be a positive number').integer('Must be a whole number').required('Duration is required'),
    credits:yup.number().positive('Must be a positive number').integer('Must be a whole number').required('Credits is required'),
    
})