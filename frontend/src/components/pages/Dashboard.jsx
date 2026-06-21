import React, { useState } from "react";
import { NavLink } from "react-router";
import UserGroups from "../UserGroups";
import SelectedGroup from "../groupChat/SelectedGroup";

function Dashboard() {

  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState();

  return (
    <div className="h-screen overflow-y-hidden  bg-gray-100 flex">

      {/* LEFT SIDEBAR */}
      <div className={`w-full pt-6 h-full overflow-y-hidden   pb-15 ${selectedGroup ? "hidden md:flex" : "block"} md:w-[30%] bg-white overflow-y-hidden  flex flex-col gap-6`}>

        <NavLink
          to="/create-group"
          className="bg-primary mx-10 font-bold text-white px-4 py-2 rounded-lg text-center hover:bg-slate-700 transition"
        >
          + Create New Group
        </NavLink>

        <div className="flex-1  overflow-y-hidden">
          <UserGroups
            groups={groups}
            setGroups={setGroups}
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
          />
        </div>

      </div>

      {/* RIGHT MAIN AREA */}
      <div className={` ${selectedGroup ? "block" :"hidden"} w-full h-screen md:block md:flex-1 `}>

        {!selectedGroup && (
          <div className="flex p-8 items-center justify-center h-full text-gray-500 text-lg">
            Select a group to view expenses
          </div>
        )}

        {selectedGroup && (
          <div className="h-full pb-15 overflow-hidden">
            <SelectedGroup setGroups={setGroups} groups={groups} setSelectedGroup={setSelectedGroup} selectedGroup={selectedGroup} />
          </div>
        )}

      </div>

    </div>
  );
}

export default Dashboard;