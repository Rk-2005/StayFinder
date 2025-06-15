"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bulk_1 = require("../controllers/bulk");
const Listings_1 = require("../controllers/Listings");
const router = (0, express_1.default)();
router.get("/:filter", bulk_1.bulk);
router.get("/", Listings_1.getall);
exports.default = router;
