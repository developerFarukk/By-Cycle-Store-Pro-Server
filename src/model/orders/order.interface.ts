import { Types } from "mongoose";
// import { z } from "zod";

export interface TOrder {
    _id?: Types.ObjectId;
    user: Types.ObjectId;
    productId: Types.ObjectId;
    quantity: number;
    totalPrice: number;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    paymentStatus: 'Unpaid' | 'Paid';
}




// export const createOrderValid = z.object({
//     email: z.string().email("Invalid Email Address"),
//     product: z.string(),
//     quantity: z.number().min(1, "Quantity must be at least 1"),
//     totalPrice: z.number().min(0, "Total price must be positive")
// })

// export interface OrderDocument extends Document {
//     status: boolean
//     email: string;
//     product: mongoose.Types.ObjectId;
//     quantity: number;
//     totalPrice: number;

// }


