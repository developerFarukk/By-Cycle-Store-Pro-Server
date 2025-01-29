

import express from 'express';
import { OrderController } from './order.controller';
import { USER_ROLE } from '../users/user.constant';
import auth from '../../middlewares/auth';

const router = express.Router();


// Create Bicycle Route
router.post(
    '/create-order',
    auth(USER_ROLE.admin, USER_ROLE.customer),
    // validateRequest(BicycleValidations.createBicycleValidationSchema),
    OrderController.createOrder,
);


export const OrderRoutes = router;