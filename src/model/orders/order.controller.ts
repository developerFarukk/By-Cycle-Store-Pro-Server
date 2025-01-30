
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OrderService } from "./order.service";
import httpStatus from "http-status";


// Creat Order Function
const createOrder = catchAsync(async (req, res) => {

    const userId = req.user?.userId

    const result = await OrderService.createOrderIntoDB(req.body, userId);
    // console.log(result);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order is created succesfully',
        data: result,
    });
});


// get All order 
const getAllOrder = catchAsync(async (req, res) => {

    const result = await OrderService.getAllOrderFromDB(req.query);
    // console.log(result);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Order get successfully',
        // meta: result?.meta,
        // data: result?.result,
        data: result
    });
});


// Delete Order Data
const deleteOrder = catchAsync(async (req, res) => {
    const { id } = req.params;

    const result = await OrderService.deleteOrderFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order is deleted succesfully',
        data: result,
    });
});


// Update Order
const updateOrder = catchAsync(async (req, res) => {
    const { orderId } = req.params;
    // console.log(orderId);
    
    const result = await OrderService.updateOrderIntoDB(orderId, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order is updated succesfully',
        data: result,
    });
});

export const OrderController = {
    createOrder,
    getAllOrder,
    deleteOrder,
    updateOrder
};
