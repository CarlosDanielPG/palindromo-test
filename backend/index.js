import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { list } from './controllers/products-controller'

mongoose.Promise = Promise
dotenv.config()

mongoose.connection.on("connected", () => {
    console.log("MongoDB Connection Established")
})

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB Connection Disconnected")
})

mongoose.connection.on("close", () => {
    console.log("MongoDB Connection Closed")
})

mongoose.connection.on("error", (error) => {
    console.log("MongoDB ERROR: " + error)

    process.exit(1)
})

mongoose.set("debug", process.env.MONGO_DEBUG)

const app = express()
app.use(cors())
const port = process.env.PORT

app.get('/products', async (req, res) => {
    const query = req.query
    const products = await list(query)
    res.json({ message: 'Products obtained', ...products }).status(200)
})

app.listen(port, async () => {
    console.log(`Server is running in port ${port}`)
    await mongoose.connect(process.env.MONGO_URL, {
        authSource: "admin",
        user: process.env.MONGO_USERNAME,
        pass: process.env.MONGO_PASSWORD,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
})