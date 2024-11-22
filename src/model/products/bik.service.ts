import { BikID } from "./bik.interface"
import Bike from "./bik.model"

// Creat function
const createBik = async (payload: BikID): Promise<BikID> => {
    const result = await Bike.create(payload)

    return result
}

// Get All Data function
const getAllBik = async () => {
    const result = await Bike.find()
    return result
}

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


export const bikService = {
    createBik,
    getAllBik,
    getSinglBik,
    updateBik
}