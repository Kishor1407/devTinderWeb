import axios from 'axios'
import React, { useEffect } from 'react'
import {BASE_URL}  from "../utils/constants";
import { useDispatch, useSelector } from 'react-redux';
import {addConnections} from "../utils/connectionSlice"

const Connections = () => {
    const connections=useSelector((store)=>store.connections);

    const dispatch=useDispatch();
    const fetchConnections = async()=>{
        try{
            const res = await axios.get(BASE_URL + "/user/connections",{
                withCredentials:true
            });
            console.log(res?.data?.data);
            dispatch(addConnections(res?.data?.data))
        }catch{

        }  
    }
    useEffect(()=>{
        fetchConnections();
    },[])

    if(!connections) return;

    if(connections.length === 0 ) return    <h1 className='text-2xl font-bold'> No Connections Found</h1>
    
  return (
    <div className='text-center my-10'>
      <h1 className='text-3xl  font-bold'>Connections</h1>
      {connections.map((connection)=>{
        const {_id, firstName , lastName ,photoUrl , age,  gender, about}=connection;
        return (
<div key={_id} className="flex justify-center">
  <div className="card card-side ml-10 w-4/12 flex justify-center bg-yellow-700 border-r-amber-950 my-4 shadow-sm">
    <figure>
      <img
        src={photoUrl}
        className='w-[200px] h=[100px]'
        alt="Movie" />
    </figure>
    <div className="card-body ">
      <h2 className="card-title">{firstName + " " + lastName}</h2>
      <h2 className="card-title">{age + "," + gender}</h2>
      <p>{about}</p>
      <div className="card-actions justify-end">
        <button className="btn btn-primary">X Remove </button>
      </div>
    </div>
  </div>
</div>

      )})}
    </div>
  )
}

export default Connections
