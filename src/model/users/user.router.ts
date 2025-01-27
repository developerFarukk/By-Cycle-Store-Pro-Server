
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';

const router = express.Router();

// User register Route
router.post(
    '/register',
    validateRequest(UserValidation.userValidationSchema),
    UserControllers.registerUser,
);

// Login User Route
// router.post(
//     '/login',
//     validateRequest(AuthValidation.loginValidationSchema),
//     AuthControllers.loginUser,
// );

export const UserRoutes = router;