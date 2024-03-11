import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app = express()
import 'express-async-errors'
import morgan from 'morgan'
import mongoose from "mongoose";
import cookieParser from 'cookie-parser'
// Error handler middleware
import {ErrorHandlerMiddleware} from "./middlewares/ErrorHandlerMiddleware.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path'

//  Routes
import serviceRouter from "./routes/ServiceRoutes.js";
import authRoutes from "./routes/AuthRoutes.js";
import userRouter from './routes/UserRoutes.js'
import orderRoutes from "./routes/OrderRoutes.js";
import serviceItemRouter from "./routes/ServiceItemRoutes.js";

app.use(express.static('./public'))
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser(process.env.JWT_SECRET))
const __dirname = dirname(fileURLToPath(import.meta.url));
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.static(path.resolve(__dirname, './public')));

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/services', serviceRouter)
app.use('/api/v1/serviceItems', serviceItemRouter)
app.use('/api/v1/orders', orderRoutes)
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public', 'index.html'))
})

const port = process.env.PORT || 2001

app.use(ErrorHandlerMiddleware)

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to db')
        app.listen(port, () => {
            console.log("server is up and running on port " + port)
        })
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()

