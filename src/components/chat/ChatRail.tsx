import { Icon } from "@iconify/react";
import Dropdown from "@/components/common/Dropdown";
import Skeleton from "@/components/common/Skeleton";
import { useChatStore } from "@/store/useChatStore";

const ChatRail: React.FC = () => {
  const { isChatOpen, toggleChat, setActiveRoom, rooms, activeRoomId, typingUsers, toggleSidebar, selectedUserId, users, isLoading } = useChatStore();

  const selectedUser = users.find(u => u.id === selectedUserId);
  const headerTitle = selectedUser ? selectedUser.name : "Inbox";

  const displayedRooms = selectedUserId ? rooms.filter(r => r.agentId === selectedUserId) : rooms;

  return (
    <div
      className={`pb-4 transition-all duration-300 ease-in-out ${isChatOpen ? "hidden md:flex md:w-72 md:opacity-100" : "flex w-full md:w-72 md:opacity-100"
        } bg-white border-l border-gray-200 rounded-e-lg overflow-hidden relative flex-col`}
    >
      {/* Chat Header */}
      <div className="h-12 px-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <Icon
            icon="hugeicons:panel-left"
            className="size-4 md:size-5 cursor-pointer hover:bg-gray-100 rounded-md transition-colors"
            onClick={toggleSidebar}
          />
          <h4 className="text-[13px] font-bold text-gray-800">{headerTitle}</h4>
        </div>

        <Icon
          icon="heroicons:pencil-square"
          className="size-4 cursor-pointer"
          onClick={toggleChat}
        />
      </div>

      <div className="bg-[#FDFDFD]">
        {/* Search */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-x-2 w-full">
            <Icon
              icon="heroicons:magnifying-glass"
              className="size-4 cursor-pointer"
              onClick={toggleChat}
            />
            <input
              type="text"
              placeholder="Search Chat"
              className="w-full text-[11px] focus:outline-none bg-transparent"
            />
          </div>
          <Icon icon="heroicons:pencil-square" className="size-4 ml-2 cursor-pointer" />
        </div>

        {/* Chats */}
        <div className="w-full flex-1 overflow-hidden flex flex-col">
          <div className="w-full px-2 flex items-center justify-between gap-2 relative z-50 shrink-0">
            <Dropdown options={["All", "Unread", "Archived"]} align="left" />
            <Dropdown options={["Newest", "Oldest"]} align="right" />
          </div>

          <div className="px-3 py-2.5 flex flex-col gap-y-1.5 overflow-y-auto flex-1 pb-20">
            {isLoading ? (
              <div className="flex flex-col gap-y-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="p-3 border border-gray-100 rounded-lg flex items-center gap-x-3">
                    <Skeleton variant="circular" width={24} height={24} className="shrink-0" />
                    <div className="flex-1 flex flex-col gap-y-1.5">
                      <div className="flex justify-between">
                        <Skeleton width="60%" height={8} />
                        <Skeleton width="15%" height={8} />
                      </div>
                      <Skeleton width="90%" height={8} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {displayedRooms.length === 0 && (
                  <p className="text-center text-xs text-gray-400 mt-4">No chats found.</p>
                )}

                {displayedRooms.map((room) => {
                  const isActive = activeRoomId === room.id;
                  const isTyping = typingUsers[room.id];
                  const displayInfo = room.otherUser ? room.otherUser : { name: "Group Chat", status: "offline", email: "" };
                  const initial = displayInfo.name.charAt(0).toUpperCase();

                  return (
                    <div
                      key={room.id}
                      className={`p-2 border rounded-lg flex items-center gap-x-4 cursor-pointer bg-white transition-colors ${isActive ? "border-gray-200 hover:bg-gray-50" : "border-transparent shadow-xs"
                        }`}
                      onClick={() => setActiveRoom(room.id)}
                    >
                      <div className="relative shrink-0 md:block">
                        <div className="min-w-5 size-5 rounded-full text-[10px] font-medium text-[#7D53DF] bg-[#EDEDEE] flex items-center justify-center">
                          {initial}
                        </div>
                        {/* Presence Indicator */}
                        {displayInfo.status === "online" && (
                          <div className="absolute -bottom-0.5 -right-0.5 size-2 bg-green-500 border border-white rounded-full"></div>
                        )}
                      </div>

                      <div className="w-full min-w-0">
                        <div className="flex items-center justify-between">
                          <h5 className="text-[10px] font-semibold text-gray-800 truncate">
                            {displayInfo.name}
                          </h5>
                          <div className="flex items-center gap-x-1 shrink-0">
                            {room.unreadCount > 0 && !isActive && (
                              <div className="min-w-3 px-1 h-3 rounded-full bg-blue-500 text-white text-[8px] font-bold flex items-center justify-center">
                                {room.unreadCount}
                              </div>
                            )}
                            <p className="text-[9px] text-gray-500">{room.lastMessageTime}</p>
                          </div>
                        </div>
                        <p className={`text-[10px] truncate mt-0.5 font-medium ${isTyping || room.unreadCount > 0 && !isActive ? "text-[#007AEC]" : "text-gray-500"}`}>
                          {isTyping ? "Typing..." : room.lastMessageText || "No messages yet"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRail;
