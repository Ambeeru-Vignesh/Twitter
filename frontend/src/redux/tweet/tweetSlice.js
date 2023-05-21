import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import tweetService from "./tweetService";

const initialState = {
  homeFeed: null,
  tweetsAndRetweets: null,
  likes: [],
  retweets: null,
};

export const createTweet = createAsyncThunk(
  "/tweet/create",
  async (tweet, thunkAPI) => {
    try {
      const token = await thunkAPI.getState().auth.user.token;
      return await tweetService.createTweet(tweet, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
