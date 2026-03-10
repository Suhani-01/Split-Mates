import { Router } from "express";
import { createGroup, getGroupDetail, getUserGroups } from "../controllers/group.js";
import { calculateGroupSettlements } from "../controllers/calculation.js";

const router=Router();


//to create group the api is api/group/create-group
router.post('/create-group',createGroup);

//to get the groups of current user
router.get('/my-groups',getUserGroups);

//to open a group we need to send group details to the user....
router.get('/my-groups/:groupId',getGroupDetail);


//to calculate the remaining settlements the user should do...
router.get('/my-group/settle/:groupId',calculateGroupSettlements);


export default router;