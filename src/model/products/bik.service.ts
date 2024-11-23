import { } from "mongoose"
import { BikID } from "./bik.interface"
import Bike from "./bik.model"

// Creat products function
const createBik = async (payload: BikID): Promise<BikID> => {
    const result = await Bike.create(payload)

    return result
}

// Get all products and query
const getAllBikQuery = async (searchTerm?: string) => {
    const query: any = {};

    if (searchTerm) {
        query.$or = [
            { name: { $regex: searchTerm, $options: "i" } },
            { brand: { $regex: searchTerm, $options: "i" } },
            { type: { $regex: searchTerm, $options: "i" } },
        ];
    }

    const result = await Bike.find(query);

    if (result.length === 0) {
        throw new Error("No bicycles found matching the search criteria.");
    }

    return result;
};

// get Single Data Function
const getSinglBik = async (id: string) => {
    const result = await Bike.findById(id)
    return result
}

// Update PUT function
const updateBik = async (id: string, data: BikID) => {
    const result = await Bike.findByIdAndUpdate(id, data, {
        new: true,
    })
    return result
}

// Delete method
const deleteBik = async (id: string) => {
    const result = await Bike.findByIdAndDelete(id)
    return result
}


export const bikService = {
    createBik,
    getAllBikQuery,
    getSinglBik,
    updateBik,
    deleteBik
}