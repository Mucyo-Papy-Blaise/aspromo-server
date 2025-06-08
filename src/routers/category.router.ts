import express,{Request,Response} from 'express'
import category from '../models/category.models'
import uploadSingle from 'rod-fileupload'
import cloudinary from '../config/cloudinary'

const router = express()
router.use(express.json())

router.post('/',uploadSingle('image',cloudinary),async(req: Request, res: Response)=>{
    try {
        const {image,categoryName, description, status} = req.body
        await category.create({
            image: image.url,
            categoryName,
            description,
            status
        })
        res.status(201).json({message:'Category created Sucessfully'})
    } catch (error: any) {
        res.status(500).json({message:"Failed to create category", error:error.message})
    }
})

router.get('/', async(req:Request, res:Response)=>{
    try {
        const categories = await category.find()
        res.status(201).json(categories)
    } catch (error:any) {
        res.status(500).json({message:'Failed to get Category', error:error.message})
    }
})

router.delete('/', async(req:Request, res:Response)=>{
    try {
        const {id} = req.params
        res.status(201).json({_id: id})
    } catch (error) {
        res.status(500).json({message:'Failed to delete Category'})
    }
})

export default router