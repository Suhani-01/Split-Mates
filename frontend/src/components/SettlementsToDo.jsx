import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";

function SettlementsToDo({ groupDetails, selectedGroup }) {
  // console.log("I am inside the settlements",selectedGroup)

  const [settlements, setSettlements] = useState([]);
  const { userDetails } = useContext(UserContext);
  console.log("user details from settlements to do", userDetails);

  const userMap = {};

  //THIS map will be used to load the settlements that we obtain from the api as we obtain users id only not username
  groupDetails.members.forEach((member) => {
    userMap[member._id] = member.userName;
  });
  console.log(userMap);

  useEffect(() => {
    async function getSettlementsToDo() {
      try {
        if (!selectedGroup) return;

        const groupId = selectedGroup._id;

        const API = `http://localhost:7000/api/group/my-group/settle/${groupId}`;
        console.log("lets call the API", API);

        const result = await fetch(API, {
          method: "GET",
          credentials: "include",
        });

        const data = await result.json();

        if (result.ok) {
          console.log("Settlements to perform : ", data);
          setSettlements(data);
        } else {
          console.log(data.message);
        }
      } catch (err) {
        console.error(err);
      }
    }

    getSettlementsToDo();
  }, [selectedGroup?._id]);

  return (
    <>
      {
        settlements.length === 0 
        && 
        <div className="text-center bg-green-300 py-3">
            All clear! No pending payments.😃
        </div>}

      {settlements.length > 0 && (
        <div className="flex flex-col gap-2">
          {settlements.map((s, index) => (
            <div className=" bg-yellow-200 flex flex-row  py-3 justify-center items-center gap-4">
              <div className="text-center text-red-600" key={index}>
                <b>
                  {userMap[s.from] === userDetails.userName
                    ? "You"
                    : userMap[s.from]}
                </b>{" "}
                needs to <b>pay</b> to{" "}
                <b>
                  {userMap[s.to] === userDetails.userName
                    ? "You"
                    : userMap[s.to]}
                </b>{" "}
                ₹{s.amount}
              </div>

              {userMap[s.from] === userDetails.userName && (
                <button className="bg-blue-400 cursor-pointer px-5 rounded-2xl py-2">
                  Settle Up
                </button>
              )}
              {userMap[s.to] === userDetails.userName && (
                <button className="bg-blue-400 cursor-pointer px-5 rounded-2xl py-2">
                  Pending Payment
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default SettlementsToDo;
