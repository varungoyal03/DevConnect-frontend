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
<div className="flex flex-col md:flex-row justify-center items-center min-h-screen gap-6 px-4">



  {/* Sidebar */}
  <div className="w-full md:w-56 lg:w-64">
    <OnlineSidebar />
  </div>


  

  {/* Main feed area */}
  <div className="flex-1 flex flex-col items-center">

    {/* Header */}
    <div className="text-center mb-6 px-2">
      <h1 className=" text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2 leading-tight animate-[slideInLeft_0.6s_ease-out]">
        Find Your Coding Partner
      </h1>
      <p className="text-gray-400 text-xs sm:text-sm md:text-base max-w-sm md:max-w-md mx-auto leading-relaxed animate-[fadeIn_1s_ease-out_0.3s_both] ">
        Swipe through amazing developers and build your dream network
      </p>

      <div className="mt-3 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]">
      {!feed ? (
        <h1 className="text-white text-lg text-center">Loading feed...</h1>
      ) : feed.length === 0 ? (
        <h1 className="text-white text-lg text-center">No new users found!</h1>
      ) : (
        <UserCard user={feed[0]} />
      )}
    </div>
    </div>

 

  </div>
</div>

  );
};



export default Feed;


