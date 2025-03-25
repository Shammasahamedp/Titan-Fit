import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET as string
const REFRESH_SECRET = process.env.REFRESH_SECRET as string

export const generateAccessToken = (userId:string) =>{
    return jwt.sign({userId},JWT_SECRET,{expiresIn:"15m"})
}

export const generateRefreshToken = (userId:string) =>{
    return jwt.sign({userId},REFRESH_SECRET,{expiresIn:"3d"})
}

export const verifyAccessToken = (token:string) =>{
    try {
    return jwt.verify(token,JWT_SECRET)
} catch (error) {
    return null
}}

export const verifyRefreshToken = (token:string) =>{
    try {
        return jwt.verify(token,REFRESH_SECRET) as jwt.JwtPayload
    } catch (error) {
        return null
    }
}




