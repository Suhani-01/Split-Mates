import mongoose from "mongoose";

const settlementSchema = new mongoose.Schema(
  {
    // -- Group to which Settlement Belongs --
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true
    },

    // -- Who Did the Settlement --
    paidBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // -- To Whom --
    paidTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // -- How Much Settlement --
    amount: {
      type: Number,
      required: true
    },
    
    // -- Current Status of Settlement --
    // pending -> A paid to B and waiting for B's confirmation
    //fulfilled -> B confirmed recieving payment from A
    status:{
      type:String,
      enum:["pending","fulfilled"],
      default:"pending",
    }
  },
  { timestamps: true }
);

const Settlement=mongoose.model("Settlement",settlementSchema);

export default Settlement;