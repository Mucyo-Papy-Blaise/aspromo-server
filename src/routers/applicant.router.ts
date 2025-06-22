import express from 'express'
import cloudinary from '../config/cloudinary'
import { uploadMultiple } from 'rod-fileupload'
import applicantController from '../controllers/applicant.controller'

const router = express.Router()
router.use(express.json())

router.post('/',uploadMultiple('file', cloudinary) , applicantController.postApplicant)
router.get('/', applicantController.getApplicant)
router.get('/count', applicantController.getTotalApplicant)
router.get('/category-counts', applicantController.getApplicantCategoryCounts)
router.get('/:id', applicantController.getApplicantById)
router.delete('/:id', applicantController.deleteApplicant)
router.put('/updateStatus/:id', applicantController.changeStatus)

export default router