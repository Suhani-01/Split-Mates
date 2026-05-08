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
      <div className="w-full bg-primary border-b border-slate-200 flex">
        <div className="rounded-lg bg-primary-light overflow-hidden w-full mx-5 my-3 flex">
                  <button
          onClick={() => setSettlementsIsActive(true)}
          className={`flex-1 py-3 text-sm font-bold relative cursor-pointer
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
          className={`flex-1 py-3 text-sm font-bold transition-all relative cursor-pointer
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

      <div className="w-full fixed  bottom-0 md:relative gap-4 p-5">
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
