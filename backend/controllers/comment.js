import Tweet from "../models/Tweet";
import Comment from "../models/Comment";

const createComment = async (req, res) => {
  try {
    const tweetId = req.params.id,
      userId = req.user.id,
      text = req.body.text;
    let comment = await Comment.create({ tweetId, userId, text });
    const tweet = await Tweet.findByIdAndUpdate(
      tweetId,
      {
        $inc: { commentsCount: 1 },
      },
      { new: true }
    );

    comment = await comment
      .populate({
        path: "tweetId",
        populate: {
          path: "userId",
          select: "name username",
        },
      })
      .populate("userId", "name username")
      .execPopulate();

    // comment = await Comment.findById(commentId)
    //   .populate({
    //     path: "tweetId",
    //     populate: {
    //       path: "userId",
    //       select: "name username",
    //     },
    //   })
    //   .exec();

    res.status(200).json({
      status: "success",
      data: {
        comment,
        tweet,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      msg: err.message,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const tweetId = req.params.id,
      userId = req.user.id;
    const comment = await Comment.findOneAndDelete({ tweetId, userId });
    const tweet = await Tweet.findByIdAndUpdate(
      tweetId,
      { $inc: { commentsCount: -1 } },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      data: {
        tweet,
        comment,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      msg: err.message,
    });
  }
};

const getCommentsOfTweet = async (req, res) => {
  try {
    const tweetId = req.params.id,
      userId = req.user.id;
    const comments = await Comment.find({ tweetId, userId })
      .populate("userId", "name username")
      .select("userId text");

    res.status(200).json({
      status: "success",
      data: {
        comments,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      msg: err.message,
    });
  }
};

const getCommentsOfUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const comments = await Comment.find({ userId })
      .populate("tweetId")
      .select("text tweetId");

    res.status(200).json({
      status: "success",
      data: {
        comments,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      msg: err.message,
    });
  }
};

export default {
  createComment,
  deleteComment,
  getCommentsOfTweet,
  getCommentsOfUser,
}
