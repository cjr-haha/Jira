import React from "react";
import "./App.css";
import AppContext from "./context/AppContext";
import { useAuth } from "./context/auth";
import UnAuthenticatedApp from "./unauthenticated-app";
import AuthenticatedApp from "./AuthenticatedApp";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user?.token ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
    </div>
  );
}

export default App;
