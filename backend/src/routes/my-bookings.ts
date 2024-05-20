import express, {Request, Response} from "express";
import verifyToken from "../middleware/auth";

const router = express.Router()
//api/my-booking

router.get("/",verifyToken, async(req: Request, res: Response) => {
    try{

    }catch(error){
        console.log(error)
        return res.status(500).json({message:"Unable to fetch bookings"})
    }
})
