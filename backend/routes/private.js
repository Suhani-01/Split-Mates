import { Router } from "express";
import {findUser} from "../controllers/private.js";

const router=Router();

//find the user
//eg api/private/find-user?username=john

router.get("/find-user",findUser);

export default router;