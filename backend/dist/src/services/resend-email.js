import { Resend } from 'resend';
const resendx = new Resend('re_X1KwHCpg_3i2tRcbu2TH49NNqfhabfSnk');
export async function sendEmailRegistrationLink(registionToken, email) {
    const registerLink = `http://localhost:3000/register/verified?token=${registionToken}`;
    await resendx.emails.send({
        from: 'onboarding@resend.dev',
        // to: `${email}`,
        to: "kimhakka7@gmail.com",
        subject: 'Springbnb Continue to Register',
        html: `<p>Click the link to continue to register </p><a href="${registerLink}" target="_blank" >${registerLink}</a>`
    });
    console.log(`success sending email to ${email}`);
}
//# sourceMappingURL=resend-email.js.map