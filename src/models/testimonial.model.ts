import mongoose, { Schema } from "mongoose";
import { testimonilaTypes } from "../Types/types";

const testimonialSchema = new Schema<testimonilaTypes>({
    image:{type: String, required: false},
    name: {type: String, required: true},
    category:{type: String, required: true},
    speech: {type: String, required: true},
    year: {type: Date, required: true}
})

const testimonials = mongoose.model('testimonials', testimonialSchema)

export default testimonials

