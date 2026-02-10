import type { Request, Response } from "express";
import Hotel from "./hotel.model";

export const createHotel = async (req: Request, res: Response) => {
  try {
    const { name, location, description, amenities, images } = req.body;
    const hotel = await Hotel.create({ name, location, description, amenities, images });
    res.status(201).json(hotel);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
