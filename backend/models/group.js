import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId, // reference to User
        ref: "User",
        required: true,
      },
    ],
    admin: {
      type: mongoose.Schema.Types.ObjectId, // reference to User
      ref: "User",
      required: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/groupdefault.jpg", // default group image
    },
  },
  { timestamps: true } // createdAt & updatedAt
);

const Group = mongoose.model("Group", groupSchema);

export default Group;