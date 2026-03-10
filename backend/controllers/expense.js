import Expense from "../models/expense.js";

async function createExpense(req,res){
    try{

        const expense=await Expense.create(req.body);

        res.status(201).json({
            message:"Expense added successfully",
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"Failed to add expense"
        });
    }
}

export {createExpense};