import mongoose, { Schema } from "mongoose";
import { categoryTypes } from "../Types/types";

const categorySchema = new Schema<categoryTypes>({
    image:{type:String,required: true},
    categoryName:{type: String, required: true},
    description:{type: String, required: true},
    status:{type: String, required: true}
})

const category = mongoose.model('category', categorySchema)
export default category