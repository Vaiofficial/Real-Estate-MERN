import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import Listing from "../models/listing.model.js";

export const test = (req, res) => {
  res.json({
    message: "Well api route is working",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "you can only update your own account"));
  //else agar dono ki id match kar gyi , means user verified h
  try {
    if (req.body.password) {
      //agar user password change karna chahta hai to hum password ko hash karenge.
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updateUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account"));
  try {
    await User.findByIdAndDelete(req.params.id);
    //clear cookie phle karna hai , response dene se phle.
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async(req, res, next)=>
{
  //so phle verify kar rhe user ki id match kar rhi ya nahi , dusre kli listing nahi  milni chahiye
  if (req.user.id === req.params.id){
  try {
    const listings  = await Listing.find({userRef:req.params.id});
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
}
  else{ 
    return next(errorHandler(401 , 'You can only view your own listings'));
  }
  
}

//data ko update hum set method ka use karke karenge , kyuki aisa ho skta hai ki user skuch hi data ko change karna chahata hai , like bas password or bas email etc.
//set method check karta hai ki kya data change hua h agar yes to update karenge else ignore
