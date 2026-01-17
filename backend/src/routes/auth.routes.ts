import { Router } from "express";
import {sendEmailRegister,verifyRegistrationToken,register,login,authCheck,logout,changeEmailSendEmail,verifyChangeEmailToken,changeEmail,confirmChangeEmail,resetPasswordSendEmail,verifyResetPasswordToken,resetPassword,googleRegister,googleLogin,updateProfile, forgotPasswordSendEmail} from "../controllers/auth.controllers.js";
import { verifyAuthToken } from "../utils/verifyAuthToken.js";
import {fileUpload} from "../middlewares/file-upload.js"

const router = Router();
router.post('/send-email',sendEmailRegister);
router.post('/token-verification',verifyRegistrationToken)
router.post('/register',register)
router.post('/login',login)
router.get('/auth-check',verifyAuthToken,authCheck)
router.post('/logout',logout)

router.post('/change-email-send-email',verifyAuthToken,changeEmailSendEmail)
router.post('/verify-change-email-token',verifyChangeEmailToken)
router.post('/change-email',changeEmail)
router.post('/confirm-change-email',confirmChangeEmail)

router.post('/forgot-password-send-email', forgotPasswordSendEmail)
router.post('/reset-password-send-email',verifyAuthToken,resetPasswordSendEmail)
router.post('/verify-reset-password-token',verifyResetPasswordToken)
router.post('/reset-password',resetPassword)

router.post('/google-register',googleRegister)
router.post('/google-login',googleLogin)
router.put('/update-profile',verifyAuthToken,fileUpload.single("profilePicture"),updateProfile)

export default router;