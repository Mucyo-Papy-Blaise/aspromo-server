import express  from "express";
import uploadSingle from "rod-fileupload";
import cloudinary from "../config/cloudinary";
import testimonialController from "../controllers/testimonial.controller";

const router = express()
router.use(express.json())

router.post('/',uploadSingle('image', cloudinary),testimonialController.postTestimonial)
router.get('/', testimonialController.getTestimonial)

export default router