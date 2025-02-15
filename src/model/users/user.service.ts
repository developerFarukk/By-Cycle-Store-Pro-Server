import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status";
import bcrypt from 'bcrypt';
import config from "../../config";
import { createToken } from "./user.utils";
import QueryBuilder from "../../builder/QueryBuilder";
import { userSearchableFields } from "./user.constant";


// User Register function
const userRegisterDB = async (payload: TUser) => {

    const publicUserData = await User.create(payload);
    const result = await User.getPublicUserData(publicUserData.id);

    return result
}


// Login user
const loginUserWithDB = async (payload: { email: string; password: string }) => {

    // checking if the user is exist
    const user = await User.findOne({ email: payload?.email }).select('+password');


    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }


    // checking if the user is blocked
    const userStatus = user?.status;

    if (userStatus === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }

    // checking if the user is Blocked
    const isBlocked = user?.isDeleted

    if (isBlocked) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }

    //checking if the password is correct
    const isPasswordMatched = await bcrypt.compare(
        payload?.password,
        user?.password
    )

    if (!isPasswordMatched) {
        throw new Error('Your Password is Wrong.   Please inpute Corect password')
    }

    //create token and sent to the  client
    const JwtPayload = {
        userId: user._id.toString(),
        userEmail: user?.email,
        role: user.role,
    };

    const token = createToken(
        JwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string,
    );

    // console.log("Generated Token:", token);

    return { token };
    // return user;
}


// Get all user
const getAllUserFromDB = async (query: Record<string, unknown>) => {

    const userQuery = new QueryBuilder(User.find(),
        query,
    )
        .search(userSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const meta = await userQuery.countTotal();
    const result = await userQuery.modelQuery;

    return {
        meta,
        result,
    };
};


// Get Me user
const getMeUserFromDB = async (userEmail: string) => {

    const user = await User.findOne({ email: userEmail })

    return user
};


// Update single user
const updateUserIntoDB = async (
    id: string,
    payload: Partial<TUser>,
) => {
    const result = await User.findOneAndUpdate(
        { _id: id },
        payload,
        {
            new: true,
        },
    );
    return result;
};


// Delete User
const deleteUserFromDB = async (id: string) => {
    const result = await User.findByIdAndUpdate(
        id,
        { isDeleted: true },
        {
            new: true,
        },
    );
    return result;
};


// Password Change Function

const userPasswordChangeIntoDB = async (
userEmail:string,
payload: { oldPassword: string; newPassword: string }
) => {
    console.log(userEmail, payload);

    return null;
};

// const passwordChangFromDB = async (
//     userEmail: string,
//     payload: { oldPassword: string; newPassword: string }
// ) => {

//     console.log(userEmail, payload);


//     // // Destructure the payload
//     // const { oldPassword, newPassword } = payload;

//     // // Find the user by email and select the password field
//     // const user = await User.findOne({ email: userEmail }).select('+password');

//     // // If user not found, throw an error
//     // if (!user) {
//     //     throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
//     // }

//     // // Check if the user is blocked or deleted
//     // if (user.status === 'blocked') {
//     //     throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
//     // }

//     // if (user.isDeleted) {
//     //     throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted!');
//     // }

//     // // Compare the old password with the hashed password in the database
//     // const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

//     // // If old password does not match, throw an error
//     // if (!isPasswordMatch) {
//     //     throw new AppError(httpStatus.UNAUTHORIZED, 'Old password is incorrect!');
//     // }

//     // // Hash the new password
//     // const hashedNewPassword = await bcrypt.hash(newPassword, 10);

//     // // Update the user's password
//     // user.password = hashedNewPassword;
//     // await user.save();

//     // Return the updated user object (optional)
//     // return user;
//     return null;
// };



export const UserService = {
    userRegisterDB,
    loginUserWithDB,
    getAllUserFromDB,
    updateUserIntoDB,
    deleteUserFromDB,
    getMeUserFromDB,
    // passwordChangFromDB
    userPasswordChangeIntoDB
}