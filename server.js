import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import serviceRouter from "./routes/ServiceRoutes.js";
import mongoose from "mongoose";
const app = express()
app.use(express.json())
app.use(morgan('dev'))
dotenv.config()
const port = process.env.PORT || 2001

app.use('/api/v1/services', serviceRouter)

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

