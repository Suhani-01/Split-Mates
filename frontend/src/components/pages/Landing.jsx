
import { NavLink, Navigate } from "react-router";
import { UserContext } from "../../App";
import { IoIosLock } from "react-icons/io";
import { MdOutlineCreditCardOff } from "react-icons/md";
import { IoWallet } from "react-icons/io5";
import { MdBalance } from "react-icons/md";
import { IoShieldCheckmark } from "react-icons/io5";
import { useContext } from "react";

function Landing() {
  const { isLoggedIn } = useContext(UserContext);

  const steps = [
    {
      id: 1,
      emoji: <IoWallet className="text-2xl md:text-3xl text-primary" />,
      color: "#2563eb1a",
      colorMain: "#2563eb",
      title: "Add Expenses",
      desc: "Enter the total and select which participants to include in the split.",
    },
    {
      id: 2,
      emoji: <MdBalance className="text-2xl md:text-3xl text-success" />,
      color: "#22c55e33",
      colorMain: "#22c55e",
      title: "Split Fairly",
      desc: "Choose equal or custom manual splits - SplitMates handles the math.",
    },
    {
      id: 3,
      emoji: <IoShieldCheckmark className="text-warning text-2xl md:text-3xl" />,
      color: "#facc1533",
      colorMain: "#facc15",
      title: "Settle Up",
      desc: "See exactly who owes whom and pay easily with one tap.",
    },
  ];

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

  return (
    <div className="w-full overflow-x-hidden">

      {/* Hero Section */}
      <section className="py-14 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-bg-secondary text-white">
        <div className="max-w-[1200px] w-full mx-auto items-center text-center md:text-left">
          <div>
            <div className="text-primary mx-auto md:mx-0 bg-primary/10 text-xs font-bold px-3 mb-3 w-fit py-1 rounded-2xl">
              Smart, Fair, Hassle-Free
            </div>

            <h1 className="text-black text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              <div className="mb-2">
                Split <span className="text-primary">expenses.</span>
              </div>
              <div className="mb-2">
                Not <span className="text-primary">friendships.</span>
              </div>
            </h1>

            <p className="text-text-light text-base sm:text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto md:mx-0">
              Track every expense, split bills fairly, and settle up without
              awkward math.
            </p>

            <div>
              {isLoggedIn ? (
                <NavLink
                  to="/dashboard"
                  className="inline-flex justify-center items-center w-full sm:w-auto bg-primary text-text-white text-sm md:text-base px-6 py-3 rounded-xl hover:bg-primary-light cursor-pointer transition"
                >
                  Go To Dashboard →
                </NavLink>
              ) : (
                <NavLink to="/signup" className="inline-block w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-primary text-text-white text-sm md:text-base px-6 py-3 rounded-xl hover:bg-primary-light cursor-pointer transition">
                    Get Started - It's Free →
                  </button>
                </NavLink>
              )}
            </div>

            <div className="text-text-light text-xs sm:text-sm flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6 mt-8 sm:mt-10">
              <div className="flex gap-2 items-center">
                <div className="bg-success/20 p-2 rounded-full shrink-0">
                  <MdOutlineCreditCardOff className="text-lg md:text-xl text-success" />
                </div>
                100% Free
              </div>

              <div className="flex gap-2 items-center">
                <div className="p-2 bg-gradient-end/20 rounded-full shrink-0">
                  <IoIosLock className="text-lg md:text-xl text-gradient-end" />
                </div>
                Secure & Private
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-[1200px] w-full mx-auto text-center">
          <h2 className="font-bold text-xs md:text-sm text-primary">
            HOW IT WORKS
          </h2>

          <h1 className="text-text font-bold text-2xl sm:text-3xl my-3">
            Three steps to zero drama
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 mt-8 sm:mt-10 md:mt-12">
            {steps.map((step) => (
              <div
                key={step.id}
                className="flex items-center shadow cursor-pointer hover:-translate-y-1 duration-300 rounded-xl gap-3 sm:gap-4 p-4 sm:p-5 text-left min-w-0"
              >
                <div
                  className="p-3 sm:p-4 rounded-full shrink-0"
                  style={{ backgroundColor: step.color }}
                >
                  {step.emoji}
                </div>

                <div className="flex-1 min-w-0 flex flex-col gap-2 sm:gap-3 text-left">
                  <div
                    style={{ backgroundColor: step.colorMain }}
                    className="text-white font-bold text-base sm:text-lg w-9 h-9 flex justify-center items-center rounded-full shrink-0"
                  >
                    {step.id}
                  </div>

                  <h1 className="font-bold text-sm sm:text-base text-gray-900">
                    {step.title}
                  </h1>

                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 bg-bg-secondary">
        <div className="max-w-[1200px] w-full mx-auto">
          <h2 className="font-bold text-center text-xs md:text-sm text-primary">
            FEATURES
          </h2>

          <h1 className="text-text text-center font-bold text-2xl sm:text-3xl my-3">
            Everything your group needs
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-8 sm:mt-10">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="shadow flex gap-4 sm:gap-5 items-center bg-white p-4 sm:p-5 md:p-6 rounded-2xl min-w-0"
              >
                <div className="text-xl sm:text-2xl rounded-full p-3 shrink-0 aspect-square flex justify-center items-center bg-blue-100">
                  {feature.emoji}
                </div>

                <div className="flex-1 min-w-0">
                  <h1 className="font-bold text-sm sm:text-base text-gray-900 mb-2">
                    {feature.title}
                  </h1>

                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="bg-primary w-full">
        <section className="relative max-w-[1200px] w-full mx-auto flex flex-col md:flex-row justify-between gap-5 md:gap-8 items-center py-10 sm:py-12 px-4 sm:px-6 md:px-8 text-center">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
            Ready to simplify your group expenses?
          </h2>

          <NavLink to="/signup" className="w-full sm:w-auto shrink-0">
            <button className="w-full sm:w-auto bg-white text-black text-sm md:text-base px-6 py-3 rounded-xl font-semibold cursor-pointer hover:bg-bg-secondary transition">
              Join SplitMates Today 🚀
            </button>
          </NavLink>
        </section>
      </div>

    </div>
  );
}

export default Landing;
