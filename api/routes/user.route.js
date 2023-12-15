import express from "express";
import  { deleteUser, test ,  updateUser , getUserListings , getUser} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";


//express ke andar router library hai , uske andar methods hai jo ki hum use kr rhe hai  , jaise ki get etc.
const router = express.Router();

//ye test aarha hai usecontroller file se , yaha bhi function likh skte the but aise likhna is a good practice.
router.get('/test', test);
//so yha 2 functions pass kiye h , phle verification hoga aur phir user update  
router.post('/update/:id' , verifyToken ,updateUser);
router.delete('/delete/:id', verifyToken , deleteUser);
router.get('/listings/:id' , verifyToken , getUserListings)
router.get('/:id' ,verifyToken , getUser);

export default router;


//for updating the user we neeed extra checking , we need to check whether the user is authenticated or not.
//so we create a token inside a cookie to verify the user so before update user data , we need to first to this and verify the user.