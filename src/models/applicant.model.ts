import mongoose, { Schema } from "mongoose"

interface applicantProps {
    fullName: string,
    stageName: string,
    email:string,
    location: string,
    dateOfBirth: Date,
    phoneNumber: number,
    category: string,
    image: string,
    youtubeUrl?: string,
    video: string,
    about: string
}

const applicantSchema =  new Schema<applicantProps>({
    fullName:{type:String,required: true},
    stageName:{type:String,required: true},
    email:{type:String,required: true},
    location:{type:String,required: true},
    dateOfBirth:{type:Date,required: true},
    phoneNumber:{type:Number,required: true},
    category:{type:String,required: true},
    image:{type:String,required: true},
    youtubeUrl:{type:String, required: false },
    video:{type:String, required: true },
    about:{type:String, required: true },
})

const applicant = mongoose.model('applicants', applicantSchema)

export default applicant
