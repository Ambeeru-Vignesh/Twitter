import Retweet from "../models/Retweet.js";
import Tweet from "../models/Tweet.js";

const getAllRetweets = async (req, res) => {
  try {
    const retweets = await Retweet.find();
    res.status(200).json({
      status: "success",
      data: {
        retweets,
      },
    });
  } catch (error) {
    res.status(error.status).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Get Retweet

const getRetweet = async (req, res) => {
  try {
    const retweet = await Retweet.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        retweet,
      },
    });
  } catch (error) {
    res.status(error.status).json({
      status: "fail",
      message: error.message,
    });
  }
};

const createRetweet = async (req, res) => {
  try {
    const userId = req.user.id,
      tweetId = req.params.id;

    if (await Retweet.exists({ userId, tweetId })) {
      return res.status(400).json({
        status: "fail",
        msg: "You have already retweeted this tweet",
      });
    }

    let retweet = await Retweet.create({
      userId,
      tweetId,
    });

    const tweet = await Tweet.findByIdAndUpdate(
      tweetId,
      {
        $inc: { retweetsCount: 1 },
      },
      { new: true }
    );

    retweet = await retweet
      .populate({
        path: "tweetId",
        populate: {
          path: "userId",
          select: "name username",
        },
      })
      .populate("userId", "name username")
      .execPopulate();

    res.status(201).json({
      status: "success",
      data: {
        retweet,
        tweet,
      },
    });
  } catch (error) {
    res.status(error.status).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getRetweetsOfUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const retweets = await Retweet.find({ userId })
      .populate({
        path: "tweetId",
        populate: {
          path: "userId",
          select: "name username",
        },
      })
      .populate("userId", "name username")
      .sort("-createdAt");
    res.status(200).json({
      status: "success",
      data: {
        retweets,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      status: "fail",
      msg: err.message,
    });
  }
};

// Get Users who have retweeted the tweet
const getRetweetedUsersOfTweet = async (req, res) => {
  try {
    const retweetedUsers = await Retweet.find({ tweetId: req.params.id })
      .populate("userId", "name username")
      .select("userId");

    res.status(200).json({
      status: "success",
      data: {
        retweetedUsers,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      msg: err.message,
    });
  }
};

// Delete My Tweet
const deleteRetweet = async (req, res) => {
  try {
    const tweetId = req.params.id,
      userId = req.user.id;
    const retweet = await Retweet.findOneAndDelete({
      tweetId,
      userId,
    });
    if (!retweet)
      return res.status(400).json({
        status: "success",
        msg: "You have already deleted removed retweet for this tweet",
      });

    // Decrement retweetsCount of the tweet by 1
    const tweet = await Tweet.findByIdAndUpdate(
      tweetId,
      {
        $inc: { retweetsCount: -1 },
      },
      { new: true }
    );
    res
      .status(204)
      .json({ status: "success", msg: "Retweet successfully deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ status: "error", msg: err.message });
  }
};

export {
  getAllRetweets,
  getRetweet,
  getRetweetsOfUser,
  getRetweetedUsersOfTweet,
  createRetweet,
  deleteRetweet,
};
