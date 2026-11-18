
import React, { useState } from "react";
import SearchUser from "../SearchUser";
import { useNavigate } from "react-router";
import { createGroup } from "../../api/groupApi";

function CreateGroup() {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      alert("Group name is required");
      return;
    }

    if (selectedUsers.length === 0) {
      alert("Add at least one member");
      return;
    }

    try {
      
      //function to creare group
      await createGroup(groupName,description,selectedUsers);
      alert("Group created sucessfully");

      setGroupName("");
      setDescription("");
      setSelectedUsers([]);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-full bg-blue-50 justify-center gap-4 lg:gap-8 py-4 sm:py-6 px-3 sm:px-4 md:px-6 overflow-x-hidden">

      {/* Left Side: Back Button & Form */}
      <div className="w-full lg:w-[700px] lg:max-w-[700px] flex flex-col gap-4 min-w-0">

        <button
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors cursor-pointer w-fit font-medium text-sm sm:text-base"
          onClick={() => navigate("/dashboard")}
        >
         ⮜
          Back to Dashboard
        </button>

        <div className="flex flex-col gap-5 p-4 sm:p-6 bg-white border border-slate-200 shadow-sm min-h-[550px] lg:min-h-0 lg:flex-1 rounded-2xl">

          <header className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-blue-600">
              Create New Group
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Track and split expenses with friends
            </p>
          </header>

          <div className="flex flex-col gap-4">

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-blue-600 uppercase ml-1">
                Group Name
              </label>
              <input
                type="text"
                placeholder="e.g. Manali Trip"
                className="w-full p-3 text-sm sm:text-base border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-blue-600 uppercase ml-1">
                Description
              </label>
              <textarea
                placeholder="Tell more about this group"
                className="w-full p-3 text-sm sm:text-base border border-slate-200 rounded-xl outline-none focus:border-blue-600 min-h-[80px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

          </div>

          <div className="flex-1 flex flex-col gap-2 min-h-[160px] lg:min-h-0">

            <div className="flex justify-between items-end px-1 gap-2">
              <h2 className="font-bold text-blue-600">Members</h2>
              <span className="text-xs font-bold bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full whitespace-nowrap">
                {selectedUsers.length} Added
              </span>
            </div>

            <div className="border border-slate-100 bg-slate-50/50 flex-1 min-h-[100px] overflow-y-auto p-3 rounded-xl flex flex-col gap-2">

              {selectedUsers.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                  <p className="text-sm hidden md:block">No members added yet</p>
                  <p className="text-sm md:hidden">Search below to add members</p>
                </div>
              ) : (
                selectedUsers.map((username) => (
                  <div
                    key={username}
                    className="bg-white border border-slate-200 px-3 sm:px-4 py-3 rounded-lg flex items-center justify-between gap-2 shadow-sm min-w-0"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                        {username.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-slate-700 font-semibold text-sm sm:text-base truncate">
                        {username}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        setSelectedUsers(
                          selectedUsers.filter((u) => u !== username),
                        )
                      }
                      className="text-2xl p-1 cursor-pointer transition-colors shrink-0"
                    >
                      ⛔
                    </button>
                  </div>
                ))
              )}

            </div>
          </div>

          <button
            onClick={handleCreateGroup}
            disabled={!groupName || selectedUsers.length===0}
            className="w-full bg-blue-600 cursor-pointer text-white py-3 rounded-xl font-bold hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20 text-sm sm:text-base transition-colors"
          >
            Create Group
          </button>

        </div>
      </div>

      {/* Right Side: Search & Add Users */}
      <div className="w-full lg:w-[400px] lg:flex-shrink-0 min-w-0 min-h-[400px] lg:min-h-0 lg:h-auto">
        <SearchUser
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
      </div>

    </div>
  );
}

export default CreateGroup;
