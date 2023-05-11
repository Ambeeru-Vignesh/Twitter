import React, { useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(token);
    try {
      const res = await axios.post(`api/auth/resetpassword/`, {
        token,
        password,
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response.data.error);
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <label>
          New Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
