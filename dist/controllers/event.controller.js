"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const event_model_1 = __importDefault(require("../models/event.model"));
class EventController {
}
_a = EventController;
EventController.postEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventTitle, description, startDate, status, applicants, endDate } = req.body;
        const videoUrls = req.body.videos.map((f) => f.url);
        console.log(videoUrls);
        yield event_model_1.default.create({
            eventTitle,
            description,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            status,
            applicants,
            videos: videoUrls,
        });
        res.status(201).json({ message: "Event Created Succesffully!" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create Event", error });
    }
});
EventController.getEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield event_model_1.default.find();
        res.status(200).json(event);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to Get Event" });
    }
});
EventController.deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield event_model_1.default.findOneAndDelete({ _id: id });
        res.status(201).json({ message: "The event deleted successfully!" });
    }
    catch (error) {
        res
            .status(500)
            .json({ messge: "Failed to delete Event", error: error.message });
    }
});
EventController.patchEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updateEvent = yield event_model_1.default.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updateEvent) {
            res.status(404).json({ message: "No Event found!" });
        }
        res.status(200).json({ message: 'Applicant Updated', data: updateEvent });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to Update the Event!', error: error.message });
    }
});
EventController.getActiveEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = "Active";
        const counts = yield event_model_1.default.countDocuments({ status: status });
        res.status(200).json(counts);
    }
    catch (error) {
        res.status(500).json('Failed to Fetch Total Active Event');
    }
});
exports.default = EventController;
