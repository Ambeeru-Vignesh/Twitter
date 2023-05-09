import React from "react";
import axios from "axios";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

const register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    e.preventDefault();
  };

  return (
    <div>
      <form>
        <h2>Sign in to Twitter</h2>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={handleLogin}>Sign In</button>

        <p>Don't have an account?</p>

        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister}>Sign Up</button>
      </form>
    </div>
  );
};

export default register;
