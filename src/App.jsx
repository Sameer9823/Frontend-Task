// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";


function App() {
  const isAuthenticated =
    localStorage.getItem("user") || sessionStorage.getItem("user");

  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route
          path="/home"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/auth/login" />}
        />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;
