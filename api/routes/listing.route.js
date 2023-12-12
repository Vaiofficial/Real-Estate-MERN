import express from "express";
import {verifyToken} from '../utils/verifyUser.js';
import {createListing} from "../controllers/listing.controller.js";

const router = express.Router();

//yha phle verify karenge person ko , agar verified user hai tb hi vo list create kar skta hai.
router.post('/create',createListing);

export default router; 