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
exports.startNotificationCron = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const notification_model_1 = __importDefault(require("../models/notification.model"));
// Every day at 3am: clean read notifications
const startNotificationCron = () => {
    node_cron_1.default.schedule("0 3 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield notification_model_1.default.deleteMany({ read: true });
            console.log(`Deleted ${result.deletedCount} read notifications`);
        }
        catch (err) {
            console.error("Failed to clean notifications", err);
        }
    }));
};
exports.startNotificationCron = startNotificationCron;
