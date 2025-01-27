
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

// User register Route
router.post(
    '/register',
    validateRequest(UserValidation.userValidationSchema),
    UserControllers.registerUser,
);


// Login User Route
router.post(
    '/login',
    validateRequest(UserValidation.loginValidationSchema),
    UserControllers.loginUser,
);

export const UserRoutes = router;