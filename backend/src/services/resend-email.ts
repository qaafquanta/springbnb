import {Resend} from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const resendx = new Resend('re_X1KwHCpg_3i2tRcbu2TH49NNqfhabfSnk');
export async function sendEmailRegistrationLink(registionToken:string,email:string){
    const registerLink = `${process.env.FRONTEND_URL}/register/verified?token=${registionToken}`
    await resendx.emails.send({
    from: 'onboarding@resend.dev',
    // to: `${email}`,
    to: "kimhakka7@gmail.com",
    subject: 'Springbnb Continue to Register',
    html: `<p>Click the link to continue to register </p><a href="${registerLink}" target="_blank" >${registerLink}</a>`
    });
    console.log(`success sending email to ${email}`)
}