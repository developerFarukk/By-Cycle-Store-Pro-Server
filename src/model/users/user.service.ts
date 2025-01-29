import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status";
import bcrypt from 'bcrypt';
import config from "../../config";
import { createToken } from "./user.utils";


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



export const UserService = {
    userRegisterDB,
    loginUserWithDB
}