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
exports.startReminderCron = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const admin_model_1 = __importDefault(require("../models/admin.model"));
const applicant_model_1 = __importDefault(require("../models/applicant.model"));
const notification_model_1 = __importDefault(require("../models/notification.model"));
const startReminderCron = () => {
    // 🔁 Runs daily at 9:00 AM
    node_cron_1.default.schedule("0 9 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const pendingApplicants = yield applicant_model_1.default.find({ status: "Pending" });
            if (pendingApplicants.length === 0) {
                console.log("✅ No pending applicants today");
                return;
            }
            const admins = yield admin_model_1.default.find();
            const message = `Reminder: ${pendingApplicants.length} applicant(s) still need to be reviewed.`;
            // ✅ Create notification for each admin
            for (const admin of admins) {
                yield notification_model_1.default.create({
                    userId: admin._id,
                    message,
                    createdAt: new Date(),
                });
            }
            console.log(`🔔 Admins notified about ${pendingApplicants.length} pending applicants.`);
        }
        catch (error) {
            console.error("❌ Cron job failed:", error);
        }
    }));
};
exports.startReminderCron = startReminderCron;
