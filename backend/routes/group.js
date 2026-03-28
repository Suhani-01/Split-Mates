import { Router } from "express";
import { createGroup, getActivities, getGroupDetail, getUserGroups } from "../controllers/group.js";
import { calculateGroupSettlements } from "../controllers/calculation.js";

const router=Router();


// CREATE NEW GROUP ( api/group/create-group )
router.post('/create-group',createGroup);

// get ALL GROUPS OF LOGGED IN USER
router.get('/my-groups',getUserGroups);

// Details of Selected Group
router.get('/my-groups/:groupId',getGroupDetail);

// Calculate the REMAINING SETTLEMENTS the user should do in SELECTED GROUP...
router.get('/my-group/settle/:groupId',calculateGroupSettlements);

// SELECTED GROUP ACTIVITES
router.get('/activites/:groupId',getActivities);


export default router;