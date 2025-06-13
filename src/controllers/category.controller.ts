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
      const deleted = await category.findByIdAndDelete(id)
      if(!deleted){
        res.status(401).json({message:'Category Not Found'})
      }
      res.status(201).json({message:'You delete category',deleted})
    } catch (error) {
      res.status(500).json({ message: "Failed to delete Category"});
    }
  };

  static updateStatus = async(req: Request, res:Response)=>{
    try {
      console.log(req.body)
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

  static updateCategory =async(req:Request , res:Response)=>{
    try {
      const {id} = req.params
      const {categoryName,description,status} = req.body
      const updatedCategory = await category.findOneAndUpdate({_id:id},{categoryName,description,status})
      if(!updatedCategory){
        res.status(401).json({message:'No Category found'})
      }
      res.status(201).json({message:'Categoy Updated', updatedCategory})
    } catch (error: any) {
      res.status(500).json({message:'Failed to update category', error:error.message})
    }
  }
}

export default categoryController;
