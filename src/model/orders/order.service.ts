
import { Types } from "mongoose";
import AppError from "../../errors/AppError";
import { Bicycle } from "../bicycles/bicycle.model";
import { TOrder } from "./order.interface";
import Order from "./order.model";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { OrderSearchableFields } from "./order.constant";


// Create Order Function
const createOrderIntoDB = async (payload: TOrder, userId: string) => {

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

    // const user = await User.isUserExistsByCustomId(userEmail);

    // const userId = user ? user.id : 0;
    // console.log(userId);


    //  Create the order
    const orderData: TOrder = {
        ...payload,
        user: new Types.ObjectId(userId),
        totalPrice,
        status: "Pending",
        paymentStatus: "Unpaid",
    };

    const order = await Order.create(orderData);


    return order;
};

// get All Order
const getAllOrderFromDB = async (query: Record<string, unknown>) => {
    // console.log(query);

    const orderQuery = new QueryBuilder(Order.find().populate('user').populate('productId'),
        query,
    )
        .search(OrderSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const meta = await orderQuery.countTotal();
    const result = await orderQuery.modelQuery;

    return {
        meta,
        result,
    };
};


// Delete Order Data
const deleteOrderFromDB = async (id: string) => {

    const order = await Order.findById(id);

    // Check blog Exist
    if (!order) {
        throw new AppError(httpStatus.NOT_FOUND, 'This Order is not found !');
    }

    const result = Order.findByIdAndDelete(id)
    return result;
};


export const OrderService = {
    createOrderIntoDB,
    getAllOrderFromDB,
    deleteOrderFromDB
};
