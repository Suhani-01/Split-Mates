import { NavLink, Navigate } from "react-router";
import { UserContext } from "../../App";
import groupChat from "../../assets/group.mp4";
import { IoIosLock } from "react-icons/io";
import { MdOutlineCreditCardOff } from "react-icons/md";
import { IoWallet } from "react-icons/io5";
import { MdBalance } from "react-icons/md";
import { IoShieldCheckmark } from "react-icons/io5"; 
import { useContext } from "react";


function Landing() {
  // Get login status from context
   const { isLoggedIn } = useContext(UserContext);
  

  // Content for "How it works" section
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
      desc: "Choose equal or custom manual splits — SplitMates handles the math.",
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

  return (
    <div>
      {/* Hero: Main title, intro text, and action buttons */}
      <section className="py-20 px-4 md:px-8 bg-bg-secondary text-white">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-10 items-center text-center md:text-left">
          {/* Left side: Heading and Buttons */}

          <div>
            <div className="text-primary mx-auto md:mx-0 bg-primary/10 text-xs font-bold px-2 mb-3 w-fit py-1 rounded-2xl">
              Smart, Fair, Hassle-Free
            </div>
            <h1 className="text-black text-4xl md:text-6xl font-bold">
              <div className="mb-2">
                Split <span className="text-primary">expenses.</span>
              </div>
              <div className="mb-2">
                Not <span className="text-primary">friendships.</span>
              </div>
            </h1>

            <p className="text-text-light text-base sm:text-lg md:text-xl text-gray-300 mb-8">
              Track every expense, split bills fairly, and settle up without
              awkward math.
            </p>

            <div className="">
              {isLoggedIn ? 
               <NavLink to="/dashboard" className="w-full sm:w-auto bg-primary text-text-white text-sm md:text-base px-6 py-3 rounded-xl hover:bg-primary-light cursor-pointer transition">Go To Dashboard  →</NavLink> 
                :
                <NavLink  to="/signup">
                <button className="w-full sm:w-auto bg-primary text-text-white text-sm md:text-base px-6 py-3 rounded-xl hover:bg-primary-light cursor-pointer transition">
                  Get Started - It's Free →
                </button>
              </NavLink>
              }
              
            </div>

            <div className="text-text-light text-xs md:text-sm flex gap-6 mt-10">
              <div className="flex gap-1 items-center">
                <div className=" bg-success/20 p-2 rounded-full">
                  <MdOutlineCreditCardOff className="text-lg md:text-xl text-success" />
                </div>{" "}
                100% Free
              </div>
              <div className="flex gap-1 items-center">
                <div className="p-2 bg-gradient-end/20 rounded-full">
                  <IoIosLock className="text-lg md:text-xl text-gradient-end" />
                </div>{" "}
                Secure & Private
              </div>
            </div>
          </div>

          {/* Right side: App preview video */}
          <div className="flex justify-center">
            <video
              autoPlay
              loop
              muted
              playsInline
              src={groupChat}
              className="w-full max-w-sm md:max-w-md rounded-3xl shadow-lg shadow-blue-400"
            />
          </div>
        </div>
      </section>

      {/* Steps: Loop through the steps array */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="font-bold text-xs md:text-sm text-primary">HOW IT WORKS</h2>
          <h1 className="text-text font-bold text-2xl md:text-3xl my-3">
            Three steps to zero drama
          </h1>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 mt-12">
            {steps.map((step) => (
              <div
                key={step.id}
                className="flex items-center shadow cursor-pointer hover:-translate-y-1 duration-300 rounded-xl gap-4 px-4 py-5"
              >
                <div
                  className="p-4 rounded-full"
                  style={{ backgroundColor: step.color }}
                >
                  {step.emoji}
                </div>

                <div className="text-start flex flex-col gap-3">
                  <div
                    style={{ backgroundColor: step.colorMain }}
                    className="text-white font-bold text-lg md:text-xl w-10 flex justify-center items-center rounded-full"
                  >
                    {step.id}
                  </div>

                  <h1 className="font-bold text-sm md:text-base text-gray-900">{step.title}</h1>
                  <p className="text-gray-500 text-xs md:text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features: Loop through the features array */}
      <section className="py-16 px-4 bg-bg-secondary">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-bold text-center text-xs md:text-sm text-primary">FEATURES</h2>
          <h1 className="text-text text-center font-bold text-2xl md:text-3xl my-3">
            Everything your group needs
          </h1>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-7 mt-10">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="shadow flex gap-6 items-center bg-white p-6 rounded-2xl"
              >
                <div className="text-xl md:text-2xl rounded-full p-3 max-h-20 aspect-square flex justify-center items-center bg-blue-100">
                  {feature.emoji}
                </div>

                <div>
                  <h1 className="font-bold text-sm md:text-base text-gray-900 mb-2">
                    {feature.title}
                  </h1>

                  <p className="text-xs md:text-sm text-gray-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA: Final call to action button */}
      <div className="bg-primary h-fit pb-3 w-full">
        <section className="relative max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between gap-4 items-center py-12 px-6 text-center">
          
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
            Ready to simplify your group expenses?
          </h2>

          <NavLink to="/signup">
            <button className="bg-white text-black text-sm md:text-base px-6 py-2 rounded-xl font-semibold cursor-pointer hover:bg-bg-secondary transition">
              Join SplitMates Today 🚀
            </button>
          </NavLink>
        </section>
      </div>
    </div>
  );
}

export default Landing;