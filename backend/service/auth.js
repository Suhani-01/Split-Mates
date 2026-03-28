// To generate token and send token in cookie
// Because browser have cookies
const secretKey = "Suhani$123@$";

import jwt from "jsonwebtoken";

// Will utilize this to GENERATE TOKEN when user Logs in ...
function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secretKey,
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