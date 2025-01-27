
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
    BicycleControllers.createbicycle,
);





export const BicycleRoutes = router;