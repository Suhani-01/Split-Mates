
import React, { useContext } from "react";
import { UserContext } from "../../App";
import { MdDelete } from "react-icons/md";
import { deleteGroup } from "../../api/groupApi";
import { useNavigate } from "react-router";

// This component displays the group's description and a list of all members and shows who Is the Admin
// new functionality -> delete group
// group info
function GroupDetails({groups,setGroups, groupDetails ,setGroupDetails,setSelectedGroup}) {
  const navigate =useNavigate();
   

  // ------- Logged In User Details to replace his/her username with You ------------
  const { userDetails } = useContext(UserContext);

  async function deleteG(){
    const conf = confirm("Are you sure you want to delete the group ?");

    if(!conf){
      return ;
      
    }

    try{
      await deleteGroup(groupDetails._id);
      alert("Group deleted sucessfully");
      
      setGroups(groups.filter(group=>group._id!==groupDetails._id));
      setGroupDetails(null);
      setSelectedGroup(null);
    }catch(error){
      console.log("Failed to delete the group",error);
      alert(error.message || "Something went wrong");
    }
  }
   

  return (
    <div className="h-full min-h-0 min-w-0 bg-white overflow-y-auto overflow-x-hidden">

      {/* Description Section */}
      <div className="p-4 sm:p-5 border-b border-gray-100 bg-gray-50">
        <h3 className="text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
          Description
        </h3>
        <p className="text-gray-700 text-sm leading-relaxed break-words">
          {groupDetails?.description || "No description provided."}
        </p>
      </div>

      {/* Members Section */}
      <div className="p-4 sm:p-5">
        <h3 className="text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">
          Members ({groupDetails?.members?.length})
        </h3>
        
        <div className="space-y-2">
          {groupDetails?.members?.map((member) => (
            <div 
              key={member._id} 
              className={`flex items-center justify-between gap-3 p-3 ${member.userName === groupDetails.admin.userName?"bg-green-50 border-green-100": "bg-white border-gray-100"} rounded-xl border hover:bg-gray-50 transition-colors min-w-0`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Avatar Placeholder */}
                <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs flex-shrink-0">
                  {member.userName.charAt(0).toUpperCase()}
                </div>
                
                <span className={`text-sm truncate ${member.userName === userDetails.userName ? "font-semibold text-indigo-600" : "text-gray-800"}`}>
                  {member.userName === userDetails.userName ? "You" : member.userName}
                </span>
              </div>

              {/* Admin Badge */}
              {member.userName === groupDetails.admin.userName && (
                <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase border border-green-200 flex-shrink-0">
                  Admin
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      { groupDetails?.admin.userName === userDetails?.userName &&
        <div onClick={()=>deleteG()} className="w-full px-4 sm:px-5 pb-5 pt-1">
          <div className="w-full flex gap-2 text-sm sm:text-base items-center justify-center rounded-xl cursor-pointer font-semibold p-3 bg-danger text-white hover:opacity-90 active:scale-[0.99] transition">
            <MdDelete className="text-lg"/> 
            <span>Delete Group</span>
          </div>
        </div>
      }
      
    </div>
  );
}

export default GroupDetails;
