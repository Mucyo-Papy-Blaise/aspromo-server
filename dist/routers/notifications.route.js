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
const express_1 = __importDefault(require("express"));
const notification_model_1 = __importDefault(require("../models/notification.model"));
const router = (0, express_1.default)();
router.use(express_1.default.json());
router.get("/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const notifications = yield notification_model_1.default.find({ recipientId: userId }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
}));
router.patch("/mark-read/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        yield notification_model_1.default.updateMany({ recipientId: userId }, { read: true });
        res.status(200).json({ message: "Notifications marked as read" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update notifications", error: error.message });
    }
}));
router.get("/unread-count/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const count = yield notification_model_1.default.countDocuments({ recipientId: userId, read: false });
        res.status(200).json({ count });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch unread notifications count", error: error.message });
    }
}));
exports.default = router;
