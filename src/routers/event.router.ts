import express, { Request, Response } from "express";
import events from "../models/event.model";
import { uploadMultiple } from "rod-fileupload";
import cloudinary from "../config/cloudinary";

const router = express();
router.use(express.json());

router.post(
  "/",
  uploadMultiple("videos", cloudinary),
  async (req: Request, res: Response) => {
    try {
      const { eventTitle, category, description, startDate, endDate } =
        req.body;

      const videoUrls = req.body.videos.map((f: any) => f.url);
      console.log(videoUrls);
      await events.create({
        eventTitle,
        category,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        videos: videoUrls,
      });
      res.status(201).json({ message: "Event Created Succesffully!" });
    } catch (error) {
      res.status(500).json({ message: "Failed to create Event" });
    }
  }
);
router.get("/", async (req: Request, res: Response) => {
  try {
    const event = await events.find();
    res.status(200).json(event);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to Get Event" });
  }
});
router.delete("/", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await events.findOneAndDelete({ _id: id });
    res.status(201).json({ message: "The event deleted successfully!" });
  } catch (error: any) {
    res
      .status(500)
      .json({ messge: "Failed to delete Event", error: error.message });
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateEvent = await events.findByIdAndUpdate(id, req.body,{new: true, runValidators: true});
    if (!updateEvent) {
      res.status(404).json({ message: "No Event found!" });
    }
    res.status(200).json({message:'Applicant Updated', data: updateEvent})
  } catch (error: any) {
    res.status(500).json({message:'Failed to Update the Event!', error:error.message})
  }
});
export default router;
