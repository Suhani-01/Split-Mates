import Group from "../models/group.js";
import User from "../models/user.js"

async function createGroup(req,res){
    try{
        const {groupName,description,members}=req.body;

        //validate group name
        if(!groupName){
            return res.status(400).json({message:"Group name is required"});

        }

        //validate members array
        if(!Array.isArray(members) || members.length===0){
            return res.status(400).json({message:"Add at least one member"});
        }

        //member username will help to find there id to store the reference in the group db all distict id
        const memberUsers=await User.find({userName :{$in:members}}).distinct("_id");


        if(memberUsers.length!==members.length){
            return res.status(400).json({message:"Some members do not exist"});
        }

        //set the current user as the admin by default
        const currentUserId=req.user._id;

        //create group document
        const group=new Group({
            groupName,
            description:description||"",
            admin:currentUserId,
            members:[...memberUsers,currentUserId]
        });

        await group.save();

        return res.status(201).json({message:"Group created sucessfully"});
    }catch(err){
        return res.status(500).json({message:"server error"});
    }
}

//to find all the groups the logged in user currently in
async function getUserGroups(req,res){
    try{
        const userId=req.user._id;

        const groups=await Group.find({members:userId}).select("_id groupName updatedAt");
        // console.log(groups)
        res.status(200).json(groups);
    }catch(error){
        res.status(500).json({
            message:"Error fetching groups",
        });
    }
}

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

export {createGroup,getUserGroups,getGroupDetail};