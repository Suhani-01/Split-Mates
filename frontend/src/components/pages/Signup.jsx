import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { createNewUser } from "../../api/user";

import loginImg from "../../assets/login-png.png";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage,setErrorMessage]=useState("");
  const [loading,setLoading]=useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("")
    setLoading(true);

    if (password !== confirmPassword) {
      setErrorMessage("passwords are not matching")
      return;
    }

    //api call to post data here comes the backend
    try {
      await createNewUser(name, userName, email, password);
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong please try again");
    }finally{
      setLoading(false)
    }
  };

  return (




    <div className="bg-bg-secondary overflow-y-hidden h-full">
      
      <div className="min-h-[95vh] md:mx-auto overflow-y-hidden md:max-w-[1200px] grid md:grid-cols-[1fr_1fr] md:gap-3 items-center md:justify-center">
        <div className="hidden md:block">
          <div className="text-primary bg-primary/20 px-4 mb-4 rounded-2xl text-sm py-1 border border-primary/40 w-fit mx-auto">Smart , Simple , Shared</div>
          <div className="text-center text-text-light text-lg  max-w-100 mx-auto">The easiest way to tract , split and settle expenses with your people</div>
          <img src={loginImg} />
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-md mx-auto w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Create Account ✨
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            {/* UserName */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter userName"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>

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
                placeholder="Create a password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Re-enter password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Signup Button */}
            {errorMessage && <div className="text-sm text-danger text-center">{errorMessage}</div>}
            <button
              disabled={loading}
              type="submit"
              className="w-full mt-4 bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary-light cursor-pointer transition"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-sm text-center text-gray-500 mt-4">
            Already have an account?
            <NavLink to="/login" className="text-primary underline cursor-pointer ml-1">
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
