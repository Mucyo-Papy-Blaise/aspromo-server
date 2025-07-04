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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const applicant_model_1 = __importDefault(require("../models/applicant.model"));
const applicant_model_2 = __importDefault(require("../models/applicant.model"));
const otpGenerator_1 = require("../utils/otpGenerator");
const mailer_1 = require("../utils/mailer");
const notification_model_1 = __importDefault(require("../models/notification.model"));
const admin_model_1 = __importDefault(require("../models/admin.model"));
// Global OTP store - in production, use Redis or database
const otpStore = new Map();
class applicantController {
}
_a = applicantController;
applicantController.postApplicant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, stageName, email, location, dateOfBirth, phone, category, youtubeUrl, about, appliedAt, approvedAt, } = req.body;
        // @ts-ignore
        const videoFile = req.body.file.find((f) => f.type === "video");
        // @ts-ignore
        const profilePicture = req.body.file.find((f) => f.type === "image");
        const videoUrl = videoFile.url || null;
        const imageUrl = profilePicture.url || null;
        yield applicant_model_2.default.create({
            fullName,
            stageName,
            email,
            location,
            dateOfBirth,
            phone,
            category,
            youtubeUrl,
            about,
            videoFile: videoUrl,
            profilePicture: imageUrl,
            appliedAt,
            approvedAt,
        });
        // Notify Adims
        const admins = yield admin_model_1.default.find();
        yield Promise.all(admins.map((admin) => notification_model_1.default.create({
            recipientId: admin._id,
            recipientModel: "Admin",
            message: `New applicant "${stageName}" has submitted their application.`,
        })));
        res.status(201).json({ message: "Application is submitted" });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Application Failed", error: error.message });
    }
});
applicantController.generateOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email || !email.includes('@')) {
            return res.status(400).json({ message: "Invalid Email" });
        }
        const user = yield applicant_model_2.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Email not found" });
        }
        const otp = (0, otpGenerator_1.generateOTP)();
        const expiresAt = (0, otpGenerator_1.gotOTPExpired)(5);
        // Store OTP in the global map
        otpStore.set(email, { otp, expiresAt });
        // Send OTP via email
        try {
            yield (0, mailer_1.sendOTPEmail)(email, otp);
            res.status(200).json({ message: "OTP sent successfully to your email!" });
        }
        catch (emailError) {
            ;
            res.status(500).json({ message: "OTP generated but failed to send email. Please check your email configuration." });
        }
    }
    catch (error) {
        res.status(500).json({ message: `Error occurred: ${error.message}` });
    }
});
applicantController.verifyOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp } = req.body;
        const user = yield applicant_model_2.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Applicant not found" });
        }
        if (!email || !otp) {
            return res.status(400).json({ message: 'Email and OTP are required' });
        }
        const record = otpStore.get(email);
        if (!record) {
            return res.status(400).json({ message: 'No OTP found for this email' });
        }
        if (Date.now() > record.expiresAt) {
            otpStore.delete(email);
            return res.status(400).json({ message: 'OTP expired' });
        }
        if (record.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
        // OTP is valid
        otpStore.delete(email);
        return res.status(200).json({ message: 'OTP verified successfully', applicant: user });
    }
    catch (error) {
        res.status(500).json({ message: `Error occurred: ${error.message}` });
    }
});
applicantController.getApplicant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const applicants = yield applicant_model_2.default.find();
        res.status(201).json(applicants);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to get Fetch Applicants Data",
            error: error.message,
        });
    }
});
applicantController.getTotalApplicant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalApplicants = yield applicant_model_2.default.countDocuments();
        res.status(201).json(totalApplicants);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to count total Participant" });
    }
});
applicantController.getApplicantCategoryCounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryCounts = yield applicant_model_2.default.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            }
        ]);
        res.status(200).json({ categoryCounts });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to count applicants by category", error: error.message });
    }
});
applicantController.getApplicantById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const applicants = yield applicant_model_2.default.findById({ _id: id });
        res.status(201).json(applicants);
    }
    catch (error) {
        res
            .status(500)
            .json({
            message: "Failed to Fetch Applicants data",
            error: error.message,
        });
    }
});
applicantController.deleteApplicant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield applicant_model_2.default.findOneAndDelete({ _id: id });
        res.status(201).json({ message: "Applicant deleted!" });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Failed to delete Applicant!", error: error.message });
    }
});
applicantController.vote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { votes } = req.body;
        const applicant = yield applicant_model_1.default.findById(id);
        if (!applicant) {
            res.status(400).json({ message: "no applicant found" });
            return;
        }
        applicant.votes += votes;
        applicant.save();
        res.status(200).json({ message: "votes successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "error voting", error: error.message });
    }
});
applicantController.changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updateFiled = { status };
        if (status === "Approved") {
            updateFiled.approvedAt = new Date();
            updateFiled.isApproved = true;
            const approvedApplicant = yield applicant_model_2.default.findById(id);
            if (approvedApplicant) {
                yield notification_model_1.default.create({
                    recipientId: approvedApplicant._id,
                    recipientModel: "Applicant",
                    message: `Congratulations ${approvedApplicant.stageName}, your application has been approved!`,
                });
            }
        }
        if (status === "Rejected") {
            updateFiled.approvedAt = new Date();
        }
        const changedApplicant = yield applicant_model_2.default.findByIdAndUpdate(id, updateFiled, { new: true });
        res.status(200).json(changedApplicant);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update Applicant Status" });
    }
});
applicantController.videosCounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const counts = yield applicant_model_2.default.countDocuments({
            status: "Approved",
            videoFile: { $exists: true, $ne: null }
        });
        res.status(200).json({ count: counts });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to count approved Videos Uploaded', error: error.message });
    }
});
exports.default = applicantController;
