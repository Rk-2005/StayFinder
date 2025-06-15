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
exports.signin = exports.signup = void 0;
const Validation_1 = require("../Validation");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "Ronak";
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    console.log(data);
    try {
        const check = Validation_1.SignupSchema.safeParse(data);
        if (!check.success) {
            return res.status(504).json({
                Msg: "Invalid Inputs",
            });
        }
        const exits = yield prisma.user.findUnique({
            where: { email: data.email },
        });
        if (exits) {
            return res.status(404).json({
                msg: "User already exits"
            });
        }
        const hash = bcryptjs_1.default.hashSync(data.password, 10);
        const user = yield prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hash,
                role: data.role,
            },
        });
        const token = jsonwebtoken_1.default.sign({ userid: user.id, role: data.role }, JWT_SECRET);
        res.json({
            token,
        });
    }
    catch (e) {
        res.status(503).json({
            e,
        });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    console.log(body);
    try {
        const check = Validation_1.SigninSchema.safeParse(body);
        if (!check.success) {
            return res.status(503).json({
                msg: "Invalid Schema",
            });
        }
        const user = yield prisma.user.findUnique({
            where: { email: body.email },
        });
        if (!user) {
            return res.json({
                msg: "User doesnt exists",
            });
        }
        const password = yield bcryptjs_1.default.compare(body.password, user.password);
        if (password == false) {
            return res.status(404).json({
                msg: "Invalid password or email",
            });
        }
        const token = jsonwebtoken_1.default.sign({ userid: user.id, role: user.role }, JWT_SECRET);
        res.json({
            token,
        });
    }
    catch (e) {
        return res.json({
            e,
        });
    }
});
exports.signin = signin;
