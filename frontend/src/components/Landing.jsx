import { useContext } from "react";
import { NavLink } from "react-router";
import { UserContext } from "../App";
import { Navigate } from "react-router";

function Landing() {
  const { isLoggedIn } = useContext(UserContext);

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  } 
  else {
    return (
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="text-center  py-20 px-6 bg-gray-900 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">SplitMates 💸</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Split the money 💵, not the friendship 🤝<br></br>
Track every expense, split bills fairly, and settle up without awkward math.
          </p>

          <div className="flex justify-center gap-4">
            <NavLink to="/signup">
              <button className="bg-cyan-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-cyan-300 transition">
                Get Started
              </button>
            </NavLink>

            <NavLink to="/login">
              <button className="border border-cyan-400 px-6 py-3 rounded-xl font-semibold hover:bg-cyan-400 hover:text-black transition">
                Login
              </button>
            </NavLink>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose SplitMates?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-md text-center">
              <h3 className="text-xl font-semibold mb-3 text-cyan-500">
                Create Groups 👯
              </h3>
              <p className="text-gray-600">
                Add your friends and create groups for trips, parties, rent, or
                any shared expenses.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md text-center">
              <h3 className="text-xl font-semibold mb-3 text-cyan-500">
                Smart Split ⚖️
              </h3>
              <p className="text-gray-600">
                Automatically calculate who owes whom and how much — no manual
                math required.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md text-center">
              <h3 className="text-xl font-semibold mb-3 text-cyan-500">
                Track Balances 📊
              </h3>
              <p className="text-gray-600">
                Keep a running record of all expenses and settle up anytime with
                complete transparency.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-cyan-400 py-16 text-center">
          <h2 className="text-3xl font-bold mb-6 text-black">
            Ready to simplify your group expenses?
          </h2>
          <NavLink to="/signup">
            <button className="bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition">
              Join SplitMates Today 🚀
            </button>
          </NavLink>
        </section>
      </div>
    );
  }
}

export default Landing;