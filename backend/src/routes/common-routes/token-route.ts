import express,{Request,Response} from "express"
import { commonErrors } from "../../messages/common-errors"
import { generateAccessToken, verifyRefreshToken } from "../../utils/jwt"

const tokenRoute = express.Router()

tokenRoute.post('/refresh/:id',(req:Request,res:Response)=>{

    const refreshToken = req.cookies.refreshToken
    if(!refreshToken){
        res.status(403).json({success:false,message:commonErrors.NO_REFRESH_TOKEN})
        return 
    }
    const role = req.params.id
    console.log('this is role',role)
    const decoded = verifyRefreshToken(refreshToken)
    if(!decoded){
        res.status(403).json({success:false,message:commonErrors.INVALID_REFRESH_TOKEN,token:false})
        return 
    }
    const newAccessToken = generateAccessToken(decoded.userId,role as string)
    res.status(200).json({success:true,accessToken:newAccessToken})
})

export default tokenRoute