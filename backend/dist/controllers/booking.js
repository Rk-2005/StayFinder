"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookingById = exports.deleteBooking = exports.getBookings = exports.booking = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const booking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { listingId, checkIn, checkOut } = req.body;
    console.log(req.body);
    const userId = req.userid;
    if (!listingId || !checkIn || !checkOut) {
        return res.status(400).json({ msg: "Missing required fields" });
    }
    try {
        const newBooking = yield prisma.bookings.create({
            data: {
                userid: userId,
                listingId: parseInt(listingId),
                checkIn: new Date(checkIn),
                checkOut: new Date(checkOut),
            },
        });
        return res.status(201).json({ msg: "Booking Succes", booking: newBooking });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "falied", error });
    }
});
exports.booking = booking;
const getBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.userid;
    try {
        const bookings = yield prisma.bookings.findMany({
            where: {
                userid: id,
            },
            select: {
                listing: true
            }
        });
        return res.json({
            bookings,
        });
    }
    catch (e) {
        res.status(404).json({
            msg: e,
        });
    }
});
exports.getBookings = getBookings;
const deleteBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingId = parseInt(req.params.id);
    const userId = req.userid;
    try {
        yield prisma.bookings.delete({
            where: { id: bookingId },
        });
        return res.status(200).json({ msg: "Booking deleted successfully" });
    }
    catch (e) {
        return res.status(404).json({
            msg: e,
        });
    }
});
exports.deleteBooking = deleteBooking;
const getBookingById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingId = parseInt(req.params.id);
    const userId = req.userid;
    try {
        const booking = yield prisma.bookings.findUnique({
            where: { id: bookingId },
            include: {
                listing: true,
            },
        });
        return res.json({ booking });
    }
    catch (e) {
        return res.status(500).json({ msg: "error", e });
    }
});
exports.getBookingById = getBookingById;
