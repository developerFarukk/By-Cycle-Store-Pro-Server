import mongoose from "mongoose";
import Bike from "../products/bik.model";
import { CreateOrder } from "./order.interface"
import Order from "./order.model";


// Bycykle Order Created funtionality
const orderBik = async ({ email, product, quantity, totalPrice }: CreateOrder) => {

    const productId = new mongoose.Types.ObjectId(product);
    const productData = await Bike.aggregate([
        { $match: { _id: productId } },
        {
            $project: {
                name: 1,
                quantity: 1,
                inStock: 1,
            },
        },
    ]);

    if (!productData.length) {
        throw new Error("Product not found");
    }

    const [productInfo] = productData;

    if (productInfo.quantity < quantity) {
        throw new Error("Insufficient stock available");
    }

    const updatedProduct = await Bike.findOneAndUpdate(
        { _id: product, quantity: { $gte: quantity } },
        {
            $inc: { quantity: -quantity },
            $set: { inStock: productInfo.quantity - quantity > 0 },
        },
        { new: true }
    );

    if (!updatedProduct) {
        throw new Error("Failed to update product inventory");
    }

    const order = await Order.create({
        email,
        product,
        quantity,
        totalPrice,
    });

    return order;
}

export const orderService = {
    orderBik,
}