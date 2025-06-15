"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authcontroller_1 = require("../controllers/authcontroller");
const router = express_1.default.Router();
router.post("/register", authcontroller_1.signup);
router.post("/signin", authcontroller_1.signin);
exports.default = router;
