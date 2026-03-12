import React, { useEffect, useState } from "react";
import SettlementsToDo from "./SettlementsToDo";
import ActivityTab from "./ActivityTab";

function GroupChat(props) {
  const [SettlementsIsActive, setSettlementsIsActive] = useState(true);
  useEffect(() => {
    setSettlementsIsActive(true);
  }, [props.groupDetails]);

  return (
    <div className="h-full w-full flex flex-col">


      {/************* Tabs in the chat *********/}
      <div className="w-full bg-white border-b border-slate-200 flex">
        <button
          onClick={() => setSettlementsIsActive(true)}
          className={`flex-1 py-3 text-sm font-bold relative cursor-pointer
      ${
        SettlementsIsActive
          ? "text-amber-600"
          : "text-white bg-amber-600"
      }`}
        >
          Settlements
          {/* Animated Underline */}
          {SettlementsIsActive && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-600 transition-all duration-300" />
          )}
        </button>

        <button
          onClick={() => setSettlementsIsActive(false)}
          className={`flex-1 py-3 text-sm font-bold transition-all relative cursor-pointer
      ${
        !SettlementsIsActive
          ? "text-amber-600"
          : "text-white bg-amber-600"
      }`}
        >
          Activities
          {/* Animated Underline */}
          {!SettlementsIsActive && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-600 transition-all duration-300" />
          )}
        </button>
      </div>

      {/* load this only when we have the groupdetails else loading...SETTLEMENT PAGE AND ACTIVITY PAGE*/}
      <div className="p-5 flex-1 overflow-y-auto">
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
          <div> Loading... </div>
        )}
      </div>

      {/* TO ADD EXPENSE..... */}

      <div className="w-full gap-4 p-5">
        <button
          onClick={() => {
            props.setMakeEntry(true);
          }}
          className="bg-blue-500 text-white font-bold p-3 w-full rounded-xl cursor-pointer"
        >
          + Add Expense
        </button>
      </div>
    </div>
  );
}

export default GroupChat;
