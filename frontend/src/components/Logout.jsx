import React, { useContext } from 'react'
import { UserContext } from '../App'
import { useNavigate } from 'react-router';

function Logout() {
    
    // Global login state update karne ke liye context
    const {setIsLoggedIn}=useContext(UserContext);
    const navigate=useNavigate();

    /**
     * Clears session from backend and updates local login state
     */
    const handleLogout=async()=>{
        try{
            const response=await fetch("http://localhost:7000/api/user/logout",{
                method:"POST",
                // credentials: "include" -> Cookies (session) remove karne ke liye zaroori hai
                credentials:"include",
            });

            if(response.ok){
                // Login state false karke Landing page par bhejo
                setIsLoggedIn(false);
                navigate("/");
            }else{
                console.error("Logout Failed")
            }
        }catch(err){
            console.error(err);
        }
    }
    
  return (
    // Click triggers the logout API and state reset
    <button onClick={handleLogout} className="w-full cursor-pointer bg-cyan-400 text-black py-2 rounded-lg font-semibold px-8 hover:bg-cyan-300 transition">
        Logout
    </button>
  )
}

export default Logout