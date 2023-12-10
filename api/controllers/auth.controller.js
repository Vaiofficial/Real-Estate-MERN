import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import Jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json("user created successfully");
  } catch (error) {
    next(error);
    //yaha apne mann se bhi error de skte hai - next(errorHandler(550 , 'error from function));
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //checking email & password in mongodb
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const ValidPassword = bcryptjs.compareSync(password, validUser.password);
    if (!ValidPassword) return next(errorHandler(401, "Wrong Credentials"));
    //if every thing is fine means email & password then we sign a token using jwt package.
    const token = Jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    //password ko even hash form mai bhi nahi bhejna hai so ...rest ko bhej rhe except password
    const { password: pass, ...rest } = validUser._doc;
    //now we are saving the cookie
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    //if user exist
    if (user) {
      //creating token
      const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      //sending rest except password for security purpose.
      const { password, ...rest } = user._doc;
      //creating cookie
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
    //otherwise we create a user
    else
    {
      //humne model mai bnaya hai ki password required hai/must h but google se login ke time hume password  required nahi hoti h. so yaha error aayga isliye ak random password generate kar rhe hai.
      const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      //hasing the geenrated password.
      const hashedPassword = bcryptjs.hashSync(generatePassword , 10);
      //so yaha humko username mai koi space nahi chahiye and sab lower case mai hone chahiye so uske according convert kar rhe hai.
      //username with random number at the end.
      const newUser = new User({username : req.body.name.split(" ").join("").toLowerCase() +  Math.random().toString(36).slice(-4) , email : req.body.email , password : hashedPassword , avatar : req.body.photo})
      //save kar rhe h user ko
      await newUser.save();

      //creating tokens - vhi same process.
      const token = Jwt.sign({id :newUser._id} , process.env.JWT_SECRET);
      const {password: pass , ...rest} = newUser._doc;
      res.cookie('access_token' , token , {httpOnly :true}).status(200).json(rest);
    }
  } catch (error) {
    next(error);
  }
};

//1 . now we use the model that we created to save this information.

//2 .password ko encrypt bhi karna hoga (so here we are hashing it , here 10 is salt number - hash number which will combine with password to encypt it)

//3 .now we have to save these data into database
//4 .may be delay ho skta hai database mai save hone mai , so thats why async await use kr rhe hai.
//5 . we dont want to show error in console we will send it to the user , thats why using try  & catch.

//6.best way to handle the error is by using middleware & function. This way is not a good approach.

//7. jwt ka use kar rhe hai yaha data ko client and server ke beech securely transfer ke liye.

//8. httpOnly ke karan koi third party ye cookie ko access nahi kar skta h.

//8. const token = Jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
//in this line there are two parameters , first one is something unique about the user that is 'id' which we know is unique in every single mongodb user data and second one is jwt secret key, which we defined in .env file.

//9. so we are storing that token inside a cookie
