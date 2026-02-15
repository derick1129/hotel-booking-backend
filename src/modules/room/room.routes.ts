import { Router } from "express";
import { createRoom, getRoomsByHotel } from "./room.controller";
import { protect, adminOnly } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createRoomSchema } from "./room.schema";

const router = Router();

router.get("/:hotelId", getRoomsByHotel);
router.post("/", protect, adminOnly, validate(createRoomSchema), createRoom);

export default router;
