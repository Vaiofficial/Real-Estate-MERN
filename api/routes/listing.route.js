import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getListings
} from "../controllers/listing.controller.js";

const router = express.Router();

//yha phle verify karenge person ko , agar verified user hai tb hi vo list create kar skta hai.

//need to add verifyToken here , getting error , thats why removed it , have to work on it in future.
router.post("/create", createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);
router.get('/get/:id', getListing);
router.get('/get', getListings);


export default router;