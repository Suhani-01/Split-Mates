import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { createNewUser } from "../../api/user";
function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [userName,setUserName]=useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    //api call to post data here comes the backend
    try{
      const msg=await createNewUser(name,userName,email,password);
      alert(msg);
      navigate("/login");
    }catch(error){
      alert(error.message);
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        
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
          <button
            type="submit"
            className="w-full bg-cyan-400 text-black py-2 rounded-lg font-semibold hover:bg-cyan-300 transition"
          >
            Sign Up
          </button>

        </form>

        {/* Login Link */}
        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account? 
          <NavLink to='/login' className="text-cyan-500 cursor-pointer ml-1">
            Login
          </NavLink>
        </p>

      </div>
    </div>
  );
}

export default Signup;