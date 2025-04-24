import React, { useState } from "react";
import { auth, googleProvider } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignInSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      alert("Sign in failed: " + error.message);
    }
  };

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      alert("Sign up failed: " + error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/home");
    } catch (error) {
      alert("Google sign-in failed: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-3xl font-bold mb-6">Sign In / Sign Up</h1>
      <input
        className="mb-2 p-2 border rounded w-72"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="mb-4 p-2 border rounded w-72"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex gap-4 mb-4">
        <button
          onClick={signIn}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Sign In
        </button>
        <button
          onClick={signUp}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Sign Up
        </button>
      </div>
      <button
        onClick={signInWithGoogle}
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default SignInSignUp;
