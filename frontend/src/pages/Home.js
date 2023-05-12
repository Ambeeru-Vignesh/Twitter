import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../redux/auth/authSlice";
import { message } from "antd";
import Layout from "./Layout";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, message: loginMessage } = useSelector((state) => state.auth);
  const userInfo = localStorage.getItem("user");

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    } else {
      message.success(loginMessage);
      dispatch(reset());
    }
  }, [navigate, userInfo]);

  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <div>
      {user && (
        <>
          <h1>Home</h1>
          <Layout />
          <p>Welcome {user.name}</p>
          <button onClick={() => handleClick()}>Logout</button>
        </>
      )}
    </div>
  );
};

export default Home;
