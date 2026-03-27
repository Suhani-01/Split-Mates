import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router';
import { UserContext } from '../App';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Context functions to update global login state and user info
  const {setIsLoggedIn}=useContext(UserContext);
  const {setUserDetails}=useContext(UserContext);

  const navigate = useNavigate();

  /**
   * Sends login credentials to backend and handles redirection
   */
  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
      const response=await fetch("http://localhost:7000/api/user/login",{
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        // credentials: "include" -> Bhejta/recive karta hai cookies (CORS setup)
        credentials:"include",
        body:JSON.stringify({ email, password })
      });

      const data=await response.json();

      if(response.ok){
        alert(data.message);
        
        // Update global state with user data
        setIsLoggedIn(true);
        setUserDetails(data); 

        // Navigate to Dashboard after successful login
        navigate("/dashboard");
      }else{
        alert(data.message || "something went wrong");
      }
    }catch(err){
      console.log("Error:",err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>

        {/* Login Form Section */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full cursor-pointer bg-cyan-400 text-black py-2 rounded-lg font-semibold hover:bg-cyan-300 transition"
          >
            Login
          </button>

        </form>

        {/* Navigation to Signup */}
        <p className="text-sm text-center text-gray-500 mt-4">
          Don’t have an account? <NavLink to='/signup' className="text-cyan-500 cursor-pointer">Sign up</NavLink>
        </p>

      </div>
    </div>
  );
}

export default Login