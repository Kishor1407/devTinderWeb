import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice.js";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants.js";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);

useEffect(() => {
  if (user) {
    navigate("/"); 
  }
}, [user, navigate]);
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
      setError(err?.response?.data || "Something went wrong");
      console.error(err);
    }
  };

  const handleSignUp = async ()=>{
    try{
      const res = await axios.post(BASE_URL+"/signup" , {firstName , lastName, emailId , password} , {
        withCredentials:true,
      })
      console.log(res.data);
      dispatch(addUser(res.data.data));
      return navigate("/profile")
    }catch(err){
    setError(err?.response?.data || "Something went wrong");
      console.error(err);
    }
  }
  return (
    <div className="flex justify-center mt-16">
      <div className="card w-96 bg-base-300 card-xl shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "SignUp"}
          </h2>
          <div className="">
            {!isLoginForm && (
              <>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </>
            )}
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
                  type="password"
                  value={password}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
          </div>
          <p className="text-red-600">{error}</p>
          <div className="justify-center mt-4 card-actions">
            <button onClick={isLoginForm ? handleLogin : handleSignUp} className="btn btn-primary">
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <p
            className="text-md text-red-600 flex justify-start mt-2 cursor-pointer underline "
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {" "}
            {isLoginForm
              ? " New User? SignUp Here"
              : "Exisiting User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
