import { Request, Response } from "express"
import Bike from "./bik.model"

const createBike = async (req: Request, res: Response) => {
    try {
        const payload = req.body

        // const result = await userService.createBike(payload)
        const result = await Bike.create(payload)

        res.json({
            success: true,
            message: 'User created successfully',
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
    
}