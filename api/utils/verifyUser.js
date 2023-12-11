import jwt from 'jsonwebtoken'
import { errorHandler } from './error.js';


//token ko authenticate kar rhe hai 
export const verifyToken = (req, res, next) => 
{
    const token = req.cookies.access_token;

    //error function ko call kar rhe hai (next)
    if (!token) return next(errorHandler(401, 'Unauthorized'));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, 'Forbidden'));

        //agar sab kuch shi hai to req mai ye authenticated user ko de do and next function that is updateUser ko trigger karo.

        //here we are getting id of the verified user. 
        req.user = user; 
        next();
    });
};