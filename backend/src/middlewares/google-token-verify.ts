import { OAuth2Client } from "google-auth-library";
import { IGoogleTokenRequestBody } from "../interfaces/common/IgoogleTokenRequestBody";
import { NextFunction, Request,Response } from "express";
import { commonErrors } from "../messages/common-errors";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)




export const googleTokenVerify  = async(req:Request<{},{},IGoogleTokenRequestBody>,res:Response,next:NextFunction)=>{
  try {
    const {token,role} = req.body
    const ticket = await client.verifyIdToken({
        idToken:token,
        audience:process.env.GOOGLE_CLIENT_ID
    })
    const payload =   ticket.getPayload()
    if(!payload){
        res.status(400).json({success:false,message:commonErrors.INVALID_GOOGLE_TOKEN})
        return 
    }
    const {email,sub:googleId} = payload
    res .locals.user = {email,role,googleId}
    next()
  } catch (error) {
    console.log(error)
    res.status(400).json({success:false,message:commonErrors.INVALID_GOOGLE_TOKEN})
  }
}