import type { Request, Response } from "express";
import Hotel from "./hotel.model";

export const createHotel = async (req: Request, res: Response) => {
  try {
    const hotel = await Hotel.create(req.body);
    res.status(201).json(hotel);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getHotels = async (req: Request, res: Response) => {
  const hotels = await Hotel.find();
  res.json(hotels);
};
