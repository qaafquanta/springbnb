import {Resend} from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const resendx = new Resend('re_X1KwHCpg_3i2tRcbu2TH49NNqfhabfSnk');

export const sendEmailRegisterResend = async (registionToken:string,email:string) => {
    console.log('EMAIL',email)
    console.log('TOKEN',registionToken)
    try{
        const registerLink = `${process.env.FRONTEND_URL}/register/verified?token=${registionToken}`
        await resendx.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Springbnb Continue to Register',
            html: `<p>Click the link to continue to register </p><a href="${registerLink}" target="_blank" >${registerLink}</a>`
        });
        console.log(`success sending register email to ${email}`)
    }catch(err){
        console.log(err)
    }
}

export const sendEmailResetPasswordResend = async (resetPasswordToken:string,email:string) => {
    console.log('EMAIL',email)
    console.log('TOKEN',resetPasswordToken)
    try{
        const resetPasswordLink = `${process.env.FRONTEND_URL}/reset-password/verified?token=${resetPasswordToken}`
        await resendx.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Reset your Springbnb password',
            html: `<p>Click the link to reset your password </p><a href="${resetPasswordLink}" target="_blank" >${resetPasswordLink}</a>`
        });
        console.log(`success sending reset password email to ${email}`)
    }catch(err){
        console.log(err)
    }
}

export const sendEmailChangeEmailResend = async (changeEmailToken:string,currentEmail:string) => {
    console.log('EMAIL',currentEmail)
    console.log('TOKEN',changeEmailToken)
    try{
        const changeEmailLink = `${process.env.FRONTEND_URL}/change-email/verified?token=${changeEmailToken}`
        await resendx.emails.send({
            from: 'onboarding@resend.dev',
            to: currentEmail,
            subject: 'Change your Springbnb email',
            html: `<p>Click the link to change your email address </p><a href="${changeEmailLink}" target="_blank" >${changeEmailLink}</a>`
        });
        console.log(`success sending change email link to ${currentEmail}`)
    }catch(err){
        console.log(err)
    }
}

export const sendEmailConfirmNewEmailResend = async (confirmToken:string, newEmail:string) => {
    console.log('NEW EMAIL', newEmail)
    console.log('TOKEN', confirmToken)
    try{
        const confirmLink = `${process.env.FRONTEND_URL}/change-email/confirm?token=${confirmToken}`
        await resendx.emails.send({
            from: 'onboarding@resend.dev',
            to: newEmail,
            subject: 'Confirm your new Springbnb email',
            html: `<p>Click the link to confirm your new email address for Springbnb:</p><a href="${confirmLink}" target="_blank">${confirmLink}</a><p>If you did not request this change, please ignore this email.</p>`
        });
        console.log(`success sending confirm new email to ${newEmail}`)
    }catch(err){
        console.log(err)
    }
}