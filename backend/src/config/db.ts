import mongoose, { ConnectOptions }  from "mongoose";

const MONGO_URI:string = process.env.MONGODB_URI as string 

export const connectDB = async():Promise<void>=>{
    try {
            await mongoose.connect(MONGO_URI,{

            } as ConnectOptions)
    } catch (error) {
        console.log('error in mongoconnection',error)
    }
}