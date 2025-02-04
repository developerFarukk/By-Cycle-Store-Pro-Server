
import { Types } from "mongoose";
import AppError from "../../errors/AppError";
import { Bicycle } from "../bicycles/bicycle.model";
import { TOrder } from "./order.interface";
import Order from "./order.model";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { isValidStatusTransition, OrderSearchableFields } from "./order.constant";
import { User } from "../users/user.model";
import { JwtPayload } from "jsonwebtoken";
import { orderUtils } from "./order.utils";


// Create Order Function
const createOrderIntoDB = async (payload: TOrder, user: JwtPayload, client_ip: string) => {

    const userId = user?.userId


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

    const userData = await User.isUserExistsByCustomId(user.userEmail);

    console.log(userData.name);


    // const userId = user ? user.id : 0;
    // console.log(userId);


    //  Create the order
    const orderData: TOrder = {
        ...payload,
        user: new Types.ObjectId(userId),
        totalPrice,
        // status: "Pending",
        // paymentStatus: "Unpaid",
    };

    let order = await Order.create(orderData);


    // payment integration
    const shurjopayPayload = {
        amount: totalPrice,
        order_id: order._id,
        currency: "BDT",
        customer_name: userData.name,
        customer_address: userData.address,
        customer_email: userData.email,
        customer_phone: userData.mobile,
        customer_city: userData.address,
        client_ip,
    };

    const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

    if (payment?.transactionStatus) {
        order = await order.updateOne({
            transaction: {
                id: payment.sp_order_id,
                transactionStatus: payment.transactionStatus,
            },
        });
    }

    return payment.checkout_url;
    // return null;
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


const updateOrderIntoDB = async (id: string, payload: Partial<TOrder>) => {

    // Find the order
    const order = await Order.findById(id);
    if (!order) {
        throw new AppError(httpStatus.NOT_FOUND, 'This Order is not found!');
    }

    // Check if status is being updated
    if (payload.status && payload.status !== order.status) {

        if (!isValidStatusTransition(order.status, payload.status)) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                `Invalid status transition from ${order.status} to ${payload.status}`
            );
        }
    }

    // Find the bicycle
    const bicycle = await Bicycle.isBicycleExists(order.productId.toString());
    // console.log(bicycle);

    if (!bicycle) {
        throw new AppError(httpStatus.NOT_FOUND, 'Bicycle not found!');
    }

    // Check if the requested quantity is available in stock
    if (payload.quantity && payload.quantity > bicycle.quantity + order.quantity) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Insufficient stock for this bicycle!');
    }

    // Calculate the difference between new quantity and old quantity
    const quantityDifference = payload.quantity ? payload.quantity - order.quantity : 0;


    if (quantityDifference !== 0) {
        await Bicycle.findByIdAndUpdate(
            bicycle.id,
            { $inc: { quantity: -quantityDifference } },
            { new: true }
        );
    }

    // Calculate totalPrice if quantity is updated
    if (payload.quantity) {
        payload.totalPrice = bicycle.price * payload.quantity;
    }

    // Update the order
    const result = await Order.findOneAndUpdate(
        { _id: id },
        payload,
        { new: true }
    );

    return result;
};



export const OrderService = {
    createOrderIntoDB,
    getAllOrderFromDB,
    deleteOrderFromDB,
    updateOrderIntoDB
};
