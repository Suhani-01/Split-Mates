import Activity from "../models/activity.js";
import Expense from "../models/expense.js";
import Settlement from "../models/settlement.js";

async function createExpense(req, res) {
  try {
    const expense = await Expense.create(req.body);
    console.log(req.body);

    //preparing activity log...
    const activityData = {
      groupId: req.body.groupId,
      type: "EXPENSE_ADDED",
      performedBy: req.body.paidBy.map((p) => p.userId),
      performedFor: req.body.paidFor.map((p) => p.userId),
      amount: req.body.totalAmount,
      title: req.body.title,
    };

    //create activity log
    await Activity.create(activityData);

    res.status(201).json({
      message: "Expense added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to add expense",
    });
  }
}

async function doSettlement(req, res) {
  try {
    const settlement = await Settlement.create(req.body);

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
    await Activity.create(activityData);

    res.status(201).json({
      message: "Settlement added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to do settlement , Server Issue...🙂",
    });
  }
}

async function changeSettlementEntry(req, res) {
  try {
    const { entryId, action } = req.body;

    const settlement = await Settlement.findById(entryId);
    if (!settlement) {
      return res.status(404).json({ message: "Entry not found" });
    }

    // activity object
    const activityData = {
      groupId: settlement.groupId,
      performedBy:[settlement.paidTo] , 
      performedFor: [settlement.paidBy], 
      amount: settlement.amount,
    };

    if (action === "fulfill") {
      settlement.status="fulfilled";
      await settlement.save();

      //Activity log
      activityData.type="PAYMENT_CONFIRMED";
      await Activity.create(activityData);

      return res.status(200).json({
        message: "Payment marked as recieved ✅",
      });
    }

    if (action === "delete") {
      await Settlement.findByIdAndDelete(entryId);

      //Activity log
      activityData.type="PAYMENT_DECLINED";
      await Activity.create(activityData);

      return res.status(200).json({
        message: "Payment marked as not recieved ❌",
      });
    }

    //if the operation is wrong.....
    return res.status(400).json({
      message: "Invalid action",
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Issue....🙂",
    });
  }
}

export { createExpense, doSettlement, changeSettlementEntry };
