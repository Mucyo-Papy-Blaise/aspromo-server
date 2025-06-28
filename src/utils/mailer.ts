import nodemail from 'nodemailer'

const transoprter = nodemail.createTransport({
    service: "email",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
})

export const sendOTPEmail =async(email: any, otp: any)=>{
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code is ${otp}. its expires in 5 min`
    }

    await transoprter.sendMail(mailOptions)
}