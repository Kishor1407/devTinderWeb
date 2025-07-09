import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice.js";
import { useNavigate } from "react-router-dom";
import {BASE_URL} from "../utils/constants.js";
const Login = () => {
  const [emailId, setEmailId] = useState("narumodi@gmail.com");
  const [password, setPassword] = useState("Modi@1407");
  const[error,setError]=useState("");
  const dispatch = useDispatch();
    const navigate = useNavigate();


  const handleLogin = async () => { 
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
        // console.log(res);
        // console.log(res.data);

        dispatch(addUser(res.data));
       return navigate("/");

    } catch (err) {
      setError(err?.response?.data || "Something went wrong")
      console.error(err);
    }
  }; 
  return (
    <div className="flex justify-center mt-32">
      <div className="card w-96 bg-base-300 card-xl shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div className="">
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input
                type="text"
                value={emailId}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
<div className="mt-4">
              <label className="form-control w-full max-w-xs my-6">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="text"
                value={password}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
</div>
          </div>
          <p className="text-red-600">{error}</p>
          <div className="justify-center mt-4 card-actions">
            <button onClick={handleLogin} className="btn btn-primary">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
