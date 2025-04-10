import crypto from 'crypto'

export const generateToken = ()=>{
    return crypto.randomBytes(37).toString('hex')
}