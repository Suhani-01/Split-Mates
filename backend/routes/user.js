import { Router } from "express";
import { checkAuth, handleAddNewUser, handleLoginUser, logOutUser } from "../controllers/user.js";

const router=Router();

// POST request on api/user/ to CREATE NEW USER
router.post('/signup',handleAddNewUser);

// POST request to LOG IN USER
router.post('/login',handleLoginUser);

// GET req to check if user is already LOGGED IN
router.get('/check-auth',checkAuth);

// POST req to LOGOUT
router.post('/logout',logOutUser)


export default router;