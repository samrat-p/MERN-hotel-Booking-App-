import express, { Request, Response } from "express";
import multer from "multer";

import cloudinary from "cloudinary";

import Hotel, { HotelType } from "../models/hotel";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();
const storage = multer.memoryStorage(); // tells multer saves the images directly from the POST request, and save them clodinary
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5MB
  },
});

router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel Type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per Night is required and should be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Faclities are required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[]; //holds for the image file
      const newHotel: HotelType = req.body;
      //*upload the images to clodinary
      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64"); //converting the image in base64 strings
        let dataURI = "data:" + image.mimetype + ";base64," + b64; //to understand what kind of image uploded(png/gif)
        const res = await cloudinary.v2.uploader.upload(dataURI); //uploading the image to cloudinary using sdk
        return res.url; // return the url of the hosted image on cloudinary
      });
      const imageUrls = await Promise.all(uploadPromises); //wait for all images to upload till back we get back a string array attached to url variable

      //**if sucessful and the urls to new hotel
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      //***save the new hotel in db
      const hotel = new Hotel(newHotel);
      await hotel.save();
      //****return 201
      res.status(201).send(hotel);
    } catch (e) {
      //returns an error
      console.log("Error creating hotel", e);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;
