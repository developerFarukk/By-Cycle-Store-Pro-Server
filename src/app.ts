
import express, { Request, Response } from 'express'
import bikRouter from './model/products/bik.router'
import orderRouter from './model/orders/order.router'


const app = express()

// middleware
app.use(express.json())

app.use('/api/products', bikRouter)

app.use('/api/orders', orderRouter)

// POST: /api/user/create-user

app.get('/', (req: Request, res: Response) => {
    res.send({
        status: true,
        message: 'By cycle Server Live ⚡',
    })
})

export default app