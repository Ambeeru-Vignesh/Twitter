import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTweet } from "../redux/tweet/tweetSlice";
import LeftSidebar from "./LeftSidebar";

const TweetModalContent = ({ header, classes, closeModal, tweetId }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onUploadFile = () => {
    let input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    input.onchange = () => {
      setImage(input.files[0]);
    };
  };

  const postTweet = () => {
    if (tweetId) console.log("first");
    else dispatch(createTweet({ text, media: image }));
    setText("");
    setImage(null);
  };
  return (
    <>
      <div
        className={`flex border-b-2 border-gray-200 dark:border-gray-secondary ${classes}`}
      >
        <div className="flex-1 m-2">
          <h2 className="px-4 py-2 text-xl font-bold text-black dark:text-gray-primary">
            {!header ? "Home" : header}
          </h2>
        </div>
        <LeftSidebar />
      </div>
      <div className="flex items-start">
        <div className="m-2 w-10 py-1">
          <img
            className="inline-block h-10 w-10 rounded-full"
            src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png"
            alt=""
          />
        </div>
        <div className="flex-1 px-2 pt-2 mt-2">
          <textarea
            id="tweet-text"
            className=" bg-transparent text-black dark:text-gray-primary font-normal text-xl w-full focus:outline-none"
            rows="3"
            cols="50"
            placeholder="What's happening?"
            value={text}
            onChange={onChange}
            style={{ resize: false, overflow: "auto" }}
          />
        </div>
      </div>
      <div className="flex justify-end border-b-2 border-gray-200 dark:border-gray-secondary">
        <div className="flex w-64 px-2 justify-end">
          <div>
            <div className="flex text-center px-1 py-1 m-2">
              <div
                className="cursor-pointer mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-opacity-10 hover:bg-blue"
                onClick={onUploadFile}
              >
                <svg
                  className="text-center h-7 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                ></svg>
              </div>
            </div>
          </div>
          <div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-full ml-auto">
              Tweet
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TweetModalContent;
