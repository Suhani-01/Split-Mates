import React, { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../App";

function SettlementsToDo({ groupDetails, selectedGroup }) {
  // --- States ---
  const [refresh, setRefresh] = useState(false); // Used to re-fetch data after a payment action
  const [loading, setLoading] = useState(false); // Global loading for buttons
  const [settlements, setSettlements] = useState(null); // List of who owes whom
  const [pendingSettlementsConfirmation, setPendingSettlementsConfirmation] = useState(null); // List of payments waiting for approval
  
  const { userDetails } = useContext(UserContext); // Get current logged-in user info

  // --- Helper: Convert User ID to User Name ---
  //eg . creates an object like { "id123": "Rahul", "id456": "Sonia" }
  // We use useMemo so this map is only recreated if group members change
  const userMap = useMemo(() => {
    const map = {};
    groupDetails.members.forEach((member) => {
      map[member._id] = member.userName;
    });
    return map;
  }, [groupDetails.members]);

  // --- Function: When someone clicks "Settle Up" (I have paid) ---
  async function paymentDone(s) {
    const sure = confirm("Are you sure???");
    if (sure) {
      const payload = {
        groupId: selectedGroup._id,
        paidBy: s.from,
        paidTo: s.to,
        amount: s.amount,
      };

      const API = "http://localhost:7000/api/expense/settlement";
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Can't add expense");
        return;
      }

      alert(data.message);
      setRefresh(!refresh); // Trigger useEffect to get updated lists
    }
  }

  // --- Function: Confirming if money was received (Yes/No) ---
  async function paymentRecievedOrNot(id, isRecieved) {
    setLoading(true);
    try {
      const API = "http://localhost:7000/api/expense/modify-settlement";

      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entryId: id,
          action: isRecieved ? "fulfill" : "delete", // fulfill = confirmed, delete = rejected
        }),
        credentials: "include",
      });

      const data = await res.json();
      alert(data.message);
      setRefresh(!refresh); // Refresh the UI
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  // --- Fetch settlements data on mount or group/refresh change ---
  useEffect(() => {
    async function getSettlementsToDo() {
      try {
        if (!selectedGroup) return;
        const groupId = selectedGroup._id;
        const API = `http://localhost:7000/api/group/my-group/settle/${groupId}`;

        const result = await fetch(API, {
          method: "GET",
          credentials: "include",
        });

        const data = await result.json();

        if (result.ok) {
          setSettlements(data.toDo); // Debts to be paid
          setPendingSettlementsConfirmation(data.pending); // Payments waiting for 'Yes'
        }
      } catch (err) {
        console.error(err);
      }
    }

    getSettlementsToDo();

    // Cleanup: Clear data when switching groups to avoid flicker
    return (() => {
      setSettlements(null);
      setLoading(false);
      setPendingSettlementsConfirmation(null);
    });
  }, [selectedGroup?._id, refresh]);

  return (
    <div className="h-full">
      {/* 1. All Clear Message: Shown when no debts or pending approvals exist */}
      {settlements?.length === 0 &&
        pendingSettlementsConfirmation?.length === 0 && (
          <div className="text-center rounded-2xl py-8 flex flex-col gap-3 bg-green-100">
            <div className="text-4xl">🎉</div>
            <div className="text-green-800 text-sm">All clear! No pending payments.</div>
          </div>
        )}

      {/* 2. Loading State Placeholder */}
      {(!settlements && !pendingSettlementsConfirmation) ? 
        <div>Loading...</div> : null
      }

      {/* 3. Pending Confirmations Section (Waiting for receiver to say 'Yes') */}
      {pendingSettlementsConfirmation?.length > 0 && (
        <>
          <div className="font-bold text-xs text-gray-400 mb-4">PENDING CONFIRMATIONS</div>
          <div className="flex flex-col mb-4 gap-2">
            {pendingSettlementsConfirmation.map((s) => (
                <div
                  className="bg-white border-2 border-amber-200 border-l-5 border-l-amber-400 rounded-xl p-4 shadow-sm flex gap-3 items-center"
                  key={s._id}
                >
                  <div className={`text-sm flex justify-center items-center ${userMap[s.paidBy]===userDetails.userName?"bg-amber-400":"bg-blue-200"} h-[40px] aspect-square text-center rounded-full`}>📥</div>
                  
                  {/* 3.1 View for the Sender (waiting) { ☹️ I paid and waiting for the confirmation from the reciever } */}
                  {userMap[s.paidBy] === userDetails.userName && (
                    <div className="flex w-full gap-1 items-center justify-between">
                      <p>You paid <b>{userMap[s.paidTo]}</b> <br/> <span className="font-bold text-amber-600 text-lg">₹{s.amount}</span></p>
                      <div className="bg-amber-50 flex gap-2 items-center py-2 px-3">
                        <div className=" h-2 w-2 rounded-full bg-amber-500"></div>
                        <div className="text-sm text-amber-500 font-bold">Waiting for confirmation...</div>
                      </div>
                    </div>
                  )}

                  {/* View for the Receiver (Confirming Yes/No) { 🤔  Somebody said that he/she sended me money }*/}
                  {userMap[s.paidTo] === userDetails.userName && (
                    <div  className="flex items-center w-full justify-between">
                      <p className="text-gray-700 ">Did you recieve <span className="font-bold text-blue-600">₹{s.amount}</span> from <span className="font-bold">{userMap[s.paidBy]}</span>?</p>
                      <div className="flex gap-2 justify-center">
                        <button disabled={loading} onClick={() => paymentRecievedOrNot(s._id, true)} className="bg-emerald-500 text-white px-5 rounded-lg font-bold cursor-pointer py-1.5">Yes</button>
                        <button disabled={loading} onClick={() => paymentRecievedOrNot(s._id, false)} className="bg-white text-red-500 border border-red-200 rounded-lg font-bold cursor-pointer py-1.5 px-5">No</button>
                      </div>
                    </div>
                  )}
                </div>
            ))}
          </div>
        </>
      )}

      {/* 4. Group Balances Section (Who needs to pay whom) */}
      {settlements?.length > 0 && (
        <>
          <div className="font-bold text-xs text-gray-400 mb-5">GROUP BALANCES</div>
          <div className="flex flex-col gap-3">
            {settlements.map((s) => (
              <div key={s._id} className={`flex justify-between gap-3 items-center px-4 py-4 rounded-xl border
                ${userMap[s.from]===userDetails.userName ? "bg-white border-red-200 shadow-sm" : "bg-gray-50 border-gray-100"}`}>
                
                <div className="text-2xl">{userMap[s.from]===userDetails.userName ? "💸":"👥"}</div>

                <div className="text-sm flex-1 text-gray-800">
                  <span className="font-bold">{userMap[s.from] === userDetails.userName ? "You" : userMap[s.from]}</span> needs to pay to <span className={`font-bold ${userMap[s.to] === userDetails.userName?"text-green-600":""}`}>{userMap[s.to] === userDetails.userName ? "You" : userMap[s.to]}</span> <br/>
                  <span className="font-bold text-lg">₹{s.amount}</span>
                </div>

                {/* 'Settle Up' button only shows if the logged-in user needs to pay somebody */}
                {userMap[s.from] === userDetails.userName && (
                  <button disabled={loading} onClick={() => paymentDone(s)} className="bg-indigo-600 hover:bg-blue-600 text-white text-sm font-bold cursor-pointer px-4 py-2 rounded-md">Settle Up</button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default SettlementsToDo;