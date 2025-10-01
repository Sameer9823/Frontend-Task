import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    setLoading(false);
  }, []);

  if (loading) return null; 

  return (
    <Router>
      <Routes>
        <Route
          path="/auth/login"
          element={user ? <Navigate to="/home" replace /> : <LoginPage setUser={setUser} />}
        />
        <Route
          path="/home"
          element={user ? <HomePage setUser={setUser} /> : <Navigate to="/auth/login" replace />}
        />
        <Route path="*" element={<Navigate to={user ? "/home" : "/auth/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
