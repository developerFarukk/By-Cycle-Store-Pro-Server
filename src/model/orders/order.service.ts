
import { Types } from "mongoose";
import AppError from "../../errors/AppError";
import { Bicycle } from "../bicycles/bicycle.model";
import { TOrder } from "./order.interface";
import Order from "./order.model";
import httpStatus from "http-status";
import { isValidStatusTransition, OrderSearchableFields } from "./order.constant";
import { User } from "../users/user.model";
import { JwtPayload } from "jsonwebtoken";
import { orderUtils } from "./order.utils";
import QueryBuilder from "../../builder/QueryBuilder";


// Create Order 
const createOrderIntoDB = async (
    payload: { products: { product: string; quantity: number }[] },
    user: JwtPayload,
    client_ip: string
) => {
    const userId = user?.userId;

    // Validate user existence
    const userData = await User.isUserExistsByCustomId(user.userEmail);
    if (!userData) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    // Validate payload
    if (!payload?.products || payload?.products?.length === 0) {
        throw new AppError(httpStatus.BAD_REQUEST, 'No products in the order');
    }

    // Process each product in the order
    let totalPrice = 0;
    const productsWithObjectId = payload.products.map((product) => ({
        product: new Types.ObjectId(product.product), // Convert `product` string to ObjectId
        quantity: product.quantity,
    }));

    for (const product of productsWithObjectId) {
        const bicycle = await Bicycle.findById(product.product);
        if (!bicycle) {
            throw new AppError(httpStatus.NOT_FOUND, `Bicycle with ID ${product.product} not found`);
        }

        if (bicycle.isDeleted) {
            throw new AppError(httpStatus.FORBIDDEN, `Bicycle with ID ${product.product} is deleted`);
        }

        if (bicycle.quantity < product.quantity) {
            throw new AppError(httpStatus.BAD_REQUEST, `Insufficient stock for bicycle with ID ${product.product}`);
        }

        // Deduct the stock
        bicycle.quantity -= product.quantity;
        await bicycle.save();

        // Calculate total price
        totalPrice += bicycle.price * product.quantity;
    }

    // Create the order
    // const orderData: TOrder = {
    //     products: productsWithObjectId, // Use the converted products array
    //     user: new Types.ObjectId(userId),
    //     totalPrice,
    //     status: 'Pending', // Default status
    // };

    const orderData = {
        products: productsWithObjectId,
        user: new Types.ObjectId(userId),
        totalPrice,
        status: 'Pending',
    } as TOrder;

    let order = await Order.create(orderData);

    // Payment integration
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
        const updatedOrder = await Order.findByIdAndUpdate(
            order._id,
            {
                transaction: {
                    id: payment.sp_order_id,
                    transactionStatus: payment.transactionStatus,
                },
            },
            { new: true }
        );

        if (!updatedOrder) {
            throw new AppError(httpStatus.NOT_FOUND, 'Order not found after update');
        }

        order = updatedOrder;
    }

    return {
        // order,
        // payment,
        paymentUrl: payment.checkout_url,
    };
};


// veryfy pament
const verifyPayment = async (order_id: string) => {
    const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

    if (verifiedPayment.length) {
        await Order.findOneAndUpdate(
            {
                "transaction.id": order_id,
            },
            {
                "transaction.bank_status": verifiedPayment[0].bank_status,
                "transaction.sp_code": verifiedPayment[0].sp_code,
                "transaction.sp_message": verifiedPayment[0].sp_message,
                "transaction.transactionStatus": verifiedPayment[0].transaction_status,
                "transaction.method": verifiedPayment[0].method,
                "transaction.date_time": verifiedPayment[0].date_time,
                status:
                    verifiedPayment[0].bank_status == "Success"
                        ? "Paid"
                        : verifiedPayment[0].bank_status == "Failed"
                            ? "Pending"
                            : verifiedPayment[0].bank_status == "Cancel"
                                ? "Cancelled"
                                : "",
            }
        );
    }

    return verifiedPayment;
};

// get All Order
const getAllOrderFromDB = async (query: Record<string, unknown>) => {

    const orderQuery = new QueryBuilder(Order.find()
        .populate("user")
        .populate({
            path: "products",
            populate: {
                path: 'product',
            },
        }),
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
    updateOrderIntoDB,
    verifyPayment
};
