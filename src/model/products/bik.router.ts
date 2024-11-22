
import { Router } from 'express'
import { bikeController } from './bik.controller'


const bikRouter = Router()

bikRouter.post('/create-bik', bikeController.createBike)
bikRouter.get('/', bikeController.getAllBike)
bikRouter.get('/:bikId', bikeController.getSinglBik)
bikRouter.put('/:bikId', bikeController.updateBik)
bikRouter.delete('/:bikId', bikeController.deleteBik)


export default bikRouter