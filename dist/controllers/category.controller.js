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
const category_models_1 = __importDefault(require("../models/category.models"));
class categoryController {
}
_a = categoryController;
categoryController.postCatgory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { image, categoryName, description, status } = req.body;
        yield category_models_1.default.create({
            image: image.url,
            categoryName,
            description,
            status,
        });
        res.status(201).json({ message: "Category created Sucessfully" });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Failed to create category", error: error.message });
    }
});
categoryController.getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_models_1.default.find();
        console.log(categories);
        res.status(201).json(categories);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Failed to get Category", error: error.message });
    }
});
categoryController.deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield category_models_1.default.findByIdAndDelete(id);
        if (!deleted) {
            res.status(401).json({ message: 'Category Not Found' });
        }
        res.status(201).json({ message: 'You delete category', deleted });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete Category" });
    }
});
categoryController.updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedCategory = yield category_models_1.default.findOneAndUpdate({ _id: id }, { status }, { new: true });
        if (!updatedCategory) {
            res.status(400).json({ message: "The category not found" });
            return;
        }
        res.status(201).json({ message: "Status updated", updatedCategory });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to Update Category Status", error: error.message });
    }
});
categoryController.updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { categoryName, description, status, image } = req.body;
        const updatedCategory = yield category_models_1.default.findByIdAndUpdate(id, { categoryName, description, status, image }, { new: true });
        if (!updatedCategory) {
            res.status(404).json({ message: 'No Category found' });
        }
        res.status(201).json({ message: 'Categoy Updated', updatedCategory });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update category', error: error.message });
    }
});
exports.default = categoryController;
