import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { UserContext } from "../../App";
import { logInUser } from "../../api/user";
import loginImg from "../../assets/login-png.png";
import Navbar from "../Navbar";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Context functions to update global login state and user info
  const { setIsLoggedIn } = useContext(UserContext);
  const { setUserDetails } = useContext(UserContext);

  const [seePassword,setSeePassword]=useState(false);
  const [errorMessage,setErrorMessage]=useState("");
  const [loading , setLoading]=useState(false);

  const navigate = useNavigate();

  /**
   * Sends login credentials to backend and handles redirection
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    

    try {
      const data = await logInUser(email, password);

      // Update global state with user data
      setIsLoggedIn(true);
      setUserDetails(data);

      // Navigate to Dashboard after successful login
      navigate("/dashboard");
    } catch (err) {
      setErrorMessage(err.message || "Failed to fetch details");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="bg-bg-secondary overflow-y-hidden h-full">
      
      <div className="min-h-[95vh] md:mx-auto overflow-y-hidden md:max-w-[1200px] grid md:grid-cols-[1fr_1fr] md:gap-3 items-center md:justify-center">
        <div className="hidden md:block">
          <div className="text-primary bg-primary/20 px-4 mb-4 rounded-2xl text-xs md:text-sm py-1 border border-primary/40 w-fit mx-auto">Smart , Simple , Shared</div>
          <div className="text-center text-text-light text-base md:text-lg max-w-100 mx-auto">The easiest way to tract , split and settle expenses with your people</div>
          <img src={loginImg} />
        </div>
        <div className="bg-white mx-6 sm:mx-10 md:w-full md:mx-auto p-8 rounded-2xl shadow-md md:max-w-md">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 ">
            Welcome Back 👋
          </h2>
          <div className="text-text-light text-sm md:text-base mb-10 mt-3 text-center">Login to continue to your account</div>

          {/* Login Form Section */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-black mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 text-sm md:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <label className="block text-xs md:text-sm font-medium text-black mb-1">
                Password
              </label>
              <input
                type={seePassword?"text":"password"}
                placeholder="Enter your password"
                className="w-full px-4 py-2 text-sm md:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={password}
                onChange={(e) => {
                  setSeePassword(false)
                  setPassword(e.target.value)
                }}
                required
              />
              <div onClick={()=>setSeePassword((prev)=>!prev)} className="absolute text-text-light cursor-pointer right-2 text-xl md:text-2xl bottom-2">{seePassword ? <IoMdEye />:<IoMdEyeOff />}</div>
            </div>
            {errorMessage && <div className="text-center text-xs md:text-sm text-danger">{errorMessage}</div>}

            <button
            disabled={loading}
              type="submit"
              className="w-full cursor-pointer bg-primary text-white py-2 text-sm md:text-base rounded-lg font-semibold hover:bg-primary-light transition"
            >
              {loading ? "Logging..." : "Login"}
            </button>
          </form>

          {/* Navigation to Signup */}
          <p className="text-xs md:text-sm text-center text-gray-500 mt-4">
            Don't have an account?{" "}
            <NavLink to="/signup" className="text-primary underline cursor-pointer">
              Sign up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;