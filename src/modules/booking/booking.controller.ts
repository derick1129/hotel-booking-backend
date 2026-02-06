import Booking from "./booking.model";
import Room from "../room/room.model";
import type { Request, Response } from "express";
import mongoose from "mongoose";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { roomId, checkIn, checkOut } = req.body;
    const userId = new mongoose.Types.ObjectId(req.user!.id);

    if (new Date(checkIn) >= new Date(checkOut)) {
      return res.status(400).json({
        message: "Invalid booking dates",
      });
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    const overlappingBooking = await Booking.findOne({
      roomId,
      status: { $ne: "CANCELLED" },
      checkIn: { $lt: new Date(checkOut) },
      checkOut: { $gt: new Date(checkIn) },
    });

    if (overlappingBooking) {
      res.status(409).json({
        message: "Room is not available for selected dates",
      });
    }

    const nights =
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
      (1000 * 60 * 60 * 24);

    const totalPrice = nights * room.pricePreNight;

    const booking = await Booking.create({
      userId,
      hotelId: room.hotelId,
      roomId,
      checkIn,
      checkOut,
      totalPrice,
    });

    res.status(201).json(booking);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
