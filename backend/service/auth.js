//to generate token and send token in cookie kyunki browser ke pass cookie hota hai
const secretKey="Suhani$123@$";

import jwt from "jsonwebtoken";


//will utilize this in middleware to generate token
function setUser(user){
    return jwt.sign({
        _id:user._id,
        email:user.email,
    },secretKey);
}

//to verify token and return the user details ie email and _id
function getUser(token)
{
    if(!token) return null;
    try{
        //if it get verified than it will return the decoded payload
        //if not get verified it will cause error and hence will go to catch block
        return jwt.verify(token,secretKey);
    }catch(err){
        return null;
    }
}

export {setUser, getUser};