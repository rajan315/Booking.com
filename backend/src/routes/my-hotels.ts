import express from "express";
import { Request, Response } from "express";
import multer from 'multer';
import cloudinary from "cloudinary";
import Hotel, { HotelType } from "../models/hotel";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 //image size limit 
    }
})
// /api/my-hotels
router.post("/",
    verifyToken,[
        body("name").notEmpty().withMessage('Name is required.'),
        body("city").notEmpty().withMessage('city is required.'),
        body("country").notEmpty().withMessage('country is required.'),
        body("description").notEmpty().withMessage('description is required.'),
        body("type").notEmpty().withMessage('Hotel type is required.'),
        body("pricePerNight").notEmpty().isNumeric().withMessage('pricePerNight is required.'),
        body("facilities").notEmpty().isArray().withMessage('facilities are required.'),
    ],
    upload.array("imageFiles", 6), async(req: Request, res: Response) => {
    try{
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;

        const uploadPromises = imageFiles.map(async (image) => {
            const b64 = Buffer.from(image.buffer).toString("base64");
            const dataURI = `data:${image.mimetype};base64,${b64}`;
            try {
                const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
                return uploadResponse.url;
            } catch (error) {
                console.error("Error uploading image to Cloudinary:", error);
                throw error; // Rethrow to handle in your catch block
            }
        });

        const imageUrls = await Promise.all(uploadPromises);
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;

        const hotel = new Hotel(newHotel);
        await hotel.save();

        res.status(201).send(hotel);
    }catch(e){
        console.log("error creating hotel: ", e);
        res.status(500).json({message: "Something went wrong"})
    }
})

export default router;