

import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();


// Create Bicycle Route
router.post(
    '/create-order',
    // auth(USER_ROLE.admin, USER_ROLE.superAdmin),
    // validateRequest(BicycleValidations.createBicycleValidationSchema),
    OrderController.createOrder,
);


export const OrderRoutes = router;