import cron from "node-cron"
import Admin from "../models/admin.model"
import Applicant from "../models/applicant.model"
import NotificationModel from "../models/notification.model"

export const startReminderCron = () => {
  // 🔁 Runs daily at 9:00 AM
  cron.schedule("0 9 * * *", async () => {
    try {
      const pendingApplicants = await Applicant.find({ status: "Pending" })
      if (pendingApplicants.length === 0) {
        console.log("✅ No pending applicants today")
        return
      }

      const admins = await Admin.find()
      const message = `Reminder: ${pendingApplicants.length} applicant(s) still need to be reviewed.`

      // ✅ Create notification for each admin
      for (const admin of admins) {
        await NotificationModel.create({
          userId: admin._id,
          message,
          createdAt: new Date(),
        })
      }

      console.log(`🔔 Admins notified about ${pendingApplicants.length} pending applicants.`)
    } catch (error) {
      console.error("❌ Cron job failed:", error)
    }
  })
}
