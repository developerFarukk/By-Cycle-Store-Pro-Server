import mongoose from "mongoose";
import Order from "./order.model";

// Bicykle Order Created functionality
const orderBik = async (data: unknown) => {

    // Validate input using Zod
    // const { email, product, quantity, totalPrice } = createOrderValid.parse(data);

    // Convert product ID to ObjectId
    const productId = new mongoose.Types.ObjectId(product);

    // Check if the product exists in the database
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

    // If product is not found, throw an error
    if (!productData.length) {
        throw new Error("Product not found");
    }

    const [productInfo] = productData;

    // Check if there's sufficient stock
    if (productInfo.quantity < quantity) {
        throw new Error("Insufficient stock available");
    }

    // Update product inventory
    const updatedProduct = await Bike.findOneAndUpdate(
        { _id: productId, quantity: { $gte: quantity } }, // Correctly pass the product ID as ObjectId
        {
            $inc: { quantity: -quantity }, // Decrease the quantity
            $set: { inStock: productInfo.quantity - quantity > 0 }, // Update inStock flag
        },
        { new: true }
    );

    if (!updatedProduct) {
        throw new Error("Failed to update product inventory");
    }

    // Create a new order
    const order = await Order.create({
        email,
        product: productId,
        quantity,
        totalPrice,
    });

    // Ensure the order was created successfully
    if (!order) {
        throw new Error("Failed to create order");
    }

    const updatedOrder = await Order.findByIdAndUpdate(
        order._id,
        { status: "Completed", updatedAt: new Date() },
        { new: true }
    );

    if (!updatedOrder) {
        throw new Error("Failed to update order after creation");
    }

    return updatedOrder;
}

export const orderService = {
    orderBik,
};
