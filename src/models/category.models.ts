import mongoose, { Schema } from "mongoose";

interface categoryProps {
    image:string,
    categoryName: string,
    description: string,
    status: string,
}

const categorySchema = new Schema<categoryProps>({
    image:{type:String,required: true},
    categoryName:{type: String, required: true},
    description:{type: String, required: true},
    status:{type: String, required: true}
})

const category = mongoose.model('category', categorySchema)
export default category