


import { model, Schema } from 'mongoose';
// import { BikID } from './bik.interface';

const orderSchema = new Schema({

    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Validates email format
            },
            message: props => `${props.value} is not a valid email!`,
        },
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

    timestamps: true,
}
)

const Order = model('order', orderSchema)
export default Order;