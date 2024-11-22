
import { model, Schema } from 'mongoose';

const bikSchema = new Schema({
    bikeID: {
        type: Number,
        required: [true, 'Bike ID is required'],
        unique: true,
    },
    name: {
        type: String,
        required:  [true, 'Bike Name is required'],
    },
    brand: {
        type: String,
        required: [true, 'Bike brand is required']
    },
    price: {
        type: Number,
        required: [true, 'Bike brand is required'],
        min: 0,
    },
    type: {
        type: String,
        required: true,
        enum: ['Road', 'Mountain', 'Hybrid', 'Electric'],
    },
    description: {
        type: String,
        required: [true, 'Bike description is required']
    },
    quantity: {
        type: Number,
        required: [true, 'Bike description is required'],
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