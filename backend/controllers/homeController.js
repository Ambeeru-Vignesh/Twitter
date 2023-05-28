import Connection from "../models/Connection.js";
import Tweet from "../models/Tweet.js";
import Retweet from "../models/Retweet.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";

const getHome = async (req, res) => {
  try {
    const id = req.user._id.toString();
    let followings = await Connection.find({ following: id });
    let result = [];

    //Get other users tweets and retweets
    for (let i = 0; i < followings.length; i++) {
      const tweetArr = await Tweet.find({
        userId: followings[i].followed,
      }).populate("userId", "name username");

      const retweetArr = await Retweet.find({
        userId: followings[i].followed,
      })
        .populate({
          path: "tweetId",
          populate: { path: "userId", select: "name username" },
        })
        .populate("userId", "name username");

      const commentsArr = await Comment.find({
        userId: followings[i].followed,
      })
        .populate("tweetId")
        .populate("userId", "name username");

      result = result.concat(tweetArr, retweetArr, commentsArr);
    }

    //Get Logged in user's tweets and retweets
    result = result.concat(
      await Tweet.find({ userId: req.user.id }).populate(
        "userId",
        "name username"
      )
    );

    result = result.concat(
      await Retweet.find({ userId: req.user.id })
        .populate({
          path: "tweetId",
          populate: {
            path: "userId",
            select: "name username",
          },
        })
        .populate("userId", "name username")
    );
    // The Reason behind two external populate is that one is associated with the tweeted user and the other is related with one retweeting the tweet.

    result = result.concat(
      await Comment.find({ userId: req.user.id })
        .populate({
          path: "tweetId",
          populate: {
            path: "userId",
            select: "name username",
          },
        })
        .populate("userId", "name username")
    );

    //Sort all tweets according to the date in descending order
    result.sort(function (tweet1, tweet2) {
      return new Date(tweet1.createdAt) - new Date(tweet2.createdAt);
    });

    res.status(200).json({
      status: "success",
      data: {
        result,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed bitch",
      message: error.message,
    });
  }
};

const getExploreContent = async (req, res) => {
  try {
    const suggestions = await this.getSuggestions(req.user.id);
    res.status(200).json({
      status: "success",
      data: {
        suggestions,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getSuggestions = async (id) => {
  const followings = await Connection.find({ following: id }).select(
    "followed"
  );
  let followingsArr = Array.from(followings, (following) => {
    following.followed;
  });
  followingsArr.push(id);

  // Get Users which are not in the followings of the user.
  const users = await User.find({
    _id: {
      $nin: followingsArr,
    },
  });

  return users;
};

export { getHome, getExploreContent, getSuggestions };
