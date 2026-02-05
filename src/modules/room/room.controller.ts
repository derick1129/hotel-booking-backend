import type { Request, Response } from "express";
import Room from "./room.model";

export const createRoom = async (req: Request, res: Response) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getRoomsByHotel = async (req: Request, res: Response) => {
  const rooms = await Room.find({
    hotelId: req.params.hotelId,
  });
  res.json(rooms);
};
