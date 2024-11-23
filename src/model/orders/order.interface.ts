import mongoose from "mongoose";
import { z } from "zod";

export interface CreateOrder {

    email: string;
    product: string;
    quantity: number;
    totalPrice: number;
}

export const createOrderValid = z.object({
    email: z.string().email("Invalid Email Address"),
    product: z.string(),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    totalPrice: z.number().min(0, "Total price must be positive")
})

export interface OrderDocument extends Document {
    status: boolean
    email: string;
    product: mongoose.Types.ObjectId;
    quantity: number;
    totalPrice: number;

}


