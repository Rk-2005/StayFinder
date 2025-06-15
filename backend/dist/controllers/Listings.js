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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getdetails = exports.getListingsByAdmin = exports.deleteListings = exports.updateListings = exports.Postlistings = exports.getListingsbyid = exports.getall = void 0;
const client_1 = require("@prisma/client");
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const prisma = new client_1.PrismaClient();
const getall = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield prisma.listings.findMany();
    console.log("hi");
    return res.json({
        results,
    });
});
exports.getall = getall;
const getListingsbyid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = parseInt(req.params.id);
    const GetallListings = yield prisma.listings.findMany({
        where: {
            id: params,
        },
    });
    return res.json({
        GetallListings,
    });
});
exports.getListingsbyid = getListingsbyid;
const Postlistings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, description, location, price } = req.body;
    const id = req.userid;
    const image = yield (0, cloudinary_1.default)((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
    console.log(req.body);
    console.log(id);
    const check = yield prisma.listings.findFirst({
        where: {
            title: title,
        },
    });
    if (check) {
        return res.status(404).json({
            msg: "Title already exits",
        });
    }
    const listings = yield prisma.listings.create({
        data: {
            title: title,
            description: description,
            location: location,
            hostId: id,
            price: parseInt(price),
            image: image,
        },
    });
    res.json({
        listings,
    });
});
exports.Postlistings = Postlistings;
const updateListings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, location, price } = req.body;
    const id = req.userid;
    try {
        const listings = yield prisma.listings.update({
            where: {
                id: id,
            },
            data: {
                title: title,
                description: description,
                location: location,
                hostId: id,
                price: price,
            },
        });
        res.json({
            listings,
        });
    }
    catch (e) {
        res.status(503).json({
            e,
        });
    }
});
exports.updateListings = updateListings;
const deleteListings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        yield prisma.listings.delete({
            where: { id: id },
        });
        res.send("success");
    }
    catch (e) {
        res.status(503).send({
            e,
        });
    }
});
exports.deleteListings = deleteListings;
const getListingsByAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hostId = req.userid;
    console.log(hostId + " admin id");
    try {
        const listings = yield prisma.listings.findMany({
            where: {
                hostId: hostId,
            },
        });
        res.json({ listings });
    }
    catch (e) {
        console.error(e);
        res.status(503).json({
            msg: "Failed to load",
            error: e,
        });
    }
});
exports.getListingsByAdmin = getListingsByAdmin;
const getdetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listid = parseInt(req.params.id);
    console.log(listid);
    const result = yield prisma.bookings.findMany({
        where: {
            listingId: listid,
        },
        select: {
            checkIn: true,
            checkOut: true,
            user: {
                select: {
                    name: true,
                    email: true
                }
            },
            listing: true
        },
    });
    return res.json({
        result,
    });
});
exports.getdetails = getdetails;
