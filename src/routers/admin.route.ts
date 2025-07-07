import express from 'express'
import cloudinary from '../config/cloudinary'
import adminController from '../controllers/admin.controller'
import uploadSingle from 'rod-fileupload'

const router = express()
router.use(express.json())

router.get('/', adminController.getLoggedInAdmin)
router.post('/registration',uploadSingle('image', cloudinary),adminController.adminRegistration)
router.post('/login',adminController.adminLogin) 

export default router