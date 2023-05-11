import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword, reset } from "../redux/auth/authSlice";
import { message } from "antd";

const ForgotPassword = () => {
  const [email, setEmail] = useState(" ");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { message: servermessage, isError } = useSelector(
    (state) => state.auth
  );

  const userInfo = localStorage.getItem("user");

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }

    if (servermessage) {
      message.success(servermessage);
      dispatch(reset());
    }

    if (isError) {
      message.error("No such email found in the database");
      dispatch(reset());
    }
  }, [navigate, dispatch, userInfo, servermessage, isError]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    dispatch(forgotPassword(email));
  };

  return (
    <div>
      {" "}
      <div className="w-screen">
        <section id="before-sending" className="mx-auto max-w-xl my-4">
          <div className="py-9">
            <div className="heading__wrapper mb-9">
              <p className="text-3xl font-semibold">
                Find your Twitter account
              </p>
            </div>
            <Link to="/signin">
              <button>Back</button>
            </Link>
            <div className="form__wrapper">
              <form className="form" onSubmit={onSubmit}>
                <label htmlFor="email" className="block ml-1">
                  Enter your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <button type="submit">Reset Password</button>
              </form>
            </div>
          </div>
        </section>
        <section
          id="after-sending"
          className="max-w-xl mx-auto my-10"
          style={{ display: "none" }}
        >
          <p className="font-medium text-lg">
            Reset Password Link has been sent to your email address. Click on
            the link to reset your password.{" "}
          </p>
        </section>
      </div>
    </div>
  );
};

export default ForgotPassword;
