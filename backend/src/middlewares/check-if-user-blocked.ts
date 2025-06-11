import { NextFunction, Request,Response } from "express"
import { UserRepository } from "../repositories/user/userRepository"
import { TrainerRepository } from "../repositories/trainer/trainerRepository"


const userRepo = new UserRepository()
const trainerRepo  =  new TrainerRepository()
export const checkIfUserBlocked = async(req:Request,res:Response,next:NextFunction)=>{
   try {
      const {userId} = res.locals?.user
     
      if(!userId){
        res.status(401).json({success:false,message:'user id not found'})
        return
      }
      const user = await userRepo.findById(userId)
      if(!user){
          res.status(401).json({success:false,message:'user is not found'})
          return
      }
      if(user.blocked){
         res.status(403).json({success:false,message:'user is blocked , contact admin',role:'user'})
         return 
      }
      next()
   } catch (error) {
    console.log(error)
      res.status(403).json({success:false,message:'user is blocked'})
   }
}

export const checkIfTrainerBlocked = async(req:Request,res:Response,next:NextFunction)=>{
    try {
       const {userId} = res.locals?.user
       if(!userId){
         res.status(401).json({success:false,message:'trainer id not found'})
         return
       }
       const trainer = await trainerRepo.findById(userId)
       if(!trainer){
           res.status(401).json({success:false,message:'trainer is not found'})
           return
       }
       if(trainer.blocked){
          res.status(403).json({success:false,message:'trainer is blocked , contact admin',role:'trainer'})
          return 
       }
       next()
    } catch (error) {
     console.log(error)
       res.status(403).json({success:false,message:'trainer is blocked'})
    }
 }

 export const checkIfTrainerApproved = async (req:Request,res:Response,next:NextFunction)=>{
   try {
      const {userId} = res.locals.user
      if(!userId){
                  res.status(401).json({success:false,message:'trainer not found'})
          return 
      }
       const trainer = await trainerRepo.findById(userId)
       if(!trainer){
           res.status(401).json({success:false,message:'trainer is not found'})
           return
       }
       if(!trainer.approved){
          res.status(403).json({success:false,message:'Admin has rejected , check the mail for further details..',role:'trainer',approved:false})
          return 
       }
       next()
   } catch (error) {
             res.status(403).json({success:false,message:'trainer is blocked'})

   }
 }