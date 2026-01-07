import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kimhakka7@gmail.com',
        pass: 'xirn kmbm lakc oqwb'
    }
}); 

const mailOptions = {
    from: 'kimhakka7@gmail.com',
    to: 'queen.quencyy@gmail.com',
    subject: 'Test Email',
    text: 'This is a test email sent using Nodemailer.'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
    