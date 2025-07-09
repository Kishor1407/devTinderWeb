import React from 'react'

const UserCard = ({user}) => {
    console.log(user);
      if (!user) return null; 
    const {firstName, lastName , photoUrl , gender, about, age} = user;
  return (
    <div>
      <div className="card bg-orange-700 w-96 shadow-sm">
  <figure>
    <img
      src={user.photoUrl}
      alt="Shoes" 
      className='mt-8 px-2  rounded-2xl'/>
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    {age && gender && <h3 className='text-lg'>{age} , {gender}</h3>}
    <p>{about}</p>
    <div className="card-actions justify-center my-2">
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondary">Intrested</button>

    </div>
  </div>
</div>
    </div>
  )
}

export default UserCard
