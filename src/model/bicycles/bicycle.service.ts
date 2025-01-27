


// Create bicycle
// Creat Course Function
const createCourseIntoDB = async (payload: TCourse) => {
    const result = await Course.create(payload);
    return result;
};



export const CourseServices = {
    createCourseIntoDB,

};