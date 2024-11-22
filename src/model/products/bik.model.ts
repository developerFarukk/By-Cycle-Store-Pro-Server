
import { model, Schema } from 'mongoose';

const bikSchema = new Schema({
    bikeID: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    type: {
        type: String,
        required: true,
        enum: ['Road', 'Mountain', 'Hybrid', 'Electric'],
    },
    description: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    inStock: {
        type: Boolean,
        default: true,
    },
},
    {
        timestamps: true,
    })

const Bike = model('bik', bikSchema)
export default Bike;