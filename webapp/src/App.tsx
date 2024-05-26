import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>{isLoggedIn ? <Dashboard /> : <Login onLogin={handleLogin} />}</div>
  );
};

export default App;
