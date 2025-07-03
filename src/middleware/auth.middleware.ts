import jwt from 'jsonwebtoken'
import { NextFunction, Response } from "express";

const isLogggedIn = async(req:any,res:Response,next:NextFunction)=>{
    try {
        const token = req.headers['authorization']?.split(' ')[1]
        if(!token){
            res.status(401).json("please login")
            return
        }
        const decoded =  jwt.verify(token,process.env.JWT!)
        req.user = decoded
      next()

    } catch (error) {
        res.status(500).json({message:"Error while Login"})
    }
}
export default isLogggedIn