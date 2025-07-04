"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const admin_controller_1 = __importDefault(require("../controllers/admin.controller"));
const rod_fileupload_1 = __importDefault(require("rod-fileupload"));
const router = (0, express_1.default)();
router.use(express_1.default.json());
router.get('/', admin_controller_1.default.getLoggedInAdmin);
router.post('/registration', (0, rod_fileupload_1.default)('image', cloudinary_1.default), admin_controller_1.default.adminRegistration);
router.post('/login', admin_controller_1.default.adminLogin);
exports.default = router;
