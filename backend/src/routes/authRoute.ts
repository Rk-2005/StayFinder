import express from 'express';
import { signin, signup } from '../controllers/authcontroller';

const router=express.Router();

router.post("/register",signup);
router.post("/signin",signin);
export default router