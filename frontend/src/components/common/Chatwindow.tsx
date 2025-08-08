import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {socket} from '../../utils/socket'
import { showErrorToast } from "@/utils/toast";
import { useSelector } from "react-redux";
import { RootState } from "@/reduxStore/store";
import { getChatRoom } from "@/api/chat-apicalls";


interface Message {
  senderId: string;
  message: string;
  timeStamp: string;
}

const getMessages = async (roomId:string)=>{
  try {
    const response = await getChatRoom(roomId)
    if(response){
        return response.data.chatRoom.chats
    }

  } catch (error) {
    showErrorToast(error)
  }
}

const ChatWindow: React.FC = () => {
  const { id } = useParams(); 
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  let user = useSelector((state:RootState)=>state.user.user)
  let trainer = null
  if(!user){
       trainer = useSelector((state:RootState)=>state.trainer.trainer)
  }



   
  const currentUserId = user? user._id:trainer?._id; 
  const roomId = [currentUserId, id].sort().join("_");
 
  useEffect(() => {   
    (async () => {
      try {
        const res = await getMessages(roomId);
      if(res){
        setMessages(res);  
      }
      } catch (error) {
        showErrorToast(error)
      }
    })();

   

    socket.on("receive_message", (msg: Message) => {
      try {
        console.log('ths is recieve message part ')
      setMessages((prev) => [...prev, msg]);
      } catch (error) {
        showErrorToast(error)
      }
    });

    return () => {
      socket.off("receive_message");   
    };
  }, [roomId]);

   useEffect(()=>{
    try {
       socket.emit("join_room", roomId);
    } catch (error) {
      showErrorToast(error)
    }
    },[id])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const sendMessage = () => {
    try {
      if (!newMessage.trim()) return;

    socket.emit("send_message", {
      roomId,
      senderId: currentUserId,
      message: newMessage,
    });
   let message = {
      senderId:currentUserId as string ,
  message: newMessage,
  timeStamp: new Date(Date.now()).toLocaleTimeString()
    }
    setMessages((prev)=>[...prev,message])
    setNewMessage("");
    } catch (error) {
      showErrorToast(error)
    }
  };

  console.log('messsssss',messages)

  return (
    <div className="flex flex-col h-full bg-white/10 rounded-lg backdrop-blur-sm">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages&&(messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.senderId === currentUserId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs ${
                msg.senderId === currentUserId
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              {msg.message}
              
              {/* {msg.timeStamp} */}
              <div className="text-xs text-gray-400 mt-1">
                {new Date(msg.timeStamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        )))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input */}
      <div className="border-t border-white/20 p-4  bg-black">
        <div className="flex">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-2xl px-3 py-2"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button
            onClick={sendMessage}
            className="ml-2 bg-[#FFC436] text-black hover:text-[#FFC436] hover:bg-black px-4 rounded-2xl"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
