

import express from 'express';
import { OrderController } from './order.controller';
import { USER_ROLE } from '../users/user.constant';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidations } from './order.validation';

const router = express.Router();


// Create order Route
router.post(
    '/create-order',
    auth(USER_ROLE.customer),
    validateRequest(OrderValidations.createOrderValidationSchema),
    OrderController.createOrder,
);

// verify order Route
router.get(
    '/verify',
    auth(USER_ROLE.customer),
    // validateRequest(OrderValidations.createOrderValidationSchema),
    OrderController.verifyPayment,
);

// All order route
router.get(
    '/',
    auth(USER_ROLE.admin, USER_ROLE.customer),
    OrderController.getAllOrder,
);

// All order route
router.get(
    '/me',
    auth( USER_ROLE.customer),
    OrderController.getMeOrder,
);

// Delete Order Route
router.delete('/:id',
    auth(USER_ROLE.admin, USER_ROLE.customer),
    OrderController.deleteOrder
);


// Update Order Route
router.patch(
    '/:orderId',
    auth(USER_ROLE.customer, USER_ROLE.admin),
    validateRequest(OrderValidations.updateOrderValidationSchema),
    OrderController.updateOrder,
);


export const OrderRoutes = router;