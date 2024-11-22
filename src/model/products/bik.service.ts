import { BikID } from "./bik.interface"
import Bike from "./bik.model"


const createBik = async (payload: BikID): Promise <BikID> => {
    const result = await Bike.create(payload)

    return result
}


export const bikService = {
    createBik
}