
import QueryBuilder from "../../builder/QueryBuilder";
import { BicycleSearchableFields } from "./bicycle.constant";
import { TBicycle } from "./bicycle.interface";
import { Bicycle } from "./bicycles.model";

// Create bicycle
const createBicycleIntoDB = async (payload: TBicycle) => {
    const result = await Bicycle.create(payload);
    return result;
};


// All Bicycle data Get
const getAllBicycleFromDB = async (query: Record<string, unknown>) => {
    // console.log(query);

    const bicycleQuery = new QueryBuilder(Bicycle.find(),
        query,
    )
        .search(BicycleSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const meta = await bicycleQuery.countTotal();
    const result = await bicycleQuery.modelQuery;

    return {
        meta,
        result,
    };
};


// Single Course Data Get
const getSingleBicycleFromDB = async (id: string) => {
    const result = await Bicycle.findById(id)
    
    return result;
};



export const BicycleServices = {
    createBicycleIntoDB,
    getAllBicycleFromDB,
    getSingleBicycleFromDB

};