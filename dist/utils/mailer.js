"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOTPEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = __importDefault(require("../config/env"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: env_1.default.mail_user,
        pass: env_1.default.mail_pass,
    }
});
const sendOTPEmail = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: env_1.default.mail_user,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code is ${otp}. It expires in 5 minutes.`
    };
    try {
        console.log('Attempting to send OTP email to:', email);
        console.log('Using email config:', { user: env_1.default.mail_user, pass: env_1.default.mail_pass ? '***' : 'NOT SET' });
        yield transporter.sendMail(mailOptions);
        console.log('OTP email sent successfully to:', email);
    }
    catch (error) {
        console.error('Error sending OTP email:', error);
        throw error;
    }
});
exports.sendOTPEmail = sendOTPEmail;
