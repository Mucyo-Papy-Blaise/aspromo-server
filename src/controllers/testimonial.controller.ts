import { Request, Response } from "express";
import testimonials from "../models/testimonial.model";

class testimonialController {
    static postTestimonial = async(req: Request, res: Response) =>{
        try {
           const {image,name,category,speech,year} = req.body

           await testimonials.create({
            image: image.url,
            name,
            category,
            speech,
            year
           })
           res.status(201).json({message:"Testimonials created successfully!"})
        } catch (error: any) {
            res.status(500).json({message:"Failed to create Testimonials", error:error.message})
        }
    }

    static getTestimonial = async(req:Request, res:Response)=>{
        try {
            const testimonial = await testimonials.find()
            res.status(201).json(testimonial)
        } catch (error: any) {
            res.status(500).json({message:"Failed to get Testimonial", error:error.message})
        }
    }
}

export default testimonialController