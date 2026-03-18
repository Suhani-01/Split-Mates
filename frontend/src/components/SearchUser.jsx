import { useContext, useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { UserContext } from "../App";

function SearchUser({selectedUsers,setSelectedUsers}) {
  const {userDetails}=useContext(UserContext);
  
  const [user, setUser] = useState("");
  const [results, setResults] = useState(null); // store the search results
  const [errorMessage, setErrorMessage] = useState(""); // store error message

  

  const handleAddUser = (userToAdd) => {
    // check if user already selected
    if ((selectedUsers.includes(userToAdd.userName )) || userDetails.userName===userToAdd.userName){
      alert("user already added")
      return;
    } 

    setSelectedUsers([...selectedUsers, userToAdd.userName]);
    console.log([...selectedUsers, userToAdd.userName])
  };

  const handleChange = (e) => {
    setUser(e.target.value);
    setErrorMessage(""); // reset error when typing
    setResults([]); // reset results when typing
  };

  const handleSearch = async () => {
    if (!user) return;

    try {
      const res = await fetch(
        `http://localhost:7000/api/private/find-user?userName=${user}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // send cookie automatically cross origin ke case me bhejna pdta hai same me hota tho nahi bhejna pdta browser automatically bhej deta
        },
      );

      const data = await res.json();

      if (!res.ok) {
        // show error message below search bar
        setErrorMessage(data.message || "Error searching user");
        setResults(null); // clear previous results
      } else {
        setResults(data);
        setErrorMessage(""); // clear error
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to fetch users");
      setResults([]);
    }
  };

  //Debouncing.....
  useEffect(()=>{
    const timerid=setTimeout(()=>{
      handleSearch();
    },500);

    return()=>{
      clearTimeout(timerid);
    }
  },[user]);

  return (
  <div className="p-4 pt-6 mx-auto  bg-white rounded-xl h-full shadow-lg px-4 flex flex-col items-center w-full max-w-md">
      <div className="flex gap-2 w-full">
        <input
          className="border-blue-600 bg-white border-2 placeholder-black px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:text-black flex-1"
          placeholder="Search User"
          value={user}
          onChange={handleChange}
        />
      </div>

      {/* Show error message */}
      {errorMessage && (
        <p className="mt-2 text-red-500 font-semibold">{errorMessage}</p>
      )}

      {/* Show results */}
      {results?.length > 0 && (
        <div className="mt-4 w-full bg-white rounded-xl">
          <ul className="space-y-2">
            {results.map((u, i) => (
              <li
                key={i}
                className="text-white h-18 flex items-center justify-between border rounded-xl bg-blue-500 p-2"
              >
                <div>
                  <p className="font-semibold">{u.name}</p>
                  <p>{u.userName}</p>
                </div>
                <button onClick={()=>{
                  handleAddUser(u)
                }} className="text-blue-600 cursor-pointer h-[80%] aspect-square flex justify-center items-center rounded-full p-1 bg-white">
                  <AiOutlinePlus />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* No results found */}
      {!results && !errorMessage && user && (
        <p className="mt-2 text-gray-700">No users found</p>
      )}
    </div>
  );
}

export default SearchUser;
