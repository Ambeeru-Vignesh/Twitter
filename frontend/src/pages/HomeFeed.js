import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Tweet from "../components/tweet/Tweet";
import Retweet from "../components/tweet/Retweet";
import Comment from "../components/tweet/Comment";
import { getLikedTweetsOfUser, loadHomeFeed } from "../redux/tweet/tweetSlice";
import Loader from "./Loader";

const HomeFeed = () => {
  const { user } = useSelector((state) => state.auth);
  const { tweets, isLoading } = useSelector((state) => state.tweet);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadHomeFeed());
    dispatch(getLikedTweetsOfUser(user._id));
    // dispatch(getRetweetsOfUsed(user._id));
  });

  return (
    <div>
      {isLoading && <Loader />}
      {tweets ? (
        tweets.map((data) => {
          if (data.text && data.tweetId)
            return <Comment key={data._id} data={data} />;
          else if (data.tweetId) return <Retweet key={data._id} data={data} />;
          else return <Tweet key={data._id} tweet={data} />;
        })
      ) : (
        <div className="mt-4 w-full flex justify-center items-center">
          {/* <Spinner /> */}
        </div>
      )}
    </div>
  );
};

export default HomeFeed;
