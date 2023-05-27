import axios from "axios";

// const API_URL = "/api/users/";

const getUser = async (id) => {
  const response = await axios.get(`/api/users/${id}`);

  if (response.data) {
    return response.data;
  }
};

const followUser = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `/api/connect/follow/${data.user._id}`,
    data,
    config
  );

  if (response.data) {
    return response.data;
  }
};

const unfollowUser = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(
    `/api/connect/unfollow/${data.user._id}`,
    data,
    config
  );

  if (response.data) {
    return response.data;
  }
};

const getFollowers = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`/api/users/followers/${id}`, config);

  if (response.data) {
    return response.data;
  }
};

const getFollowings = async (id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`/api/users/following/${id}`, config);

  if (response.data) {
    return response.data;
  }
};

const getUserTweetsAndRetweets = async (id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const tweets = (await axios.get(`/api/users/tweets/${id}`, config)).data.data
    .tweets;
  const retweets = (await axios.get(`/api/users/retweet/${id}`, config)).data
    .data.retweets;
  const response = tweets.concat(retweets);

  if (response.data) {
    return response.data;
  }
};

const userService = {
  getUser,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowings,
  getUserTweetsAndRetweets,
};

export default userService;
