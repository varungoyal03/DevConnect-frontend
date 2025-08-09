import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections.connections);
  const dispatch = useDispatch();
  const onlineFriends = useSelector((store) => store.connections.onlineFriends);


  if (!connections) return;

  if (connections.length === 0) return <h1> No Connections Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;
          const isOnline = onlineFriends.includes(_id);

        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full object-cover"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4 ">
<h2 className="font-bold text-xl flex items-center gap-2">
  {firstName + " " + lastName}
  {isOnline && (
    <span className="flex items-center gap-1 text-sm text-green-500 font-medium">
      <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
      Online
    </span>
  )}
</h2>


              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <Link
              to={`/app/chat/${_id}`}
              state={{
                firstName,
                lastName,
                photoUrl,
                userId: _id,
              }}
            >
              <button className="btn btn-primary">Chat</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export default Connections;
