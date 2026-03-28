import User from "../models/user.js"; //users database

async function findUser(req, res) {

  // fetch username from query
  // eg api/private/find-user?username=john
  const { userName } = req.query;

  if (!userName) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {

    // users will be Array of Objects.....
    const users = await User.find(
      { userName: new RegExp(`^${userName}`, "i") }, //john will also match with johndoe //"i" = case-insensitive
      { userName: 1, name: 1, _id: 0 }, //will only include username and Name , _id automatically include hota hai issliye 0 kr diyaa
    );

    //No users found
    if(users.length===0){
        return res.status(404).json({message:"No users found"});
    }

    //Retrun all the users according to search query.... 
    return res.json(users);

  } catch (err) {
    return res.status(500).json({message:"Server error"});
  }
}

export { findUser };