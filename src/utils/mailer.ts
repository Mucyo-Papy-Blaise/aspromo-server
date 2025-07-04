import nodemailer from 'nodemailer'
import env from '../config/env'

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: env.mail_user,
        pass: env.mail_pass,
    }
})

export const sendOTPEmail = async (email: string, otp: string) => {
    const mailOptions = {
        from: env.mail_user,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code is ${otp}. It expires in 5 minutes.`
    }

    try {
        console.log('Attempting to send OTP email to:', email);
        console.log('Using email config:', { user: env.mail_user, pass: env.mail_pass ? '***' : 'NOT SET' });
        
        await transporter.sendMail(mailOptions);
        console.log('OTP email sent successfully to:', email);
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw error;
    }
}