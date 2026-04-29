import React, { useContext } from 'react'
import { UserContext } from '../App'
import { useNavigate } from 'react-router';
import { logoutUser } from '../api/user';

function Logout() {
    
    // Global login state update karne ke liye context
    const {setIsLoggedIn}=useContext(UserContext);
    const navigate=useNavigate();

    /**
     * Clears session from backend and updates local login state
     */
    const handleLogout=async()=>{
        try{
            await logoutUser();
            setIsLoggedIn(false);
            navigate("/");
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