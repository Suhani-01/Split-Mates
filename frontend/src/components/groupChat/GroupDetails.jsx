import React, { useContext } from "react";
import { UserContext } from "../../App";

// This component displays the group's description and a list of all members and shows who Is the Admin
// group info
function GroupDetails({ groupDetails }) {

  // ------- Logged In User Details to replace his/her username with You ------------
  const { userDetails } = useContext(UserContext);

  return (
    <div className="h-full bg-white shadow-md rounded-lg overflow-y-scroll ">
      {/* Description Section */}
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
          Description
        </h3>
        <p className="text-gray-700 text-sm leading-relaxed">
          {groupDetails?.description || "No description provided."}
        </p>
      </div>

      {/* Members Section */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">
          Members ({groupDetails?.members?.length})
        </h3>
        
        <div className="space-y-2">
          {groupDetails?.members?.map((member) => (
            <div 
              key={member._id} 
              className={`flex items-center justify-between p-2 ${member.userName === groupDetails.admin.userName?"bg-green-100":""} rounded-md cursor-pointer hover:bg-gray-50 transition-colors`}
            >
              <div className="flex items-center gap-3">
                {/* Avatar Placeholder */}
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                  {member.userName.charAt(0).toUpperCase()}
                </div>
                
                <span className={`text-sm ${member.userName === userDetails.userName ? "font-semibold text-indigo-600" : "text-gray-800"}`}>
                  {member.userName === userDetails.userName ? "You" : member.userName}
                </span>
              </div>

              {/* Admin Badge */}
              {member.userName === groupDetails.admin.userName && (
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-sm uppercase border border-green-200">
                  Admin
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GroupDetails;