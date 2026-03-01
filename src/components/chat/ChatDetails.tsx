import { Icon } from "@iconify/react";
import ExpansionPanel from "@/components/common/ExpansionPanel";
import Skeleton from "@/components/common/Skeleton";
import { useChatStore } from "@/store/useChatStore";

const ChatDetails: React.FC = () => {
  const { isDetailsCollapsed, toggleDetails, activeRoomId, rooms, isLoading } = useChatStore();

  const activeRoom = rooms.find(r => r.id === activeRoomId);
  const displayInfo = activeRoom?.otherUser || {
    name: "Group Chat", email: "No email", phone: "No phone", teamId: "Unknown"
  };

  return (
    <div
      className={`absolute z-40 h-full right-0 top-0 bottom-0 shadow-2xl transition-all duration-300 ease-in-out xl:static xl:translate-x-0 xl:shadow-none ${isDetailsCollapsed ? "translate-x-full xl:w-0 xl:opacity-0" : "translate-x-0 xl:w-96 xl:opacity-100"
        } flex w-[85%] sm:w-80 pb-4 bg-[#FAFAF8] xl:bg-white border-l border-gray-200 rounded-s-lg xl:rounded-lg flex-col overflow-hidden shrink-0 xl:relative`}
    >
      {/* Header */}
      <div className={`w-full h-12 px-4 flex items-center shrink-0 border-b border-gray-200 md:border-none ${isDetailsCollapsed ? "justify-center" : "justify-between"}`}>
        {!isDetailsCollapsed && (
          <h4 className="text-[13px] font-bold text-gray-800">Details</h4>
        )}

        <div className="flex items-center gap-2">
          {/* Mobile Close Button */}
          <button
            className="md:hidden p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={toggleDetails}
          >
            <Icon icon="heroicons:chevron-right" className="size-5" />
          </button>

          <button
            onClick={toggleDetails}
            className="hidden md:block p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Icon icon="hugeicons:panel-right" className="size-4" />
          </button>
        </div>
      </div>

      {/* Content wrapper to handle scroll and maintain layout */}
      <div className={`flex-1 flex flex-col min-w-[320px] md:min-w-[384px] overflow-y-auto ${isDetailsCollapsed ? "hidden md:hidden" : "flex"}`}>
        {isLoading ? (
          <div className="p-6 flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-4">
              <Skeleton width="40%" height={12} />
              <div className="flex flex-col gap-y-3">
                <Skeleton width="100%" height={32} />
                <Skeleton width="100%" height={32} />
              </div>
            </div>
            <div className="flex flex-col gap-y-4">
              <Skeleton width="40%" height={12} />
              <div className="flex flex-col gap-y-3">
                <Skeleton width="100%" height={10} />
                <Skeleton width="100%" height={10} />
                <Skeleton width="100%" height={10} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto pb-2 text-[11px] gap-y-4">
            {/* Chat Data */}
            <ExpansionPanel
              title="Chat Data"
              className="p-2 border-t border-gray-200"
              defaultExpanded
            >
              <div className="w-full px-2.5 p-2 flex flex-col gap-y-1.5">
                <div className="py-2 flex items-center gap-x-2">
                  <p className="min-w-32 max-w-40 text-[10px] text-[#909090]">
                    Assigned:
                  </p>

                  <div className="px-2.5 rounded-lg flex items-center gap-x-2 bg-gray-50 py-1">
                    <Icon icon="heroicons:chat-bubble-left-right" className="size-4 text-gray-500" />
                    <span className="text-[10px] font-medium capitalize">{activeRoom?.type || 'Direct'}</span>
                  </div>
                </div>

                <div className="py-2 flex items-center gap-x-2">
                  <p className="min-w-32 max-w-40 text-[10px] text-[#909090]">
                    Belongs To Team:
                  </p>

                  <div className="px-2.5 rounded-lg flex items-center gap-x-2 bg-gray-50 py-1">
                    <Icon icon="heroicons:user-group" className="size-4 text-gray-500" />
                    <span className="text-[10px] font-medium">{displayInfo.teamId === "team1" ? "Sales" : "Customer Support"}</span>
                  </div>
                </div>
              </div>
            </ExpansionPanel>

            {/* Contact Data */}
            <ExpansionPanel
              title="User Data"
              className="p-2 border-t border-gray-200"
              defaultExpanded
            >
              <div className="w-full px-2.5 py-2 flex flex-col gap-y-1.5">
                {/* Name */}
                <div className="py-2 flex items-center gap-x-2">
                  <p className="min-w-32 max-w-40 text-[10px] text-[#909090]">
                    Name
                  </p>

                  <div className="px-2.5 rounded-lg flex items-center gap-x-2">
                    <span className="text-[10px] font-medium">
                      {displayInfo.name}
                    </span>
                  </div>
                </div>

                {/* Phone number */}
                <div className="py-2 flex items-center gap-x-2">
                  <p className="min-w-32 max-w-40 text-[10px] text-[#909090]">
                    Phone number
                  </p>

                  <div className="px-2.5 rounded-lg flex items-center gap-x-2">
                    <span className="text-[10px] font-medium">
                      {displayInfo.phone}
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="py-2 flex items-center gap-x-2">
                  <p className="min-w-32 max-w-40 text-[10px] text-[#909090]">
                    Email
                  </p>

                  <div className="px-2.5 rounded-lg flex items-center gap-x-2">
                    <span className="text-[10px] font-semibold truncate max-w-40 block" title={displayInfo.email}>
                      {displayInfo.email}
                    </span>
                  </div>
                </div>
              </div>
            </ExpansionPanel>

            {/* Contact Labels */}
            <ExpansionPanel
              title="Contact Labels"
              className="p-2 border-t border-gray-200"
              defaultExpanded
            >
              <div className="w-full px-2.5 py-2 flex flex-wrap items-center gap-1.5">
                <div className="w-fit px-2 p-1 text-[#007AEC] border-[1.5px] border-[#007AEC] rounded-full flex items-center gap-x-1 hover:bg-blue-50 cursor-pointer transition-colors">
                  <Icon icon="mingcute:tag-line" className="size-3" />
                  <p className="text-[9px] font-semibold">Closed Won</p>
                </div>

                <div className="w-fit px-2 p-1 text-[#007AEC] border-[1.5px] border-[#007AEC] rounded-full flex items-center gap-x-1 hover:bg-blue-50 cursor-pointer transition-colors">
                  <Icon icon="mingcute:tag-line" className="size-3" />
                  <p className="text-[9px] font-semibold">Chicago</p>
                </div>

                <div className="w-fit p-1 text-[#007AEC] border-[1.5px] border-[#007AEC] rounded-full cursor-pointer flex items-center gap-x-1 hover:bg-blue-50 transition-colors">
                  <Icon icon="heroicons:plus-16-solid" className="size-3" />
                </div>
              </div>
            </ExpansionPanel>

            {/* Contact Notes */}
            <ExpansionPanel
              title="Notes"
              className="p-2 border-t border-gray-200"
              defaultExpanded
            >
              <div className="w-full px-2.5 py-2 flex flex-col items-center gap-y-2">
                {/* Input */}
                <div className="w-full px-4 py-2.5 bg-[#F5E096] rounded-lg flex items-center gap-x-1.25 hover:shadow-sm transition-shadow">
                  <input
                    type="text"
                    placeholder="Add Note"
                    className="w-full text-[10px] focus:outline-none bg-transparent placeholder:text-gray-600 font-medium"
                  />
                </div>

                {/* Notes List */}
                <div className="w-full px-4 py-2.5 bg-[#F5E096] rounded-lg flex items-center gap-x-1.25">
                  <p className="text-[10px] font-medium text-gray-800">
                    Strong potential for future upgrades
                  </p>
                </div>
              </div>
            </ExpansionPanel>

            {/* Other Chats */}
            <ExpansionPanel
              title="Other Chats"
              className="p-2 border-t border-gray-200 mb-4"
              defaultExpanded
            >
              <div className="w-full px-2.5 py-2 flex flex-col items-center gap-y-1.5">
                {/* Chat 1 */}
                <div className="w-full p-2 rounded-lg flex items-start gap-x-2 cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="min-w-6 size-6 mt-0.5 rounded-full text-[10px] font-medium text-white bg-[linear-gradient(180deg,#A032C2_0%,#DB4186_44.23%,#EF4C5E_69.71%,#FF8646_100%)] flex items-center justify-center shadow-sm">
                    <Icon icon="ri:instagram-fill" className="size-3.5" />
                  </div>

                  <div className="w-full flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <h5 className="text-[10px] font-semibold text-gray-800 truncate">
                        Michael Johnson
                      </h5>
                      <p className="text-[10px] text-gray-500 truncate mt-0.5">
                        Hey, how are you?
                      </p>
                    </div>
                    <p className="text-[9px] text-gray-400 font-medium ml-2">08/08/25</p>
                  </div>
                </div>
              </div>
            </ExpansionPanel>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatDetails;
