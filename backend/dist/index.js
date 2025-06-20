"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const listings_1 = __importDefault(require("./routes/listings"));
const bulkroute_1 = __importDefault(require("./routes/bulkroute"));
const bookingRoutes_1 = __importDefault(require("./routes/bookingRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/auth", authRoute_1.default);
app.use("/api/listings", listings_1.default);
app.use("/api/bookings", bookingRoutes_1.default);
app.use("/api/bulk", bulkroute_1.default);
app.listen(3000, () => {
    console.log("server is runnig on port 3000");
});
