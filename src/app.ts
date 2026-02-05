import express from 'express';
import authRoutes from "./modules/auth/auth.routes"
import roomRoutes from "./modules/room/room.routes";
import hotelRoutes from "./modules/hotel/hotel.routes"

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomRoutes);

app.get("/", (req, res) => {
    res.send("Seasons api is running")
})

export default app;