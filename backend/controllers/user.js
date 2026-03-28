import User from "../models/user.js";
import { getUser, setUser } from "../service/auth.js";

// CREATE USER ACCOUNT
async function handleAddNewUser(req, res) {
  const { name, userName, email, password } = req.body;
  const lowerEmail = email.toLowerCase();

  try {
    // CHECK IF USERNAME ALREADY EXIST
    const existingUsername = await User.findOne({ userName });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // CHECK IF EMAIL ALREADY EXIST
    const existingEmail = await User.findOne({ email: lowerEmail });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // CREATE NEW USER IN DB
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


// LOG IN 
async function handleLoginUser(req, res) {
  try {
    const { email, password } = req.body;
    const lowerEmail = email.toLowerCase();

    // FIND USER EMAIL
    const user = await User.findOne({ email: lowerEmail });
    

    // USER EMAIL EXIST OR NOT
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // COMPARE PASSWORD
    const isMatch = user.password === password;

    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect Password",
      });
    }

    // GENERATE JWT TOKEN for future authentication
    const token = setUser(user);
    // console.log(token);


    // SAVE TOKEN IN THE COOKIE
    res.cookie("token", token, {
      httpOnly: true, // Front end will not be able to modify and access cookie (ie JWTtoken) (but can see in network tab) only http req can access it
      secure: false, // production me true krna.. true will ensure that cookie will be sended to only https websites
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
      message: "Server Error",
    });
  }
}

// USER ALREADY LOGGED IN OR NOT ???
async function checkAuth(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ isLoggedIn: false });
  }

  const user = getUser(token); // JWT verify function

  const currUser = await User.findOne({email:user.email});


  if (!user) return res.status(401).json({ isLoggedIn: false });

  return res.status(200).json({ isLoggedIn: true, userName:currUser.userName , email : currUser.email ,_id:currUser._id });
}


// LOGOUT - clear token from cookie
function logOutUser(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // production me true
  });

  return res.status(200).json({ message: "Logged out sucessfully" });
}

export { handleAddNewUser, handleLoginUser, checkAuth, logOutUser };
