import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { createTweet, setTweets } from "../redux/tweet/tweetSlice";

const MainTweet = () => {
  const dispatch = useDispatch();
  const [tweetText, setTweetText] = useState("");

  const { user } = useSelector((state) => state.auth);
  const { tweets, isSuccess } = useSelector((state) => state.tweet);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      userId: user._id,
      tweet: tweetText,
    };
    dispatch(createTweet(data));
  };

  useEffect(() => {
    if (isSuccess) {
      console.log(tweets);
    }
  }, [isSuccess]);

  return (
    <div>
      {user && <p className="font-bold pl-2 my-2">{user.username}</p>}

      <form className="border-b-2 pb-6">
        <textarea
          onChange={(e) => setTweetText(e.target.value)}
          type="text"
          placeholder="What's happening"
          maxLength={280}
          className="bg-slate-200 rounded-lg w-full p-2"
        ></textarea>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded-full ml-auto"
        >
          Tweet
        </button>
      </form>
      {/* <TimelineTweet /> */}
    </div>
  );
};

export default MainTweet;
