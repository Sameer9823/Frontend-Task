// App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";


function App() {
const [user, setUser] = useState(null);

  // Keep user in state and sync with localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route
          path="/auth/login"
          element={user ? <Navigate to="/home" replace /> : <LoginPage setUser={setUser} />}
        />

        {/* Home Route */}
        <Route
          path="/home"
          element={user ? <HomePage /> : <Navigate to="/auth/login" replace />}
        />

        {/* Fallback */}
        <Route
          path="*"
          element={<Navigate to={user ? "/home" : "/auth/login"} replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
