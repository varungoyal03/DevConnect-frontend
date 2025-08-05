
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

const Body = () => {


   const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;
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


    const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      // Handle Error Case
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);



useEffect(() => {
  const setupSSE = async () => {
    if (!userData?._id) return;

    initOnlineStatusStream(
      (id) => dispatch(addOnlineFriend(id)),
      (id) => dispatch(removeOnlineFriend(id)),
      (list) => dispatch(setOnlineFriends(list))
    );
  };

  setupSSE();

  return () => {
    closeOnlineStatusStream();
  };
}, [userData?._id]);



const onlineFriends = useSelector((store) => store.connections.onlineFriends);
useEffect(() => {
  console.log("🟢 Online Friends:", onlineFriends);
}, [onlineFriends]);




  return (
    <div>
      <NavBar />
      <Outlet/>
      <Footer />
    </div>
  );
};
export default Body;