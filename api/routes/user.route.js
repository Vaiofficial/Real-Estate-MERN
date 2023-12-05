import express from "express";
import test from "../controllers/user.controller.js";


//express ke andar router library hai , uske andar methods hai jo ki hum use kr rhe hai  , jaise ki get etc.
const router = express.Router();

//ye test aarha hai usecontroller file se , yaha bhi function likh skte the but aise likhna is a good practice.
router.get('/test', test);

export default router;
