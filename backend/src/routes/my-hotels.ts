import express, {Request, Response} from "express";
import multer from 'multer';
import { buffer } from "stream/consumers";
import cloudinary from 'cloudinary';


const router = express.Router();
const storage = multer.memoryStorage()  // tells multer saves the images directly from the POST request, and save them clodinary
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 5 * 1024 * 1024 //5MB
    }
})

router.post("/", upload.array("imageFiles", 6), async(req:Request, res:Response)=>{
    try{
        const imageFiles =req.files as Express.Multer.File[]; //holds for the image file
        const newHotel = req.body;
         //*upload the images to clodinary 
         const uploadPromises = imageFiles.map(async(image)=>{
            const b64 = Buffer.from(image.buffer).toString("base64"); //converting the image in base64 strings
            let dataURI= "data:" + image.mimetype + ";base64," + b64; //to understand what kind of image uploded(png/gif)
            const res = await cloudinary.v2.uploader.upload(dataURI) //uploading the image to cloudinary


         })
        //**if sucessful and the urls to new hotels 
        //***save the new hotel in db and 
        //****return 201
    }catch(e){  //returns an error

    }
})