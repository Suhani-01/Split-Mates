import { Router } from "express";
import { changeSettlementEntry, createExpense,doSettlement } from "../controllers/expense.js";

const router=Router();

// CREATE NEW EXPENSE IN THE GROUP
//api/expense/create-expense
router.post('/create-expense',createExpense);

// TO DO SETTLEMENT
//api/expense/settlement
router.post('/settlement',doSettlement);

// To CONFIRM or REJECT (delete) the Settlement
router.post('/modify-settlement',changeSettlementEntry);

export default router;