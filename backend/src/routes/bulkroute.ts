import express from "express"
import { bulk } from "../controllers/bulk";
import { getall } from "../controllers/Listings";

const router=express();
router.get("/:filter",bulk);
router.get("/",getall);


export default router