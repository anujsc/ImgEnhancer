import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Homw from "./components/Homw";
import SignInSignUp from "./Pages/SignInSignUp";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";



function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


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
          element={
            user ? (
              <Navigate to="/home" />
            ) : (
              <SignInSignUp />
            )
          }
        />
        <Route
  path="/home"
  element={
    user ? (
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        {/* /* Logout Button */ }
        <button
          onClick={() => signOut(auth)}
          className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Logout
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            AI Image Enhancer
          </h1>
          <p className="text-base sm:text-lg text-gray-500 max-w-md mx-auto">
            Upload your image and let AI enhance it in seconds
          </p>
        </div>

        <Homw />

        <div className="text-xs sm:text-sm text-gray-500 mt-6">
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
