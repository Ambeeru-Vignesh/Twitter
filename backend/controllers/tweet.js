import Tweet from "../models/Tweet";

const createTweet = async (req, res, next) => {
  try {
    const { tweet, user } = req.body;
    const tweetObj = new Tweet({ tweet, user });
    const tweetSaved = await tweetObj.save();
    res.status(201).json(tweetSaved);
  } catch (error) {
    next(error);
  }
};

const getTweets = async (req, res, next) => {
  try {
    const tweets = await Tweet.find();
    res.status(200).json(tweets);
  } catch (error) {
    next(error);
  }
};

const getTweet = async (req, res, next) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    res.status(200).json(tweet);
  } catch (error) {
    next(error);
  }
};

const updateTweet = async (req, res, next) => {
  try {
    const tweet = await Tweet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(tweet);
  } catch (error) {
    next(error);
  }
};

const deleteTweet = async (req, res, next) => {
  try {
    const tweet = await Tweet.findByIdAndDelete(req.params.id);
    res.status(200).json(tweet);
  } catch (error) {
    next(error);
  }
};

const getUserTweets = async (req, res, next) => {
  try {
    const tweets = await Tweet.find({ user: req.params.id });
    res.status(200).json(tweets);
  } catch (error) {
    next(error);
  }
};

export default {
  createTweet,
  getTweets,
  getTweet,
  updateTweet,
  deleteTweet,
  getUserTweets,
};
