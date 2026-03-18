import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import { UserContext } from "../App";
import Logout from "./Logout";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useContext(UserContext);
  const { userDetails } = useContext(UserContext);
  // console.log(userDetails);

  return (
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-800">
  <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
    
    {/* Logo */}
    <NavLink to="/" className="text-2xl font-black tracking-tighter hover:opacity-90 transition">
      Split<span className="text-cyan-400">Mates</span>
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
            className="text-white px-5 py-2.5 font-bold hover:text-cyan-400 transition"
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className="bg-cyan-400 text-slate-900 px-6 py-2.5 rounded-xl font-bold hover:bg-cyan-300 transition shadow-lg shadow-cyan-500/20"
          >
            Create Account
          </NavLink>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          {/* Logged in User Identity */}
          <div className="flex items-center gap-2 bg-slate-800 py-1.5 pl-2 pr-4 rounded-full border border-slate-700">
            <div className="w-8 h-8 bg-cyan-400 text-slate-900 rounded-full flex items-center justify-center font-black">
              {userDetails.userName.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-bold text-slate-200">{userDetails.userName}</span>
          </div>
          
          <div className="hidden md:block">
            <Logout />
          </div>
        </div>
      )}

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-2xl text-slate-400 hover:text-white transition cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '☰'}
      </button>
    </div>
  </div>

  {/* Mobile Menu */}
  {isOpen && (
    <div className="md:hidden bg-slate-800 border-t border-slate-700 px-6 py-6 space-y-6 animate-in slide-in-from-top duration-300">
      {!isLoggedIn ? (
        <>
          {/* <nav className="flex flex-col gap-4 text-slate-300 font-medium">
            <p className="hover:text-cyan-400 cursor-pointer">Home</p>
            <p className="hover:text-cyan-400 cursor-pointer">About</p>
            <p className="hover:text-cyan-400 cursor-pointer">Services</p>
            <p className="hover:text-cyan-400 cursor-pointer">Contact</p>
          </nav> */}
          <div className="flex flex-col gap-3 pt-4">
            <NavLink to="/login" className="w-full text-center py-3 text-white font-bold border border-slate-600 rounded-xl">
              Login
            </NavLink>
            <NavLink to="/signup" className="w-full text-center py-3 bg-cyan-400 text-slate-900 font-bold rounded-xl">
              Create Account
            </NavLink>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-4">
          <Logout />
        </div>
      )}
    </div>
  )}
</nav>
  );
}

export default Navbar;
