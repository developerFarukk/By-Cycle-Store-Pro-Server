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
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            validate: {
                validator: function (value: string) {
                    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value)
                },
                message: '{VALUE} is not a valid email',
            },
            immutable: true,
        },
        password: {
            type: String,
            required: [true, 'Password id is required'],
            // maxlength: [4, 'User password can not be more than 4 characters'],
            select: false
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
        address: {
            type: String,
            trim: true,
            required: [true, 'User address is required'],
            // maxlength: [20, 'User Name can not be more than 20 characters']
        },
        mobile: {
            type: String,
            trim: true,
            required: [true, 'User Mobile Number is required'],
            maxlength: [11, 'User mobil number can not be more than 11 characters'],
            minlength: 11
        },
        passwordChangedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
        // versionKey: false
    },
);


userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
        user.passwordChangedAt = new Date();
    }
    next();
});


// set '' after saving password
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});


// Spasic data send function
userSchema.statics.getPublicUserData = function (userId: string) {
    return this.findById(userId).select('id name email isDeleted status role address mobile');
};

// Existing ID
userSchema.statics.isUserExistsByCustomId = async function (email: string) {
    return await User.findOne({ email })
};


// Password Matched
userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};




userSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});


export const User = model<TUser, UserModel>('User', userSchema);