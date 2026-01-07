import { Router } from "express";
import {sendEmailRegister,verifyRegistrationToken,register,login,authCheck,logout,resetPasswordSendEmail,verifyResetPasswordToken,resetPassword} from "../controllers/auth.controllers.js";
import { verifyAuthToken } from "../utils/verifyAuthToken.js";
// import authMiddleware from 

const router = Router();
router.post('/send-email',sendEmailRegister);
router.post('/token-verification',verifyRegistrationToken)
router.post('/register',register)
router.post('/login',login)
router.get('/auth-check',verifyAuthToken,authCheck)
router.post('/logout',logout)
router.post('/reset-password-send-email',resetPasswordSendEmail)
router.post('/verify-reset-password-token',verifyResetPasswordToken)
router.post('/reset-password',resetPassword)

export default router;