import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import tweetService from "../redux/tweet/tweetService";
import Tweet from "../components/tweet/Tweet";
import Retweet from "../components/tweet/retweet";
import Comment from "../components/tweet/Comment";

const HomeFeed = () => {
  const { user } = useSelector((state) => state.auth);
  const tweets = useSelector((state) => state.tweet);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tweetService.loadHomeFeed(user));
    dispatch(tweetService.getLikedTweetsOfUser(user._id));
    dispatch(tweetService.getRetweetsOfUser(user._id));
  });

  return (
    <div>
      {tweets ? (
        tweets.map((data) => {
          if (data.text && data.tweetId)
            return <Comment key={data._id} data={data} />;
          else if (data.tweetId) return <Retweet key={data._id} data={data} />;
          else return <Tweet key={data._id} tweet={data} />;
        })
      ) : (
        <div className="mt-4 w-full flex justify-center items-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default HomeFeed;
