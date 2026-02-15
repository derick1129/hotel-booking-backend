import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL in environment");
  process.exit(1);
}
if (!JWT_SECRET) {
  console.error("Missing JWT_SECRET in environment");
  process.exit(1);
}

mongoose.connect(MONGO_URL).then(() => {
    console.log("MongoDb connected")
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    });
})
.catch(err => console.error(err));