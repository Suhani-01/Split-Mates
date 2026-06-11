import { BASE_URL } from "../config";


export const settleUp = async function (payload) {
  const API = `${BASE_URL}/api/expense/settlement`;
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  console.log(data);

  if (!res.ok) {
    throw new Error(data.message || "Can't add expense");
  }

  return data;
};

export const moneyRecievedOrNot = async function (id, isRecieved) {
  const API = `${BASE_URL}/api/expense/modify-settlement`;

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
  console.log(data);
  if (res.ok) return data;

  else throw new Error(data.message || " Some Error Occured ");
};

export const getSettlementsToDo = async function (selectedGroup) {
  const groupId = selectedGroup._id;
  const API = `${BASE_URL}/api/group/my-group/settle/${groupId}`;

  const result = await fetch(API, {
    method: "GET",
    credentials: "include",
  });

  const data = await result.json();

  if (result.ok) {
    return data;
  }else{
    throw new Error(data.message || "Error fetching details");
  }
};
