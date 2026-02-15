import express, { type Request, type Response, type NextFunction } from "express";
import authRoutes from "./modules/auth/auth.routes";
import roomRoutes from "./modules/room/room.routes";
import hotelRoutes from "./modules/hotel/hotel.routes";
import bookingRoutes from "./modules/booking/booking.routes";
import paymentRoutes from "./modules/payment/payment.routes";

const app = express();

app.use(express.json());

app.use("/api/payments", paymentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {
  res.send("Seasons api is running");
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Not found" });
});

// Global error handler
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: err.message ?? "Internal server error" });
});

export default app;