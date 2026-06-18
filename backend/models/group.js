import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    // -- Group Name --
    groupName: {
      type: String,
      required: true,
    },

    // -- Optional Description --
    description: {
      type: String,
      default: "",
    },

    // -- Group Memebers --
    members: [
      {
        type: mongoose.Schema.Types.ObjectId, // reference to User
        ref: "User",
        required: true,
      },
    ],

    // -- Admin of the Group --
    admin: {
      type: mongoose.Schema.Types.ObjectId, // reference to User
      ref: "User",
      required: true,
    },

    totalAmount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } // createdAt & updatedAt
);

const Group = mongoose.model("Group", groupSchema);

export default Group;