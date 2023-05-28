import axios from "axios";

const API_URL = "/api/tweets/";

const loadHomeFeed = async () => {
  const res = await axios.get(API_URL + "home");
  return res.data;
};

const createTweet = async (data, token) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(data);
  const res = await axios.post(API_URL + "createTweet", data);
  return res.data;
};

const likeTweet = async (tweet) => {
  const res = await axios.post(API_URL + `/like/${tweet.id}`);
  return res;
};

const unlikeTweet = async (tweet) => {
  const res = await axios.post(API_URL + `/unlike/${tweet.id}`);
  return res;
};

const getUserTweets = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(API_URL + `userTweets/${id}`);
  return res.data;
};

const getLikedTweetsOfUser = async (id, token) => {
  const res = await axios.get(`/api/tweets/like/${id}`);
  return res;
};

const deleteTweet = async (id) => {
  const res = await axios.delete(`/api/tweets/${id}`);
  return res;
};

const createRetweet = async (tweetId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await axios.post(`/api/tweets/retweet/${tweetId}`, config);
  return res;
};

const getRetweetsOfUser = async (id) => {
  const res = await axios.get(`/api/tweets/retweet/${id}`);
  return res;
};

const deleteRetweet = async (id) => {
  const res = await axios.delete(`/api/tweets/retweet/${id}`);
  return res;
};

const createComment = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const text = data.text;
  const response = await axios.post(
    `/api/tweets/comment/${data.tweetId}`,
    { text },
    config
  );
  return response;
};

const tweetService = {
  loadHomeFeed,
  createTweet,
  likeTweet,
  unlikeTweet,
  getLikedTweetsOfUser,
  getUserTweets,
  deleteTweet,
  createRetweet,
  getRetweetsOfUser,
  deleteRetweet,
  createComment,
};

export default tweetService;
