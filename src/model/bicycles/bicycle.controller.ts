


// Creat Course Function
const createbicycle = catchAsync(async (req, res) => {
    const result = await CourseServices.createCourseIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course is created succesfully',
        data: result,
    });
});



export const BicycleControllers = {
    createbicycle
};