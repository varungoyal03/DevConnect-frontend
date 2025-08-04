import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { disconnectSocket, getSocket } from "../utils/socket.js";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const messagesEndRef = useRef(null);

    const fetchChatMessages = async () => {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });


      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          userId:senderId?._id,
          text,
        };
      });
      setMessages(chatMessages);
    };
    useEffect(() => {
      fetchChatMessages();
    }, []);


  useEffect(() => {
    if (!userId) {
      return;
    }
     const socket = getSocket();
    // As soon as the page loaded, the socket connection is made and joinChat event is emitted

       socket.on("connect", () => {
      console.log("✅ Socket connected: ", socket.id);
    });

    socket.emit("joinChat", {
      targetUserId,
    });


  const handleMessage = (message) => {
    //USER 1 HAS SENDED THE MESSAGE TO ME
  const { firstName, lastName, user1,user2,text } = message;
console.log(message)
  const isMessageForThisChat =
    (user1 === userId && user2 === targetUserId) ||
    (user1 === targetUserId && user2 === userId);


    

    console.log(isMessageForThisChat)
  if (isMessageForThisChat) {
    setMessages((prev) => [...prev, { firstName, lastName, text,userId:user1}]);
  }
};


  socket.on("messageReceived", handleMessage);

    return () => {
      disconnectSocket();
    };
  }, [userId]);

useEffect(() => {
  if (messagesEndRef.current) {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }
}, [messages]);


  const sendMessage = () => {
     const socket = getSocket();
    socket.emit("sendMessage", {
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-3/4 mx-auto border border-gray-300 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={
                "chat " +
                (user._id === msg.userId ? "chat-end" : "chat-start")
              }
            >
              <div className="chat-header">
                {`${msg.firstName}  ${msg.lastName}`}
                {/* <time className="text-xs opacity-50"> 2 hours ago</time> */}
              </div>
              <div className="chat-bubble">{msg.text}</div>
              {/* <div className="chat-footer opacity-50">Seen</div> */}
            </div>
          );
        })}

            <div ref={messagesEndRef} />
      </div>

      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-white rounded p-2"
        ></input>
        <button onClick={sendMessage} className="btn btn-secondary">
          Send
        </button>
      </div>


    </div>
  );
};
export default Chat;


