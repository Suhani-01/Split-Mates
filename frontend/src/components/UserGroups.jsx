import React, { useEffect, useState } from "react";

function UserGroups({ groups, setGroups, selectedGroup, setSelectedGroup }) {
  // --- States ---
  const [errorMessage, setErrorMessage] = useState(""); // To show errors like 'Login first' or 'No groups'

  // --- Fetch groups when component loads ---
  useEffect(() => {
    async function fetchGroups() {
      const res = await fetch("http://localhost:7000/api/group/my-groups", {
        method: "GET",
        credentials: "include", // Send cookies for authentication
      });

      // Handle Unauthorized error
      if (res.status === 401) {
        const data = await res.json();
        setErrorMessage(data.message || "Please login first");
        return;
      }

      const data = await res.json();
      
      // If user has no groups
      if (data.length === 0) {
        setErrorMessage("No groups yet");
      } else {
        setGroups(data); // Save fetched groups to state
        setErrorMessage(""); // Clear error if groups exist
      }
    }

    fetchGroups();
  }, []); // Runs only once on mount

  return (
    <div className="flex h-full flex-col gap-4">
      <h1 className="text-3xl mx-auto font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent mb-4">
        My Groups
      </h1>

      <div className="flex flex-col-reverse gap-1 overflow-y-auto">
        {/* Show error message if exists, else show group list */}
        {errorMessage ? (
          <p className="text-gray-500 flex-1 mx-auto text-sm">{errorMessage}</p>
        ) : (
          groups.map((group) => (
            <div title="Group"
              onClick={() => {
                // Clicking a group sets it as 'selected' for details
                setSelectedGroup(group);
              }}
              key={group._id}
              // Change style if this group is currently selected
              className={`p-4 border flex gap-3 items-center rounded-xl relative cursor-pointer transition 
                ${
                  selectedGroup?._id === group._id
                    ? "bg-blue-100 text-blue-600 border-blue-400"
                    : "text-black border-white"
                }`}
            >
              {/* Group Avatar: First letter of name */}
              <p className="rounded-full h-10 w-10 flex justify-center bg-slate-900 text-white items-center">
                {group.groupName.charAt(0).toUpperCase()}
              </p>

              <div>
                <h3
                  className={`font-semibold ${selectedGroup?._id === group._id ? "text-blue-600" : "text-black"}`}
                >
                  {group.groupName}
                </h3>

                {/* Group Creation Date and Time */}
                <p className="text-sm text-gray-500 mt-1">
                  Created at:{" "}
                  {new Date(group.updatedAt).toLocaleString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              
              {/* Blue dot indicator for selected group */}
              <div
                className={`absolute right-3 top-3 rounded-full h-3 w-3 bg-blue-600 ${selectedGroup?._id === group._id ? "block" : "hidden"}`}
              ></div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserGroups;