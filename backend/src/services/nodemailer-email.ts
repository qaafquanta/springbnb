import nodemailer from 'nodemailer';

export const sendEmailRegisterNodeMailer = async (registionToken:string,email:string) => {
    console.log('EMAIL',email)
    console.log('TOKEN',registionToken)
    try{
        
    const registerLink = `http://localhost:3000/register/verified?token=${registionToken}`
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
        
    const resetPasswordLink = `http://localhost:3000/reset-password/verified?token=${resetPasswordToken}`
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

