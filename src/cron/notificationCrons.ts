import cron from "node-cron"
import NotificationModel from "../models/notification.model"

// Every day at 3am: clean read notifications
export const startNotificationCron = () => {
  cron.schedule("0 3 * * *", async () => {
    try {
      const result = await NotificationModel.deleteMany({ read: true })
      console.log(`Deleted ${result.deletedCount} read notifications`)
    } catch (err) {
      console.error("Failed to clean notifications", err)
    }
  })
}