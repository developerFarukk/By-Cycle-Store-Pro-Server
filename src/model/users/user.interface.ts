import { Model } from "mongoose";


export interface TUser {
    // id: string;
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'customer';
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;
};


export interface UserModel extends Model<TUser> {

    //instance methods for checking if passwords are matched
    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string,
    ): Promise<boolean>;
}