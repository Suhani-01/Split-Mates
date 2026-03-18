import React, { useState } from "react";
import { NavLink } from "react-router";
import UserGroups from "./UserGroups";
import SelectedGroup from "./SelectedGroup";

function Dashboard() {

  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState();

  return (
    <div className="h-[670px] overflow-y-auto  bg-gray-100 flex">

      {/* LEFT SIDEBAR */}
      <div className="w-[35%] bg-blue-50 border-r border-blue-600 p-6 flex flex-col gap-6">

        <NavLink
          to="/create-group"
          className="bg-blue-500 font-bold text-white px-4 py-2 rounded-lg text-center hover:bg-blue-400 transition"
        >
          + Create New Group
        </NavLink>

        <div className="flex-1 overflow-y-auto">
          <UserGroups
            groups={groups}
            setGroups={setGroups}
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
          />
        </div>

      </div>

      {/* RIGHT MAIN AREA */}
      <div className="flex-1 ">

        {!selectedGroup && (
          <div className="flex p-8 items-center justify-center h-full text-gray-500 text-lg">
            Select a group to view expenses
          </div>
        )}

        {selectedGroup && (
          <div className="bg-blue-100 p-8 rounded-xl shadow-sm h-full overflow-hidden">

            <SelectedGroup selectedGroup={selectedGroup} />

          </div>
        )}

      </div>

    </div>
  );
}

export default Dashboard;