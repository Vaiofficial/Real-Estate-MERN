import mongoose, { mongo } from "mongoose";

const userSchema  = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    avatar:{
        type:String,
        default : "https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
    }


}, {timestamps : true});

//creating model and passed our user schema
const User  = mongoose.model('User' , userSchema);

export default User; 