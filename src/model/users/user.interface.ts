import { Model, Types } from "mongoose";
import { USER_ROLE } from "./user.constant";


export interface TUser {
    id?: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'customer';
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;
};


export interface UserModel extends Model<TUser> {

    isUserExistsByCustomId(id: string): Promise<TUser>;

    getPublicUserData(userId: string): Promise<Pick<TUser, 'id' | 'name' | 'email' | 'role' | 'status' | 'isDeleted'>>;

    //instance methods for checking if passwords are matched
    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string,
    ): Promise<boolean>;
}


export type TUserRole = keyof typeof USER_ROLE;