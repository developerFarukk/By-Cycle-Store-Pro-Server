import { Request, Response } from "express"
import { bikService } from "./bik.service"

// Creat Bicykle Function
const createBike = async (req: Request, res: Response) => {
    try {
        const payload = req.body

        const result = await bikService.createBik(payload)
        // const result = await Bike.create(payload)

        res.json({
            success: true,
            message: 'Bicycle created successfully',
            data: result,
        })
    } catch (error) {
        res.json({
            success: false,
            message: 'Validation failed',
            error,
        })
    }
}

// Get all bicycle Function
const getAllBike = async (req: Request, res: Response) => {
    try {

        const result = await bikService.getAllBik()

        res.json({
            success: true,
            message: 'Bicycles retrieved successfully',
            data: result,
        })
    } catch (error) {
        res.json({
            success: false,
            message: 'Validation failed',
            error,
        })
    }
}



export const bikeController = {
    createBike,
    getAllBike

}