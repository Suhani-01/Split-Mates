
import React, { use, useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../../App";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import {
  settleUp,
  moneyRecievedOrNot,
  getSettlementsToDo,
} from "../../api/settlements";
import { IoWallet } from "react-icons/io5";

function SettlementsToDo({ groupDetails, selectedGroup }) {
  // --- States ---
  const [refresh, setRefresh] = useState(false); // Used to re-fetch data after a payment action
  const [loading, setLoading] = useState(false); // Global loading for buttons
  const [settlements, setSettlements] = useState(null); // List of who owes whom
  const [pendingSettlementsConfirmation, setPendingSettlementsConfirmation] =
  useState(null); // List of payments waiting for approval
  const [totalAmount ,setTotalAmount]=useState(0);

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

      try {
        const data = await settleUp(payload);
        alert(data.message || "settlement added sucessfully");
      } catch (err) {
        alert(err.message);
      }
      setRefresh(!refresh); // Trigger useEffect to get updated lists
    }
  }

  // --- Function: Confirming if money was received (Yes/No) ---
  async function paymentRecievedOrNot(id, isRecieved) {
    setLoading(true);
    try {
      const data = await moneyRecievedOrNot(id, isRecieved);
      alert(data.message);
      setRefresh(!refresh); // Refresh the UI
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  }

  // --- Fetch settlements data on mount or group/refresh change ---
  useEffect(() => {
    if (!selectedGroup) return;

    // IIFE - Immediately Invoked Function Expression
    (async () => {
      try {
        const data = await getSettlementsToDo(selectedGroup);
        console.log(data)
        setSettlements(data.toDo);
        setPendingSettlementsConfirmation(data.pending);
        setTotalAmount(data.totalAmount);
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    })();

    // Cleanup: Clear data when switching groups to avoid flicker
    return () => {
      setSettlements(null);
      setLoading(false);
      setPendingSettlementsConfirmation(null);
    };
  }, [selectedGroup?._id, refresh]);

  return (
    <div className="w-full min-w-0 space-y-4 sm:space-y-5">

      <div className="bg-gradient-to-r relative mb-5 rounded-xl p-3 sm:p-4 text-white from-emerald-700 via-emerald-600 to-green-500 flex gap-3 items-center overflow-hidden">
        <div className="rounded-full w-11 h-11 sm:w-14 sm:h-14 shrink-0 aspect-square bg-white/20 text-2xl sm:text-3xl flex justify-center items-center">
          <IoWallet />
        </div>

        <div className="min-w-0 relative z-10">
          <p className="text-xs sm:text-sm">Total Expenses till date</p>
          <h1 className="font-bold text-xl sm:text-2xl break-words">₹{totalAmount}</h1>
        </div>

        <div className="absolute right-3 sm:right-8 bottom-[20%] text-white/30 text-4xl sm:text-5xl pointer-events-none">
          <FaMoneyBillTrendUp />
        </div>
      </div>

      {/* 1. All Clear Message: Shown when no debts or pending approvals exist */}
      {settlements?.length === 0 &&
        pendingSettlementsConfirmation?.length === 0 && (
          <div className="text-center rounded-2xl py-8 px-3 flex flex-col gap-3 bg-green-100">
            <div className="text-4xl">🎉</div>
            <div className="text-green-800 text-sm">
              All clear! No pending payments.
            </div>
          </div>
        )}

      {/* 2. Loading State Placeholder */}
      {!settlements && !pendingSettlementsConfirmation ? (
        <div className="text-sm text-gray-500 text-center py-5">Loading...</div>
      ) : null}

      {/* 3. Pending Confirmations Section (Waiting for receiver to say 'Yes') */}
      {pendingSettlementsConfirmation?.length > 0 && (
        <>
          <div className="font-bold text-[10px] sm:text-xs text-gray-400 mb-3 sm:mb-4">
            PENDING CONFIRMATIONS
          </div>

          <div className="flex flex-col mb-4 gap-3">
            {pendingSettlementsConfirmation.map((s) => (
              <div
                className="bg-white border border-amber-200 border-l-4 border-l-amber-400 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm flex flex-col sm:flex-row gap-3 items-start sm:items-center min-w-0"
                key={s._id}
              >
                <div
                  className={`text-sm flex justify-center items-center shrink-0 ${userMap[s.paidBy] === userDetails?.userName ? "bg-amber-400" : "bg-blue-200"} h-10 w-10 aspect-square text-center rounded-full`}
                >
                  📥
                </div>

                {/* 3.1 View for the Sender (waiting) { ☹️ I paid and waiting for the confirmation from the reciever } */}
                {userMap[s.paidBy] === userDetails?.userName && (
                  <div className="flex flex-col sm:flex-row w-full gap-3 items-start sm:items-center justify-between min-w-0">
                    <p className="text-sm sm:text-base min-w-0">
                      You paid <b>{userMap[s.paidTo]}</b> <br />
                      <span className="font-bold text-amber-600 text-sm sm:text-base">
                        ₹{s.amount}
                      </span>
                    </p>

                    <div className="bg-amber-50 flex gap-2 items-center py-2 px-3 rounded-lg w-full sm:w-auto">
                      <div className="h-2 w-2 shrink-0 rounded-full bg-amber-500"></div>
                      <div className="text-xs sm:text-sm text-amber-500 font-bold">
                        Waiting for confirmation...
                      </div>
                    </div>
                  </div>
                )}

                {/* View for the Receiver (Confirming Yes/No) { 🤔  Somebody said that he/she sended me money }*/}
                {userMap[s.paidTo] === userDetails?.userName && (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center w-full gap-3 justify-between min-w-0">
                    <p className="text-gray-700 text-sm sm:text-base flex-1 min-w-0">
                      Did you recieve{" "}
                      <span className="font-bold text-blue-600">
                        ₹{s.amount}
                      </span>{" "}
                      from{" "}
                      <span className="font-bold">{userMap[s.paidBy]}</span>?
                    </p>

                    <div className="flex w-full sm:w-auto text-sm gap-2 justify-end">
                      <button
                        disabled={loading}
                        onClick={() => paymentRecievedOrNot(s._id, true)}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 rounded-lg font-bold cursor-pointer py-2 flex-1 sm:flex-none disabled:opacity-50"
                      >
                        Yes
                      </button>

                      <button
                        disabled={loading}
                        onClick={() => paymentRecievedOrNot(s._id, false)}
                        className="bg-white text-red-500 border border-red-200 rounded-lg font-bold cursor-pointer py-2 px-5 flex-1 sm:flex-none disabled:opacity-50"
                      >
                        No
                      </button>
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
          <div className="font-bold text-[10px] sm:text-xs text-gray-400 mb-4 sm:mb-5">
            GROUP BALANCES
          </div>

          <div className="flex text-sm sm:text-base flex-col gap-3">
            {settlements.map((s) => (
              <div
                key={s._id}
                className={`flex flex-col sm:flex-row justify-between gap-3 items-start sm:items-center p-3 sm:p-4 rounded-lg sm:rounded-xl border min-w-0
                ${userMap[s.from] === userDetails?.userName ? "bg-white border-red-200 shadow-sm" : "bg-gray-50 border-gray-100"}`}
              >
                <div className="text-xl sm:text-2xl shrink-0">
                  {userMap[s.from] === userDetails?.userName ? "💸" : "👥"}
                </div>

                <div className="flex-1 min-w-0 text-gray-800">
                  <span className="font-bold">
                    {userMap[s.from] === userDetails?.userName
                      ? "You"
                      : userMap[s.from]}
                  </span>{" "}
                  needs to pay to{" "}
                  <span
                    className={`font-bold ${userMap[s.to] === userDetails?.userName ? "text-green-600" : ""}`}
                  >
                    {userMap[s.to] === userDetails?.userName
                      ? "You"
                      : userMap[s.to]}
                  </span>{" "}
                  <br />
                  <span className="font-bold text-base sm:text-lg">
                    ₹{s.amount}
                  </span>
                </div>

                {/* 'Settle Up' button only shows if the logged-in user needs to pay somebody */}
                {userMap[s.from] === userDetails?.userName && (
                  <button
                    disabled={loading}
                    onClick={() => paymentDone(s)}
                    className="bg-indigo-600 hover:bg-blue-600 text-white text-sm font-bold cursor-pointer px-4 py-2.5 rounded-lg w-full sm:w-auto shrink-0 disabled:opacity-50"
                  >
                    Settle Up
                  </button>
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
