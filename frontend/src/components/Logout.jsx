import React, { useContext } from 'react'
import { UserContext } from '../App'
import { useNavigate } from 'react-router';
import { logoutUser } from '../api/user';
import { RiLogoutBoxLine } from "react-icons/ri";


function Logout({setIsOpen}) {
    
    // Global login state update karne ke liye context
    const {setIsLoggedIn}=useContext(UserContext);
    const navigate=useNavigate();

    /**
     * Clears session from backend and updates local login state
     */
    const handleLogout=async()=>{
        const conf=confirm("Are you sure you want to log out?");
        if(!conf) return 
        try{
            await logoutUser();
            setIsLoggedIn(false);
            setIsOpen(false);
            navigate("/");
        }catch(err){
            console.error(err);
        }
    }
    
  return (
    // Click triggers the logout API and state reset
    <button onClick={handleLogout} className="w-full flex gap-1 items-center cursor-pointer text-danger py-2 rounded-lg text-sm md:text-base font-semibold px-8 transition">
        <RiLogoutBoxLine className='text-lg md:text-xl' /> Logout
    </button>
  )
}

export default Logout