import React, { useEffect, useState } from "react";

function UserGroups({ groups, setGroups, selectedGroup, setSelectedGroup }) {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchGroups() {
      const res = await fetch("http://localhost:7000/api/group/my-groups", {
        method: "GET",
        credentials: "include",
      });

      if (res.status === 401) {
        const data = await res.json();
        setErrorMessage(data.message || "Please login first");
        return;
      }

      const data = await res.json();
      if (data.length === 0) {
        setErrorMessage("No groups yet");
      } else {
        setGroups(data);
        // console.log(data);
        setErrorMessage("");
      }
    }

    fetchGroups();
  }, []);

  return (
    <div className="flex h-full flex-col gap-4">
      <h1 className="text-3xl mx-auto font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent mb-4">
        My Groups
      </h1>

      <div className="flex flex-col-reverse gap-3 overflow-y-auto">
        {errorMessage ? (
          <p className="text-gray-500 flex-1 mx-auto text-sm">{errorMessage}</p>
        ) : (
          groups.map((group) => (
            <div
              onClick={() => {
                //the group we click on will get set as the selected group to make further req to the server to get the details of that group
                setSelectedGroup(group);
              }}
              key={group._id}
              className={`p-4 border-2 border-blue-600 rounded-xl relative cursor-pointer transition 
                ${
                  selectedGroup?._id === group._id
                    ? "bg-white text-blue-600 border-l-8"
                    : "bg-blue-500 text-white"
                }`}
            >
              <div
                className={`absolute right-3 top-3 rounded-full h-3 w-3 bg-blue-600 ${selectedGroup?._id === group._id ? "block" : "hidden"}`}
              ></div>
              <h3
                className={`font-semibold ${selectedGroup?._id === group._id ? "text-blue-600" : "text-white"}`}
              >
                {group.groupName}
              </h3>

              <p className={`text-sm mt-1`}>
                Created at:{" "}
                {new Date(group.updatedAt).toLocaleString(undefined, {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserGroups;
