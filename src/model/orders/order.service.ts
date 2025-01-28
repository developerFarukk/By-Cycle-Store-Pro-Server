
import AppError from "../../errors/AppError";
import { Bicycle } from "../bicycles/bicycles.model";
import { TOrder } from "./order.interface";
import Order from "./order.model";
import httpStatus from "http-status";


// Create Order Function
const createOrderIntoDB = async (payload: TOrder) => {

    // Find the bicycle
    const bicycle = await Bicycle.findById(payload.productId);

    // checking if the product is Blocked
    const isBlocked = bicycle?.isDeleted

    if (isBlocked) {
        throw new AppError(httpStatus.FORBIDDEN, 'This Bicycle Prodicts is deleted !');
    }

    // Checking Existing product
    if (!bicycle) {
        throw new AppError(httpStatus.NOT_FOUND, "Bicycle not found");
    }

    // Check stock availability
    if (bicycle.quantity < payload.quantity) {
        throw new AppError(httpStatus.BAD_REQUEST, "Insufficient stock available");
    }

    // Calculate the total price
    const totalPrice = bicycle.price * payload.quantity;

    //  Deduct the stock
    bicycle.quantity -= payload.quantity;
    await bicycle.save();

    //  Create the order
    const orderData: TOrder = {
        ...payload,
        totalPrice,
        status: "Pending",
        paymentStatus: "Unpaid",
    };

    const order = await Order.create(orderData);

    return order;
};


export const OrderService = {
    createOrderIntoDB,
};
