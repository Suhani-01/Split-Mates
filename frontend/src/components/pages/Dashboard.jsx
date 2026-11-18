
import React, { useState } from "react";
import { NavLink } from "react-router";
import UserGroups from "../UserGroups";
import SelectedGroup from "../groupChat/SelectedGroup";

function Dashboard() {

  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState();

  return (
    <div className="flex h-full min-h-0 w-full overflow-hidden bg-gray-100">

      {/* LEFT SIDEBAR */}
      <div
        className={`
          w-full h-full bg-white flex flex-col gap-4
          pt-4 pb-4
          ${selectedGroup ? "hidden" : "flex"}
          md:flex md:w-[320px] lg:w-[360px]
          md:shrink-0
          border-r border-gray-200
        `}
      >

        {/* Create Group Button */}
        <div className="px-4 sm:px-6">
          <NavLink
            to="/create-group"
            className="block w-full bg-primary font-bold text-white px-4 py-3 rounded-lg text-center hover:bg-slate-700 transition"
          >
            + Create New Group
          </NavLink>
        </div>

        {/* Groups List */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <UserGroups
            groups={groups}
            setGroups={setGroups}
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
          />
        </div>

      </div>


      {/* RIGHT MAIN AREA */}
      <div
        className={`
          w-full h-full min-w-0
          ${selectedGroup ? "flex" : "hidden"}
          md:flex md:flex-1
        `}
      >

        {!selectedGroup && (
          <div className="hidden md:flex w-full h-full items-center justify-center text-gray-500 text-base lg:text-lg p-6 text-center">
            Select a group to view expenses
          </div>
        )}

        {selectedGroup && (
          <div className="w-full h-full min-w-0 overflow-hidden">
            <SelectedGroup
              setGroups={setGroups}
              groups={groups}
              setSelectedGroup={setSelectedGroup}
              selectedGroup={selectedGroup}
            />
          </div>
        )}

      </div>

    </div>
  );
}

export default Dashboard;
