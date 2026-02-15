import { Router } from "express";
import {
  createPaymentOrder,
  verifyPayment,
} from "./payment.controller";
import { protect } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createOrderSchema, verifyPaymentSchema } from "./payment.schema";

const router = Router();

router.post("/create-order", protect, validate(createOrderSchema), createPaymentOrder);
router.post("/verify", protect, validate(verifyPaymentSchema), verifyPayment);

export default router;
