require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('Environment Variables Check:');
console.log('MAIL_USER:', process.env.MAIL_USER ? 'SET' : 'NOT SET');
console.log('MAIL_PASS:', process.env.MAIL_PASS ? 'SET' : 'NOT SET');
console.log('MONGO_DB_URI:', process.env.MONGO_DB_URI ? 'SET' : 'NOT SET');
console.log('PORT:', process.env.PORT || 'NOT SET');

if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    console.error('\n❌ Email configuration is missing!');
    console.error('Please create a .env file with the following variables:');
    console.error('MAIL_USER=your_email@gmail.com');
    console.error('MAIL_PASS=your_app_password');
    console.error('\nNote: For Gmail, you need to use an App Password, not your regular password.');
    process.exit(1);
}

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
});

// Test email configuration
async function testEmail() {
    try {
        console.log('\nTesting email configuration...');
        await transporter.verify();
        console.log('✅ Email configuration is valid!');
        
        // Send a test email
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: process.env.MAIL_USER, // Send to yourself for testing
            subject: "Test Email - OTP System",
            text: "This is a test email to verify your email configuration is working."
        };
        
        await transporter.sendMail(mailOptions);
        console.log('✅ Test email sent successfully!');
        
    } catch (error) {
        console.error('❌ Email configuration error:', error.message);
        if (error.code === 'EAUTH') {
            console.error('\nThis usually means:');
            console.error('1. Your email or password is incorrect');
            console.error('2. You need to use an App Password instead of your regular password');
            console.error('3. 2-Step Verification is not enabled on your Google account');
        }
    }
}

testEmail(); 