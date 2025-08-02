import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, Phone, Video, MoreVertical } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
}

function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hey! How's your day going?",
      sender: 'other',
      timestamp: new Date('2024-01-15T10:30:00')
    },
    {
      id: 2,
      text: "Pretty good! Just working on some projects. How about you?",
      sender: 'user',
      timestamp: new Date('2024-01-15T10:32:00')
    },
    {
      id: 3,
      text: "Same here! I've been learning React and it's been really exciting",
      sender: 'other',
      timestamp: new Date('2024-01-15T10:35:00')
    },
    {
      id: 4,
      text: "That's awesome! React is such a powerful library. What kind of projects are you building?",
      sender: 'user',
      timestamp: new Date('2024-01-15T10:37:00')
    },
    {
      id: 5,
      text: "I'm working on a chat application actually! It's been a great learning experience",
      sender: 'other',
      timestamp: new Date('2024-01-15T10:40:00')
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div 
      className="min-h-screen bg-[url('/userdashboard.jpg')] bg-cover bg-center bg-fixed relative"
      // style={{
      //   backgroundImage: 'url("https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")'
      // }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Chat Container */}
      <div className="relative z-10 flex flex-col h-screen max-w-4xl mx-auto">
        {/* Header */}
        <div className=" bg-[#FFC436] backdrop-blur-md border-b border-white/20 p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-black" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-800">Alex Johnson</h1>
                <p className="text-sm text-green-500">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                <Phone className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                <Video className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto bg-white/10 backdrop-blur-sm p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-lg ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r bg-black text-white rounded-br-md'
                    : 'bg-black/50 backdrop-blur-md text-white rounded-bl-md'
                } transform hover:scale-105 transition-all duration-200`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        
        </div>

        {/* Message Input */}
        <div className="bg-[#FFC436] backdrop-blur-md border-t border-white/20 p-4">
          <form onSubmit={handleSendMessage} className="flex items-end space-x-3">
            <div className="flex-1 min-h-[44px] max-h-32 relative">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 text-gray-800 transition-all duration-200"
                rows={1}
                style={{
                  minHeight: '44px',
                  maxHeight: '128px',
                  overflowY: newMessage.length > 100 ? 'auto' : 'hidden'
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
              />
            </div>
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className={`p-3 rounded-full transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                newMessage.trim()
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5 " />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;