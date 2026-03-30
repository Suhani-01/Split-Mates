
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  // -- Name of User --
  name: {
    type: String,
    required: true,
  },
  // -- unique UserName --
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  // -- unique Email Id --
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // -- password --
  password: {
    type: String,
    required: true,
  },
  // -- User Profile Image -- ( Currently of No Use )
  profileImageURL: {
    type: String,
    default: "/images/profiledefault.png",
  },
  // -- Friends of User -- ( Currently Of No Use )
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
},{timestamps:true});


//schema se model banega ab
const User=mongoose.model("User",userSchema);
//collection of name users in the mongo

export default User;