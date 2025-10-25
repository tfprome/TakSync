import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";
import { loginUser } from "../features/authslice"; 
import { Link, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'

const Login: React.FC = () => {
  const navigate=useNavigate()
  const dispatch: AppDispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit =async(e: React.FormEvent) => {
    e.preventDefault();
    const res=await dispatch(loginUser({ email, password }));
    if(loginUser.fulfilled.match(res)){
       toast.success(res.payload.message)
       navigate('/home/tasklist')
    }
    else if(loginUser.rejected.match(res)){
       toast.error('login failed')
    }
  };

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-gradient-to-b from-blue-200 to-red-100">  
     <div className="flex flex-col items-center">
        <h1 className={`absolute top-10 inset-x-0 text-center font-sans font-bold text-4xl drop-shadow-md transition-all duration-1000 ${
    visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
  }`}>Welcome to TaskSync</h1>
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Welcome Back 
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 cursor-pointer rounded-md hover:bg-indigo-600 transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
     </div>
    </div>
  );
};

export default Login;
