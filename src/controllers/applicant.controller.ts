import { Request, Response } from "express";
import Applicant from "../models/applicant.model";
import applicant from "../models/applicant.model";

class applicantController {
  static postApplicant = async (req: Request, res: Response) => {
    try {
      const {
        fullName,
        stageName,
        email,
        location,
        dateOfBirth,
        phone,
        category,
        youtubeUrl,
        about,
      } = req.body;
      // @ts-ignore
      const videoFile = req.body.file.find((f) => f.type === "video");
      // @ts-ignore
      const profilePicture = req.body.file.find((f) => f.type === "image");

      const videoUrl = videoFile.url || null;
      const imageUrl = profilePicture.url || null;

      await applicant.create({
        fullName,
        stageName,
        email,
        location,
        dateOfBirth,
        phone,
        category,
        youtubeUrl,
        about,
        videoFile: videoUrl,
        profilePicture: imageUrl,
      });
      res.status(201).json({ message: "Application is submitted" });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Application Failed", error: error.message });
    }
  };

  static getApplicant = async (req: Request, res: Response) => {
    try {
      const applicants = await applicant.find();
      res.status(201).json(applicants);
    } catch (error: any) {
      res.status(500).json({
        message: "Failed to get Fetch Applicants Data",
        error: error.message,
      });
    }
  };

  static getTotalApplicant = async (req: Request, res: Response) => {
    try {
      const totalApplicants = await applicant.countDocuments();
      res.status(201).json(totalApplicants);
    } catch (error) {
      res.status(500).json({ message: "Failed to count total Participant" });
    }
  };

  static getApplicantCategoryCounts = async (req: Request, res: Response) => {
    try {
      const categoryCounts = await applicant.aggregate([
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 },
          },
        },
      ]);
      res.status(201).json(categoryCounts);
    } catch (error: any) {
      res
        .status(500)
        .json({
          message: "Failed to Counts Applicants according to their category",
          error: error.message,
        });
    }
  };

  static getApplicantById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const applicants = await applicant.findById({ _id: id });
      res.status(201).json(applicants);
    } catch (error: any) {
      res
        .status(500)
        .json({
          message: "Failed to Fetch Applicants data",
          error: error.message,
        });
    }
  };

  static deleteApplicant = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await applicant.findOneAndDelete({ _id: id });
      res.status(201).json({ message: "Applicant deleted!" });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Failed to delete Applicant!", error: error.message });
    }
  };
  
  static vote = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { votes } = req.body;
      const applicant = await Applicant.findById(id);
      if (!applicant) {
        res.status(400).json({ message: "no applicant found" });
        return;
      }
      applicant.votes += votes;
      applicant.save();
      res.status(200).json({ message: "votes successfully" });
    } catch (error: any) {
      res.status(500).json({ message: "error voting", error: error.message });
    }
  };
}
export default applicantController;
