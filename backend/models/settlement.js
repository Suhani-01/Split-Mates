import mongoose from "mongoose";

const settlementSchema = new mongoose.Schema(
  {
    //which group this settlement belong to....
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true
    },

    //who paid 
    paidBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    //to whom
    paidTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    //how much
    amount: {
      type: Number,
      required: true
    },
  },
  { timestamps: true }
);

const Settlement=mongoose.model("Settlement",settlementSchema);

export default Settlement;