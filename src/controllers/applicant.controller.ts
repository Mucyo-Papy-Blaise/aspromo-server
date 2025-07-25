import { Request, Response } from "express";
import Applicant from "../models/applicant.model";
import applicant from "../models/applicant.model";
import { generateOTP, gotOTPExpired } from "../utils/otpGenerator";
import { sendOTPEmail } from "../utils/mailer";
import NotificationModel  from "../models/notification.model";
import Admin from "../models/admin.model";

// Global OTP store - in production, use Redis or database
const otpStore = new Map();

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

      // Notify Adims
      const admins = await Admin.find();
      await Promise.all(
      admins.map((admin) =>
        NotificationModel.create({
          recipientId: admin._id,
          recipientModel: "Admin",
          message: `New applicant "${stageName}" has submitted their application.`,
        })
      )
    );

      res.status(201).json({ message: "Application is submitted" });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Application Failed", error: error.message });
    }
  };

  static generateOTP = async(req: Request, res:Response)=>{
    try {
     const { email } = req.body
     
     if(!email || !email.includes('@')){
      return res.status(400).json({message:"Invalid Email"})
     }

     const user = await applicant.findOne({email})

     if(!user){
      return res.status(404).json({message:"Email not found"})
     }

     const otp = generateOTP()
     const expiresAt = gotOTPExpired(5)
     // Store OTP in the global map
     otpStore.set(email, { otp, expiresAt });
     
     // Send OTP via email
     try {
       await sendOTPEmail(email, otp);
       res.status(200).json({message:"OTP sent successfully to your email!"})
     } catch (emailError) {;
       res.status(500).json({message:"OTP generated but failed to send email. Please check your email configuration."})
     }

    } catch (error: any) {
      res.status(500).json({message: `Error occurred: ${error.message}`})
    }
  }

  static verifyOTP = async(req: Request, res:Response)=>{
    try {
      const { email, otp } = req.body
      const user =  await applicant.findOne({email})
      
      if(!user){
        return res.status(400).json({ message: "Applicant not found" })
      }

      if(!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required' })
      }

      const record = otpStore.get(email)

      if(!record) {
        return res.status(400).json({ message: 'No OTP found for this email' })
      }

      if(Date.now() > record.expiresAt){
        otpStore.delete(email);
        return res.status(400).json({ message: 'OTP expired' });
      }

      if(record.otp !== otp){
        return res.status(400).json({ message: 'Invalid OTP' })
      }

      // OTP is valid
      otpStore.delete(email);
      return res.status(200).json({ message: 'OTP verified successfully' ,applicant: user});
    } catch (error: any) {
      res.status(500).json({message: `Error occurred: ${error.message}`})
    }
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

  static changeStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updateFiled: any = { status };

    if (status === "Approved") {
      updateFiled.approvedAt = new Date();
      updateFiled.isApproved = true;

      const approvedApplicant = await applicant.findById(id);
      if (approvedApplicant) {
        await NotificationModel.create({
          recipientId: approvedApplicant._id,
          recipientModel: "Applicant",
          message: `Congratulations ${approvedApplicant.stageName}, your application has been approved!`,
        });
      }
    }

    if (status === "Rejected") {
      updateFiled.approvedAt = new Date();
    }

    const changedApplicant = await applicant.findByIdAndUpdate(id, updateFiled, { new: true });
    res.status(200).json(changedApplicant);
  } catch (error) {
    res.status(500).json({ message: "Failed to update Applicant Status" });
  }
};

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
