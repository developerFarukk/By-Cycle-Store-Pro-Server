
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OrderService } from "./order.service";
import httpStatus from "http-status";

// // Bycykle Order Created Functionality
// const orderBik = async (req: Request, res: Response): Promise<Response> => {
//     try {
//         const { email, product, quantity, totalPrice } = req.body as CreateOrder;

//         if (!email || !product || !quantity || !totalPrice) {
//             return res.status(400).json({
//                 status: false,
//                 message: "Missing required fields: email, product, quantity, or totalPrice",
//             });
//         }

//         const result = await orderService.orderBik({ email, product, quantity, totalPrice });

//         // Return success response
//         return res.status(201).json({
//             status: true,
//             message: "Order created successfully",
//             data: result,
//         });
//     } catch (error) {
//         console.error("Error in order creation:", error);

//         return res.status(500).json({
//             status: false,
//             message: error instanceof Error ? error.message : "Something went wrong",
//             error: error instanceof Error ? error.stack : error,
//         });
//     }
// };

// // Order Revenew Fantionality
// const calculateRevenue = async (req: Request, res: Response) => {
//     try {

//         const revenueResult = await Order.aggregate([
//             {
//                 $sort: { createdAt: -1 },
//             },
//             {
//                 $limit: 1,
//             },
//             {
//                 $project: {
//                     _id: 0,
//                     totalRevenue: { $multiply: ["$totalPrice", "$quantity"] },
//                 },
//             },
//         ]);


//         const totalRevenue = revenueResult[0]?.totalRevenue || 0;

//         // Send success response
//         return res.status(200).json({
//             message: "Revenue calculated successfully",
//             status: true,
//             data: {
//                 totalRevenue,
//             },
//         });
//     } catch (error: unknown) {
//         if (error instanceof Error) {
//             return res.status(500).json({
//                 message: "Failed to calculate revenue",
//                 status: false,
//                 error: error.message,
//             });
//         } else {
//             return res.status(500).json({
//                 message: "An unknown error occurred",
//                 status: false,
//                 error: "Unknown error",
//             });
//         }
//     }
// }


// Creat Course Function
const createOrder = catchAsync(async (req, res) => {
    
    const userId = req.user?.userId
    // console.log(userId);
    

    
    const result = await OrderService.createOrderIntoDB(req.body, userId );
    // console.log(result);
    

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order is created succesfully',
        data: result,
    });
});

export const OrderController = {
    createOrder,
    // calculateRevenue
};
