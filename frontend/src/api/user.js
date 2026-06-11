import { BASE_URL } from "../config";

//To create new user


export const createNewUser = async (name, userName, email, password) => {
  const response = await fetch(`${BASE_URL}/api/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      userName,
      email,
      password,
    }),
  });

  //afterposting data user will get the response
  const data = await response.json();

  if (response.status == 201) {
    return "Account Created Sucessfully";
  } else {
    throw new Error(data.message || "Something went wrong");
  }
};

//to login user
export const logInUser = async (email, password) => {
  const response = await fetch(`${BASE_URL}/api/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // credentials: "include" -> Bhejta/recive karta hai cookies (CORS setup)
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  console.log(data);

  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message || "Something went wrong");
  }
};

//API call to search user
export const searchUser = async (user) => {
  const res = await fetch(
    `${BASE_URL}/api/private/find-user?userName=${user}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // Send cookies for authentication (Backend & Frontend are on different ports/domains agar same port pr hote tho browser khud hi bhej deta but since they are on diff port therefore we need to send them manually)
      credentials: "include",
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error searching user");
  } else {
    return data;
  }
};

//API call to logout the user
export const logoutUser=async()=>{
  const response=await fetch(`${BASE_URL}/api/user/logout`,{
    method:"POST",
    // credentials: "include" -> Cookies (session) remove karne ke liye zaroori hai
    credentials:"include",
  });

  if(!response.ok){
     throw new Error("Logout Failed")
    
  }
}
