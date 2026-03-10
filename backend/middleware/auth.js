import { getUser } from "../service/auth.js";

async function restrictToLoggedInUserOnly(req,res,next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message:"You need to login first"})
    }

    const user=getUser(token); //service me hai to verify the token
    if(!user){
        return res.status(401).json({message:"Invalid token !!"});
    }

    //put this user email and id in the request object
    req.user=user;
    next(); //lets move forward
}

export {restrictToLoggedInUserOnly};