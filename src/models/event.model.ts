import mongoose, { Schema } from "mongoose";

interface eventProps{
    eventTitle: string,
    category: string,
    description: string
    startDate: Date,
    endDate: Date,
    videos: string[]
}

const eventSchema = new Schema<eventProps>({
    eventTitle:{type:String, required: true},
    category:{type: String, required: true},
    description:{type: String, required: true},
    startDate:{type:Date, required: true},
    endDate:{type:Date, required: true},
    videos:{type:[String], required: true},
})

const events = mongoose.model('events', eventSchema)
export default events