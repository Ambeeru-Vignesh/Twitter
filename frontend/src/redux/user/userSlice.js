import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
  user: null,
  followers: null,
  followings: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
};

export const getUser = createAsyncThunk("user/get", async (id, thunkAPI) => {
  try {
    const token = await thunkAPI.getState().auth.user.token;
    console.log(token);
    return await userService.getUser(id, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const updateUser = createAsyncThunk(
  "user/update",
  async (id, thunkAPI) => {
    try {
      const token = await thunkAPI.getState().auth.user.token;
      return await userService.updateUser(id, token);
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
export const followUser = createAsyncThunk(
  "user/follow",
  async (data, thunkAPI) => {
    try {
      const token = await thunkAPI.getState().auth.user.token;
      return await userService.followUser(data, token);
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
export const unfollowUser = createAsyncThunk(
  "user/unfollow",
  async (data, thunkAPI) => {
    try {
      const token = await thunkAPI.getState().auth.user.token;
      return await userService.updateUser(data, token);
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
export const getFollowers = createAsyncThunk(
  "user/getFollowers",
  async (id, thunkAPI) => {
    try {
      const token = await thunkAPI.getState().auth.user.token;
      return await userService.getFollowers(id, token);
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

export const getFollowings = createAsyncThunk(
  "user/getFollowings",
  async (id, thunkAPI) => {
    try {
      const token = await thunkAPI.getState().auth.user.token;
      return await userService.getFollowings(id, token);
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

export const getUserTweetsAndRetweets = createAsyncThunk(
  "user/getUserTweetsAndRetweets",
  async (id, thunkAPI) => {
    try {
      const token = await thunkAPI.getState().auth.user.token;
      return await userService.getUserTweetsAndRetweets(id, token);
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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state, action) => {
      state.user = null;
      state.followers = null;
      state.followings = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(followUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.followers = state.followers
          ? [action.payload.loggedInUser, ...state.followers]
          : [action.payload.loggedInUser];
      })
      .addCase(followUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(unfollowUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.followers = state.followers.filter(
          (user) => user._id !== action.payload.loggedInUser._id
        );
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getFollowers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFollowers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.followers = action.payload;
      })
      .addCase(getFollowers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getFollowings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFollowings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.followers = action.payload;
      })
      .addCase(getFollowings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
