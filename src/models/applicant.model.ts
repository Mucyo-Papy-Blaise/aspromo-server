import mongoose, { Schema } from "mongoose"
import { applicantTypes } from "../Types/types"

const applicantSchema =  new Schema<applicantTypes>({
    fullName:{type:String,required: true},
    stageName:{type:String,required: true},
    email:{type:String,required: true},
    location:{type:String,required: true},
    dateOfBirth:{type:Date,required: true},
    phone:{type:Number,required: true},
    category:{type:String,required: true},
    profilePicture:{type:String,required: true},
    youtubeUrl:{type:String, required: false },
    videoFile:{type:String, required: true },
    about:{type:String, required: true },
    votes:{type:Number, required: true, default:0 },
    appliedAt: {type: Date, default: Date.now},
    approvedAt: {type: Date, default:null},
    isApproved: {type:Boolean, default: false},
    status: {type: String, enum:["Pending" ,"Aproved" ,"Rejected"], default: "Pending"}

})

const applicant = mongoose.model('applicants', applicantSchema)

export default applicant
