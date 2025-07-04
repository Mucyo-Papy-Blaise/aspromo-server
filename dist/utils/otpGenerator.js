"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = generateOTP;
exports.gotOTPExpired = gotOTPExpired;
function generateOTP(length = 4) {
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10);
    }
    return otp;
}
function gotOTPExpired(minutes = 5) {
    return Date.now() + minutes * 60 * 1000;
}
