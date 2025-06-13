import mongoose, { Schema } from "mongoose";

interface ITestimonila {
    image: string,
    name: string,
    category: string,
    speech: string,
    year: Date
}

const testimonialSchema = new Schema<ITestimonila>({
    image:{type: String, required: false},
    name: {type: String, required: true},
    category:{type: String, required: true},
    speech: {type: String, required: true},
    year: {type: Date, required: true}
})

const testimonials = mongoose.model('testimonials', testimonialSchema)

export default testimonials

