
import express from 'express';
import { BicycleControllers } from './bicycle.controller';

const router = express.Router();


// Create Bicycle Route
router.post(
    '/create-bicycle',
    // auth(USER_ROLE.admin, USER_ROLE.superAdmin),
    // validateRequest(CourseValidations.createCourseValidationSchema),
    BicycleControllers.createbicycle,
);





export const BicycleRoutes = router;