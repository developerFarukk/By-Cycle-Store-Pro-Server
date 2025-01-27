
import { TBicycle } from "./bicycle.interface";
import { Bicycle } from "./bicycles.model";

// Create bicycle
const createBicycleIntoDB = async (payload: TBicycle) => {
    const result = await Bicycle.create(payload);
    return result;
};



export const BicycleServices = {
    createBicycleIntoDB,

};