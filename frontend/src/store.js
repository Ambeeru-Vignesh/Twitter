import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/auth/authSlice";
import tweetReducer from "./redux/tweet/tweetSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tweet: tweetReducer,
  },
});
