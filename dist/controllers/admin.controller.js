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
const admin_model_1 = __importDefault(require("../models/admin.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class adminController {
}
_a = adminController;
adminController.adminRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, image, email, password } = req.body;
        yield admin_model_1.default.create({
            fullName,
            email,
            image: image.url,
            password: yield bcrypt_1.default.hash(password, 10),
        });
        const existing = yield admin_model_1.default.findOne({ email });
        if (existing) {
            res.status(400).json({ message: "Email Already exisisting!" });
        }
        res.status(201).json({ message: "Registration succesfully!" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to Register!", error: error.message });
    }
});
adminController.adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield admin_model_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "Invalid Credentials" });
            return;
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(500).json({ message: "Invalid Password" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({
            message: "Login Sucessfully",
            token,
            name: user.fullName,
            email: user.email,
            id: user._id,
            image: user.image
        });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to Login", error: error.message });
    }
});
adminController.getLoggedInAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
        const user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const loggedUser = yield admin_model_1.default.findById(user.id);
        if (!token) {
            res.status(404).json({ message: "No token Provided" });
        }
        if (!loggedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ user: loggedUser });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to get the LoggedIn user!", error: error.message });
    }
});
exports.default = adminController;
