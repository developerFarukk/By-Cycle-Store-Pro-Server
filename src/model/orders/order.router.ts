

import express from 'express';
import { OrderController } from './order.controller';
import { USER_ROLE } from '../users/user.constant';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidations } from './order.validation';

const router = express.Router();


// Create Bicycle Route
router.post(
    '/create-order',
    auth(USER_ROLE.customer),
    validateRequest(OrderValidations.createOrderValidationSchema),
    OrderController.createOrder,
);

// All order route
router.get(
    '/',
    auth(USER_ROLE.admin, USER_ROLE.customer),
    OrderController.getAllOrder,
);

// Delete Order Route
router.delete('/:id',
    auth(USER_ROLE.admin, USER_ROLE.customer),
    OrderController.deleteOrder
);


export const OrderRoutes = router;