import {Request, Response} from 'express'
import events from '../models/event.model';
class EventController{

  static postEvent = async (req: Request, res: Response) => {
    try {
      const { eventTitle, description, startDate,status,applicants, endDate } =
        req.body;

      const videoUrls = req.body.videos.map((f: any) => f.url);
      console.log(videoUrls);
      await events.create({
        eventTitle,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status,
        applicants,
        videos: videoUrls,
      });
      res.status(201).json({ message: "Event Created Succesffully!" });
    } catch (error) {
      res.status(500).json({ message: "Failed to create Event" ,error});
    }
  }
  
  static getEvent =  async (req: Request, res: Response) => {
    try {
      const event = await events.find();
      res.status(200).json(event);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to Get Event" });
    }
  }
  
  static deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await events.findOneAndDelete({ _id: id });
    res.status(201).json({ message: "The event deleted successfully!" });
  } catch (error: any) {
    res
      .status(500)
      .json({ messge: "Failed to delete Event", error: error.message });
  }
}
  static patchEvent = async (req: Request, res: Response) => {
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
}

static getActiveEvents =async(req:Request, res:Response)=>{
  try {
    const status = "Active"
    const counts = await events.countDocuments({status: status})

    res.status(200).json(counts)
  } catch (error) {
    res.status(500).json('Failed to Fetch Total Active Event')
  }
}
}
export default EventController