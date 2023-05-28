import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./redux/auth/authSlice";
import tweetReducer from "./redux/tweet/tweetSlice";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tweet: tweetReducer,
  },
  middleware: [...getDefaultMiddleware(), thunk],
});
