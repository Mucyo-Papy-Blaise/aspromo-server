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
const node_cron_1 = __importDefault(require("node-cron"));
const event_model_1 = __importDefault(require("../models/event.model"));
const updateEventStatus = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const now = new Date();
        yield event_model_1.default.updateMany({ endDate: { $lte: now }, status: { $ne: "Ended" } }, { $set: { status: "Ended" } });
        yield event_model_1.default.updateMany({
            startDate: { $lte: now }, endDate: { $gt: now }, status: { $ne: "Active" },
        }, { $set: { status: "Active" } });
        console.log(`[${new Date().toISOString()}] Event status check complete.`);
    }
    catch (error) {
        console.error("Failed to update event statuses:", error);
    }
});
node_cron_1.default.schedule("0 * * * *", updateEventStatus);
