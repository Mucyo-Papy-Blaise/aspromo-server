import { Request, Response } from "express";
import Applicant from "../models/applicant.model";
import applicant from "../models/applicant.model";
import { generateOTP, gotOTPExpired } from "../utils/otpGenerator";
import { sendOTPEmail } from "../utils/mailer";

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
        appliedAt,
        approvedAt,
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
        appliedAt,
        approvedAt,
      });
      res.status(201).json({ message: "Application is submitted" });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Application Failed", error: error.message });
    }
  };

  static generateOTP =async(req: Request, res:Response)=>{
    try {
     const { email } = req.body
     const user = await applicant.findOne(email)

     if(!user){
      return res.status(4004).json({message:"Email not found"})
     }

     if(!email.includes('@')){
      res.status(400).json({message:"Invalid Email"})
     }

     const otp = generateOTP()
     const expiresAt = gotOTPExpired(5)

     const otpStore = new Map()
     otpStore.set(email, { otp, expiresAt });
     
     res.status(200).json({message:"OTP Generated successfully!"})

    } catch (error: any) {
      res.status(500).json({message: `Error occurred: ${error.message}`})
    }
  }

  static verifyOTP =async(req: Request, res:Response)=>{
    const [email, otp] = req.body
    const otpStore = new Map()
    const record = otpStore.get(email)

    if(!record || !record.otp !== otp){
      return res.status(400).json({ message: 'Invalid or expired OTP' })
    }

    if(Date.now() > record.expiresAt){
      return res.status(400).json({ message: 'OTP expired' });
    }
    otpStore.delete(email);
    return res.status(200).json({ message: 'OTP verified' });
  }

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
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);
    res.status(200).json({categoryCounts});
  } catch (error: any) {
    res.status(500).json({message: "Failed to count applicants by category",error: error.message});
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

  static changeStatus = async(req:Request, res:Response)=>{
    try {
      const {id} =  req.params
      const {status} = req.body
      const updateFiled: any = {status}

      if(status === "Approved"){
        updateFiled.approvedAt = new Date() 
        updateFiled.isApproved = true
      }

      if(status === "Rejected"){
        updateFiled.approvedAt = new Date() 
      }

      const changedApplicant = await applicant.findByIdAndUpdate(id,updateFiled,{new: true})
      res.status(200).json(changedApplicant)
    } catch (error) {
      res.status(500).json({message:"Failed to update Applicant Status"})
    }
  }

  static videosCounts = async (req: Request, res: Response) => {
  try {
    const counts = await applicant.countDocuments({
      status: "Approved",
      videoFile: { $exists: true, $ne: null }
    });
    res.status(200).json({ count: counts }); 
  } catch (error: any) {
    res.status(500).json({message: 'Failed to count approved Videos Uploaded',error: error.message});
  }
};

}
export default applicantController;
