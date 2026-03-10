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
    <>
      <nav className="bg-gray-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <NavLink to="/" className="text-2xl font-bold text-cyan-400">
            SplitMates
          </NavLink>

          {/* Desktop Menu */}
          {!isLoggedIn && (
            <ul className="hidden md:flex space-x-8 font-medium">
              <li className="hover:text-cyan-400 cursor-pointer">Home</li>
              <li className="hover:text-cyan-400 cursor-pointer">About</li>
              <li className="hover:text-cyan-400 cursor-pointer">Services</li>
              <li className="hover:text-cyan-400 cursor-pointer">Contact</li>
            </ul>
          )}

          {/* Login Button (Desktop) */}
          {!isLoggedIn ? (
            <div className="flex gap-5">
              <NavLink
                to="/login"
                className="hidden cursor-pointer md:block bg-cyan-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-cyan-300 transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="hidden cursor-pointer md:block bg-cyan-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-cyan-300 transition"
              >
                Create Account
              </NavLink>
            </div>
          ) : (
            <div className="flex gap-5">
              <div className="bg-cyan-400 text-black px-4 flex items-center font-bold ">
                {userDetails.userName}
              </div>
              <div className="hidden md:block w-30">
                <Logout />
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-gray-800 px-6 py-4 space-y-4">
            {!isLoggedIn && (
              <>
                <p className="hover:text-cyan-400 cursor-pointer">Home</p>
                <p className="hover:text-cyan-400 cursor-pointer">About</p>
                <p className="hover:text-cyan-400 cursor-pointer">Services</p>
                <p className="hover:text-cyan-400 cursor-pointer">Contact</p>
              </>
            )}

            {!isLoggedIn ? (
              <div className="flex flex-col gap-3 text-center">
                <NavLink
                  to="/login"
                  className="w-full bg-cyan-400 text-black py-2 rounded-lg font-semibold hover:bg-cyan-300 transition"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="w-full bg-cyan-400 text-black py-2 rounded-lg font-semibold hover:bg-cyan-300 transition"
                >
                  Create Account
                </NavLink>
              </div>
            ) : (
              <div className="flex flex-col gap-3 text-center">
                <Logout />
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
