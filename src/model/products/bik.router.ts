
import { Router } from 'express'
import { bikeController } from './bik.controller'


const bikRouter = Router()

bikRouter.post('/create-bik', bikeController.createBike)
bikRouter.get('/', bikeController.getAllBike)

// bikRouter.get('/:bikId', bikController.getSinglebik)
// bikRouter.put('/:bikId', bikController.updatebik)
// bikRouter.delete('/:bikId', bikController.deletebik)


export default bikRouter