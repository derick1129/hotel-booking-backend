import type { Request, Response } from "express";
import Room from "./room.model";

export const createRoom = async (req: Request, res: Response) => {
  try {
    const { hotelId, roomType, pricePerNight, maxGuests, images } = req.body;
    const room = await Room.create({ hotelId, roomType, pricePerNight, maxGuests, images });
    res.status(201).json(room);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getRoomsByHotel = async (req: Request, res: Response) => {
  try {
    const rooms = await Room.find({
      hotelId: req.params.hotelId,
    });
    res.json(rooms);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
