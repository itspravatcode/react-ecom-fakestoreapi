import React, { useState, useContext } from "react";
import { GlobalContext } from "./GlobalContext";

interface UserLoginModalProps {
  onClose: () => void;
}

const UserLoginModal: React.FC<UserLoginModalProps> = ({ onClose }) => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("UserLoginModal must be used within a GlobalProvider");
  }

  const { login } = context;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Both fields are required!");
      return;
    }

    try {
      await login(username, password, "user"); // Ensure role is passed
      onClose(); // Close modal on successful login
    } catch (err) {
      setError("Invalid credentials. Try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold text-center mb-4">User Login</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded-md mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded-md mb-2"
        />
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          onClick={handleLogin}
        >
          Login
        </button>
        <button
          className="w-full mt-2 bg-gray-300 py-2 rounded-md hover:bg-gray-400 transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserLoginModal;
