import toast from "daisyui/components/toast";
import { addConnections, addOnlineFriend, removeOnlineFriend, setOnlineFriends } from "./connectionSlice";
import { closeOnlineStatusStream, initOnlineStatusStream } from "./sse";
import axios from "axios";
import { BASE_URL } from "./constants";

export const fetchConnections = async (dispatch) => {
  try {
    const res = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true,
    });
    dispatch(addConnections(res.data.data));
  } catch (err) {
    console.error(err);
  }
};



  
