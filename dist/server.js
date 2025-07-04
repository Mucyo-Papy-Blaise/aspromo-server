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
const env_1 = __importDefault(require("./config/env"));
require("./cron/eventStatusUpdater");
const dbconnect_1 = __importDefault(require("./config/dbconnect"));
const cors_1 = __importDefault(require("cors"));
const category_route_1 = __importDefault(require("./routers/category.route"));
const event_route_1 = __importDefault(require("./routers/event.route"));
const applicant_route_1 = __importDefault(require("./routers/applicant.route"));
const testimonial_route_1 = __importDefault(require("./routers/testimonial.route"));
const admin_route_1 = __importDefault(require("./routers/admin.route"));
const notifications_route_1 = __importDefault(require("./routers/notifications.route"));
const reminder_Cron_1 = require("./cron/reminder.Cron");
(0, reminder_Cron_1.startReminderCron)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', "http://localhost:3001"],
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE", "OPTIONS"]
}));
app.use('/category', category_route_1.default);
app.use('/event', event_route_1.default);
app.use('/applicant', applicant_route_1.default);
app.use('/testimonial', testimonial_route_1.default);
app.use('/admin', admin_route_1.default);
app.use('/notifications', notifications_route_1.default);
const PORT = env_1.default.port;
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, dbconnect_1.default)();
        console.log(`Server is Running on Port ${PORT}`);
    }
    catch (error) {
        console.log('Error in server running', error);
    }
}));
