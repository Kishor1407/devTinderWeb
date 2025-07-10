import React from "react";
import { useState } from "react";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl  || "");
  const [gender, setGender] = useState(user.gender  || "");
  const [about, setAbout] = useState(user.about  || "");
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setToast(true);
     setTimeout(()=>{
      setToast(false);

      },2000);
    } catch (error) {
  console.error("Save profile failed:", error.response?.data || error.message);
  setError(error.response?.data);
}

  };
  return (
    <div className="flex  overflow-hidden">
      <div className="w-1/2 flex justify-end items-start mt-10">
        <div className="card w-96 bg-base-300 card-xl shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <div>
              <div className="mt-2">
                <label className="form-control w-full max-w-xs">
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
              </div>

              <div className="mt-2">
                <label className="form-control w-full max-w-xs">
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
              </div>

              <div className="mt-2">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Photo URL</span>
                  </div>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>
              </div>

              <div className="mt-2">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
              </div>

              <div className="mt-2">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <input
                    type="text"
                    value={gender}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label>
              </div>

              <div className="mt-2">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">About</span>
                  </div>
                  <input
                    type="text"
                    value={about}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>
              </div>
            </div>

            <p className="text-red-600">{error}</p>

            <div className="justify-center mt-4 card-actions">
              <button onClick={saveProfile} className="btn btn-primary">Save Profile</button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Half */}
      <div className="w-1/2 flex justify-start pl-8 items-start mt-10">
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
{toast && (
          <div className="toast toast-top toast-end mt-16">
  <div className="alert alert-info ">
    <span>Profile Saved Successfully</span>
  </div>
</div>
)}
    </div>
  );
};

export default EditProfile;
