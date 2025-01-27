
import { model, Schema } from 'mongoose';
import { BikID } from './bik.interface';

const bikSchema = new Schema<BikID>({
    name: {
        type: String,
        trim: true,
        required: [true, 'Bike Name is required'],
        
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

        required: [true, ' Inpute Bike Type is Road, Mountain, Hybrid, Electric'],
        enum: {
            values: ['Road', 'Mountain', 'Hybrid', 'Electric'],
            message: `{VALUE} is not valid,  please inpute valid value`
        },
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
        versionKey: false
    }
)

const Bike = model<BikID>('bik', bikSchema)
export default Bike;