import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import Hotel from "../models/hotel";
import { HotelType } from "../shared/types";

const router = express.Router();
//api/my-booking

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    //finds all the hotels which have been booked
    const hotels = await Hotel.find({
      bookings: { $elemMatch: { userId: req.userId } },
    });
    //filtering out all the bookings for different users
    const results = hotels.map((hotel) => {
      const userBookings = hotel.bookings.filter(
        (booking) => booking.userId === req.userId
      );
      //gonna update the bookings array with this new array

      const hotelWithUserBookings: HotelType = {
        ...hotel.toObject(),
        bookings: userBookings,
      };
      return hotelWithUserBookings;
    });

    res.status(200).send(results);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Unable to fetch bookings" });
  }
});

export default router