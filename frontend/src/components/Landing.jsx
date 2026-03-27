import { useContext } from "react";
import { NavLink, Navigate } from "react-router";
import { UserContext } from "../App";
import groupChat from "../assets/group.mp4";

function Landing() {
  // Get login status from context
  const { isLoggedIn } = useContext(UserContext);

  // Content for "How it works" section
  const steps = [
    {
      id: 2,
      emoji: "📋",
      title: "Add Expenses",
      desc: "Enter the total and select which participants to include in the split.",
    },
    {
      id: 3,
      emoji: "⚖️",
      title: "Split Fairly",
      desc: "Choose equal or custom manual splits — SplitMates handles the math.",
    },
    {
      id: 4,
      emoji: "✅",
      title: "Settle Up",
      desc: "See exactly who owes whom and pay easily with one tap.",
    },
  ];

  // Content for Features section
  const features = [
    {
      id: 10,
      emoji: "👥",
      title: "Group Management",
      desc: "Create unlimited groups for any occasion — trips, rent, dining, events.",
    },
    {
      id: 11,
      emoji: "🧮",
      title: "Smart Math",
      desc: "Automatic calculations with equal, percentage, or exact-amount splits.",
    },
    {
      id: 12,
      emoji: "📊",
      title: "Track History",
      desc: "Keep a running record of all expenses and settle up anytime with complete transparency.",
    },
  ];

  // Redirect to dashboard if user is already logged in
  if (isLoggedIn) {
    return <Navigate to="/dashboard"/>;
  }

  return (
    <div className="min-h-screen">
      
      {/* Hero: Main title, intro text, and action buttons */}
      <section className="py-12 px-4 md:px-8 bg-gray-900 text-white">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-10 items-center text-center md:text-left">
          
          {/* Left side: Heading and Buttons */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6">
              Split<span className="text-cyan-400">Mates</span> 💸
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8">
              Split the money 💵, not the friendship 🤝 <br />
              Track every expense, split bills fairly, and settle up without awkward math.
            </p>

            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <NavLink to="/signup">
                <button className="w-full sm:w-auto bg-cyan-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-cyan-300 transition">
                  Get Started
                </button>
              </NavLink>

              <NavLink to="/login">
                <button className="w-full sm:w-auto border border-cyan-400 px-6 py-3 rounded-xl font-semibold hover:bg-cyan-400 hover:text-black transition">
                  Login
                </button>
              </NavLink>
            </div>
          </div>

          {/* Right side: App preview video */}
          <div className="flex justify-center">
            <video
            autoPlay loop muted playsInline
              src={groupChat}
              className="w-full max-w-sm md:max-w-md rounded-3xl shadow-lg shadow-blue-400"
            />
          </div>
        </div>
      </section>

      {/* Steps: Loop through the steps array */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="font-bold text-blue-400">HOW IT WORKS</h2>
          <h1 className="text-gray-900 font-bold text-2xl md:text-3xl my-3">
            Three steps to zero drama
          </h1>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 mt-12">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center gap-3 px-4">
                <p className="text-2xl">{step.emoji}</p>

                <div className="bg-gray-900 text-white font-bold text-xl w-12 h-12 flex justify-center items-center rounded-full">
                  {step.id}
                </div>

                <h1 className="font-bold text-gray-900">{step.title}</h1>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features: Loop through the features array */}
      <section className="py-16 bg-gray-100 px-4">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-bold text-center text-blue-400">FEATURES</h2>
          <h1 className="text-gray-900 text-center font-bold text-2xl md:text-3xl my-3">
            Everything your group needs
          </h1>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="border border-gray-300 bg-white p-6 rounded-2xl"
              >
                <div className="text-2xl mb-3 w-11 h-11 flex justify-center items-center bg-blue-100 rounded-xl">
                  {feature.emoji}
                </div>

                <h1 className="font-bold text-gray-900 mb-2">
                  {feature.title}
                </h1>

                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA: Final call to action button */}
      <section className="bg-cyan-400 py-12 px-4 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-black">
          Ready to simplify your group expenses?
        </h2>

        <NavLink to="/signup">
          <button className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition">
            Join SplitMates Today 🚀
          </button>
        </NavLink>
      </section>
    </div>
  );
}

export default Landing;