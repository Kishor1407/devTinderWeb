import React from 'react'
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { removeUserFromFeed } from '../utils/feedSlice';

import axios from 'axios';
const UserCard = ({user}) => {
    console.log(user);
    const dispatch = useDispatch()
      if (!user) return null; 
    const {_id , firstName, lastName , photoUrl , gender, about, age} = user;

    const handleSendRequest = async (status,userId)=>{
      console.log(status,userId);
      try{
        const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId ,{} , {
          withCredentials:true,
        });
        dispatch(removeUserFromFeed(userId))
      }catch(err){

      }
    }
  return (
    <div>
      <div className="card bg-orange-700 w-96 shadow-sm">
  <figure>
    <img
      src={user.photoUrl}

      alt="Shoes" 
      className='mt-8 px-2  max-h-[400px] max-w-[300px] rounded-2xl'/>
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    {age && gender && <h3 className='text-lg'>{age} , {gender}</h3>} 
    <p>{about}</p>
    <div className="card-actions justify-center my-2">
      <button className="btn btn-primary" onClick={()=>handleSendRequest("ignored",_id)}>Ignore</button>
      <button className="btn btn-secondary" onClick={()=>handleSendRequest("intrested",_id)}>Intrested</button>

    </div>
  </div>
</div>
    </div>
  )
}

export default UserCard
