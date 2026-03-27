import { useContext, useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { UserContext } from "../App";

function SearchUser({ selectedUsers, setSelectedUsers }) {
  // Get logged-in user details to prevent adding yourself
  const { userDetails } = useContext(UserContext);
  
  const [user, setUser] = useState(""); // Input search text
  const [results, setResults] = useState(null); // API search results
  const [errorMessage, setErrorMessage] = useState(""); // Error handling

  const handleAddUser = (userToAdd) => {
    // Don't add if user is already in list or is 'Myself'
    if ((selectedUsers.includes(userToAdd.userName)) || userDetails.userName === userToAdd.userName) {
      alert("user already added");
      return;
    } 

    // Add new user to the existing selected list
    setSelectedUsers([...selectedUsers, userToAdd.userName]);
  };

  const handleChange = (e) => {
    setUser(e.target.value);
    setErrorMessage(""); // Reset error when user starts typing again
    setResults([]); // Clear old results while typing
  };

  // GET Request to server to search username
  const handleSearch = async () => {
    if (!user) return;

    try {
      const res = await fetch(
        `http://localhost:7000/api/private/find-user?userName=${user}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          // Send cookies for authentication (Backend & Frontend are on different ports/domains agar same port pr hote tho browser khud hi bhej deta but since they are on diff port therefore we need to send them manually)
          credentials: "include", 
        },
      );

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.message || "Error searching user");
        setResults(null);
      } else {
        setResults(data);
        setErrorMessage("");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to fetch users");
      setResults([]);
    }
  };

  /*
   * Debouncing:
   * Har seacrh input change par API call avoid karne ke liye
   * 500ms wait karte hain. Agar input change hota hai
   * to timeout clear ho jata hai, warna API call jaegi handleSearch ke trough.
  */
  useEffect(() => {
    const timerid = setTimeout(() => {
      handleSearch();
    }, 500);

    // CLEANUP: Agar user 500ms se pehle naya letter type karde, toh purana timer delete karo
    return () => {
      clearTimeout(timerid);
    };
  }, [user]); // Only run when 'user' state changes

  return (
    <div className="p-4 pt-6 mx-auto bg-white rounded-xl h-full shadow-lg px-4 flex flex-col items-center w-full max-w-md">
      <div className="flex gap-2 w-full">
        <input
          className="border-blue-600 bg-white border-2 placeholder-black px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:text-black flex-1"
          placeholder="Search User"
          value={user}
          onChange={handleChange}
        />
      </div>

      {/* Show error if any */}
      {errorMessage && (
        <p className="mt-2 text-red-500 font-semibold">{errorMessage}</p>
      )}

      {/* Results List */}
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
                {/* Add User Button */}
                <button 
                  onClick={() => handleAddUser(u)} 
                  className="text-blue-600 cursor-pointer h-[80%] aspect-square flex justify-center items-center rounded-full p-1 bg-white"
                >
                  <AiOutlinePlus />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* No results UI */}
      {!results && !errorMessage && user && (
        <p className="mt-2 text-gray-700">No users found</p>
      )}
    </div>
  );
}

export default SearchUser;