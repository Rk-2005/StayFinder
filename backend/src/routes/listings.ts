import express from "express"
import { isAdmin, verify } from "../middleware/middleware"
import { deleteListings, getall, getdetails, getListingsByAdmin, getListingsbyid, Postlistings, updateListings } from "../controllers/Listings";
import upload from "../middleware/multer";

const router=express.Router()

router.get("/details/:id",verify,isAdmin,getdetails);

router.get("/getUserListings",verify,isAdmin,getListingsByAdmin);

router.post("/", verify, isAdmin, upload.single("image"), Postlistings);


router.get("/",verify,getall);

router.get("/:id",getListingsbyid);

router.delete("/:id",deleteListings);

router.put("/:id",verify,isAdmin,updateListings);



export default  router