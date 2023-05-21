import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import MainTweet from "../components/MainTweet";
import { getUserTweets } from "../redux/tweet/tweetSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const userInfo = localStorage.getItem("user");
  const { id } = useParams();

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    } else {
      dispatch(getUserTweets(id));
    }
  }, [navigate, userInfo, dispatch, getUserTweets]);

  return (
    <div>
      {user && (
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="px-6">
            <LeftSidebar />
          </div>
          <h1>Tweets</h1>
          <div className="px-6">
            <RightSidebar />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
