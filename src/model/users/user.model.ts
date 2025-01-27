import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";


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
            enum: ['admin', 'customer'],
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


userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this; // doc
    // hashing password and save into DB
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds),
    );
    next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});


// Password Matched
userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};


export const User = model<TUser, UserModel>('User', userSchema);