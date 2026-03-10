import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router';
import { UserContext } from '../App';


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setIsLoggedIn}=useContext(UserContext);
  const {setUserDetails}=useContext(UserContext);

  //creating context for logged in user info.....

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    

    try{
      const response=await fetch("http://localhost:7000/api/user/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        credentials:"include",//ensures that browser send and recieve cookies
        body:JSON.stringify({
          email,
          password,
        })
      });

      const data=await response.json();

      if(response.ok){
        alert(data.message);
        console.log(data);


        setIsLoggedIn(true);
        setUserDetails(data);//storing the logged in user details ie email and username
        console.log("i am from login ",data)

        navigate("/dashboard");
      }else{
        alert(data.message || "something went wrong");
      }
    }catch(err){
      console.log("Error:",err);
    }

    // Later you can connect backend here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
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

          {/* Password */}
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

          {/* Login Button */}
          <button 
            type="submit"
            className="w-full cursor-pointer bg-cyan-400 text-black py-2 rounded-lg font-semibold hover:bg-cyan-300 transition"
          >
            Login
          </button>

        </form>

        {/* Extra Text */}
        <p className="text-sm text-center text-gray-500 mt-4">
          Don’t have an account? <NavLink to='/signup' className="text-cyan-500 cursor-pointer">Sign up</NavLink>
        </p>

      </div>
    </div>
  );
}

export default Login
