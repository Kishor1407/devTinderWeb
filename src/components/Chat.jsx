import React from "react";
import { useParams } from "react-router-dom";
import { useState , useEffect } from "react";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
const Chat = () => {
  const { targetUserId } = useParams();
  console.log(targetUserId);

  const [messages, setMessages] = useState([]);
  const [newMessage , setNewMessage] =useState("");
  const user =useSelector(store => store.user);
  const userId = user?._id;

  const sendMessage = () =>{
    const socket = createSocketConnection();

    socket.emit("sendMessage" , {firstName:user.firstName , userId , targetUserId , text:newMessage})
    setNewMessage("");
  }

  useEffect(()=>{
    if(!userId) {
        return;
    }
    const socket = createSocketConnection();
    socket.emit("joinChat",{firtName:user.firstName , userId , targetUserId});

    return () =>{ 

        socket.disconnect();
    }
  },[userId , targetUserId]);

  socket.on("message recived" , ({firstName , text})=>{
    console.log(firstName , text);
    setMessages((messages) => [...messages , {firstName, text}])


  })

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[50vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600 ">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg , index) => {
          return (
            <div key={index}>
              <div className="chat chat-start">
                <div className="chat-image avatar"></div>
                <div className="chat-header">
                  {msg.firstName}
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
    onChange={(e) => sendNewMessage(e.target.value)}
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
