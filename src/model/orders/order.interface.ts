import { Types } from "mongoose";

// export interface TOrder {
//     _id?: Types.ObjectId;
//     user: Types.ObjectId;
//     productId: Types.ObjectId;
//     quantity: number;
//     totalPrice: number;
//     status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
//     paymentStatus: 'Unpaid' | 'Paid';
// }



// export interface TOrder {
//     _id?: Types.ObjectId;
//     user: Types.ObjectId;
//     productId: Types.ObjectId;
//     quantity: number;
//     totalPrice: number;
//     status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
//     paymentStatus: 'Unpaid' | 'Paid';
//     // paymentStatus: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled";
//     transaction: {
//         id: string;
//         transactionStatus: string;
//         bank_status: string;
//         sp_code: string;
//         sp_message: string;
//         method: string;
//         date_time: string;
//     };
// }


export interface TOrder extends Document {
    _id?: Types.ObjectId;
    user: Types.ObjectId;
    products: {
        product: Types.ObjectId;
        quantity: number;
    }[];
    totalPrice: number;
    status: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled";
    transaction: {
        id: string;
        transactionStatus: string;
        bank_status: string;
        sp_code: string;
        sp_message: string;
        method: string;
        date_time: string;
    };
    createdAt?: Date;
    updatedAt?: Date;
}




