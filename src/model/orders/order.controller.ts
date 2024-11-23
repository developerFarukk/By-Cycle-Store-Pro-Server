
import { Request, Response } from "express";
import { orderService } from "./order.service";
import { CreateOrder } from "./order.interface";

// Bycykle Order Created Functionality
const orderBik = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, product, quantity, totalPrice } = req.body as CreateOrder ;

        if (!email || !product || !quantity || !totalPrice) {
            return res.status(400).json({
                status: false,
                message: "Missing required fields: email, product, quantity, or totalPrice",
            });
        }

        const result = await orderService.orderBik({ email, product, quantity, totalPrice });

        // Return success response
        return res.status(201).json({
            status: true,
            message: "Order created successfully",
            data: result,
        });
    } catch (error) {
        console.error("Error in order creation:", error);

        return res.status(500).json({
            status: false,
            message: error instanceof Error ? error.message : "Something went wrong",
            error: error instanceof Error ? error.stack : error,
        });
    }
};

export const orderController = {
    orderBik,
};
