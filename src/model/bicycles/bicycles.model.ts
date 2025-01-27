import { model, Schema } from "mongoose";
import { BicycleModel, TBicycle } from "./bicycle.interface";
import { BicycleBrand, BicycleType } from "./bicycle.constant";



const bicycleSchema = new Schema<TBicycle>({
    name: {
        type: String,
        required: [true, 'Bicycle Name is required'],
        trim: true,
        maxlength: [20, 'Bicycle Name can not be more than 20 characters'],
    },
    brand: {
        type: String,
        required: [true, 'Bicycle brand is required'],
        trim: true,
        enum: {
            values: BicycleBrand,
            message: '{VALUE} is not a valid brand',
        },
    },
    price: {
        type: Number,
        required: [true, 'Bicycle Price is required'],
        trim: true,
        min: 0,
        default: 0
    },
    model: {
        type: String,
        required: [true, 'Bicycle Model is required']
    },
    type: {
        type: String,
        required: [true, ' Inpute Bike Type is Road, Mountain, Hybrid, Electric'],
        trim: true,
        enum: {
            values: BicycleType,
            message: `{VALUE} is not valid,  please inpute valid value`
        },
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Bicycle description is required']
    },
    quantity: {
        type: Number,
        required: [true, 'Bicycle description is required'],
        trim: true,
        min: 0,
        default: 0
    },
    inStock: {
        type: Boolean,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    bicycleImage: {
        type: String,
        default: ''
    },
},
    {
        timestamps: true,

    }
)

bicycleSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

bicycleSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

// Spasic data send function
// bicycleSchema.statics.getBicycleData = function (biId: string) {
//     return this.findById(biId)
//         .select('name  brand  price model type description bicycleImage inStock quantity')
// };

export const Bicycle = model<TBicycle, BicycleModel>('Bicycle', bicycleSchema);