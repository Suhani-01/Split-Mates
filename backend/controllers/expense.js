import Activity from "../models/activity.js";
import Expense from "../models/expense.js";
import Settlement from "../models/settlement.js";
import Group from "../models/group.js";
import mongoose from "mongoose";

// CREATE NEW EXPENSE IN THE GROUP
async function createExpense(req, res) {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const expense = await Expense.create([req.body],{session});
    const group = await Group.findById(req.body.groupId).session(session); // to update total amount

    //preparing activity log...
    const activityData = {
      groupId: req.body.groupId,
      type: "EXPENSE_ADDED",
      performedBy: req.body.paidBy.map((p) => p.userId),
      performedFor: req.body.paidFor.map((p) => p.userId),
      amount: req.body.totalAmount,
      title: req.body.title,
    };
   
    group.totalAmount += req.body.totalAmount;
   

    //create activity log
    await Activity.create([activityData],{session});
    await group.save({session});

    await session.commitTransaction();
   

    res.status(201).json({
      message: "Expense added successfully",
    });

  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    
    res.status(500).json({
      message: "Failed to add expense",
    });
  }finally{
     session.endSession();
  }
}

// SETTLEMENT IS DONE BY THE PAYER
async function doSettlement(req, res) {
  const session = await mongoose.startSession();

  try {
    // By default settlement is marked as "PENDING"
    session.startTransaction();
    const settlement = await Settlement.create([req.body],{session});

    const { groupId, paidBy, paidTo, amount } = req.body;

    //activity log ka data
    const activityData = {
      groupId: groupId,
      type: "PAYMENT_SENT",
      performedBy: [paidBy],
      performedFor: [paidTo],
      amount,
    };
    //create activity log
    await Activity.create([activityData],{session});
    await session.commitTransaction();

    return res.status(201).json({
      message: "Settlement added successfully",
    });
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    return res.status(500).json({
      message: "Failed to do settlement , Server Issue...🙂",
    });
  }finally{
    session.endSession();
  }
}

// RECIEVER OF THE SETTLEMENT CONFIRM or REJECT ( use paise mile ki nahi )
async function changeSettlementEntry(req, res) {
  const session = await mongoose.startSession();

  try {
    await session.startTransaction();

    const { entryId, action } = req.body;

    const settlement = await Settlement.findById(entryId).session(session);

    if (!settlement) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Entry not found" });
    }

    // ACTIVITY OBJECT 
    const activityData = {
      groupId: settlement.groupId,
      performedBy:[settlement.paidTo] , 
      performedFor: [settlement.paidBy], 
      amount: settlement.amount,
    };

    if (action === "fulfill") {
      // mark settlement as FULFILLED
      settlement.status="fulfilled";
      await settlement.save({session});

      //ACTIVITY LOG ADD...
      activityData.type="PAYMENT_CONFIRMED";
      await Activity.create([activityData],{session});

      await session.commitTransaction();

      return res.status(200).json({
        message: "Payment marked as recieved ✅",
      });
    }

    // DELETE THE SETTLEMENT AS RECIEVER DID NOT RECIEVED ANY MONEY
    if (action === "delete") {
      await Settlement.findByIdAndDelete(entryId).session(session);

      //Activity log
      activityData.type="PAYMENT_DECLINED";
      await Activity.create([activityData],{session});
      await session.commitTransaction();

      return res.status(200).json({
        message: "Payment marked as not recieved ❌",
      });
    }

    // FRONT END IS DEMANDING FOR INVALID OPERATION ( valid : fulfill / delete )
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid action",
    });

  } catch (err) {
    await session.abortTransaction();

    console.log(err);
    return res.status(500).json({
      message: "Server Issue....🙂",
    });
    
  }finally{
    session.endSession();
  }
}

export { createExpense, doSettlement, changeSettlementEntry };
