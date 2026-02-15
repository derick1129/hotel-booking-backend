import Razorpay from "razorpay";
import type { Orders } from "razorpay/dist/types/orders";
import Booking from "../booking/booking.model";
import type { Request, Response } from "express";
import crypto from "crypto";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!
});

export const createPaymentOrder = async (req: Request, res: Response) => {
    try {
        const { bookingId } = req.body;

        const booking = await Booking.findOne({
            _id: bookingId,
            userId: req.user!.id
        });

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        if (booking.status !== "PENDING") {
            return res.status(400).json({
                message: "Booking is not pending payment"
            });
        }

        const order = await razorpay.orders.create({
            amount: booking.totalPrice * 100,
            currency: "INR",
            receipt: bookingId,
        } as Orders.RazorpayOrderCreateRequestBody);

        res.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            key: process.env.RAZORPAY_KEY_ID
        });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const verifyPayment = async (req: Request, res: Response) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            bookingId
        } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!).update(body).digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                message: "Payment verification failed"
            });
        }

        const booking = await Booking.findOne({
            _id: bookingId,
            userId: req.user!.id
        });

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        booking.status = "CONFIRMED";
        await booking.save();

        res.json({
            message: "Payment successful",
            booking
        });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};