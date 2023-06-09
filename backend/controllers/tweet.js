import Tweet from "../models/Tweet.js";

const createTweet = async (req, res, next) => {
  try {
    const { tweet, userId } = req.body;
    const tweetObj = new Tweet({ text: tweet, userId: userId });
    await tweetObj.save();
    res.status(201).json(tweetObj);
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
    const tweets = await Tweet.find({ userId: req.params.id });
    res.status(200).json(tweets);
  } catch (error) {
    next(error);
  }
};

const createComment = async (req, res, next) => {
  try {
  } catch (error) {}
};

export {
  createTweet,
  getTweets,
  getTweet,
  updateTweet,
  deleteTweet,
  getUserTweets,
};
