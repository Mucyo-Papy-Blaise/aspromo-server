import { Request, Response } from "express";
import category from "../models/category.models";

class categoryController {
  static postCatgory = async (req: Request, res: Response) => {
    try {
      const { image, categoryName, description, status } = req.body;
      await category.create({
        image: image.url,
        categoryName,
        description,
        status,
      });
      res.status(201).json({ message: "Category created Sucessfully" });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Failed to create category", error: error.message });
    }
  };

  static getCategory = async (req: Request, res: Response) => {
    try {
      const categories = await category.find();
      res.status(201).json(categories);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Failed to get Category", error: error.message });
    }
  };

  static deleteCategory = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      res.status(201).json({ _id: id });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete Category" });
    }
  };

  static updateStatus = async(req: Request, res:Response)=>{
    try {
      const {id} = req.params
      const {status} =  req.body
      const updatedCategory = await category.findOneAndUpdate({_id: id},{status},{new: true})

    if(!updatedCategory){
      res.status(400).json({message:"The category not found"})
      return
    }
    res.status(201).json({ message: "Status updated", updatedCategory })
    } catch (error: any) {
      res.status(500).json({message:"Failed to Update Category Status", error:error.message})
    }
  }
}

export default categoryController;
