
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import { UserValidation } from './user.validation';
import { USER_ROLE } from './user.constant';
import auth from '../../middlewares/auth';

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

// get All user route
router.get(
    '/',
    auth(USER_ROLE.admin, USER_ROLE.customer),
    UserControllers.getAlluser,
);

// get All user route
router.get(
    '/me',
    auth( USER_ROLE.customer),
    UserControllers.getMeuser,
);


// Update user route
router.patch(
    '/:userId',
    auth(USER_ROLE.admin, USER_ROLE.customer),
    validateRequest(UserValidation.UpdateUserValidationSchema),
    UserControllers.updateUser,
);

// Delete user route
router.delete(
    '/:id',
    auth(USER_ROLE.admin),
    UserControllers.deleteUser,
);

export const UserRoutes = router;