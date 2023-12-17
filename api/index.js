import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import listingRouter from "./routes/listing.route.js";
import path from "path";

dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connected to mongoDB');
}).catch((err)=>{
    console.log(err);
});


const __dirname = path.resolve();

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
app.use('/api/listing', listingRouter);


//agar upar ke address mai nahi gya means client side jyga and index.html run karega.
//dist name ka ak folder create hoga client side ke andar jo ki index.html ko store kar ke rakha hai.
app.use(express.static(path.join(__dirname , '/client/dist')));

app.get('*' , (req , res)=>{
    res.sendFile(path.join(__dirname , 'client' , 'dist' , 'index.html'));
})


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