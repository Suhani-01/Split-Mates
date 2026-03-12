import { Router } from "express";
import { changeSettlementEntry, createExpense,doSettlement } from "../controllers/expense.js";

const router=Router();


//api/expense/create-expense
router.post('/create-expense',createExpense);


//this is meant to do settlements
//api/expense/settlement
router.post('/settlement',doSettlement);

//to do modification in settlement
router.post('/modify-settlement',changeSettlementEntry);



export default router;