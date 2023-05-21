import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import tweetService from "./tweetService";

const initialState = {
  tweets: [],
  homeFeed: null,
  tweetsAndRetweets: null,
  likes: [],
  retweets: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createTweet = createAsyncThunk(
  "tweet/create",
  async (data, thunkAPI) => {
    try {
      const token = await thunkAPI.getState().auth.user.othersData.resetToken;
      console.log(token);
      return await tweetService.createTweet(data, token);
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

export const likeTweet = createAsyncThunk(
  "tweet/like",
  async (tweet, thunkAPI) => {
    try {
      const token = await thunkAPI.getState().auth.user.token;
      return await tweetService.likeTweet(tweet, token);
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

export const unlikeTweet = createAsyncThunk(
  "tweet/unlike",
  async (tweet, thunkAPI) => {
    try {
      const token = await thunkAPI.getState().auth.user.token;
      return await tweetService.unlikeTweet(tweet, token);
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

export const getLikedTweetsOfUser = createAsyncThunk(
  "tweet/getLikedTweetsOfUser",
  async (id, thunkAPI) => {
    try {
      const token = await thunkAPI.getState().auth.user.token;
      return await tweetService.getLikedTweetsOfUser(id, token);
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

export const deleteTweet = createAsyncThunk(
  "tweet/deleteTweet",
  async (id, thunkAPI) => {
    try {
      const token = await thunkAPI.getState().auth.user.token;
      return await tweetService.deleteTweet(id, token);
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

export const tweetSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {
    reset: (state, action) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTweet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTweet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tweets.push(action.payload);
      })
      .addCase(createTweet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = tweetSlice.actions;
export default tweetSlice.reducer;