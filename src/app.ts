
import cors from 'cors';
import express, { Application, Request, Response } from 'express'
import bikRouter from './model/products/bik.router'
import orderRouter from './model/orders/order.router'
import cookieParser from 'cookie-parser';


const app: Application = express();

// middleware
app.use(express.json())
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5001'] }));
// app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));


// app.use('/api/v1', router);

app.use('/api/products', bikRouter)

app.use('/api/orders', orderRouter)


// Conect Server
const getAController = (req: Request, res: Response) => {
    res.send({
        status: true,
        message: 'Bicycle Store Server is Runing Live ⚡',
    })
}

app.get('/', getAController);


// Global Error Handelar
// app.use(globalErrorHandler);

//Not Found Page function
// app.use(notFound);

export default app