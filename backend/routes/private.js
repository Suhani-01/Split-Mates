import { Router } from "express";
import {findUser} from "../controllers/private.js";

const router=Router();

// SEARCH USER to add in the group during CREATE GROUP
// eg api/private/find-user?username=john

router.get("/find-user",findUser);

export default router;