import React, { useState, useContext } from "react";
import { GlobalContext } from "../Contexts/GlobalContext";

interface LoginModalProps {
  onClose: () => void;
  role: "admin" | "user"; // Pass role as a prop
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, role }) => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("LoginModal must be used within a GlobalProvider");
  }
  const { login } = context;

  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(credentials.username, credentials.password, role);
    if (success) {
      onClose();
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">
          {role === "admin" ? "Admin Login" : "User Login"}
        </h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleLogin} className="flex flex-col space-y-3">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
          <div className="flex justify-between">
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
              Login
            </button>
          </div>
          <button type="button" className="w-full bg-gray-300 py-2 rounded-md hover:bg-gray-400 transition" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
