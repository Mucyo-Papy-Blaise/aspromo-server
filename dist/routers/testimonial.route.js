"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rod_fileupload_1 = __importDefault(require("rod-fileupload"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const testimonial_controller_1 = __importDefault(require("../controllers/testimonial.controller"));
const router = (0, express_1.default)();
router.use(express_1.default.json());
router.post('/', (0, rod_fileupload_1.default)('image', cloudinary_1.default), testimonial_controller_1.default.postTestimonial);
router.get('/', testimonial_controller_1.default.getTestimonial);
exports.default = router;
