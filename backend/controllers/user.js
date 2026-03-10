import User from "../models/user.js";
import { getUser, setUser } from "../service/auth.js";

async function handleAddNewUser(req, res) {
  const { name, userName, email, password } = req.body;
  const lowerEmail = email.toLowerCase();

  try {
    //check if username already exist
    const existingUsername = await User.findOne({ userName });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }

    //check if email already exist
    const existingEmail = await User.findOne({ email: lowerEmail });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    //now we can create entry peacefully
    await User.create({
      name: name,
      userName: userName,
      email: lowerEmail,
      password: password,
    });

    return res.status(201).json({ message: "User Account Created" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

//api/user/   get
async function handleLoginUser(req, res) {
  try {
    const { email, password } = req.body;
    const lowerEmail = email.toLowerCase();
    const user = await User.findOne({ email: lowerEmail });
    // console.log(user);

    //user exist or not
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    //compare the password
    const isMatch = user.password === password;

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    //everything fine generate JWT
    const token = setUser(user);
    // console.log(token);

    res.cookie("token", token, {
      httpOnly: true, //protect coookie from front end/client side javascript code
      secure: false, //production me true krna.. ture krne se it will ensure that cookie will be sended to only https
      sameSite: "lax",
    });

    // console.log(user);

    return res.status(201).json({
      message: "logged in sucessfully",
      userName:user.userName,
      email:user.email,
      _id:user._id,
    });
  } catch (err) {
    return res.status(500).json({
      message: "server error",
    });
  }
}

//to check if user is logged in or not
async function checkAuth(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ isLoggedIn: false });
  }

  const user = getUser(token); // JWT verify function
  
  

  const currUser = await User.findOne({email:user.email});
  console.log("i am user from the auth")
  console.log(currUser);

  if (!user) return res.status(401).json({ isLoggedIn: false });

  return res.status(200).json({ isLoggedIn: true, userName:currUser.userName , email : currUser.email ,_id:currUser._id });
}

function logOutUser(req, res) {
  res.cookie("token", "", {
    httpOnly: true,
    secure: false, // production me true
    expires: new Date(0), // expire immediately
    sameSite: "lax",
  });

  return res.status(200).json({ message: "Logged out sucessfully" });
}

export { handleAddNewUser, handleLoginUser, checkAuth, logOutUser };
