import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connected to mongoDB');
}).catch((err)=>{
    console.log(err);
});

const app  = express(); 

app.use(express.json());
app.use(cookieParser());

//listen kar rhe hai request ko
app.listen(3000 , ()=>{
    console.log("server is running on port 3000 ")
})

//so use isme /api/test mai jyga to userRouter use kro
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);


//MIDDLEWARE
app.use((err , req , res , next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});