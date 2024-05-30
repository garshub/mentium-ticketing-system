import React, { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProp } from "./types";
import { fetchUserData } from "./hooks/hooks";
import { useCookies } from "react-cookie";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProp, setUserProp] = useState<UserProp | null>(null);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  useEffect(() => {
    const token = cookies.token;
    if (token) {
      // If token exists in cookies, user is logged in
      setIsLoggedIn(true);
      // Fetch user data using the token
      fetchUserData(token)
        .then((userData) => {
          setUserProp(userData);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [cookies]);

  const handleLogin = (userProp: UserProp, token: string) => {
    setIsLoggedIn(true);
    setUserProp(userProp);
    setCookie("token", token, { path: "/" });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserProp(null);
    // Remove token cookie upon logout
    removeCookie("token");
  };

  return (
    <div>
      <ToastContainer />
      {isLoggedIn ? (
        <Dashboard userProp={userProp} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}{" "}
    </div>
  );
};

export default App;
