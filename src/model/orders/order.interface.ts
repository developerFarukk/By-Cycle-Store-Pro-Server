import mongoose from "mongoose";

export interface CreateOrder {
    email: string;
    product: string;
    quantity: number;
    totalPrice: number;
}

export interface OrderDocument extends Document {
    email: string;
    product: mongoose.Types.ObjectId;
    quantity: number;
    totalPrice: number;
}
