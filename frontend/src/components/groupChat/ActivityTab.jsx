import React, { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../../App";
import { getGroupActivities } from "../../api/groupApi";

function ActivityTab({ groupDetails }) {
  const [activities, setActities] = useState(null);
  const { userDetails } = useContext(UserContext);

  const userMap = useMemo(() => {
    const map = {};
    groupDetails.members.forEach((member) => {
      map[member._id] = member.userName;
    });
    return map;
  }, [groupDetails.members]);

  useEffect(() => {
    // IIFE - Immediately Invoked Function Expression
    (async () => {
      try {
        const activities = await getGroupActivities(groupDetails);
        setActities(activities);
      } catch (err) {
        console.log(err.message);
      }
    })();

    return () => {
      setActities(null);
    };
  }, [groupDetails._id]);

  return (
    <div className="">
      {activities ? (
        activities.length === 0 ? (
          <div className="text-center bg-green-100 rounded-xl py-5">
            No Activites Yet
          </div>
        ) : (
          <div className="flex flex-col-reverse gap-3">
            {
              // activity
              activities.map((activity) => (
                <div
                  className="text-center overflow-hidden bg-white"
                  key={activity._id}
                >
                  {/* when an expense is added  */}
                  {activity.type === "EXPENSE_ADDED" && (
                    <div className="overflow-hidden rounded-xl p-4 border-l-5 shadow-md border-l-blue-700 ">
                      🧾
                      {activity.performedBy.map((user, index) => (
                        <span key={user}>
                          <b>
                            {user === userDetails._id ? "You" : userMap[user]}
                          </b>
                          {index < activity.performedBy.length - 2
                            ? " , "
                            : index === activity.performedBy.length - 2
                              ? " and "
                              : ""}
                        </span>
                      ))}
                      added <b className="text-blue-700">₹{activity.amount}</b>{" "}
                      for {activity.title} for{" "}
                      {activity.performedFor.map((user, index) => (
                        <span key={user}>
                          <b>
                            {user === userDetails._id ? "You" : userMap[user]}
                          </b>
                          {index < activity.performedFor.length - 2
                            ? " , "
                            : index === activity.performedFor.length - 2
                              ? " and "
                              : ""}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* when a settlement has been done and waiting in process */}
                  {activity.type === "PAYMENT_SENT" && (
                    <div className=" rounded-xl p-4 border-l-5 shadow-md flex justify-center gap-2 flex-wrap border-l-yellow-500">
                      💸{" "}
                      <b>
                        {activity.performedBy[0] === userDetails._id
                          ? "You"
                          : userMap[activity.performedBy[0]]}
                      </b>{" "}
                      paid <b className="text-yellow-500">₹{activity.amount}</b>{" "}
                      to{" "}
                      <b>
                        {activity.performedFor[0] === userDetails._id
                          ? "You"
                          : userMap[activity.performedFor[0]]}
                      </b>
                      {"  "}
                      <span className="bg-yellow-100 text-orange-500 text-xs p-1 px-4 border border-yellow-200">
                        ⏳ Waiting for{" "}
                        {activity.performedFor[0] === userDetails._id
                          ? "You"
                          : userMap[activity.performedFor[0]]}{" "}
                        to confirm...
                      </span>
                    </div>
                  )}

                  {/* settlement has been accepted by the reciver */}
                  {activity.type === "PAYMENT_CONFIRMED" && (
                    <div className=" rounded-xl p-4 border-l-5 shadow-md border-green-500">
                      ✅{" "}
                      <b>
                        {activity.performedBy[0] === userDetails._id
                          ? "You"
                          : userMap[activity.performedBy[0]]}
                      </b>{" "}
                      confirmed receiving{" "}
                      <b className="text-green-500">₹{activity.amount}</b> from{" "}
                      <b>
                        {activity.performedFor[0] === userDetails._id
                          ? "You"
                          : userMap[activity.performedFor[0]]}
                      </b>
                    </div>
                  )}

                  {/* payment is declined by reciever */}
                  {activity.type === "PAYMENT_DECLINED" && (
                    <div className="rounded-xl p-4 border-l-5 shadow-md border-red-600 ">
                      ❌{" "}
                      <b>
                        {activity.performedBy[0] === userDetails._id
                          ? "You"
                          : userMap[activity.performedBy[0]]}
                      </b>{" "}
                      declined{" "}
                      <b className="text-red-600">₹{activity.amount}</b> payment
                      from{" "}
                      <b>
                        {activity.performedFor[0] === userDetails._id
                          ? "You"
                          : userMap[activity.performedFor[0]]}
                      </b>
                    </div>
                  )}
                </div>
              ))
            }
          </div>
        )
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default ActivityTab;
