import express from 'express';
import { signin, signup } from '../controllers/authcontroller';
import { verify } from '../middleware/middleware';
import { booking, deleteBooking, getBookingById, getBookings } from '../controllers/booking';

const router=express.Router();

router.get("/getallbooking",verify,getBookings)
router.delete("/:id", verify, deleteBooking);
router.post("/",verify,booking);
router.get("/:id", verify, getBookingById);

export default router