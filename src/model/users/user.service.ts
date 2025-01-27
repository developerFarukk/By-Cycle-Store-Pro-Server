import { TUser } from "./user.interface";
import { User } from "./user.model";


// User Register function
const userRegisterDB = async (payload: TUser) => {

    const publicUserData = await User.create(payload);
    const result = await User.getPublicUserData(publicUserData.id);

    return result
}



export const UserService = {
    userRegisterDB,
    // loginUserWithDB
}