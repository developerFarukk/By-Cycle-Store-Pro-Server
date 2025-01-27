
import express from 'express';
import { BicycleControllers } from './bicycle.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BicycleValidations } from './bicycle.validation';

const router = express.Router();


// Create Bicycle Route
router.post(
    '/create-bicycle',
    // auth(USER_ROLE.admin, USER_ROLE.superAdmin),
    validateRequest(BicycleValidations.createBicycleValidationSchema),
    BicycleControllers.createBicycle,
);


// All Bicycle data get route
router.get('/',
    // auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
    BicycleControllers.getAllBicycle
);



export const BicycleRoutes = router;