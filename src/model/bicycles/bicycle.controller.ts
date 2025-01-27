
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BicycleServices } from "./bicycle.service";


// Creat Course Function
const createbicycle = catchAsync(async (req, res) => {
    const result = await BicycleServices.createBicycleIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bicycle is created succesfully',
        data: result,
    });
});



export const BicycleControllers = {
    createbicycle
};