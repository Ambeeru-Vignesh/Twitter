import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { login, register } from "../redux/auth/authSlice";

const Register = () => {
  const [username, setUsername] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [email, setEmail] = useState(" ");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isSuccess } = useSelector((state) => state.auth);
  const userInfo = localStorage.getItem("user");

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate,userInfo]);

  const handleRegister = (e) => {
    e.preventDefault();
    const userData = {
      username,
      password,
      email,
    };
    dispatch(register(userData));
  };

  return (
    <div>
      <form>
        <h2>Sign Up to Twitter</h2>

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

        <Link to="/signin">Already registered?</Link>
      </form>
    </div>
  );
};

export default Register;
