
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
    <div className="flex h-full min-h-0 flex-col gap-3 sm:gap-4">

      <h1 className="text-2xl sm:text-3xl mx-auto font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent mb-1">
        My Groups
      </h1>

      <div className="flex-1 min-h-0 px-3 sm:px-5 overflow-y-auto overflow-x-hidden">
        <div className="flex min-h-full flex-col justify-start">

          {/* Show error message if exists, else show group list */}
          {errorMessage ? (
            <p className="text-gray-500 flex-1 mx-auto text-sm mt-6 text-center">
              {errorMessage}
            </p>
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
                  className={`p-3 sm:p-4 my-1 shadow-sm border flex gap-3 items-center rounded-xl relative cursor-pointer transition-all duration-200 min-w-0
                  ${
                    selectedGroup?._id === group._id
                      ? "bg-blue-100 text-blue-600 border-blue-400"
                      : "text-black border-gray-100 hover:bg-gray-50"
                  }`}
                >
                  {/* Group Avatar: First letter of name */}
                  <p className="rounded-full bg-gradient-end h-10 w-10 shrink-0 flex justify-center text-white items-center font-semibold">
                    {group.groupName.charAt(0).toUpperCase()}
                  </p>

                  <div className="min-w-0 flex-1 pr-6">
                    <h3
                      className={`font-semibold text-sm sm:text-base truncate ${selectedGroup?._id === group._id ? "text-blue-600" : "text-black"}`}
                    >
                      {group.groupName}
                    </h3>

                    {/* Group Creation Date and Time */}
                    <p className="text-xs sm:text-sm text-gray-500 mt-1 break-words">
                      Created at:{" "}
                      {new Date(group.updatedAt).toLocaleString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  <div className="absolute right-2 bottom-3 text-xl text-gray-400">
                    <MdKeyboardArrowRight />
                  </div>

                  {/* Blue dot indicator for selected group */}
                  <div
                    className={`absolute right-2 top-2 rounded-full h-2.5 w-2.5 bg-blue-600 ${selectedGroup?._id === group._id ? "block" : "hidden"}`}
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
