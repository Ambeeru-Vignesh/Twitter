import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const userInfo = JSON.parse(localStorage.getItem("user"));

  console.log(user);

  useEffect(() => {
    if (!user && !userInfo) {
      navigate("/signup");
    }
  }, [navigate, user]);

  return <div>Home</div>;
};

export default Home;
