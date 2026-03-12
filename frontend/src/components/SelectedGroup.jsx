import React, { useEffect, useState } from "react";
import GroupChat from "./GroupChat";
import MakeEntry from "./MakeEntry";
import groupImage from "../assets/group.avif";
import GroupDetails from "./GroupDetails";

function SelectedGroup({ selectedGroup }) {
  // console.log("hello i am selected group",selectedGroup)

  const [groupDetails, setGroupDetails] = useState(null);
  const [openGroupInfo , setOpenGroupInfo]=useState(false);
  

  useEffect(() => {
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
    <div className="bg-white border border-gray-200 flex flex-col rounded-xl h-full shadow-sm overflow-hidden">
      {selectedGroup && (
        <>
          {/********** Group Name ************/}
          <div className="p-4  bg-blue-500 flex justify-between items-center ">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 border border-amber-600 rounded-full overflow-hidden flex items-center justify-center">
                <img className="h-full w-full object-cover" src={groupImage}/>
              </div>
              

              <h1 className="text-lg font-bold text-white tracking-tight">
                {selectedGroup.groupName}
              </h1>
            </div>

            <div className="bg-white h-8 w-8 mr-2 border-2 cursor-pointer rounded-full flex items-center justify-center" onClick={()=>{
              setOpenGroupInfo(!openGroupInfo)
            }}>
              {openGroupInfo?"⮜":"𝒊"}
            </div>
          </div>

          {/* Main content */}

          {
            openGroupInfo ? <GroupDetails groupDetails={groupDetails}/> :
            <div className="flex-1 bg-blue-50 overflow-y-auto">
            {!makeEntry && (
              <GroupChat
                groupDetails={groupDetails}
                selectedGroup={selectedGroup}
                makeEntry={makeEntry}
                setMakeEntry={setMakeEntry}
              />
            )}

            {makeEntry && (
              <MakeEntry
                groupDetails={groupDetails}
                makeEntry={makeEntry}
                setMakeEntry={setMakeEntry}
              />
            )}
          </div>
          }
          
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
