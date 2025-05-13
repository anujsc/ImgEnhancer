// pages/Hero.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const Hero = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          email: firebaseUser.email,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const name = user?.displayName || "Guest";
  const photo = user?.photoURL;

  return (
    <div className="flex flex-col items-center text-center px-4 py-10 sm:py-16 min-h-[calc(100vh-100px)]">
      {/* 👋 Welcome Section */}
      <div className="flex flex-col items-center mb-6">
        {photo ? (
          <img
            src={photo}
            alt="User"
            className="w-20 h-20 rounded-full shadow-md mb-2 border-2 border-blue-500 dark:border-yellow-400"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-600 mb-2 flex items-center justify-center text-gray-700 dark:text-gray-300 text-xl font-bold">
            {name.charAt(0)}
          </div>
        )}

        <h2 className="flex items-center text-xl sm:text-3xl font-sans text-gray-800 dark:text-white">
          Welcome, {name}
          <span className="ml-2 animate-waving-hand text-2xl">👋</span>
        </h2>
      </div>

      {/* 📘 Description */}
      <p className="max-w-xl text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-8">
        This tool allows you to seamlessly enhance your images or remove backgrounds
        with AI precision. Whether you're preparing social media posts or cleaning up
        product photos, get professional results in seconds.
      </p>

      {/* 🎯 Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <Link
          to="/home"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-md transition"
        >
          Enhance Image
        </Link>
        <Link
          to="/bg-remover"
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-semibold shadow-md transition"
        >
          Remove Background
        </Link>
      </div>

      {/* ⚙️ Footer */}
      <footer className=" text-xs text-gray-500 dark:text-gray-400">
        Powered By <span className="text-blue-600 dark:text-yellow-400 font-semibold">@AnujAI</span>
      </footer>
    </div>
  );
};

export default Hero;