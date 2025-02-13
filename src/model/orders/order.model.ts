
import { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>({

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'User id is required']
    },

    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Bicycle",
                required: [true, 'Bicycle id is required']
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, "Quantity must be at least 1"],
            },
            _id: false
        },
        // { _id: false }
    ],
    // totalQuantity: {
    //     type: Number,
    //     required: true,
    //     min: [1, "Quantity must be at least 1"],
    // },

    totalPrice: {
        type: Number,
        required: [true, 'Total price is required']
    },
    status: {
        type: String,
        enum: ["Pending", "Paid", "Shipped", "Completed", "Cancelled"],
        default: "Pending",
    },
    transaction: {
        id: String,
        transactionStatus: String,
        bank_status: String,
        sp_code: String,
        sp_message: String,
        method: String,
        date_time: String,
    },
    // status: {
    //     type: String,
    //     enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    //     default: 'Pending',
    // },
    // paymentStatus: {
    //     type: String,
    //     enum: ['Unpaid', 'Paid'],
    //     default: 'Unpaid',
    // },
},
    {
        timestamps: true,
    }

)

const Order = model<TOrder>('Order', orderSchema)
export default Order;