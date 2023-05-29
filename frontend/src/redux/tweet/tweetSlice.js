import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import tweetService from "./tweetService";

const initialState = {
  tweets: null,
  homeFeed: null,
  tweetsAndRetweets: null,
  likes: [],
  retweets: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const loadHomeFeed = createAsyncThunk(
  "tweets/loadHomeFeed",
  async (_, thunkAPI) => {
    try {
      const token = await thunkAPI.getState().auth.user.token;
      console.log(token);
      return await tweetService.loadHomeFeed(token);
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

export const createTweet = createAsyncThunk(
  "tweet/create",
  async (data, thunkAPI) => {
    try {
      const token = await thunkAPI.getState().auth.user.token;
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

export const getUserTweets = createAsyncThunk(
  "tweet/getUserTweets",
  async (id, thunkAPI) => {
    try {
      const token = await thunkAPI.getState().auth.user.token;
      return await tweetService.getUserTweets(id, token);
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

export const createRetweet = createAsyncThunk(
  "tweet/retweet/create",
  async (id, thunkAPI) => {
    try {
      const token = await thunkAPI.getState().auth.user.token;
      console.log(token);
      return await tweetService.createRetweet(id, token);
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

export const deleteRetweet = createAsyncThunk(
  "tweet/retweet/deleteRetweet",
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

export const createComment = createAsyncThunk(
  "tweet/comment/create",
  async (data, thunkAPI) => {
    try {
      const token = await thunkAPI.getState().auth.user.token;
      console.log(token);
      return await tweetService.createComment(data, token);
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
      state.tweets = null;
    },
    setTweets: (state, action) => {
      state.tweets = action.payload; // Set the tweets state with the payload
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
        state.tweets = state.tweets
          ? [action.payload, ...state.tweets]
          : [action.payload];
      })
      .addCase(createTweet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUserTweets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserTweets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tweets = action.payload;
      })
      .addCase(getUserTweets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, setTweets } = tweetSlice.actions;
export default tweetSlice.reducer;
