import { useEffect } from "react";
import Header from "@/components/chat/ChatHeader";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatRail from "@/components/chat/ChatRail";
import ChatArea from "@/components/chat/ChatArea";
import ChatDetails from "@/components/chat/ChatDetails";
import { useChatStore } from "@/store/useChatStore";

const ChatPage: React.FC = () => {
  const { fetchAllData, isSidebarOpen, closeSidebar, isDetailsCollapsed, toggleDetails, isChatOpen } = useChatStore();

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Messages are now fetched internally via setActiveRoom when fetchAllData finishes and sets the first room.

  return (
    <div className="w-full h-screen p-2 bg-[#EFF0EB] flex flex-col gap-2 relative overflow-hidden">
      {/* Header */}
      <div className="relative z-[60]">
        <Header />
      </div>

      {/* Main */}
      <main className="flex-1 flex items-center justify-between gap-2 overflow-hidden h-full z-10 relative">
        <div className="w-full h-full flex gap-x-2 overflow-hidden relative">
          {/* Mobile Sidebar Overlay */}
          {isSidebarOpen && (
            <div
              className="absolute inset-0 bg-black/50 z-30 md:hidden"
              onClick={closeSidebar}
            />
          )}

          {/* Mobile Details Overlay */}
          {!isDetailsCollapsed && (
            <div
              className="absolute inset-0 bg-black/50 z-30 md:hidden"
              onClick={toggleDetails}
            />
          )}

          <div className={`bg-[#FAFAF8] rounded-lg shadow-sm border border-gray-100 overflow-hidden h-full shrink-0 ${isChatOpen ? "hidden lg:flex" : "flex w-full lg:w-auto"}`}>
            {/* Sidebar */}
            <ChatSidebar />

            {/* Rail Sidebar */}
            <ChatRail />
          </div>

          {/* Chat Window */}
          <ChatArea />
        </div>

        {/* Chat Details */}
        <ChatDetails />
      </main>
    </div>
  );
};

export default ChatPage;
