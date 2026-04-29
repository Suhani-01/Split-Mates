import React, { useEffect, useState } from "react";
import GroupChat from "./GroupChat";
import MakeEntry from "./MakeEntry";
import GroupDetails from "./GroupDetails";

function SelectedGroup({ selectedGroup }) {
  // --- States ---
  const [groupDetails, setGroupDetails] = useState(null); // Full group data
  const [openGroupInfo, setOpenGroupInfo] = useState(false); // Toggle: Info vs Chat
  const [loading, setLoading] = useState(true);
  const [makeEntry, setMakeEntry] = useState(false); // Toggle: Chat vs Form

  // --- Fetch data when group changes ---
  useEffect(() => {
    setLoading(true);
    async function fetchGroupDetails() {
      setOpenGroupInfo(false); // Reset to chat view on new group
      if (!selectedGroup) return;

      try {
        const API = `http://localhost:7000/api/group/my-groups/${selectedGroup._id}`;
        const res = await fetch(API, {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setGroupDetails(data);
          setLoading(false);
        } else {
          const msg = await res.json();
          alert(msg.message);
        }
      } catch (error) {
        console.log("Fetch error", error);
      }
    }

    fetchGroupDetails();


    //cleanup function to clear old details of Group { but still iss cleanup function ko execute hone me time lgta hai }
    return () => {
      setGroupDetails(null);
      setLoading(true);
    };
  }, [selectedGroup]);

  return (
    <div className="bg-white border border-gray-200 flex flex-col rounded-xl h-full shadow-sm overflow-hidden">
      {/* If a group is selected */}
      {selectedGroup && (
        <>
          {/* Header: Name and Toggle Icon */}
          <div className="p-4 bg-blue-500 h-20 flex justify-between items-center ">
            <div className="flex justify-center items-center gap-3">
              <div className="h-12 w-12 bg-blue-400 text-white rounded-full overflow-hidden flex items-center justify-center">
                {selectedGroup.groupName.charAt(0).toUpperCase()}
              </div>

              <div className="flex flex-col justify-center">
                <h1 className="text-lg font-bold text-white tracking-tight">
                  {selectedGroup.groupName}
                </h1>
                {/* Member count and Date */}

                {/* BUG FIX: Only show details if they belong to the CURRENTLY selected group */}
                <p className="text-sm text-gray-50">
                  {(!loading  && selectedGroup._id===groupDetails?._id) &&
                    `${groupDetails?.members.length} members · ${new Date(
                      groupDetails.updatedAt,
                    ).toLocaleString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}`}
                </p>
              </div>
            </div>

            {/* Toggle Info/Back button */}
            <div
              title={`${openGroupInfo ? "Back" : "Group info"}`}
              className="bg-blue-400 text-white h-8 w-8 mr-2 cursor-pointer rounded-full flex items-center justify-center"
              onClick={() => setOpenGroupInfo(!openGroupInfo)}
            >
              {openGroupInfo ? "⮜" : "𝒊"}
            </div>
          </div>

          {/* Body: Show Details OR Chat/Entry */}
          {openGroupInfo ? (
            <GroupDetails groupDetails={groupDetails} />
          ) : (
            <div className="flex-1 bg-blue-50 overflow-y-auto">
              {!makeEntry ? (
                <GroupChat
                  groupDetails={groupDetails}
                  selectedGroup={selectedGroup}
                  makeEntry={makeEntry}
                  setMakeEntry={setMakeEntry}
                />
              ) : (
                <MakeEntry
                  groupDetails={groupDetails}
                  makeEntry={makeEntry}
                  setMakeEntry={setMakeEntry}
                />
              )}
            </div>
          )}
        </>
      )}

      {/* If no group is selected */}
      {!selectedGroup && (
        <div className="flex items-center justify-center h-full text-gray-500 text-lg">
          Select a group to see details
        </div>
      )}
    </div>
  );
}

export default SelectedGroup;
