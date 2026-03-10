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

      <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
        {errorMessage ? (
          <p className="text-gray-500 text-sm">{errorMessage}</p>
        ) : (
          groups.map((group) => (
            <div
              onClick={() => {
                //the group we click on will get set as the selected group to make further req to the server to get the details of that group
                setSelectedGroup(group);
                console.log("hello i am the selected group", group);
              }}
              key={group._id}
              className={`p-4 rounded-xl cursor-pointer border transition 
                ${
                  selectedGroup?._id === group._id
                    ? "bg-white border-cyan-400"
                    : "bg-cyan-300 hover:bg-gray-100"
                }`}
            >
              <h3 className="font-semibold text-gray-800">{group.groupName}</h3>

              <p className="text-sm text-gray-500 mt-1">
                Last updated : {new Date(group.updatedAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserGroups;
