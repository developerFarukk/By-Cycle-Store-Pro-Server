import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";
import httpStatus from 'http-status';



// User Register Funtionality
const registerUser = catchAsync(async (req, res) => {

    const result = await UserService.userRegisterDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'User registered successfully',
        data: result,
    });
});


// user Login 
const loginUser = catchAsync(async (req, res) => {
    const result = await UserService.loginUserWithDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is logged in succesfully!',
        data: result
    });
});


// get All User
const getAlluser = catchAsync(async (req, res) => {

    const result = await UserService.getAllUserFromDB(req.query);
    // console.log(result);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All user get successfully',
        // meta: result?.meta,
        // data: result?.result,
        data: result
    });
});


// Update user
const updateUser = catchAsync(async (req, res) => {
    const { userId } = req.params;
    console.log(userId);
    
    const result = await UserService.updateUserIntoDB(userId, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bicycle is updated succesfully',
        data: result,
    });
});


export const UserControllers = {
    registerUser,
    loginUser,
    getAlluser,
    updateUser
}