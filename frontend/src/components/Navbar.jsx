import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import { UserContext } from "../App";
import Logout from "./Logout";
import { IoWallet } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";



function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useContext(UserContext);
  const { userDetails } = useContext(UserContext);

  const [detailOpen,setDetailOpen]=useState(false);
  return (
    <nav className="bg-bg shadow text-white sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl flex items-center text-black font-bold tracking-tighter hover:opacity-90 transition"
        >
          <IoWallet className="text-3xl mr-1 text-primary" />
          <span>Split</span>
          <span className="text-primary">Mates</span>
        </NavLink>

        {/* Desktop Menu
    {!isLoggedIn && (
      <ul className="hidden md:flex space-x-10 font-semibold text-sm uppercase tracking-widest text-slate-400">
        <li className="hover:text-cyan-400 cursor-pointer transition-colors">Home</li>
        <li className="hover:text-cyan-400 cursor-pointer transition-colors">About</li>
        <li className="hover:text-cyan-400 cursor-pointer transition-colors">Services</li>
        <li className="hover:text-cyan-400 cursor-pointer transition-colors">Contact</li>
      </ul>
    )} */}

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          {!isLoggedIn ? (
            <div className="hidden md:flex gap-4">
              <NavLink
                to="/login"
                className="border rounded-xl border-primary text-primary px-5 py-2  font-bold hover:text-primary-light transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="bg-primary text-white px-6 py-2 rounded-xl font-bold  transition shadow-lg shadow-cyan-500/20 hover:bg-primary-light"
              >
                Create Account
              </NavLink>
            </div>
          ) : (
           
             <div className="flex  relative cursor-pointer items-center gap-2 bg-white shadow rounded-2xl px-2 py-1">
                <div className="text-white bg-primary rounded-full w-8 flex items-center justify-center aspect-square">{userDetails.userName.charAt(0).toUpperCase()}</div>
                <div className="text-black flex items-center gap-1 font-bold">{userDetails.userName} <span onClick={()=>{
                  setDetailOpen(true)
                }}><IoIosArrowDown /></span></div>

                {detailOpen && <div className="absolute overflow-hidden bg-white w-full left-0 shadow top-0 rounded-2xl">
                   <div className="flex gap-2 px-2 py-1">
                    <div className="text-white bg-primary rounded-full w-8 flex items-center justify-center aspect-square">{userDetails.userName.charAt(0).toUpperCase()}</div>
                    <div className="text-black flex items-center gap-1 font-bold">{userDetails.userName} <span onClick={()=>setDetailOpen(false)}><IoIosArrowUp /></span></div>
                   </div>
                   <div className="text-text-light text-center text-sm">{userDetails.email}</div>
                  <div className="bg-danger/10 mt-3"><Logout/></div>
                </div>}
             </div>
 
          )} 

       
         
        </div>
      </div>

    
     
    </nav>
  );
}

export default Navbar;
