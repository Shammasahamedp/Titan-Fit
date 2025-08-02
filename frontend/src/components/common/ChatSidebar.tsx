// components/chat/ChatSidebar.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

export interface ChatSidebarProps {
  users: { id: string; name: string; profilePicture?: string }[];
  userRole?:'user'|'trainer'
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ users,userRole }) => {
  const location = useLocation();
  console.log('user',users)
  return (
    <div className="w-64 bg-black/95 border-r border-white/10 p-6 pt-20 hidden md:block">
      <h2 className="text-lg font-semibold text-warm-yellow mb-6 text-center">
        Chats
      </h2>

      <nav className="space-y-2">
        {users.map((user) => (
          <Link

            key={user.id}
            to={`/chat/${user.id}`} 
            className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors duration-200 capitalize text-sm font-medium ${
              location.pathname.includes(user.id)
                ? "bg-warm-yellow/20 text-warm-yellow"
                : "text-white/70 hover:bg-[#FFC436] hover:text-black"
            }`}
          >
            <img
              src={user.profilePicture || "/default-avatar.png"}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span>{user.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default ChatSidebar;
