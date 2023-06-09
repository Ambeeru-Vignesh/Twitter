import Connection from "../models/Connection";

const follow = async (req, res) => {
  try {
    const followed = req.params.id,
      following = req.user.id;
    if (await Connection.exists({ followed, following }))
      return res.status(400).json({
        status: "fail",
        msg: "You are already following this person",
      });

    const connection = await Connection.create({
      followed,
      following,
    });

    res.status(200).json({
      status: "success",
      data: {
        connection,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      msg: err.message,
    });
  }
};

const unfollow = async (req, res) => {
  try {
    const followed = req.params.id,
      following = req.user.id;

    const connection = await Connection.findOneAndDelete({
      followed,
      following,
    });
    if (!connection)
      return res.status(400).json({
        status: "fail",
        msg: "You have already unfollowed this user",
      });
    res.status(200).json({
      status: "success",
      msg: "Succesfully Unfollowed",
      data: {
        connection,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      msg: err.message,
    });
  }
};

// Get Followers of an User
const getFollowers = async (req, res) => {
  try {
    const followers = (
      await Connection.find({ followed: req.params.id }).populate("following")
    ).map((data) => data.following);

    res.status(200).json({
      status: "success",
      data: {
        followers,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      msg: err.message,
    });
  }
};

// Get Followings of an User
const getFollowing = async (req, res) => {
  try {
    const followings = (
      await Connection.find({
        following: req.params.id,
      }).populate("followed")
    ).map((data) => data.followed);

    res.status(200).json({
      status: "success",
      data: {
        followings,
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
  follow,
  unfollow,
  getFollowers,
  getFollowing,
};
