import mongoose, { Schema } from "mongoose";
import { eventTypes } from "../Types/types";

const eventSchema = new Schema<eventTypes>({
    eventTitle:{type:String, required: true},
    description:{type: String, required: true},
    startDate:{type:Date, required: true},
    endDate:{type:Date, required: true},
    status:{type: String,enum:["Active", "Ended"],required: true, default:"Active"},
    applicants:{type: Number, required: true, default:0},
    videos:{type:[String], required: true},
})

const events = mongoose.model('events', eventSchema)
export default events