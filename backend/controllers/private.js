import User from "../models/user.js"; //users database

async function findUser(req, res) {
  const { userName } = req.query;
  if (!userName) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    const users = await User.find(
      { userName: new RegExp(`^${userName}`, "i") }, //john will also match with johndoe
      { userName: 1, name: 1, _id: 0 }, //will only send username and Name _id automatically include hota hai issliye 0 kr diyaa
    );

    //since no users found
    if(users.length===0){
        return res.status(404).json({message:"No users found"});
    }

    //returning matching username along with names
    return res.json(users);

  } catch (err) {
    return res.status(500).json({message:"Server error"});
  }
}

export { findUser };