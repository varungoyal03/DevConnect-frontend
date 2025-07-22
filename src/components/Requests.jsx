import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect, useState } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {}
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="flex justify-center my-10"> No Requests Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connection Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;


return (
 <div key={_id} className="card card-side bg-gradient-to-r from-base-100 to-base-200 shadow-xl m-4 max-w-4xl mx-auto border border-base-300 min-h-40">
   <div className="flex items-center pl-6">
     <img 
       src={photoUrl} 
       alt="photo" 
       className="w-28 h-28 rounded-full object-cover ring-2 ring-accent ring-offset-2"
     />
   </div>
   
   <div className="card-body flex-row items-center justify-between py-8">
     <div className="flex-1 pr-6 space-y-3">
       <h2 className="card-title text-2xl font-bold">{firstName} {lastName}</h2>
       
       {age && gender && (
         <div className="badge badge-accent badge-outline badge-lg">{age}, {gender}</div>
       )}
       
       {about && (
         <div className="bg-base-300/50 p-3 rounded-lg">
           <p className="text-base-content/80 text-sm leading-relaxed italic">
             "{about}"
           </p>
         </div>
       )}
     </div>
     
     <div className="card-actions flex-shrink-0">
       <div className="join">
         <button
           className="btn btn-error join-item px-8 py-3"
           onClick={() => reviewRequest("rejected", _id)}
         >
           ✕ Reject
         </button>
         <button
           className="btn btn-success join-item px-8 py-3"
           onClick={() => reviewRequest("accepted", _id)}
         >
           ✓ Accept
         </button>
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



