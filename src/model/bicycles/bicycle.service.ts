
import QueryBuilder from "../../builder/QueryBuilder";
import { TBicycle } from "./bicycle.interface";
import { Bicycle } from "./bicycles.model";

// Create bicycle
const createBicycleIntoDB = async (payload: TBicycle) => {
    const result = await Bicycle.create(payload);
    return result;
};


// All Bicycle data Get
const getAllBicycleFromDB = async (query: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(
        Bicycle.find(),
        // .populate('preRequisiteCourses.course'),
        query,
    )
        .search(CourseSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const meta = await courseQuery.countTotal();
    const result = await courseQuery.modelQuery;

    return {
        meta,
        result,
    };
};



export const BicycleServices = {
    createBicycleIntoDB,
    getAllBicycleFromDB

};