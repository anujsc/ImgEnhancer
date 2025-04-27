import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Homw from "./components/Homw";
import SignInSignUp from "./Pages/SignInSignUp";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import ThemeToggle from "./utilis/ThemeToggle";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Default to light theme
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    // Apply the theme class to the body element
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    // Save the theme in localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <SignInSignUp />}
        />
        <Route
          path="/home"
          element={
            user ? (
              <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
                
                <ThemeToggle />

                {/* Logout Button */}
                <button
                  onClick={() => signOut(auth)}
                  className="absolute font-semibold -tracking-tighter top-4 left-5 px-4 py-2 bg-gradient-to-tr from-blue-400 to-blue-600 hover:from-yellow-400 hover:to-yellow-600 text-white rounded-lg shadow-lg transition-all duration-500 hover:scale-105"
                >
                  Logout
                </button>

                <div className="text-center mb-8">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-2">
                    AI Image Enhancer
                  </h1>
                  <p className="text-base sm:text-lg text-gray-500 dark:text-gray-300 max-w-md mx-auto">
                    Upload your image and let AI enhance it in seconds
                  </p>
                </div>

                <Homw />

                <div className="text-xs sm:text-sm text-gray-500 mt-6 dark:text-gray-400">
                  Powered By <span className="font-semibold">@AnujAI</span>
                </div>
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
