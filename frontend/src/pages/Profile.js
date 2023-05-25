import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import { getUserTweets } from "../redux/tweet/tweetSlice";
import TweetModalContent from "../components/TweetModalContent";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { tweets, isSuccess } = useSelector((state) => state.tweet);

  const userInfo = localStorage.getItem("user");
  const { id } = useParams();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    } else {
      dispatch(getUserTweets(id));
    }
  }, [navigate, user, dispatch, getUserTweets]);

  return (
    <div>
      {user && (
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="px-6">
            <LeftSidebar />
          </div>
          <div className="px-6">
            {isSuccess &&
              tweets.map((tweet) => <h2 key={tweet._id}>{tweet.text}</h2>)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
