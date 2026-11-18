
import React, { useEffect, useState } from "react";
import SettlementsToDo from "./SettlementsToDo";
import ActivityTab from "./ActivityTab";

function GroupChat(props) {
  const [SettlementsIsActive, setSettlementsIsActive] = useState(true);
  useEffect(() => {
    setSettlementsIsActive(true);
  }, [props.groupDetails]);

  return (
    
    <div className="flex w-full h-full min-h-0 min-w-0 flex-col overflow-hidden">


      {/************* Tabs in the chat *********/}
      <div className="w-full shrink-0 bg-primary border-b border-slate-200 flex">
        <div className="rounded-lg bg-primary-light overflow-hidden w-full mx-3 sm:mx-5 my-2 sm:my-3 flex">
          <button
            onClick={() => setSettlementsIsActive(true)}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold relative cursor-pointer transition-all
      ${
        SettlementsIsActive
          ? "text-primary bg-white"
          : "text-white bg-primary-light"
      }`}
          >
            Settlements
          </button>

          <button
            onClick={() => setSettlementsIsActive(false)}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold transition-all relative cursor-pointer
      ${
        !SettlementsIsActive
          ? "text-primary bg-white"
          : "text-white bg-primary-light"
      }`}
          >
            Activities
          </button>
        </div>

      </div>

      {/* load this only when we have the groupdetails else loading...SETTLEMENT PAGE AND ACTIVITY PAGE*/}
      <div className="px-3 py-3 sm:p-5 flex-1 min-h-0 min-w-0 overflow-x-hidden overflow-y-auto overscroll-contain">
        {props.groupDetails ? (
          SettlementsIsActive ? (
            <SettlementsToDo
              groupDetails={props.groupDetails}
              selectedGroup={props.selectedGroup}
            />
          ) : (
            <ActivityTab groupDetails={props.groupDetails} />
          )
        ) : (
          <div className="flex justify-center items-center h-full text-sm text-gray-500">
            Loading...
          </div>
        )}
      </div>

      {/* TO ADD EXPENSE..... */}

      <div className="w-full shrink-0 bg-white px-3 py-3 sm:p-5 border-t border-gray-100">
        <button
          onClick={() => {
            props.setMakeEntry(true);
          }}
          className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-3 px-4 w-full rounded-xl cursor-pointer transition-all text-sm sm:text-base"
        >
          + Add Expense
        </button>
      </div>
    </div>
    
  );
}

export default React.memo(GroupChat);
