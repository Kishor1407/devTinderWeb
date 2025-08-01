import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import axios from 'axios';
const Navbar = () => {

const dispatch = useDispatch();
    const user = useSelector(store=> store.user);
    const navigate = useNavigate();
    console.log("Logged In" , user);

    const handleLogout= async ()=>{
      console.log("Logout called")
      try{
        await axios.post( BASE_URL + "/logout",{},{
          withCredentials:true,
        });
        dispatch(removeUser()); 
        navigate("/login")
      }catch(err){
console.error("Logout error:", err);
      }
    }


  return (

<div className="navbar bg-blue-900 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">🔗DevTinder</Link>
  </div>
  {user && (
  <div className="flex  gap-2">
<div  className="form-control py-1" >Welcome ,{user.firstName}</div>
      <div className="dropdown mx-5  dropdown-end">
       
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="user photo"
            src={user.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-slate-700 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link
        to="/connections"
        >Connections</Link></li>
                <li><Link
        to="/requests"
        >Requests</Link></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>

  </div>
  )}
</div>
  )
}

export default Navbar
