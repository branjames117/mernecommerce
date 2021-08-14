import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

// seeder script just to seed our database with sample data for dev purposes
// used at the beginning of development just to move our test data from our arrays into mongodb

dotenv.config()

connectDB()

const importData = async () => {
  try {
    // delete everything to start
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    // create users in the db, then store the admin user
    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id

    // use spread operator to add user field with adminUser as owner for each product
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    // create products in the db with updated owner info
    await Product.insertMany(sampleProducts)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

// check if the -d flag is entered
if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
