import { Router } from "express";
import { orderController } from "./order.controller";


const orderRouter = Router()

orderRouter.post('/', orderController.orderBik)

export default orderRouter