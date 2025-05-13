import React, { useState, useEffect, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Toaster } from "react-hot-toast";
// import DashboardLayout from "./components/DashboardLayout";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Homw from "./components/Homw";

// Lazy-loaded components
const Home = lazy(() => import("./components/Homw"));
const BackgroundRemover = lazy(() => import("./components/BackgroundRemover"));
const DashboardLayout = lazy(() => import("./components/DashB"));
const Hero = lazy(() => import("./components/Hero"));
const SignInSignUp = lazy(() => import("./components/SignInSignUp"));

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
        <DotLottieReact
          src="https://lottie.host/edd8059f-0aa3-4fa2-9b1d-88489b557243/WExVpP20xC.lottie"
          loop
          autoplay
        />
      </div>
    );
  }

  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />

      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen text-xl text-gray-600">
            <DotLottieReact
          src="https://lottie.host/edd8059f-0aa3-4fa2-9b1d-88489b557243/WExVpP20xC.lottie"
          loop
          autoplay
        />
          </div>
        }
      >
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/hero" /> : <SignInSignUp />}
          />

          {user && (
            <Route element={<DashboardLayout user={user} />}>
              <Route path="/hero" element={<Hero />} />
              <Route path="/home" element={<Homw />} />
              <Route path="/bg-remover" element={<BackgroundRemover />} />
            </Route>
          )}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
