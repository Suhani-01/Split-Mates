import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  //group to which the expenses belong to will point to the group....
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },

  //Title of the expense
  title: {
    type: String,
    required: true,
    trim: true,
  },

  //Optional description
  description: {
    type: String,
    default: "",
  },

  //Total expense amount
  totalAmount: {
    type: Number,
    required: true,
  },

  //who paid and how much [ { userId, amount } , { userId, amount } ]
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

  // for whom the payment has been done .... 
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

  //who added this expense???
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },

},
{
    timestamps:true
});

//creating model from the schema of name expenses collection
const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;



