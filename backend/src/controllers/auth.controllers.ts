import type { Request,Response } from "express";
import dotenv from "dotenv"
dotenv.config()
import {prisma} from '../lib/prisma.js'
import jwt from 'jsonwebtoken'
import {sendEmailRegisterNodeMailer,sendEmailResetPasswordNodeMailer,sendEmailChangeEmailNodeMailer,sendEmailConfirmNewEmail} from "../services/nodemailer-email.js";
import { compare } from "bcrypt";
import { hashPassword } from "../utils/hashPassword.js";
import { createAuthToken } from "../utils/createAuthToken.js"
import {cloudinary} from '../configs/cloudinary.config.js'

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

        await prisma.activeToken.create({
            data: { token: registrationToken, type: "REGISTER" }
        })

        await sendEmailRegisterNodeMailer(registrationToken,email)
        return res.status(200).json({message:"Email sent successfully"})
    }catch(err){
        res.status(500).json({message:err})
    }
}

export const verifyRegistrationToken = async(req:Request,res:Response) => {
    try{
        const {token} = req.body;
        
        const activeToken = await prisma.activeToken.findUnique({
            where: { token }
        })
        if(!activeToken){
            return res.status(400).json({message:"Token sudah dipakai atau tidak valid"})
        }
        
        const decoded = verify(token, jwtSecret);
        
        await prisma.activeToken.delete({ where: { token } })
        
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

            if(!user.password){
                return res.status(400).json({message:"Please login with Google"})
            }

            const isPasswordMatch = await compare(password,user.password)

            if(!isPasswordMatch){
                return res.status(400).json({message:"Invalid password"})
            }

            const token = createAuthToken({id:user.id,role:user.role})

            return res.status(200).send({
                success:true,
                token,
                user:{
                    email:user.email,
                    name:user.name,
                    role:user.role,
                    profilePicture: user.profilePicture
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

export const changeEmailSendEmail = async(req:Request,res:Response) => {
    try{
        const userId = (req as any).user.id
        
        const user = await prisma.user.findUnique({
            where: { id: userId }
        })
        
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        
        const changeEmailToken = sign(
            {userId: user.id, currentEmail: user.email},
            jwtSecret,
            {expiresIn:"1h"}
        )

        await prisma.activeToken.create({
            data: { token: changeEmailToken, type: "CHANGE_EMAIL" }
        })

        await sendEmailChangeEmailNodeMailer(changeEmailToken, user.email)
        return res.status(200).json({message:"Email sent successfully"})
    }catch(err){
        res.status(500).json({message:err})
    }
}

export const verifyChangeEmailToken = async(req:Request,res:Response) => {
    try{
        const {token} = req.body;

        const activeToken = await prisma.activeToken.findUnique({
            where: { token }
        })
        if(!activeToken){
            return res.status(400).json({message:"Token sudah dipakai atau tidak valid"})
        }
        
        const decoded = verify(token, jwtSecret);
        
        await prisma.activeToken.delete({ where: { token } })
        
        console.log(decoded)
        return res.status(200).json({decoded})
    }catch(err){
        res.status(500).json({message:"Invalid or expired token"})
    }
}

export const changeEmail = async(req:Request,res:Response) => {
    try{
        const {userId, newEmail} = req.body;
        
        if(!userId || !newEmail){
            return res.status(400).json({message:"User ID and new email are required"})
        }
        
        const existingUser = await prisma.user.findUnique({
            where: { email: newEmail }
        })
        
        if(existingUser){
            return res.status(400).json({message:"Email already in use"})
        }

        const confirmToken = sign(
            {userId, newEmail},
            jwtSecret,
            {expiresIn:"1h"}
        )
        
        await prisma.activeToken.create({
            data: { token: confirmToken, type: "CONFIRM_EMAIL" }
        })
        
        await sendEmailConfirmNewEmail(confirmToken, newEmail)
        
        return res.status(200).json({
            success: true,
            message: "Confirmation email sent to your new email address. Please check your inbox."
        })
    }catch(err){
        res.status(500).json({message:err})
    }
}

export const confirmChangeEmail = async(req:Request,res:Response) => {
    try{
        const {token} = req.body;
        
        if(!token){
            return res.status(400).json({message:"Token is required"})
        }
        
        const activeToken = await prisma.activeToken.findUnique({
            where: { token }
        })
        if(!activeToken){
            return res.status(400).json({message:"Token sudah dipakai atau tidak valid"})
        }
        
        const decoded = verify(token, jwtSecret) as {userId: string, newEmail: string}
        
        const existingUser = await prisma.user.findUnique({
            where: { email: decoded.newEmail }
        })
        
        if(existingUser){
            return res.status(400).json({message:"Email already in use"})
        }

        const user = await prisma.user.update({
            where: { id: decoded.userId },
            data: { email: decoded.newEmail }
        })
        
        await prisma.activeToken.delete({ where: { token } })
        
        return res.status(200).json({
            success: true,
            message: "Email changed successfully",
            user: {
                email: user.email,
                name: user.name
            }
        })
    }catch(err){
        res.status(500).json({message:"Invalid or expired token"})
    }
}

export const forgotPasswordSendEmail = async(req:Request,res:Response) => {
    
    const {email} = req.body;
    try{

        if(!email){
            return res.status(400).json({message:"Email is required"})
        }

        const user = await prisma.user.findUnique({
            where: { email }
        })

        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        if(user.provider === "GOOGLE"){
             return res.status(400).json({message:"Email is registered with Google. Please login with Google."})
        }

        const resetToken = sign(
            { email },
            jwtSecret,
            { expiresIn: "1h" }
        );

        await prisma.activeToken.create({
            data: { token: resetToken, type: "RESET_PASSWORD" }
        })

        await sendEmailResetPasswordNodeMailer(resetToken,email)
        return res.status(200).json({message:"Email sent successfully"})
    }catch(err){
        res.status(500).json({message:err})
    }
}

export const resetPasswordSendEmail = async(req:Request,res:Response) => {
    
    const {email} = req.body;
    try{

        if(!email){
            return res.status(400).json({message:"Email is required"})
        }

        const resetToken = sign(
            { email },
            jwtSecret,
            { expiresIn: "1h" }
        );

        await prisma.activeToken.create({
            data: { token: resetToken, type: "RESET_PASSWORD" }
        })

        await sendEmailResetPasswordNodeMailer(resetToken,email)
        return res.status(200).json({message:"Email sent successfully"})
    }catch(err){
        res.status(500).json({message:err})
    }
}

export const verifyResetPasswordToken = async(req:Request,res:Response) => {
    try{
        const {token} = req.body;
        
        const activeToken = await prisma.activeToken.findUnique({
            where: { token }
        })
        if(!activeToken){
            return res.status(400).json({message:"Token sudah dipakai atau tidak valid"})
        }
        
        const decoded = verify(token, jwtSecret);
        
        await prisma.activeToken.delete({ where: { token } })
        
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

export const googleRegister = async(req:Request,res:Response) => {
    try{
        const {email, name, profilePicture, role} = req.body;
        
        if(!email || !name || !role){
            return res.status(400).json({message:"Email, name, and role is required"})
        }

        let user = await prisma.user.findUnique({
            where: { email }
        })

        if(user){
            const token = createAuthToken({id:user.id, role:user.role})
            
            res.cookie("authToken", token, {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });

            return res.status(200).json({
                success: true,
                message: "Login berhasil",
                user: {
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    profilePicture: user.profilePicture
                }
            })
        }

        user = await prisma.user.create({
            data:{
                email,
                name,
                password: "", 
                role,
                profilePicture: profilePicture || null,
                isVerified: true, 
                provider: "GOOGLE"
            }
        })

        const token = createAuthToken({id:user.id, role:user.role})
        
        res.cookie("authToken", token, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
            success: true,
            message: "Registrasi berhasil",
            user: {
                email: user.email,
                name: user.name,
                role: user.role,
                profilePicture: user.profilePicture
            }
        })
    }catch(err){
        console.error(err)
        res.status(500).json({message: "Terjadi kesalahan saat registrasi"})
    }
}

export const googleLogin = async(req:Request,res:Response) => {
    try{
        const {email, name, profilePicture} = req.body;
        
        if(!email){
            return res.status(400).json({message:"Email is required"})
        }

        const user = await prisma.user.findUnique({
            where: { email }
        })

        if(!user){
            return res.status(404).json({
                success: false,
                message: "Akun belum terdaftar. Silakan register terlebih dahulu."
            })
        }

        const token = createAuthToken({id:user.id, role:user.role})
        
        res.cookie("authToken", token, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "Login berhasil",
            user: {
                email: user.email,
                name: user.name,
                role: user.role,
                profilePicture: user.profilePicture
            }
        })
    }catch(err){
        console.error(err)
        res.status(500).json({message: "Terjadi kesalahan saat login"})
    }
}

export const updateProfile = async(req:Request,res:Response) => {
    try{
        const userId = (req as any).user.id;
        const {name} = req.body;
        const file = req.file;
        
        let updateData: any = {};
        
        if(name) updateData.name = name;
        
        if(file) {
            const cloudinaryImage = await cloudinary.uploader.upload(file.path);
            updateData.profilePicture = cloudinaryImage.secure_url;
        }
        
        const user = await prisma.user.update({
            where: { id: userId },
            data: updateData
        });
        
        return res.status(200).json({
            success: true,
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                profilePicture: user.profilePicture
            }
        });
    }catch(err){
        console.error(err)
        res.status(500).json({message: "Terjadi kesalahan saat update profile"})
    }
}