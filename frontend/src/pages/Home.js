import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../redux/auth/authSlice";
import { message } from "antd";
import Layout from "./Layout";
import LeftSidebar from "../components/LeftSidebar";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, message: loginMessage } = useSelector((state) => state.auth);
  const userInfo = localStorage.getItem("user");

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
    if (loginMessage) {
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
          <LeftSidebar />
        </>
      )}
    </div>
  );
};

export default Home;
