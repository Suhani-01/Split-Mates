import { Router } from "express";
import { createExpense } from "../controllers/expense.js";

const router=Router();


//api/expense/create-expense
router.post('/create-expense',createExpense);

export default router;