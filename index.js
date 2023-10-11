require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const notFoundMiddleware = require('./middlewares/not-found.js')
const errorMiddleware = require('./middlewares/error-handler.js')
const connectDB = require('./db/connect.js')
const productsRouter = require('./routes/products.js')

// middleware 
app.use(express.json())

// routes

app.get('/' , (req,res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products"> products routes</a>')
})

// products routes
app.use('/api/v1/products', productsRouter)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000

const start = async (req,res) => {
    try {
        // connectDb
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`server running on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()