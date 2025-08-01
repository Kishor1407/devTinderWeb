import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
const Chat = () => {
  const { targetUserId } = useParams();
  console.log(targetUserId);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  console.log("USER", user);
  const userId = user?._id;
  const socket = createSocketConnection();

  const fetchChatMessages = async ()=>{
    const chat = await axios.get(BASE_URL + "/chat/"+targetUserId,{
      withCredentials:true,
    });
    console.log(chat.data.messages);

    const chatMessages = chat?.data?.messages.map((msg)=>{
      const {senderId , text }= msg;
      return {firstName:senderId?.firstName , lastName:senderId?.lastName ,text

      }
    })
    setMessages(chatMessages)
  }

  useEffect(()=>{
    fetchChatMessages();
  },[ ])
  const generateRoomId = (id1, id2) => {
    return [id1, id2].sort().join("_");
  };

  const sendMessage = () => {
    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  useEffect(() => {
    if (!userId || !targetUserId) {
        console.warn("Missing IDs", { userId, targetUserId });
      return;
    }

    const roomId = generateRoomId(userId, targetUserId);
    socket.emit("joinChat", {
  userId,
  targetUserId,
  firstName: user.firstName,
    });

    socket.on("message received", ({ firstName, text }) => {
      console.log(firstName, text);
      setMessages((messages) => [...messages, { firstName, text }]);
    });

    return () => {
      socket.off("message received");
    };
  }, [userId, targetUserId]);

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[50vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600 ">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
{messages.map((msg, index) => {
  const isCurrentUser = msg.firstName === user.firstName; // OR compare with userId if you include it
  return (
    <div key={index}>
      <div className={`chat ${isCurrentUser ? "chat-end" : "chat-start"}`}>
        <div className="chat-image avatar"></div>
        <div className="chat-header">
          {msg.firstName + " " + (msg.lastName || "")}
        </div>
        <div className="chat-bubble">{msg.text}</div>
        <div className="chat-footer opacity-50">Delivered</div>
      </div>
    </div>
  );
})}

      </div>

      <div className="p-5 border-t border-gray-600 flex gap-2 items-center">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-white rounded p-2"
        />
        <button onClick={sendMessage} className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
