import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const sendEmailRegisterNodeMailer = async (registionToken:string,email:string) => {
    console.log('EMAIL',email)
    console.log('TOKEN',registionToken)
    try{
        
    const registerLink = `${process.env.FRONTEND_URL}/register/verified?token=${registionToken}`
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kimhakka7@gmail.com',
            pass: 'xirn kmbm lakc oqwb'
        }
    }); 

    const mailOptions = {
        from: 'kimhakka7@gmail.com',
        to: email,
        subject: 'Test Email',
        text: 'This is a test email sent using Nodemailer.',
        html: `<p>Click the link to continue to register </p><a href="${registerLink}" target="_blank" >${registerLink}</a>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}catch(err){
    console.log(err)
}
}

export const sendEmailResetPasswordNodeMailer = async (resetPasswordToken:string,email:string) => {
    console.log('EMAIL',email)
    console.log('TOKEN',resetPasswordToken)
    try{
        
    const resetPasswordLink = `${process.env.FRONTEND_URL}/reset-password/verified?token=${resetPasswordToken}`
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kimhakka7@gmail.com',
            pass: 'xirn kmbm lakc oqwb'
        }
    }); 

    const mailOptions = {
        from: 'kimhakka7@gmail.com',
        to: email,
        subject: 'Reset your Springbnb password',
        text: 'Click the link to reset your password.',
        html: `<p>Click the link to reset your password </p><a href="${resetPasswordLink}" target="_blank" >${resetPasswordLink}</a>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}catch(err){
    console.log(err)
}
}

export const sendEmailChangeEmailNodeMailer = async (changeEmailToken:string,currentEmail:string) => {
    console.log('EMAIL',currentEmail)
    console.log('TOKEN',changeEmailToken)
    try{
        
    const changeEmailLink = `${process.env.FRONTEND_URL}/change-email/verified?token=${changeEmailToken}`
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kimhakka7@gmail.com',
            pass: 'xirn kmbm lakc oqwb'
        }
    }); 

    const mailOptions = {
        from: 'kimhakka7@gmail.com',
        to: currentEmail,
        subject: 'Change your Springbnb email',
        text: 'Click the link to change your email address.',
        html: `<p>Click the link to change your email address </p><a href="${changeEmailLink}" target="_blank" >${changeEmailLink}</a>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}catch(err){
    console.log(err)
}
}

export const sendEmailConfirmNewEmail = async (confirmToken:string, newEmail:string) => {
    console.log('NEW EMAIL', newEmail)
    console.log('TOKEN', confirmToken)
    try{
        
    const confirmLink = `${process.env.FRONTEND_URL}/change-email/confirm?token=${confirmToken}`
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kimhakka7@gmail.com',
            pass: 'xirn kmbm lakc oqwb'
        }
    }); 

    const mailOptions = {
        from: 'kimhakka7@gmail.com',
        to: newEmail,
        subject: 'Confirm your new Springbnb email',
        text: 'Click the link to confirm your new email address.',
        html: `<p>Click the link to confirm your new email address for Springbnb:</p><a href="${confirmLink}" target="_blank">${confirmLink}</a><p>If you did not request this change, please ignore this email.</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}catch(err){
    console.log(err)
}
}
