import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      <ToastContainer />
      {isLoggedIn ? <Dashboard /> : <Login onLogin={handleLogin} />}{" "}
    </div>
  );
};

export default App;
