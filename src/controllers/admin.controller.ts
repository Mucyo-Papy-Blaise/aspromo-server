import { Request, Response } from "express";
import admins from "../models/admin.model";
import bcrypt from "bcrypt";
import jwt,{JwtPayload} from 'jsonwebtoken'
import notifications from "../models/notification.model";
import applicant from "../models/applicant.model";

class adminController {
  static adminRegistration = async (req: Request, res: Response) => {
    try {
      const { fullName, image,email, password } = req.body;
      // Only create if not existing
      const existing = await admins.findOne({email})

      if(existing){
        res.status(401).json({message:"Email already exist!"})
      }
      await admins.create({
        fullName,
        email,
        image: image.url,
        password: await bcrypt.hash(password, 10),
      });
      res.status(201).json({ message: "Registration successfully!" });
    } catch (error: any) {
      res.status(500).json({ message: "Failed to Register!", error: error.message });
    }
  };

  static adminLogin = async(req: Request, res:Response)=>{
    try {
      const {email, password} = req.body
      const user  = await admins.findOne({email})

      if(!user){
        res.status(404).json({message:"Invalid Credentials"})
        return;
      }

      const isMatch = await bcrypt.compare(password, user.password!)

      if(!isMatch){
        res.status(500).json({message:"Invalid Password"})
        return;
      }

      const token  = jwt.sign({id:user._id},process.env.JWT_SECRET!,{expiresIn: '7d'})
      res.status(200).json({
        message: "Login Sucessfully",
        token,
        name: user.fullName,
        email: user.email,
        id: user._id,
        image: user.image
      })

    } catch (error: any) {
      res.status(500).json({message:"Failed to Login", error:error.message})
    }
  }

  static getLoggedInAdmin = async(req:Request, res:Response)=>{
    try {
      const token = req.headers.authorization?.split(' ')[1]
      const user = jwt.verify(token!,process.env.JWT_SECRET!) as JwtPayload
      const loggedUser = await admins.findById(user.id)

      if(!token){
        res.status(404).json({message:"No token Provided"})
        return;
      }

      if(!loggedUser){
        res.status(404).json({message:"User not found"})
        return;
      }
      res.status(200).json({user:loggedUser})
      } catch (error: any) {
       res.status(500).json({message:"Failed to get the LoggedIn user!", error:error.message}) 
      }
  }
}

export default adminController
