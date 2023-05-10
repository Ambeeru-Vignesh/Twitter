import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isSuccess } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess || user) {
      navigate("/");
    }
  }, [navigate, isSuccess]);

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };
  return (
    <div>
      <form>
        <h2>Sign in to Twitter</h2>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={handleLogin}>Sign In</button>

        <p>Don't have an account?</p>
        <div>
          <div>
            <Link to="/forgotPassword" className="text-xl">
              <small>Forgot password?</small>
            </Link>
          </div>
          <div>
            <Link to="/signup" className="text-xl">
              <small>Sign up for Twitter</small>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
