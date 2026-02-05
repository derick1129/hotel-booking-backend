import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL as string).then(() => {
    console.log("MongoDb connected")
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    });
})
.catch(err => console.error(err));