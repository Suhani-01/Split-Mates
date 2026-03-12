import React, { useContext } from 'react'
import { UserContext } from '../App'
import { useNavigate } from 'react-router';

function Logout() {
    
    const {setIsLoggedIn}=useContext(UserContext);
    const navigate=useNavigate();
    const handleLogout=async()=>{
        try{
            const response=await fetch("http://localhost:7000/api/user/logout",{
                method:"POST",
                credentials:"include",
            });
            if(response.ok){
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
    <button onClick={handleLogout} className="w-full cursor-pointer bg-cyan-400 text-black py-2 rounded-lg font-semibold px-8 hover:bg-cyan-300 transition">
        Logout
    </button>
  )
}

export default Logout
