import Activity from "../models/activity.js";
import Group from "../models/group.js";
import User from "../models/user.js";
import Settlement from "../models/settlement.js";
import mongoose from "mongoose";
import Expense from "../models/expense.js";


// CREATE NEW GROUP
async function createGroup(req,res){
    try{
        const {groupName,description,members}=req.body;

        // Validate group name
        if(!groupName){
            return res.status(400).json({message:"Group name is required"});

        }

        // Validate members array
        if(!Array.isArray(members) || members.length===0){
            return res.status(400).json({message:"Add at least one member"});
        }

        // Username will help to find there id to store the reference in the group DB
        const memberUsers=await User.find({userName :{$in:members}}).distinct("_id");


        if(memberUsers.length!==members.length){
            return res.status(400).json({message:"Some members do not exist"});
        }

        // Set the Current User as the admin by default
        const currentUserId=req.user._id;

        // Create NEW group document
        const group = await Group.create({
            groupName,
            description: description || "",
            admin: currentUserId,
            members: [...memberUsers, currentUserId]
        });

        return res.status(201).json({message:"Group created sucessfully"});
    }catch(err){
        return res.status(500).json({message:"server error"});
    }
}

// ALL the GROUPS of LOGGED IN USER....
async function getUserGroups(req,res){
    try{
        const userId=req.user._id;

        //Array of Objects
        const groups=await Group.find({members:userId}).select("_id groupName updatedAt");
        
        // console.log(groups)
        res.status(200).json(groups);
    }catch(error){
        res.status(500).json({
            message:"Error fetching groups",
        });
    }
}


// Return selected group entire details that are present in Group DB
async function getGroupDetail(req,res){
    try{
        const groupId=req.params.groupId;
        const userId=req.user._id;
      

        //fetching details from MongoDB 
        const groupDetails=await Group.findById(groupId);
        if(!groupDetails){
            return res.status(404).json({message:"Group not found"});
        }

        //only member of the group can access the group details
        if(!groupDetails.members.includes(userId)){
            return res.status(403).json({message:"Access Denied"});
        }

        // populating id of users and admin along with there username........
        await groupDetails.populate("members","userName");
        await groupDetails.populate("admin","userName");


        return res.status(200).json(groupDetails);

    }catch(err){
        console.log("error occured at controllers/groups.js/getGroupDetails");
        res.status(500).json({message:"Error fetching group"})
    }
}

// get PAST ACTIVITES OF THE GROUP
async function getActivities(req,res){
    try{
        const {groupId}=req.params;

        const activities=await Activity.find({groupId}); //newest first

        res.status(200).json({
            activities,
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"Failed to fetch the activites",
        })
    }
}

async function deleteGroup(req,res){
    const userId = req.user._id;
    const { groupId } = req.params;

    const group = await Group.findById(groupId);
    if(!group){
        return res.status(404).json({message : "Group does not exist"});
    }
    if(group.admin.toString() !== userId.toString()){
        return res.status(403).json({message : "Only admin can delete this group"});
    }

    //start the session
    const session = await mongoose.startSession();

    try{
        session.startTransaction();

        
        await Expense.deleteMany({groupId}).session(session);
        await Activity.deleteMany({groupId}).session(session);
        await Settlement.deleteMany({groupId}).session(session);
        await Group.findByIdAndDelete(groupId).session(session);
        

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({message:"Group deleted sucessfully"});
       
    }catch(error){
        await session.abortTransaction();
        session.endSession();
        console.error("Error deleting group : ",error);
        return res.status(500).json({message:"Failed to delete the group"});
    }


}

export {createGroup,getUserGroups,getGroupDetail,getActivities,deleteGroup};