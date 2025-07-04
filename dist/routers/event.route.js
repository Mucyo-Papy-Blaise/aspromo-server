"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rod_fileupload_1 = require("rod-fileupload");
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const event_controller_1 = __importDefault(require("../controllers/event.controller"));
const router = (0, express_1.default)();
router.use(express_1.default.json());
router.post("/", (0, rod_fileupload_1.uploadMultiple)("videos", cloudinary_1.default), event_controller_1.default.postEvent);
router.get("/", event_controller_1.default.getEvent);
router.delete("/", event_controller_1.default.deleteEvent);
router.patch("/:id", event_controller_1.default.patchEvent);
router.get('/activeEvent', event_controller_1.default.getActiveEvents);
exports.default = router;
