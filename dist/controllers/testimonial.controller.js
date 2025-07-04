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
const testimonial_model_1 = __importDefault(require("../models/testimonial.model"));
class testimonialController {
}
_a = testimonialController;
testimonialController.postTestimonial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { image, name, category, speech, year } = req.body;
        yield testimonial_model_1.default.create({
            image: image.url,
            name,
            category,
            speech,
            year
        });
        res.status(201).json({ message: "Testimonials created successfully!" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create Testimonials", error: error.message });
    }
});
testimonialController.getTestimonial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const testimonial = yield testimonial_model_1.default.find();
        res.status(201).json(testimonial);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to get Testimonial", error: error.message });
    }
});
exports.default = testimonialController;
