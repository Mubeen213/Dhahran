import dotenv from 'dotenv'
import express from 'express'
import 'express-async-errors'
import morgan from 'morgan'
import mongoose from "mongoose";
import cookieParser from 'cookie-parser'
// Error handler middleware
import {ErrorHandlerMiddleware} from "./middlewares/ErrorHandlerMiddleware.js";

//  Routes
import serviceRouter from "./routes/ServiceRoutes.js";
import authRoutes from "./routes/AuthRoutes.js";
import userRouter from './routes/UserRoutes.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser(process.env.JWT_SECRET))

app.use('/api/v1/services', serviceRouter)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users',userRouter)


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

