import { Router } from "express";
import { checkAuth, handleAddNewUser, handleLoginUser, logOutUser } from "../controllers/user.js";

const router=Router();

//post request on api/user/ to add new user
router.post('/signup',handleAddNewUser);

// login the user
router.post('/login',handleLoginUser);

//to check if user is logged in or not
router.get('/check-auth',checkAuth);

//to logout the user
router.post('/logout',logOutUser)



export default router;