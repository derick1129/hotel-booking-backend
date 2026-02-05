import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  amenities: {
    type: [String],
  },
  images: {
    type: [String],
  },
}, { timestamps: true });

export default mongoose.model("Hotel", hotelSchema);