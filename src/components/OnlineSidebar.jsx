import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OnlineSidebar = () => {
  const connections = useSelector((store) => store.connections.connections);
  const onlineFriends = useSelector((store) => store.connections.onlineFriends);


  const onlineUsers = connections.filter((user) =>
    onlineFriends.includes(user._id)
  );

  if (onlineUsers.length === 0) return null;



  return (
    <div className="w-64 p-4 bg-base-200 rounded-lg h-full overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4 text-white">Online Now</h2>
      {onlineUsers.map((user) => (
        <div
          key={user._id}
          className="flex items-center justify-between mb-4 bg-base-300 p-2 rounded-lg"
        >
          <div className="flex items-center gap-2">
            <img
              src={user.photoUrl}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-white text-sm font-medium">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-green-500 text-xs">Online</p>
            </div>
          </div>
          <Link
            to={`/chat/${user._id}`}
            state={{
              firstName: user.firstName,
              lastName: user.lastName,
              photoUrl: user.photoUrl,
              userId: user._id,
            }}
          >
            <button className="btn btn-sm btn-primary">Chat</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default OnlineSidebar;
