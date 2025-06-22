import cron from "node-cron";
import events from "../models/event.model";

const updateEventStatus = async () => {
  try {
    const now = new Date();
    await events.updateMany(
      { endDate: { $lte: now }, status: { $ne: "Ended" } },
      { $set: { status: "Ended" } }
    );

    await events.updateMany(
      {
        startDate: { $lte: now },endDate: { $gt: now },status: { $ne: "Active" },
      },
      { $set: { status: "Active" } }
    );
    console.log(`[${new Date().toISOString()}] Event status check complete.`);
  } catch (error) {
    console.error("Failed to update event statuses:", error);
  }
};
cron.schedule("0 * * * *", updateEventStatus);
