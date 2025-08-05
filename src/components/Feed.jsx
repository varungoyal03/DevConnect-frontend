import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";
import OnlineSidebar from "./OnlineSidebar";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
     if (feed && feed.length > 0) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      if(res?.data?.data.length===0){return ;}
      dispatch(addFeed(res?.data?.data));

      console.log("feed is",res)
    } catch (err) {
      console.log("feed error",err);
    }
  };

  useEffect(() => {
    getFeed();
  }, [feed]);


return (
<div className="flex flex-col md:flex-row my-10 justify-center items-start gap-6 px-4">
{/* Sidebar - Online Friends */}
<div className="w-full md:w-64">
<OnlineSidebar />
</div>

  {/* Feed content */}
  <div className="flex-1 flex justify-center">
    {!feed ? (
      <h1 className="text-white text-lg">Loading feed...</h1>
    ) : feed.length === 0 ? (
      <h1 className="text-white text-lg">No new users found!</h1>
    ) : (
      <UserCard user={feed[0]} />
    )}
  </div>
</div>

);
};




export default Feed;

