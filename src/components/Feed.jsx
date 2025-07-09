import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import {addFeed} from "../utils/feedSlice";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;

    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log(res.data);
      dispatch(addFeed(res.data));
    } catch (err) {
      // res.status.send("Error i n fetching feed");
      console.error("Error fetching feed:", err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  return (
    <div>
      {feed && (
  <div className="flex my-10 justify-center ">
    <UserCard user={feed[0]} />
  </div>
)}

    </div>
  );
};

export default Feed;
