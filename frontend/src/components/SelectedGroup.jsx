import React, { useEffect, useState } from "react";
import GroupChat from "./GroupChat";
import MakeEntry from "./MakeEntry";

function SelectedGroup({ selectedGroup }) {
  // console.log("hello i am selected group",selectedGroup)


  const [groupDetails, setGroupDetails] = useState(null);
  
  useEffect(() => {
    async function fetchGroupDetails() {
      if (!selectedGroup) return;

      try {
        const API = `http://localhost:7000/api/group/my-groups/${selectedGroup._id}`;

        const res = await fetch(API, {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setGroupDetails(data);
        } else {
          const msg = await res.json();
          alert(msg.message);
        }
      } catch (error) {
        console.log("Error fetching details of the group", error);
      }
    }

    fetchGroupDetails();
  }, [selectedGroup]);

  const [makeEntry, setMakeEntry] = useState(false);

  return (
    <div className="bg-white border border-gray-200 flex flex-col justify-between rounded-xl h-full shadow-sm overflow-hidden">

      {selectedGroup && (
        <>
          {/* Header */}
          <div className="p-5 border-b bg-cyan-300 flex justify-between items-center">
            <h1 className="text-lg  font-semibold text-gray-800">
              {selectedGroup.groupName}
            </h1>
          </div>

          {/* Main content */}
          <div className="overflow-y-auto">

            {!makeEntry && (
              <GroupChat groupDetails={groupDetails} selectedGroup={selectedGroup} makeEntry={makeEntry} setMakeEntry={setMakeEntry} />
            )}

            {makeEntry && (
              <MakeEntry
                groupDetails={groupDetails}
                makeEntry={makeEntry}
                setMakeEntry={setMakeEntry}
              />
            )}

          </div>
        </>
      )}

      {!selectedGroup && (
        <div className="flex items-center justify-center h-full text-gray-500 text-lg">
          Select a group to see details
        </div>
      )}

    </div>
  );
}

export default SelectedGroup;