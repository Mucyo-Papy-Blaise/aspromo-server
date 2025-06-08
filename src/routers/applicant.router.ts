import express,{Request, Response} from 'express'
import cloudinary from '../config/cloudinary'
import { uploadMultiple } from 'rod-fileupload'
import applicant from '../models/applicant.model'

const router = express()
router.use(express.json())

router.post('/',uploadMultiple('file', cloudinary) ,async(req: Request, res:Response)=>{
    try {
        const {fullName,stageName,email,location,dateOfBirth,phoneNumber,category,youtubeUrl,about} = req.body
        // @ts-ignore
        const video = req.body.file.find(f=>f.url)
        // @ts-ignore
        const image = req.body.file.find(f => f.url)

        const videoUrl = video.url || null
        const imageUrl = image.url || null
        
        await applicant.create({
            fullName,
            stageName,
            email,
            location, 
            dateOfBirth,
            phoneNumber,
            category,
            youtubeUrl,
            about,
            video: videoUrl,
            image:imageUrl
        })
        res.status(201).json({message:'Application is submitted'})
    } catch (error: any) {
        res.status(500).json({message:'Application Failed', error:error.message})
    }
})

router.get('/', async(req:Request, res:Response)=>{
    try {
        const applicants =  await applicant.find()
        res.status(201).json(applicants)
    } catch (error: any) {
        res.status(500).json({message:'Failed to get Fetch Applicants Data', error:error.message})
    }
})
router.get('/:id', async(req: Request, res:Response)=>{
    try {
        const {id} = req.params
        const applicants = await applicant.findById({_id: id})
        res.status(201).json(applicants)
    } catch (error:any) {
        res.status(500).json({message:'Failed to Fetch Applicants data', error:error.message})
    }
})

router.delete('/:id',async(req: Request, res:Response)=>{
    try {
        const {id} = req.params
        await applicant.findOneAndDelete({_id: id})
        res.status(201).json({message:"Applicant deleted!"})
    } catch (error: any) {
        res.status(500).json({message:'Failed to delete Applicant!', error:error.message})
    }
})

export default router