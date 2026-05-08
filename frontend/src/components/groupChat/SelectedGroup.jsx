import React, { useEffect, useState } from "react";
import GroupChat from "./GroupChat";
import MakeEntry from "./MakeEntry";
import GroupDetails from "./GroupDetails";
import { MdOutlineInfo } from "react-icons/md";


function SelectedGroup({ setSelectedGroup, selectedGroup }) {
  // --- States ---
  const [groupDetails, setGroupDetails] = useState(null);
  const [openGroupInfo, setOpenGroupInfo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [makeEntry, setMakeEntry] = useState(false);

  // --- Fetch data when group changes ---
  useEffect(() => {
    setLoading(true);
    async function fetchGroupDetails() {
      setOpenGroupInfo(false);
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

    return () => {
      setGroupDetails(null);
      setLoading(true);
    };
  }, [selectedGroup]);

  return (
    <div className="bg-white h-full md:border overflow-y-hidden border-gray-200 flex flex-col md:rounded-xl shadow-sm overflow-hidden">
      
      {/* If a group is selected */}
      {selectedGroup && (
        <>
          {/* Header */}
          <div className="p-2 sm:p-3 md:p-4 bg-primary overflow-y-hidden h-16 sm:h-18 md:h-20 flex justify-between items-center">
            
            <div className="flex justify-center items-center gap-2 sm:gap-3">
              {/* Avatar */}
              <div className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 bg-blue-400 text-white text-sm sm:text-base md:text-lg rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
                {selectedGroup.groupName.charAt(0).toUpperCase()}
              </div>

              {/* Group Name + Meta */}
              <div className="flex flex-col justify-center min-w-0">
                <h1 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-tight truncate max-w-[130px] sm:max-w-[200px] md:max-w-none">
                  {selectedGroup.groupName}
                </h1>

                <p className="text-xs sm:text-xs md:text-sm text-gray-50 truncate">
                  {(!loading && selectedGroup._id === groupDetails?._id) &&
                    `${groupDetails?.members.length} members · ${new Date(
                      groupDetails.updatedAt
                    ).toLocaleString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}`}
                </p>
              </div>
            </div>

            {/* Right Side Buttons */}
            <div className="flex gap-2 sm:gap-3 md:gap-0 items-center flex-shrink-0">
              
              {/* Back button (mobile only) */}
              <div
                onClick={() => setSelectedGroup()}
                className="text-white text-xs sm:text-sm underline cursor-pointer md:hidden whitespace-nowrap"
              >
                ⮜ Back
              </div>

              {/* Info / Back Toggle Button */}
              <div
                title={`${openGroupInfo ? "Back" : "Group info"}`}
                className="bg-blue-400 text-white h-7 sm:h-8 px-2 sm:px-3 rounded-lg mr-1 sm:mr-2 cursor-pointer flex items-center gap-1 justify-center text-xs sm:text-sm"
                onClick={() => setOpenGroupInfo(!openGroupInfo)}
              >
                {openGroupInfo ? (
                  <>
                    <span className="hidden md:block">Back</span>
                    <span className="md:hidden text-xs">✕</span>
                  </>
                ) : (
                  <>
                    <MdOutlineInfo className="text-base sm:text-lg md:text-xl" />
                    <span className="hidden md:block">Group Info</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Body */}
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

      {/* No group selected */}
      {!selectedGroup && (
        <div className="flex items-center justify-center h-full text-gray-400 text-sm sm:text-base md:text-lg px-4 text-center">
          Select a group to see details
        </div>
      )}
    </div>
  );
}

export default SelectedGroup;