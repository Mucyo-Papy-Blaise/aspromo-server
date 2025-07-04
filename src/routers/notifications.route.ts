import express from "express"
import Notification from "../models/notification.model";

const router = express()
router.use(express.json())

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const notifications = await Notification.find({ recipientId: userId }).sort({ createdAt: -1 });
  res.status(200).json(notifications);
});

router.patch("/mark-read/:userId", async (req, res) => {
  const { userId } = req.params
  try {
    await Notification.updateMany({ recipientId: userId }, { read: true })
    res.status(200).json({ message: "Notifications marked as read" })
  } catch (error: any) {
    res.status(500).json({ message: "Failed to update notifications", error: error.message })
  }
})

router.get("/unread-count/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const count = await Notification.countDocuments({ recipientId: userId, read: false });
    res.status(200).json({ count });
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch unread notifications count", error: error.message });
  }
});

export default router