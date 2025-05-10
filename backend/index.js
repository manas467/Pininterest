import express from 'express'
import userRouter from './routes/user.route.js'
import pinRouter from './routes/pin.route.js'
import boardRouter from './routes/board.route.js'
import commentRouter from './routes/comment.route.js'
import cors from "cors"

import dotenv from 'dotenv';
import connectDb from './utilis/connectDb.js'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
dotenv.config(); // Loads .env variables

const app=express()

app.use(cors({origin:process.env.CLIENT_URL ,credentials:true}))

app.use(express.json())
app.use(cookieParser())
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; font-src 'self' data: https://fonts.googleapis.com https://fonts.gstatic.com;");
    next();
  });
app.use(fileUpload())



app.use('/users',userRouter)
app.use('/pins',pinRouter)
app.use('/comments',commentRouter)
app.use('/boards',boardRouter)

app.listen(5000,()=>{

  connectDb()
    console.log("server is running");
    
})