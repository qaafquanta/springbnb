import dotenv from "dotenv";
dotenv.config();
import { prisma } from '../lib/prisma.js';
import jwt from 'jsonwebtoken';
import { sendEmailRegisterNodeMailer, sendEmailResetPasswordNodeMailer } from "../services/nodemailer-email.js";
import { compare } from "bcrypt";
import { hashPassword } from "../utils/hashPassword.js";
import { createAuthToken } from "../utils/createAuthToken.js";
import { cloudinary } from '../configs/cloudinary.config.js';
const sign = jwt.sign;
const verify = jwt.verify;
const jwtSecret = process.env.JWT_SECRET || "";
export const sendEmailRegister = async (req, res) => {
    const { email, role } = req.body;
    console.log('EMAIL', email);
    console.log('ROLE', role);
    console.log("JWTSECRET", jwtSecret);
    try {
        if (!email || !role) {
            console.log('gaada email atau gaada role');
            return res.status(400).json({ message: "Email and role is required" });
        }
        const registrationToken = sign({ email, role }, jwtSecret, { expiresIn: "1h" });
        await sendEmailRegisterNodeMailer(registrationToken, email);
        return res.status(200).json({ message: "Email sent successfully" });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};
export const verifyRegistrationToken = async (req, res) => {
    try {
        const { token } = req.body;
        const decoded = verify(token, jwtSecret);
        console.log(decoded);
        return res.status(200).json({ decoded });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};
export const register = async (req, res) => {
    try {
        const { email, name, password, role } = req.body;
        if (!email || !name || !password || !role) {
            return res.status(400).json({ message: "Email, name, password and role is required" });
        }
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: await hashPassword(password),
                role
            }
        });
        return res.status(200).json({ message: "User created successfully" });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password is required" });
        }
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        if (!user.password) {
            return res.status(400).json({ message: "Please login with Google" });
        }
        const isPasswordMatch = await compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = createAuthToken({ id: user.id, role: user.role });
        res.cookie("authToken", token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 hari
        });
        return res.status(200).send({
            success: true,
            result: {
                email: user.email,
                name: user.name,
                role: user.role
            }
        });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};
export const authCheck = async (req, res) => {
    try {
        const userId = req.user.id;
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
    }
    catch (err) {
        res.status(500).json({ message: "User not found" });
    }
};
export const logout = async (req, res) => {
    res.clearCookie("authToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });
    return res.status(200).json({ message: "Logout successfully" });
};
export const resetPasswordSendEmail = async (req, res) => {
    const { email } = req.body;
    console.log('EMAIL', email);
    console.log("JWTSECRET", jwtSecret);
    try {
        if (!email) {
            console.log('gaada email atau gaada role');
            return res.status(400).json({ message: "Email and role is required" });
        }
        const registrationToken = sign({ email }, jwtSecret, { expiresIn: "1h" });
        await sendEmailResetPasswordNodeMailer(registrationToken, email);
        return res.status(200).json({ message: "Email sent successfully" });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};
export const verifyResetPasswordToken = async (req, res) => {
    try {
        const { token } = req.body;
        const decoded = verify(token, jwtSecret);
        console.log(decoded);
        return res.status(200).json({ decoded });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};
export const resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password is required" });
        }
        const user = await prisma.user.update({
            where: {
                email
            },
            data: {
                password: await hashPassword(password),
            }
        });
        return res.status(200).json({ message: "Password reset successfully" });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};
// Google OAuth Registration
export const googleRegister = async (req, res) => {
    try {
        const { email, name, profilePicture, role } = req.body;
        if (!email || !name || !role) {
            return res.status(400).json({ message: "Email, name, and role is required" });
        }
        // Cek apakah user sudah ada
        let user = await prisma.user.findUnique({
            where: { email }
        });
        if (user) {
            // User sudah ada, langsung login
            const token = createAuthToken({ id: user.id, role: user.role });
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
            });
        }
        // Buat user baru (tanpa password karena pakai Google)
        user = await prisma.user.create({
            data: {
                email,
                name,
                password: "", // Kosong karena pakai Google OAuth
                role,
                profilePicture: profilePicture || null,
                isVerified: true, // Google account sudah verified
                provider: "GOOGLE"
            }
        });
        const token = createAuthToken({ id: user.id, role: user.role });
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
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Terjadi kesalahan saat registrasi" });
    }
};
// Google OAuth Login (untuk user yang sudah terdaftar)
export const googleLogin = async (req, res) => {
    try {
        const { email, name, profilePicture } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        // Cari user berdasarkan email
        const user = await prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            // User belum terdaftar, suruh register dulu
            return res.status(404).json({
                success: false,
                message: "Akun belum terdaftar. Silakan register terlebih dahulu."
            });
        }
        const token = createAuthToken({ id: user.id, role: user.role });
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
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Terjadi kesalahan saat login" });
    }
};
// Update Profile
export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name } = req.body;
        const file = req.file;
        let updateData = {};
        if (name)
            updateData.name = name;
        if (file) {
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
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Terjadi kesalahan saat update profile" });
    }
};
//# sourceMappingURL=auth.controllers.js.map