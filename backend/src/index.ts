import express from "express"
import { signup } from "./controllers/authcontroller";
import authroute from "./routes/authRoute"
import listings  from "./routes/listings";
import bulkroute  from "./routes/bulkroute";
import bookingsRoutes from "./routes/bookingRoutes"
import cors from "cors"
const app=express()

app.use(express.json())
app.use(cors());
app.use("/api/auth",authroute);
app.use("/api/listings",listings)
app.use("/api/bookings",bookingsRoutes)
app.use("/api/bulk",bulkroute);

app.listen(3000,()=>{
    console.log("server is runnig on port 3000")
})