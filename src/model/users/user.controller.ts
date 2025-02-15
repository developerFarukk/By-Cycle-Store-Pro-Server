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

// get All User
const getMeuser = catchAsync(async (req, res) => {

    const userEmail = req.user?.userEmail

    const result = await UserService.getMeUserFromDB(userEmail);
    // console.log(result);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User get successfully',
        data: result
    });
});


// Update user
const updateUser = catchAsync(async (req, res) => {
    const { userId } = req.params;
    // console.log(userId);

    const result = await UserService.updateUserIntoDB(userId, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is updated succesfully',
        data: result,
    });
});


// delete user
const deleteUser = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await UserService.deleteUserFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is deleted succesfully',
        data: result,
    });
});


// Password Changes User
const userPasswordChange = catchAsync(async (req, res) => {

    const userEmail = req.user?.userEmail;
    
    const result = await UserService.userPasswordChangeIntoDB(userEmail, req.body );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User password changes succesfully',
        data: result,
    });
});


// const changePasswordUser = catchAsync(async (req, res) => {
//     // Get the logged-in user's email from the request object
//     const userEmail = req.user?.userEmail;

//     console.log(userEmail);


//     // Log the request body for debugging
//     console.log(req.body);

//     // Call the service to change the password
//     const result = await UserService.passwordChangFromDB(userEmail, req.body);

//     // Send a success response
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'Password changed successfully',
//         data: result
//     });
// });


export const UserControllers = {
    registerUser,
    loginUser,
    getAlluser,
    updateUser,
    deleteUser,
    getMeuser,
    // changePasswordUser
    userPasswordChange
}