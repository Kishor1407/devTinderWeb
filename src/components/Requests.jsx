import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { addRequests , removeRequest } from "../utils/requestSlice";
import { useDispatch, useSelector } from "react-redux";
const Requests = () => {

  // const[showButton,setShowButton] = useState(true);

  const requests = useSelector((store) => store.requests) || [];
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      },
    );
      console.log(res?.data?.data);
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.log("ERROR");
      // console.error(err.data.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  console.log("Redux requests state:", requests);

  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="text-2xl font-bold"> No requests Found</h1>;

  const reviewRequest = async (status , requestId)=>{
    console.log("CLICKED", status, requestId )
    try{
      const res = await axios.post(`${BASE_URL}/request/review/${status}/${requestId}`,{},{
        withCredentials:true,
      }
    );
     dispatch(removeRequest(requestId));

    }catch(error){

    }
  }
  return (
    <div className="text-center my-10">
      <h1 className="text-3xl  font-bold">My Requests</h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;
        return (
          <div key={_id} className="flex justify-center">
            <div className="card card-side ml-10 w-4/12 flex justify-center bg-yellow-700 border-r-amber-950 my-4 shadow-sm">
              <figure>
                <img
                  src={photoUrl}
                  className="w-[200px] h-[220px]"
                  alt="Movie"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                <h2 className="card-title">{age + ", " + gender}</h2>
                <p>{about}</p>
                <div className="flex justify-end">
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={()=>reviewRequest("accepted",request._id)}>Accept </button>
                  </div>
                  <div className="card-actions ml-4 justify-end">
                    <button className="btn btn-error" onClick={()=>reviewRequest("rejected",request._id)}>Reject </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
