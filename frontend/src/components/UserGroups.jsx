import React, { useEffect, useState } from "react";
import { fetchGroups } from "../api/groupApi";
import { MdKeyboardArrowRight } from "react-icons/md";


function UserGroups({ groups, setGroups, selectedGroup, setSelectedGroup }) {
  // --- States ---
  const [errorMessage, setErrorMessage] = useState(""); // To show errors like 'Login first' or 'No groups'

  // --- Fetch groups when component loads ---
  useEffect(() => {
    async function fetchUserGroups() {
      try {
        const data = await fetchGroups();
        console.log(data);
        if (data.length === 0) {
          setErrorMessage("No groups yet");
        } else {
          setGroups(data); // Save fetched groups to state
          setErrorMessage(""); // Clear error if groups exist
        }
      } catch (err) {
        alert(err);
      }
    }
    fetchUserGroups();
  }, []); // Runs only once on mount

  return (
    <div className="flex h-full  pb-15 flex-col gap-4">
      <h1 className="text-3xl mx-auto font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent mb-2">
        My Groups
      </h1>

      <div className="flex-1 px-5 overflow-visible overflow-y-auto">
        <div className="flex h-full flex-col-reverse  justify-end ">
        {/* Show error message if exists, else show group list */}
        {errorMessage ? (
          <p className="text-gray-500 flex-1 mx-auto text-sm">{errorMessage}</p>
        ) : (
          groups.map((group) => {
            return (
              <div
                title="Group"
                onClick={() => {
                  // Clicking a group sets it as 'selected' for details
                  setSelectedGroup(group);
                }}
                key={group._id}
                // Change style if this group is currently selected
                className={`p-4 my-1   shadow border flex gap-3 items-center rounded-xl relative cursor-pointer transition 
                ${
                  selectedGroup?._id === group._id
                    ? "bg-blue-100 text-blue-600 border-blue-400"
                    : "text-black border-white"
                }`}
              >
                {/* Group Avatar: First letter of name */}
                <p className="rounded-full bg-gradient-end h-10 w-10 flex justify-center text-white items-center">
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
                <div className="absolute right-3 text-xl"><MdKeyboardArrowRight /></div>

                {/* Blue dot indicator for selected group */}
                <div
                  className={`absolute right-3 top-3 rounded-full h-3 w-3 bg-blue-600 ${selectedGroup?._id === group._id ? "block" : "hidden"}`}
                ></div>
              </div>
            );
          })
        )}
      </div>
      </div>
      
    </div>
  );
}

export default UserGroups;
