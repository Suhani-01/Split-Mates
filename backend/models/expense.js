import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  
  // -- Group to which Expense Belongs --
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },

  // -- Title Of Expense--
  title: {
    type: String,
    required: true,
    trim: true,
  },

  // -- Optional Description --
  description: {
    type: String,
    default: "",
  },

  // -- Total Expense Amount --
  totalAmount: {
    type: Number,
    required: true,
  },

  // -- Who Paid & How Much [ { userId, amount } , { userId, amount } ] --
  paidBy: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      amount: {
        type: Number,
        required: true,
      },

    }
  ],

  // -- For Whom and How Much --
  paidFor:[
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },

        amount:{
            type:Number,
            required:true,
        }
    }
  ],

  // -- Who Created this Expense --
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },

},
{
    timestamps:true
});

// creating model from the schema of name expenses collection
const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;



