


import { model, Schema } from 'mongoose';
import { IOrder } from './order.interface';

const orderSchema = new Schema<IOrder>({

    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        validate: {
            validator: function (value: string) {
                return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value)
            },
            message: '{VALUE} is not a valid email',
        },
        immutable: true,
    },

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bike', // Refers to the Bike model
        required: [true, 'Product is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be at least 1'], // Ensures a minimum quantity
    },
    totalPrice: {
        type: Number,
        required: [true, 'Total price is required'],
        min: [0, 'Total price must be a positive number'], // Ensures the total price is positive
    },
},
    {
        timestamps: true,
    }
)

const Order = model<IOrder>('order', orderSchema)
export default Order;