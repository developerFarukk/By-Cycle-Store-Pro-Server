import { Types } from "mongoose";

export interface TOrder {
    _id?: Types.ObjectId;
    user: Types.ObjectId;
    productId: Types.ObjectId;
    quantity: number;
    totalPrice: number;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    paymentStatus: 'Unpaid' | 'Paid';
}




