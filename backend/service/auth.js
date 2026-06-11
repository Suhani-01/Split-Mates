// To generate token and send token in cookie
// Because browser have cookies
import 'dotenv/config';

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is not defined!");
  process.exit(1);
}

const secretKey =process.env.JWT_SECRET;



import jwt from "jsonwebtoken";

// Will utilize this to GENERATE TOKEN when user Logs in ...
function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secretKey,
    { expiresIn: "7d" }
  );
}

// VERIFY TOKEN and RETURN USER DETAILS (Used for Authentication)
function getUser(token) {

  if (!token) return null;

  try {

    // Decode payload  // Will go to catch block if invalid token
    const result = jwt.verify(token, secretKey);
    return result;

  } catch (err) {
    return null;
  }
}

export { setUser, getUser };


// {
//   _id: '69b530ab63641281ac8ea61a',
//   email: 'suhani@gmail.com',
//   iat: 1774689818
// }