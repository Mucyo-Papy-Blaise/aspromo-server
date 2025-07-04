import mongoose,{Schema} from "mongoose";

const notificationSchema = new Schema({
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "recipientModel",
  },
  recipientModel: {
    type: String,
    required: true,
    enum: ["Admin", "Applicant"],
  },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
})

const notifications = mongoose.model('notifications', notificationSchema)

export default notifications
