import { Model, Types } from "mongoose";
import { USER_ROLE } from "./user.constant";


export interface TUser {
    id?: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'customer';
    status: 'in-progress' | 'blocked';
    mobile: string;
    address: string;
    isDeleted: boolean;
};


export interface UserModel extends Model<TUser> {

    isUserExistsByCustomId(email: string): Promise<TUser>;

    getPublicUserData(userId: string): Promise<Pick<TUser, 'id' | 'name' | 'email' | 'role' | 'status' | 'isDeleted'| 'mobile'| 'address'>>;

    //instance methods for checking if passwords are matched
    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string,
    ): Promise<boolean>;
}


export type TUserRole = keyof typeof USER_ROLE;