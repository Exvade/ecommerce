import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/slices/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [autoFill, setAutoFill] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.get("https://fakestoreapi.com/users");
      const users = response.data;

      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        dispatch(login({ email: user.email, name: user.username }));
        navigate("/");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while logging in. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (autoFill) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get("https://fakestoreapi.com/users");
          const users = response.data;

          if (users.length > 0) {
            const user = users[0];
            setEmail(user.email);
            setPassword(user.password);
          }
        } catch (error) {
          console.error("Error fetching user data for autofill:", error);
        }
      };

      fetchUserData();
    } else {
      setEmail("");
      setPassword("");
    }
  }, [autoFill]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center">Login</h2>
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              id="autoFill"
              checked={autoFill}
              onChange={(e) => setAutoFill(e.target.checked)}
              className="rounded-sm checked:bg-primary checked:outline-none focus:ring-0"
            />
            <label htmlFor="autoFill" className="text-sm font-medium">
              Auto fill form
            </label>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-4 py-2 font-bold text-white rounded-md bg-primary hover:bg-primary-dark focus:outline-none ${isLoading ? "opacity-75 cursor-not-allowed" : ""
              }`}
          >
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
