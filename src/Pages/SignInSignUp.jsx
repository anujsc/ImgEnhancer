import React, { useState } from "react";
import { auth, googleProvider } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

const SignInSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
      toast.success("Logged in successfully! 🚀");
    } catch (error) {
      toast.error("Login failed! Please check your credentials.");
    }
  };

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/home");
      toast.success("Account created successfully! 🎉");
    } catch (error) {
      alert("Sign up failed: " + error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/home");
      toast.success("Logged in with Google! ✨");
    } catch (error) {
      toast.error("Google sign-in failed. Try again!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold tracking-widest  text-center text-gray-800 mb-6">
          Welcome to Img Enhancer
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex justify-between mt-6 space-x-4">
          <button
            onClick={signIn}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            Sign In
          </button>
          <button
            onClick={signUp}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
          >
            Sign Up
          </button>
        </div>

        <div className="mt-6">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-full border-t border-gray-300"></div>
            <span className="bg-white px-2 text-sm text-gray-500 z-10">or</span>
          </div>

          <button
            onClick={signInWithGoogle}
            className="mt-4 w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:shadow-md py-2 rounded-lg transition"
          >
            <FcGoogle size={24} />
            <span className="text-gray-700 font-medium">Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInSignUp;
