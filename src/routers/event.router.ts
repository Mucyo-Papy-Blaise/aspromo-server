import express, { Request, Response } from "express";
import events from "../models/event.model";
import { uploadMultiple } from "rod-fileupload";
import cloudinary from "../config/cloudinary";
import EventController from "../controllers/event.controller";

const router = express();
router.use(express.json());

router.post("/",uploadMultiple("videos", cloudinary), EventController.postEvent);
router.get("/", EventController.getEvent);
router.delete("/", EventController.deleteEvent);
router.patch("/:id", EventController.patchEvent);
router.get('/activeEvent', EventController.getActiveEvents)

export default router;
