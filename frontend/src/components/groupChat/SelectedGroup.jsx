
import React, { useEffect, useState } from "react";
import GroupChat from "./GroupChat";
import MakeEntry from "./MakeEntry";
import GroupDetails from "./GroupDetails";
import { MdOutlineInfo } from "react-icons/md";
import { BASE_URL } from "../../config";

function SelectedGroup({groups, setSelectedGroup, selectedGroup ,setGroups}) {
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
        const API = `${BASE_URL}/api/group/my-groups/${selectedGroup._id}`;
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
    <div className="bg-white h-full min-h-0 min-w-0 overflow-hidden flex flex-col shadow-sm">

      {/* If a group is selected */}
      {selectedGroup && (
        <>
          {/* Header */}
          {/* Header */}
<div className="shrink-0 px-3 sm:px-5 py-3 sm:py-4 bg-primary flex justify-between items-center gap-3 border-b border-white/10">

  <div className="flex items-center gap-3 min-w-0 flex-1">

    {/* Avatar */}
    <div className="h-10 w-10 sm:h-12 sm:w-12 bg-white/15 backdrop-blur-sm text-white text-base sm:text-lg font-semibold rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/20 shadow-sm">
      {selectedGroup.groupName.charAt(0).toUpperCase()}
    </div>

    {/* Group Name + Meta */}
    <div className="flex flex-col justify-center min-w-0 flex-1 gap-0.5">
      <h1 className="text-sm sm:text-lg font-semibold text-white tracking-wide truncate">
        {selectedGroup.groupName}
      </h1>

      <p className="text-[11px] sm:text-xs text-white/70 truncate">
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
  <div className="flex gap-2 items-center flex-shrink-0">

    {/* Back button (mobile only) */}
    <div
      onClick={() => setSelectedGroup()}
      className="text-white/90 text-xs sm:text-sm px-2.5 py-2 rounded-lg hover:bg-white/10 cursor-pointer md:hidden whitespace-nowrap transition"
    >
      ⮜ Back
    </div>

    {/* Info / Back Toggle Button */}
    <div
      title={`${openGroupInfo ? "Back" : "Group info"}`}
      className="bg-white/10 hover:bg-white/20 border border-white/20 text-white min-h-9 px-2.5 sm:px-3 rounded-xl cursor-pointer flex items-center gap-1.5 justify-center text-xs sm:text-sm transition shrink-0"
      onClick={() => setOpenGroupInfo(!openGroupInfo)}
    >
      {openGroupInfo ? (
        <>
          <span className="hidden md:block">Back</span>
          <span className="md:hidden text-xs">✕</span>
        </>
      ) : (
        <>
          <MdOutlineInfo className="text-base sm:text-lg" />
          <span className="hidden md:block">Group Info</span>
        </>
      )}
    </div>
  </div>
</div>

          {/* Body */}

          <div className="flex-1 min-h-0 min-w-0 overflow-hidden">
            {openGroupInfo ? (
              <GroupDetails setGroups={setGroups} groups={groups} groupDetails={groupDetails} setGroupDetails={setGroupDetails} setSelectedGroup={setSelectedGroup} />
            ) : (
              <div className="h-full min-h-0 min-w-0 bg-blue-50 overflow-hidden">
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
          </div>
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

export default React.memo(SelectedGroup);
