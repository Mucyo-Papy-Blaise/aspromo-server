import mongoose, { Schema } from "mongoose";
import { adminTypes } from "../Types/types";

const adminSchema = new Schema<adminTypes>({
    fullName:{type: String, required: true},
    email: { type: String, required: true, unique: true},
    image: {type: String},
    password: {type:String, required: true}
})

const admins = mongoose.model('admins', adminSchema)

export default admins