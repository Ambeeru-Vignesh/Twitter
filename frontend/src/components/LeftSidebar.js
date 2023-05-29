import React from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import TagIcon from "@mui/icons-material/Tag";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../redux/auth/authSlice";
import { reset as tweetReset } from "../redux/tweet/tweetSlice";

const LeftSidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const userInfo = localStorage.getItem("user");

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    dispatch(tweetReset());
  };

  return (
    <>
      {userInfo && (
        <div className="flex flex-col h-full md:h-[90vh] justify-between mr-6">
          <div className="mt-6 flex flex-col space-y-4">
            <Link to="/">
              <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
                <HomeIcon fontSize="large" />
                <p>Home</p>
              </div>
            </Link>
            <Link to="/explore">
              <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
                <TagIcon fontSize="large" />
                <p>Explore</p>
              </div>
            </Link>
            <Link to={`/profile/${user._id}`}>
              <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
                <PersonIcon fontSize="large" />
                <p>Profile</p>
              </div>
            </Link>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="font-bold">{user.username}</p>
              <p className="font-bold">{user.username}</p>
            </div>
            <div>
              <Link to="/signin">
                <button
                  className="bg-red-500 px-4 py-2 text-white rounded-full"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LeftSidebar;
