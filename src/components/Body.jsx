
import NavBar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { addConnections, addOnlineFriend, removeOnlineFriend, setOnlineFriends } from "../utils/connectionSlice";
import { closeOnlineStatusStream, initOnlineStatusStream } from "../utils/sse";
import { fetchConnections } from "../utils/fetchConnections";
import { toast } from 'react-hot-toast';





const Body = () => {


   const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData?._id) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };


  useEffect(() => {
    fetchUser();
  }, []);






// NEW:
useEffect(() => {
  if (userData?._id) {
    fetchConnections(dispatch);
  }
}, [userData?._id]);




useEffect(() => {

  const setupSSE = async () => {
      if (!userData?._id) return;
  
      initOnlineStatusStream(
        (id) => dispatch(addOnlineFriend(id)),
        (id) => dispatch(removeOnlineFriend(id)),
        (list) => dispatch(setOnlineFriends(list)),
        async (payload) => {
          // ✅ Show toast
toast.custom(
  <div className="bg-green-500 text-white p-3 rounded-lg flex items-center gap-3 shadow-lg">
    <img
      src={payload.photoUrl}
      alt="avatar"
      className="w-8 h-8 rounded-full object-cover"
    />
    <span>
      🎉 You are now connected with <strong>{payload.name}</strong>!
    </span>
  </div>,
  {
    duration: 7000, 
  }
);

  
          // ✅ Re-fetch connections
          await fetchConnections(dispatch);
  
          // ✅ Reconnect SSE to refresh online friend list
          closeOnlineStatusStream();
          setupSSE(); // ♻️ call itself again
        }
      );
    };
  
  
  
  setupSSE();

  return () => {
    console.log("sse connection closed")
    closeOnlineStatusStream();
  };
}, [userData?._id]);





  return (
    <div>
      <NavBar />
      <Outlet/>
      <Footer />
    </div>
  );
};
export default Body;