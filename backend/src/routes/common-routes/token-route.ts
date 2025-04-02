import express,{Request,Response} from "express"
import { commonErrors } from "../../messages/common-errors"
import { generateAccessToken, verifyRefreshToken } from "../../utils/jwt"

const tokenRoute = express.Router()

tokenRoute.post('/refresh',(req:Request,res:Response)=>{

    const refreshToken = req.cookies.refreshToken
    if(!refreshToken){
        res.status(403).json({success:false,message:commonErrors.NO_REFRESH_TOKEN})
        return 
    }
    const decoded = verifyRefreshToken(refreshToken)
    if(!decoded){
        res.status(403).json({success:false,message:commonErrors.INVALID_REFRESH_TOKEN})
        return 
    }
    const newAccessToken = generateAccessToken(decoded.userId)
    res.status(200).json({success:true,accessToken:newAccessToken})
})

export default tokenRoute