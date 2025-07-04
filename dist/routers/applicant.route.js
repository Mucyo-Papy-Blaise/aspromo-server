"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const rod_fileupload_1 = require("rod-fileupload");
const applicant_controller_1 = __importDefault(require("../controllers/applicant.controller"));
const router = express_1.default.Router();
router.use(express_1.default.json());
router.post('/', (0, rod_fileupload_1.uploadMultiple)('file', cloudinary_1.default), applicant_controller_1.default.postApplicant);
router.get('/', applicant_controller_1.default.getApplicant);
router.get('/count', applicant_controller_1.default.getTotalApplicant);
router.get('/video', applicant_controller_1.default.videosCounts);
router.get('/category-counts', applicant_controller_1.default.getApplicantCategoryCounts);
router.get('/:id', applicant_controller_1.default.getApplicantById);
router.delete('/:id', applicant_controller_1.default.deleteApplicant);
router.put('/updateStatus/:id', applicant_controller_1.default.changeStatus);
// @ts-expect-error
router.post('/generate-otp', applicant_controller_1.default.generateOTP);
// @ts-expect-error
router.post('/verify-otp', applicant_controller_1.default.verifyOTP);
exports.default = router;
