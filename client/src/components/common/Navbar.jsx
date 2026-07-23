import React from "react";

import { useAuth } from "../../contexts/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          HireHub
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
            Home
          </Link>

          <Link to="/jobs" className="text-gray-700 hover:text-600 transition">
            Jobs
          </Link>
          {user ? (
            <>
              {user.role === "candidate" ? (
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Profile
                </Link>
              ) : (
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Dashboard
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
