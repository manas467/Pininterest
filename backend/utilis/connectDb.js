import moongose from 'mongoose'
import dotenv from "dotenv";

// Load environment variables
dotenv.config()

const connectDb= async()=>{
    try {
       await moongose.connect(process.env.MONGO) 
       console.log("mongodB is connected")
    } catch (error) {
        console.log("error",error)
    }
}

export default connectDb