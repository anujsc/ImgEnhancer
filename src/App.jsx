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
import { Toaster } from "react-hot-toast";
import { IoIosLogOut } from "react-icons/io";


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
      <Toaster position="top-center" reverseOrder={false} />
      {/* toaster always will be near the router, NAhi toh nahi chalega re baba */}

      <Routes>
      
        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <SignInSignUp />}
        />
        <Route
          path="/home"
          element={
            user ? (
              <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
                {/* 🌗 Theme Toggle Button (Top Left) */}
                <div>
                  <ThemeToggle />
                </div>

                {/* 🚪 Logout Button (Top Right) */}
               
                  <button
                    onClick={() => signOut(auth)}
                    className="absolute top-5 right-5 px-4 py-2 bg-gradient-to-tr from-blue-400 to-blue-600 hover:from-yellow-400 hover:to-yellow-600 text-white rounded-lg hover:scale-[110%] hover:text-[90%] shadow-lg transition-all"
                  >
                    Logout
                  </button>
                  
             

                {/* 👋 Welcome Section */}
                <div className="flex flex-col items-center mb-8">
                  {user.photoURL && (
                    <img
                      src={user.photoURL}
                      alt="User Profile"
                      className="w-20 h-20 rounded-full shadow-md mb-2 border-2 border-blue-500 dark:border-yellow-400"
                    />
                  )}
                  <h2 className="flex items-center text-xl sm:text-3xl font-sans text-gray-800 dark:text-white">
                    Welcome, {user.displayName || "Guest"}
                    <span className="ml-2 animate-waving-hand text-2xl">
                      👋
                    </span>
                  </h2>
                </div>

                {/* 🖼️ Main Home Content */}
                <Homw />

                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-6">
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
