import { Schema } from "mongoose";
import { TUser } from "./user.interface";


const userSchema = new Schema<TUser>(
    {
        name: {
            type: String,
            trim: true,
            required: [true, 'User name is required'],
            maxlength: [20, 'User Name can not be more than 20 characters']
        },
        email: {
            type: String,
            trim: true,
            required: [true, 'user Email is required'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Password id is required'],
            maxlength: [4, 'User password can not be more than 4 characters'],
            select: 0
        },
        role: {
            type: String,
            enum: [ 'admin', 'customer'],
            default: "customer"
        },
        status: {
            type: String,
            enum: ['in-progress', 'blocked'],
            default: 'in-progress',
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        // versionKey: false
    },
);

