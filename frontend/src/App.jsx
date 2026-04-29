import "./App.css";
import Login from "./components/pages/Login";
import Navbar from "./components/Navbar";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Signup from "./components/pages/Signup";
import Landing from "./components/pages/Landing";
import Dashboard from "./components/pages/Dashboard";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import CreateGroup from "./components/pages/CreateGroup";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Landing />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Login />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <Signup />
      </>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <>
        <Navbar />
        <Dashboard />
      </>
    ),
  },
  {
    path:"/create-group",
    element:(
      <>
        <Navbar />
        <CreateGroup/>
      </>
    )
  }
]);

const UserContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //to store the details of logged in user
  const [userDetails,setUserDetails]=useState(null);

  useEffect(() => {


    //lets send req to backedn and check the token
    const checkLogin = async () => {
        try {
          const response = await axios.get(
            "http://localhost:7000/api/user/check-auth",
            { withCredentials: true },
          );


          // console.log(response.data);
          if (response.data.isLoggedIn) {
            setIsLoggedIn(true);

            setUserDetails({
              email:response.data.email,
              userName:response.data.userName,
              _id:response.data._id,
            })
       
            
          }
        } catch (err) {
          setIsLoggedIn(false);
          console.log(err);
        }
    };

    checkLogin();
  }, []); //at first render check if user is logged in or not???

  return (
    <div className="flex flex-col h-full">
      <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, userDetails, setUserDetails }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </div>
  );
}

export default App;
export { UserContext };
