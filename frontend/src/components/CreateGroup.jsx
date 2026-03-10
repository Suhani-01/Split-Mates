import React, { useState } from "react";
import SearchUser from "./SearchUser";
import { useNavigate } from "react-router";

function CreateGroup() {
    const navigate=useNavigate();
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      alert("Group name is required");
      return;
    }

    if(selectedUsers.length===0){
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
      const res=await fetch("http://localhost:7000/api/group/create-group",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        credentials:"include",
        body:JSON.stringify(body),
      });

      const data=await res.json();

      if(!res.ok){
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
    <div className="flex w-[80%] mx-auto justify-center h-screen">
      <div className=" h-[80%] mt-10 w-[50%] flex flex-col">
        <div className="flex flex-col gap-4 p-4 bg-blue-50 border h-full rounded-xl w-full">
          <h1 className="text-xl mx-auto font-bold">Create Group</h1>

          <input
            type="text"
            placeholder="Group Name"
            className="p-2 border rounded-lg"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />

          <textarea
            placeholder="Description (optional)"
            className="p-2 border rounded-lg"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="w-full h-[55%] flex flex-col gap-3">
            <h2 className="text-center font-bold">Added Users ({selectedUsers.length})</h2>
            <div className="border h-full overflow-y-auto p-5 rounded-xl flex flex-col gap-3">
              {selectedUsers.length === 0 ? (
                <p className="text-gray-500 flex justify-center h-full items-center text-center">
                  Please add members
                </p>
              ) : (
                selectedUsers.map((username) => (
                  <div
                    key={username}
                    className="bg-cyan-300 px-3 py-1 min-h-16 rounded-xl flex items-center justify-between"
                  >
                    <span className="text-gray-700 font-medium">{username}</span>
                    <button
                      onClick={() =>
                        setSelectedUsers(
                          selectedUsers.filter((u) => u !== username),
                        )
                      }
                      className="bg-red-500 text-3xl text-white h-[70%] flex justify-center cursor-pointer  aspect-square rounded-full hover:bg-red-600"
                    >
                      -
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <button
            onClick={handleCreateGroup}
            className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Create Group
          </button>
        </div>
      </div>

      {/* Search & Add Users */}
      <SearchUser
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
      />
    </div>
  );
}

export default CreateGroup;
