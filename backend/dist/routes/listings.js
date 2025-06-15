"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware/middleware");
const Listings_1 = require("../controllers/Listings");
const multer_1 = __importDefault(require("../middleware/multer"));
const router = express_1.default.Router();
router.get("/details/:id", middleware_1.verify, middleware_1.isAdmin, Listings_1.getdetails);
router.get("/getUserListings", middleware_1.verify, middleware_1.isAdmin, Listings_1.getListingsByAdmin);
router.post("/", middleware_1.verify, middleware_1.isAdmin, multer_1.default.single("image"), Listings_1.Postlistings);
router.get("/", middleware_1.verify, Listings_1.getall);
router.get("/:id", Listings_1.getListingsbyid);
router.delete("/:id", Listings_1.deleteListings);
router.put("/:id", middleware_1.verify, middleware_1.isAdmin, Listings_1.updateListings);
exports.default = router;
