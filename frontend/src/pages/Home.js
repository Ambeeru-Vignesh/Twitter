import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../redux/auth/authSlice";
import { message } from "antd";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import MainTweet from "../components/MainTweet";
import HomeFeed from "./HomeFeed";

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
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="px-6">
            <LeftSidebar />
          </div>
          <MainTweet />
          <HomeFeed />
          <div className="px-6">
            <RightSidebar />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
