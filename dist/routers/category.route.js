"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rod_fileupload_1 = __importDefault(require("rod-fileupload"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const category_controller_1 = __importDefault(require("../controllers/category.controller"));
const router = express_1.default.Router();
router.use(express_1.default.json());
router.post('/', (0, rod_fileupload_1.default)('image', cloudinary_1.default), category_controller_1.default.postCatgory);
router.get('/', category_controller_1.default.getCategory);
router.delete('/:id', category_controller_1.default.deleteCategory);
router.put('/:id/status', category_controller_1.default.updateStatus);
router.put('/:id', category_controller_1.default.updateCategory);
exports.default = router;
