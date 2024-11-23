
import { model, Schema, version } from 'mongoose';
import { OrderDocument } from './order.interface';

const orderSchema = new Schema<OrderDocument>({

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
        type: Schema.Types.ObjectId,
        ref: 'Product', 
        required: [true, 'Product ID is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be at least 1'], 
    },
    totalPrice: {
        type: Number,
        required: [true, 'Total price is required'],
        min: [0, 'Total price must be a positive number'],
    },
},
    {
        timestamps: true,
        versionKey: false
    }
    
)

const Order = model<OrderDocument>('order', orderSchema)
export default Order;