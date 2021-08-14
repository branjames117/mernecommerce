import mongoose from 'mongoose'

// connect to the database using env variables

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    // if error connecting, kill program
    console.error(`Error: ${error}`.red.underline.bold)
    process.exit(1)
  }
}

export default connectDB
