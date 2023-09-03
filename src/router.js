import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import BillsList from "./components/BillsList";
import BillDetails from "./components/BillDetails";
import Logout from "./components/Logout";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function Router() {
  // Check if user is authenticated
  const initAuth = () => {
    const auth = localStorage.getItem("isAuthenticated");
    // Logic to verify access tokens here
    return auth ? auth : false;
  };
  const [isAuthenticated, setIsAuthenticated] = useState(initAuth());

  // Function to handle user login
  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", true);
  };

  // Function to handle user logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <Routes>
      <Route path="/login" element={<Login handleLogin={handleLogin} />} />
      <Route
        path="/logout"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Logout handleLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bills"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <BillsList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bills/:id"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <BillDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <h1>Not Found 404</h1>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default Router;
