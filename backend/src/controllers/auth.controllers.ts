import type { Request,Response } from "express";
import dotenv from "dotenv"
dotenv.config()
import {prisma} from '../lib/prisma.js'
import jwt from 'jsonwebtoken'
import {sendEmailRegisterNodeMailer,sendEmailResetPasswordNodeMailer} from "../services/nodemailer-email.js";
import { compare } from "bcrypt";
import { hashPassword } from "../utils/hashPassword.js";
import { createAuthToken } from "../utils/createAuthToken.js"

const sign = jwt.sign
const verify = jwt.verify
const jwtSecret = process.env.JWT_SECRET || ""

export const sendEmailRegister = async(req:Request,res:Response) => {
    
    const {email,role} = req.body;
    console.log('EMAIL',email)
    console.log('ROLE',role)
    console.log("JWTSECRET",jwtSecret)
    try{

        if(!email || !role){
            console.log('gaada email atau gaada role')
            return res.status(400).json({message:"Email and role is required"})
        }

        const registrationToken = sign(
            { email, role },
            jwtSecret,
            { expiresIn: "1h" }
        );

        await sendEmailRegisterNodeMailer(registrationToken,email)
        return res.status(200).json({message:"Email sent successfully"})
    }catch(err){
        res.status(500).json({message:err})
    }
}

export const verifyRegistrationToken = async(req:Request,res:Response) => {
    try{
        const {token} = req.body;
        const decoded = verify(token, jwtSecret);
        console.log(decoded)
        return res.status(200).json({decoded})
    }catch(err){
        res.status(500).json({message:err})
    }
}

export const register = async(req:Request,res:Response) => {
    try{
        const {email,name,password,role} = req.body;
        if(!email || !name || !password || !role){
            return res.status(400).json({message:"Email, name, password and role is required"})
        }

        const user = await prisma.user.create({
            data:{
                email,
                name,
                password: await hashPassword(password),
                role
            }
        })
        return res.status(200).json({message:"User created successfully"})
    }catch(err){
        res.status(500).json({message:err})
    }
}

export const login = async(req:Request,res:Response) => {
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"Email and password is required"})
        }

        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })

        if(!user){
            return res.status(400).json({message:"User not found"})
        }

        const isPasswordMatch = await compare(password,user.password)

        if(!isPasswordMatch){
            return res.status(400).json({message:"Invalid password"})
        }

        const token = createAuthToken({id:user.id,role:user.role})

        res.cookie("authToken", token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 hari
        });

        return res.status(200).send({
            success:true,
            result:{
                email:user.email,
                name:user.name,
                role:user.role
            }
        })

    }catch(err){
        res.status(500).json({message:err})
    }
}

export const authCheck = async(req:Request,res:Response) => {
    try{
    const userId = (req as any).user.id;
    const user = await prisma.user.findUnique({ where: { id: userId } });

    return res.status(200).json({
            success: true,
            user: {
            name: user?.name,
            email: user?.email,
            role: user?.role,
            profilePicture: user?.profilePicture
            },
    });
    }catch(err){
        res.status(500).json({message:"User not found"})
    }
}

export const logout = async(req:Request, res:Response) => {
    res.clearCookie("authToken",{
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    })
    return res.status(200).json({message:"Logout successfully"})
}

export const resetPasswordSendEmail = async(req:Request,res:Response) => {
    
    const {email} = req.body;
    console.log('EMAIL',email)
    console.log("JWTSECRET",jwtSecret)
    try{

        if(!email){
            console.log('gaada email atau gaada role')
            return res.status(400).json({message:"Email and role is required"})
        }

        const registrationToken = sign(
            { email },
            jwtSecret,
            { expiresIn: "1h" }
        );

        await sendEmailResetPasswordNodeMailer(registrationToken,email)
        return res.status(200).json({message:"Email sent successfully"})
    }catch(err){
        res.status(500).json({message:err})
    }
}

export const verifyResetPasswordToken = async(req:Request,res:Response) => {
    try{
        const {token} = req.body;
        const decoded = verify(token, jwtSecret);
        console.log(decoded)
        return res.status(200).json({decoded})
    }catch(err){
        res.status(500).json({message:err})
    }
}

export const resetPassword = async(req:Request,res:Response) => {
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"Email and password is required"})
        }

        const user = await prisma.user.update({
            where:{
                email
            },
            data:{
                password: await hashPassword(password),
            }
        })
        return res.status(200).json({message:"Password reset successfully"})
    }catch(err){
        res.status(500).json({message:err})
    }
}