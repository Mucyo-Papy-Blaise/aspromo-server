import mongoose, { Schema } from "mongoose"

interface applicantProps {
    fullName: string,
    stageName: string,
    email:string,
    location: string,
    dateOfBirth: Date,
    phone: number,
    category: string,
    profilePicture: string,
    youtubeUrl?: string,
    videoFile: string,
    about: string
}

const applicantSchema =  new Schema<applicantProps>({
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
})

const applicant = mongoose.model('applicants', applicantSchema)

export default applicant
