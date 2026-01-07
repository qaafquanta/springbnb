import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config()

interface IDataToken {
    id:string;
    role?:string;
}

const sign = jwt.sign
const secretKey = process.env.JWT_SECRET|| "secret";

export const createAuthToken = (data: IDataToken)=>{
    return sign(
        {
            id:data.id,
            role:data.role
        },
        secretKey,
        {
            expiresIn:"30d"
        }
    )
}