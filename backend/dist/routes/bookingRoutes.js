"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware/middleware");
const booking_1 = require("../controllers/booking");
const router = express_1.default.Router();
router.get("/getallbooking", middleware_1.verify, booking_1.getBookings);
router.delete("/:id", middleware_1.verify, booking_1.deleteBooking);
router.post("/", middleware_1.verify, booking_1.booking);
router.get("/:id", middleware_1.verify, booking_1.getBookingById);
exports.default = router;
