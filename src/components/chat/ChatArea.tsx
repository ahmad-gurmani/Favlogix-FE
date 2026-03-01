import { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import Skeleton from "@/components/common/Skeleton";
import { useChatStore } from "@/store/useChatStore";

const ChatArea: React.FC = () => {
  const { isChatOpen, toggleDetails, messages, sendMessage, rooms, activeRoomId, typingUsers, setTyping, isLoadingMessages, isLoading } = useChatStore();
  const [inputText, setInputText] = useState("");
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeRoom = rooms.find(r => r.id === activeRoomId);
  const displayInfo = activeRoom?.otherUser || { name: "Select a chat", status: "offline", email: "" };
  const isTyping = activeRoomId ? typingUsers[activeRoomId] : null;

  const handleSend = () => {
    if (inputText.trim() && activeRoomId) {
      sendMessage(inputText);
      setInputText("");
      setTyping(activeRoomId, false);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);

    if (activeRoomId) {
      setTyping(activeRoomId, true);

      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        setTyping(activeRoomId, false);
      }, 2000);
    }
  };

  if (!activeRoom && !isLoading) return null;

  return (
    <div
      className={`pb-4 transform transition-all duration-300 ease-in-out ${isChatOpen ? "flex-1 opacity-100 w-full" : "hidden md:flex md:flex-1 md:opacity-100"
        } bg-white border-l border-gray-200 rounded-lg overflow-hidden relative flex flex-col min-w-0`}
    >
      {/* Chat Header */}
      <div className="h-12 px-2 md:px-4 border-b border-gray-200 flex items-center justify-between shrink-0">
        <div className="w-full flex items-center justify-between gap-x-2 md:gap-x-4">
          <div className="flex items-center gap-2 overflow-hidden">
            {/* Mobile Back Button */}
            <button
              className="md:hidden p-1.5 hover:bg-gray-100 rounded-md shrink-0"
              onClick={() => useChatStore.getState().closeChat()}
            >
              <Icon icon="heroicons:chevron-left" className="size-5" />
            </button>
            <div className="flex items-center gap-x-2">
              <div className="relative shrink-0 hidden md:block">
                <div className="min-w-6 size-6 rounded-full text-[12px] font-medium text-[#7D53DF] bg-[#EDEDEE] flex items-center justify-center">
                  {displayInfo.name.charAt(0).toUpperCase()}
                </div>
                {/* Presence Indicator */}
                {displayInfo.status === "online" && (
                  <div className="absolute -bottom-0.5 -right-0.5 size-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-gray-800 truncate leading-tight">
                  {displayInfo.name}
                </h4>
                {displayInfo.status === "online" && (
                  <p className="text-[10px] text-green-600 font-medium leading-tight">Online</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-x-2 shrink-0">
            <div className="size-8 bg-[#EBEBEB] rounded-lg cursor-pointer flex items-center justify-center hover:bg-gray-200">
              <Icon
                icon="ph:dots-three-vertical-bold"
                className="size-4"
                onClick={toggleDetails}
              />
            </div>

            <div className="size-8 bg-[#EBEBEB] rounded-lg cursor-pointer flex items-center justify-center hover:bg-gray-200">
              <Icon
                icon="solar:moon-sleep-bold"
                className="size-4"
                onClick={toggleDetails}
              />
            </div>

            <div className="size-8 bg-black rounded-lg cursor-pointer flex items-center justify-center hover:bg-gray-800">
              <Icon
                icon="system-uicons:box-download"
                className="size-4 text-white"
                onClick={toggleDetails}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative flex flex-col">
        {/* Date */}
        <div className="flex justify-center my-4 shrink-0">
          <span className="text-xs bg-gray-200 text-gray-600 px-3 py-1 rounded-full">
            Today
          </span>
        </div>

        {/* Chat Room */}
        <div className="flex-1 p-6 space-y-4 overflow-y-auto mb-20 scroll-smooth">
          {(isLoadingMessages || isLoading) ? (
            <div className="flex flex-col gap-y-6">
              <div className="flex justify-start">
                <Skeleton width="40%" height={60} className="rounded-2xl rounded-tl-none" />
              </div>
              <div className="flex justify-end">
                <Skeleton width="35%" height={80} className="rounded-2xl rounded-tr-none" />
              </div>
              <div className="flex justify-start">
                <Skeleton width="50%" height={40} className="rounded-2xl rounded-tl-none" />
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <div
                  key={msg.id || Math.random()}
                  className={`flex ${msg.senderId === "currUser" ? "justify-end" : "justify-start"
                    }`}
                >
                  <div className="max-w-[75%]">
                    <div
                      className={`rounded-lg px-4 py-3 text-[11px] whitespace-pre-line ${msg.senderId === "currUser"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-purple-100 text-gray-800"
                        }`}
                    >
                      {msg.text}
                    </div>
                    <div
                      className={`flex items-center gap-1 mt-1 ${msg.senderId === "currUser" ? "justify-end" : "justify-start"
                        }`}
                    >
                      <span className="text-[10px] text-gray-400 font-medium">
                        {msg.time}
                      </span>
                      {msg.senderId === "currUser" && (
                        <Icon icon={msg.read ? "mdi:check-all" : "mdi:check"} className="size-3 text-blue-500" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-500 rounded-lg px-4 py-3 text-[11px] animate-pulse">
                    {isTyping} is typing...
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Input */}
        <div className="absolute bottom-0 left-4 right-4 p-4 bg-white rounded-lg border border-[#D8DEE4] shadow-sm">
          <div className="flex items-center gap-3 rounded-xl">
            <input
              type="text"
              placeholder="Type something…"
              className="flex-1 bg-transparent text-[11px] md:text-[10px] outline-none placeholder:text-gray-400"
              value={inputText}
              onChange={handleInput}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
            />
          </div>

          <div className="pt-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-x-3 text-gray-500">
              <div className="cursor-pointer hover:text-gray-700">
                <Icon icon="hugeicons:image-03" className="size-4" />
              </div>

              <div className="cursor-pointer hover:text-gray-700">
                <Icon
                  icon="fluent:video-clip-24-regular"
                  className="size-4"
                />
              </div>
              <div className="cursor-pointer hover:text-gray-700">
                <Icon
                  icon="mdi:sticker-text-outline"
                  className="size-4"
                />
              </div>
              <div className="cursor-pointer hover:text-gray-700">
                <Icon icon="ph:smiley-bold" className="size-4" />
              </div>

              <div className="cursor-pointer hover:text-gray-700">
                <Icon icon="typcn:arrow-back" className="size-4" />
              </div>
            </div>

            <div className="flex gap-x-3 text-gray-500">
              <div className="cursor-pointer hover:text-gray-700" onClick={handleSend}>
                <Icon icon="lucide:send" className="size-4 text-blue-500" />
              </div>
              <div className="cursor-pointer hover:text-gray-700">
                <Icon icon="hugeicons:energy" className="size-4" />
              </div>
              <div className="cursor-pointer hover:text-gray-700">
                <Icon icon="ph:microphone-bold" className="size-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
