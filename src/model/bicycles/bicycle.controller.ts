
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BicycleServices } from "./bicycle.service";


// Creat Course Function
const createBicycle = catchAsync(async (req, res) => {
    const result = await BicycleServices.createBicycleIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bicycle is created succesfully',
        data: result,
    });
});


// All Course data Get
const getAllBicycle = catchAsync(async (req, res) => {

    // console.log(req.query);

    const result = await BicycleServices.getAllBicycleFromDB(req.query);
    // console.log(result);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All  Bicyle get successfully',
        // meta: result?.meta,
        // data: result?.result,
        data: result
    });
});


// Single Course Data Get
const getSingleBicycle = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await BicycleServices.getSingleBicycleFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Single Bicycle is retrieved succesfully',
        data: result,
    });
});



export const BicycleControllers = {
    createBicycle,
    getAllBicycle,
    getSingleBicycle
};