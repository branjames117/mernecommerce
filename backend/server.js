import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'

// configure dotenv so we can use process.env variables
dotenv.config()

// connect to the database via mongoose
connectDB()

// create app as an instance of express
const app = express()

// root route
app.get('/', (req, res) => {
  res.send('API is running.')
})

// use express.Router() to create multiple product routes
// '/api/products/' - fetches all products
// '/api/products/:id' - fetches singular product
app.use('/api/products', productRoutes)

// custom error handling via middleware
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
const NODE_ENV = process.env.NODE_ENV || 'development'

// spin up the server
app.listen(
  PORT,
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`.yellow)
)
