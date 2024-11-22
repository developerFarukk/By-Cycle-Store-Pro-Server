
import express, { Request, Response } from 'express'
import bikRouter from './model/products/bik.router'


const app = express()

// middleware
app.use(express.json())

app.use('/api/bik', bikRouter)

// app.use('/api/tour', tourRouter)

// POST: /api/user/create-user

app.get('/', (req: Request, res: Response) => {
    res.send({
        status: true,
        message: 'Server Live ⚡',
    })
})

export default app