import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import 'express-async-errors'
import morgan from 'morgan'
import mongoose from "mongoose";
const app = express()
app.use(express.json())
app.use(morgan('dev'))


//  Routes
import serviceRouter from "./routes/ServiceRoutes.js";
// import authRoutes from "./routes/AuthRoutes.js";

app.use('/api/v1/services', serviceRouter)
app.use('/api/v1/auth', authRoutes)



// Error handler middleware
import {ErrorHandlerMiddleware} from "./middlewares/ErrorHandlerMiddleware.js";
import authRoutes from "./routes/AuthRoutes.js";

const port = process.env.PORT || 2001

app.use(ErrorHandlerMiddleware)

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to db')
        app.listen(port, () => {
            console.log("server is up and running on port "+ port)
        })
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()

