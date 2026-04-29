
//to create new group
export const createGroup = async (groupName, description, members) => {
  const res = await fetch("http://localhost:7000/api/group/create-group", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ groupName, description, members }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create group");
  }
  console.log("I am the returned data", data);
  return data;
};


//To fetch all the groups of logged in user
export const fetchGroups = async () => {
  const res = await fetch("http://localhost:7000/api/group/my-groups", {
    method: "GET",
    credentials: "include", // Send cookies for authentication
  });

  // Handle Unauthorized error
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch groups");
  }

  return data;
};

export const getGroupActivities=async(groupDetails)=>{
  const API=`http://localhost:7000/api/group/activites/${groupDetails._id}`;

  const response=await fetch(API,{
    method:"GET",
    credentials:"include",
  });
  const data=await response.json();

  if(response.ok){
    return data.activities;
  }else{
    throw new Error(data.message);
  }
}