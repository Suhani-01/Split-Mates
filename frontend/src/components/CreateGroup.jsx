import React, { useState } from "react";
import SearchUser from "./SearchUser";
import { useNavigate } from "react-router";

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

    const body = {
      groupName,
      description,
      members: selectedUsers, // array of selected Users
    };

    try {
      //fetch(api, {method,headers,credentials,body})
      const res = await fetch("http://localhost:7000/api/group/create-group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to create group");
        return;
      }

      alert("Group created sucessfully");
      setGroupName("");
      setDescription("");
      setSelectedUsers("");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="flex w-full bg-blue-50  justify-center gap-8 h-screen py-10">
      {/* Left Side: Back Button & Form */}
      <div className="w-[700px] flex flex-col gap-4">
        <button
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors cursor-pointer w-fit font-medium"
          onClick={() => navigate("/dashboard")}
        >
         ⮜
          Back to Dashboard
        </button>

        <div className="flex flex-col gap-5 p-6 bg-white border border-slate-200 shadow-sm h-full rounded-2xl">
          <header className="text-center">
            <h1 className="text-2xl font-bold text-blue-600">
              Create New Group
            </h1>
            <p className="text-sm text-slate-500">
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
                className="p-3 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
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
                className="p-3 border border-slate-200 rounded-xl outline-none focus:border-blue-600 min-h-[80px] "
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-2 min-h-0">
            <div className="flex justify-between items-end px-1">
              <h2 className="font-bold text-blue-600">Members</h2>
              <span className="text-xs font-bold bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                {selectedUsers.length} Added
              </span>
            </div>

            <div className="border border-slate-100 bg-slate-50/50 flex-1 overflow-y-auto p-3 rounded-xl flex flex-col gap-2">
              {selectedUsers.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                  <p className="text-sm">No members added yet</p>
                </div>
              ) : (
                selectedUsers.map((username) => (
                  <div
                    key={username}
                    className="bg-white border border-slate-200 px-4 py-3 rounded-lg flex items-center justify-between shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                        {username.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-slate-700 font-semibold">
                        {username}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        setSelectedUsers(
                          selectedUsers.filter((u) => u !== username),
                        )
                      }
                      className="text-2xl p-1 cursor-pointer transition-colors"
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
            className="w-full bg-blue-600 cursor-pointer text-white py-3 rounded-xl font-bold hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
          >
            Create Group
          </button>
        </div>
      </div>

      {/* Right Side: Search & Add Users */}
      <div className="w-[400px]">
        <SearchUser
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
      </div>
    </div>
  );
}

export default CreateGroup;
