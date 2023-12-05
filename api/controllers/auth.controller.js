import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json("user created successfully");
  } catch (error) {
    res.status(500).json(error.message);
  }
  //1 . now we use the model that we created to save this information.

  //2 .password ko encrypt bhi karna hoga (so here we are hashing it , here 10 is salt number - hash number which will combine with password to encypt it)

  //3 .now we have to save these data into database
  //4 .may be delay ho skta hai database mai save hone mai , so thats why async await use kr rhe hai.
  //5 . we dont want to show error in console we will send it to the user , thats why using try  & catch.

  //6.best way to handle the error is by using middleware & function. This way is not a good approach.
};
