import express from 'express'
import uploadSingle from 'rod-fileupload'
import cloudinary from '../config/cloudinary'
import categoryController from '../controllers/category.controller'

const router = express()
router.use(express.json())
router.post('/',uploadSingle('image',cloudinary), categoryController.postCatgory)
router.get('/', categoryController.getCategory)
router.delete('/:id', categoryController.deleteCategory)
router.put('/:id', categoryController.updateStatus)
router.put('/:id', categoryController.updateCategory)

export default router