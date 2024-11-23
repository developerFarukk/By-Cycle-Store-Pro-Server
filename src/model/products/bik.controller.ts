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

        const { searchTerm } = req.query;

        const result = await bikService.getAllBikQuery(searchTerm as string);

        res.json({
            success: true,
            message: 'Bicycles retrieved successfully',
            data: result,
        })
    } catch (error: unknown) {
        res.status(404).json({
            success: false,
            message: error instanceof Error ? error.message : "An error occurred",
        });
    }
}

// Get a Specific Bicycle Function
const getSinglBik = async (req: Request, res: Response) => {
    try {
        //   console.log(req.params)
        const bikId = req.params.bikId

        const result = await bikService.getSinglBik(bikId)

        res.send({
            status: true,
            message: 'Bicycle retrieved successfully',
            result,
        })
    } catch (error) {
        res.json({
            status: false,
            message: 'Something went wrong',
            error,
        })
    }
}


//   Update Bicykle data function
const updateBik = async (req: Request, res: Response) => {
    try {
        const bikId = req.params.bikId
        const body = req.body
        const result = await bikService.updateBik(bikId, body)

        res.send({
            status: true,
            message: 'Bicycle updated successfully',
            result,
        })
    } catch (error) {
        res.json({
            status: false,
            message: 'Something went wrong',
            error,
        })
    }
}

// Delete Bycikle Functionality
const deleteBik = async (req: Request, res: Response) => {
    try {
        const bikId = req.params.bikId
        await bikService.deleteBik(bikId)

        res.send({
            status: true,
            message: 'Bicycle deleted successfully',
            data: {},
        })
    } catch (error) {
        res.json({
            status: false,
            message: 'Something went wrong',
            error,
        })
    }
}




export const bikeController = {
    createBike,
    getAllBike,
    getSinglBik,
    updateBik,
    deleteBik
}