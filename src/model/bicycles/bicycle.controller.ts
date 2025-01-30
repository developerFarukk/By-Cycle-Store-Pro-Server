
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BicycleServices } from "./bicycle.service";


// Creat Bicycle Function
const createBicycle = catchAsync(async (req, res) => {
    const result = await BicycleServices.createBicycleIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bicycle is created succesfully',
        data: result,
    });
});


// All Bicycle data Get
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


// Single Bicycle Data Get
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


// Delete Bicycle Data
const deleteBicycle = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await BicycleServices.deleteBicycleFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bicycle is deleted succesfully',
        data: result,
    });
});


// Update Bicycle data
const updateBicycle = catchAsync(async (req, res) => {
    const { bicycleId } = req.params;
    const result = await BicycleServices.updateBicycleIntoDB( bicycleId, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bicycle is updated succesfully',
        data: result,
    });
});



export const BicycleControllers = {
    createBicycle,
    getAllBicycle,
    getSingleBicycle,
    deleteBicycle,
    updateBicycle
};