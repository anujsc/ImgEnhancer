import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Homw from "./components/Homw";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Toaster } from "react-hot-toast";
import BackgroundRemover from "./components/BackgroundRemover";
import DashboardLayout from "./components/DashboardLayout";
import Hero from "./components/Hero";
import SignInSignUp from "./components/SignInSignUp";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setTheme(savedTheme || "light");
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
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

      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/hero" /> : <SignInSignUp/>}
        />

        {/* Protected Dashboard Routes */}
        {user && (
          <Route element={<DashboardLayout user={user} />}>
            <Route path="/hero" element={<Hero />} />
            <Route path="/home" element={<Homw />} />
            <Route path="/bg-remover" element={<BackgroundRemover />} />
          </Route>
        )}

        {/* Redirect unknown paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
