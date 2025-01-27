
import express from 'express';

const router = express.Router();


// Create Bicycle Route
router.post(
    '/create-bicycle',
    // auth(USER_ROLE.admin, USER_ROLE.superAdmin),
    // validateRequest(CourseValidations.createCourseValidationSchema),
    CourseControllers.createCourse,
);





export const BicycleRoutes = router;