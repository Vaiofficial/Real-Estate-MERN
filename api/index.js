import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connected to mongoDB');
}).catch((err)=>{
    console.log(err);
});

const app  = express(); 

//listen kar rhe hai request ko
app.listen(3000 , ()=>{
    console.log("server is running on port 3000 ")
})

//so use isme /api/test mai jyga to userRouter use kro
app.use('/api/user', userRouter)